// src/components/AdminLogin.jsx
import React, { useState } from 'react';

const AdminLogin = ({ onLogin, onError }) => {
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (password === 'admin123') {
            const token = 'asdfasdfasdfasdf'; // Generate or hardcode for now
            onLogin(token);
        } else {
            alert('You entered the wrong password')
            onError('Invalid password. Please try again.');
        }
    };

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100vh',
                backgroundColor: '#000',
                color: '#fff',
            }}
        >
            <h1>Admin Login</h1>
            <form onSubmit={handleSubmit} style={{ textAlign: 'center' }}>
                <input
                    type="password"
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={{
                        padding: '10px',
                        marginBottom: '10px',
                        width: '200px',
                        borderRadius: '5px',
                    }}
                />
                <button
                    type="submit"
                    style={{
                        padding: '10px 20px',
                        backgroundColor: '#4CAF50',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '5px',
                    }}
                >
                    Login
                </button>
            </form>
        </div>
    );
};

export default AdminLogin;
