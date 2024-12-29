

import React, { useState, useEffect } from 'react';
import AdminLogin from './AdminLogin'; // Ensure this file exists
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // For navigation

const AdminPanel = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false); // Manage authentication state
    const [products, setProducts] = useState([]); // Manage product state
    const [error, setError] = useState(''); // Manage login errors
    const navigate = useNavigate();

    // Effect to check authentication token on mount
    useEffect(() => {
        const token = localStorage.getItem('adminToken');
        if (token) {
            axios
                .get('http://localhost:4000/admin/products', {
                    headers: { Authorization: `Bearer ${token}` },
                })
                .then(() => setIsAuthenticated(true)) // Set authenticated state
                .catch(() => setIsAuthenticated(false)); // Reset if invalid token
        }
    }, []);

    // Fetch products only if authenticated
    useEffect(() => {
        if (isAuthenticated) {
            axios
                .get('http://localhost:4000/admin/products', {
                    headers: { Authorization: `Bearer ${localStorage.getItem('adminToken')}` },
                })
                .then((res) => {
                    if (res.data.products) {
                        setProducts(res.data.products);
                    }
                })
                .catch((err) => {
                    console.error(err);
                    alert('Server could not fetch products');
                });
        }
    }, [isAuthenticated]); // Trigger when authentication state changes

    const approveProduct = (id) => {
        axios
            .put(`http://localhost:4000/admin/products/${id}/approve`, null, {
                headers: { Authorization: `Bearer ${localStorage.getItem('adminToken')}` },
            })
            .then(() => {
                setProducts((prev) =>
                    prev.map((product) =>
                        product._id === id ? { ...product, isApproved: true } : product
                    )
                );
                alert('Product approved');
            })
            .catch((err) => {
                console.error(err);
                alert('Failed to approve the product');
            });
    };

    const rejectProduct = (id, userId) => {
        axios
            .delete(`http://localhost:4000/admin/products/${id}/reject`, {
                data: { userId }, // Pass userId in the request body
                headers: { Authorization: `Bearer ${localStorage.getItem('adminToken')}` },
            })
            .then(() => {
                setProducts((prev) =>
                    prev.filter((product) => product._id !== id)
                );
                alert('Product rejected');
                sendRejectionNotification(userId);
            })
            .catch((err) => {
                console.error(err);
                alert('Failed to reject the product');
            });
    };

    const sendRejectionNotification = (userId) => {
        axios
            .post(
                'http://localhost:4000/notifications/reject',
                { userId, message: 'Your product has been rejected by the admin.' },
                { headers: { Authorization: `Bearer ${localStorage.getItem('adminToken')}` } }
            )
            .then((res) => {
                
            })
            .catch((err) => {
                console.error('Failed to send notification:', err);
            });
    };

    const deleteProduct = (id) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            axios
                .delete(`http://localhost:4000/admin/products/${id}/delete`, {
                    headers: { Authorization: `Bearer ${localStorage.getItem('adminToken')}` },
                })
                .then(() => {
                    setProducts((prev) =>
                        prev.filter((product) => product._id !== id)
                    );
                    alert('Product deleted successfully');
                })
                .catch((err) => {
                    console.error(err);
                    alert('Failed to delete the product');
                });
        }
    };

    const handleProduct = (id) => {
        navigate('/product/' + id); // Navigate to product detail page
    };

    // Render Admin Login if not authenticated
    if (!isAuthenticated) {
        return (
            <AdminLogin
                onLogin={(token) => {
                    localStorage.setItem('adminToken', token);
                    setIsAuthenticated(true);
                }}
                onError={(message) => setError(message)}
            />
        );
    }

    return (
        <div style={{ fontFamily: "'Arial', sans-serif", padding: '20px', backgroundColor: '#000' }}>
            <h1 style={{ textAlign: 'center', marginBottom: '20px', color: 'white' }}>Admin Panel</h1>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center' }}>
                {products.map((product) => (
                    <div
                        key={product._id}
                        onClick={() => handleProduct(product._id)} // Handle product click
                        style={{
                            cursor: 'pointer',
                            border: '1px solid #ddd',
                            borderRadius: '8px',
                            padding: '15px',
                            backgroundColor: '#fff',
                            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                            width: '300px',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <img
                            src={`http://localhost:4000/${product.pimage}`}
                            alt={product.pname}
                            style={{
                                width: '100%',
                                height: '200px',
                                objectFit: 'cover',
                                borderRadius: '4px',
                                marginBottom: '15px',
                            }}
                        />
                        <div
                            style={{
                                textAlign: 'center',
                                marginBottom: '10px',
                                fontWeight: 'bold',
                                fontSize: '18px',
                            }}
                        >
                            {product.pname}
                        </div>
                        <div
                            style={{
                                textAlign: 'center',
                                marginBottom: '10px',
                                fontSize: '16px',
                                color: '#555',
                            }}
                        >
                            Rs. {product.price} /-
                        </div>
                        <div
                            style={{
                                textAlign: 'center',
                                marginBottom: '10px',
                                fontSize: '14px',
                                color: product.isApproved ? 'green' : 'red',
                            }}
                        >
                            {product.isApproved ? 'Approved' : 'Pending'}
                        </div>
                        <div style={{ display: 'flex', gap: '10px' }}>
                            {!product.isApproved && (
                                <>
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            approveProduct(product._id);
                                        }}
                                        style={{
                                            padding: '8px 12px',
                                            backgroundColor: '#4CAF50',
                                            color: '#fff',
                                            border: 'none',
                                            borderRadius: '4px',
                                            cursor: 'pointer',
                                        }}
                                    >
                                        Approve
                                    </button>
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            rejectProduct(product._id, product.addedBy);
                                        }}
                                        style={{
                                            padding: '8px 12px',
                                            backgroundColor: '#F44336',
                                            color: '#fff',
                                            border: 'none',
                                            borderRadius: '4px',
                                            cursor: 'pointer',
                                        }}
                                    >
                                        Reject
                                    </button>
                                </>
                            )}
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    deleteProduct(product._id);
                                }}
                                style={{
                                    padding: '8px 12px',
                                    backgroundColor: '#FF5722',
                                    color: '#fff',
                                    border: 'none',
                                    borderRadius: '4px',
                                    cursor: 'pointer',
                                }}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AdminPanel;
