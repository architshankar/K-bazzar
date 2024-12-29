import { useNavigate, Link } from "react-router-dom";
import Header from "./Header";
import { useEffect, useState } from "react";
import axios from "axios";
import Catagories from "./Catagories";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import './Home.css';
import { MdDelete } from "react-icons/md";


function MyProducts() {

    const navigate = useNavigate();

    const [products, setproducts] = useState([]); //variable to set products here 
    const [search, setsearch] = useState('');
    const [cproducts, setcproducts] = useState([]);
    const [allProducts, setAllProducts] = useState([]); // For original product list
    const [issearch, setissearch] = useState();



    // useEffect(()=>{
    //     if(!localStorage.getItem('token')){
    //         navigate('/login');
    //     }
    // },[]) ;  // used to redirect the user to the login page automatically if not logged in 


    useEffect(() => {
        const url = 'http://localhost:4000/my-products';

        let data = { userId: localStorage.getItem('userId') }


        axios.post(url, data)

            .then((res) => {
                if (res.data.products) {   //this data is coming from backend has the name product and not products 
                    setproducts(res.data.products); // set the data into the array products 

                }
            })
            .catch((err) => {

                alert('Server couldent fetch products front')
            })
    }, []);
    // After reaching home page the products are displayed 

    const handleDelete = (productId) => {
        const userId = localStorage.getItem('userId');
        const url = `http://localhost:4000/delete-product/${productId}`;
    
        // Confirm before deletion
        if (window.confirm('Are you sure you want to delete this product?')) {
            axios.delete(url, { data: { userId } })  // Sending the userId to check ownership on the server
                .then((res) => {
                    if (res.data.message === 'Product deleted successfully') {
                        alert('Product deleted successfully');
                        // Remove the deleted product from the state without reloading
                        setproducts(products.filter(product => product._id !== productId));
                    }
                })
                .catch((err) => {
                    console.error(err);
                    alert('Failed to delete the product');
                });
        }
    };
    

    const handlesearch = (value) => {
        setsearch(value);
    }

    // const handleClick = () => {

    //     let filteredProducts = allProducts.filter((item) => {
    //         if (item.pname.toLowerCase().includes(search.toLowerCase())
    //             || item.pdesc.toLowerCase().includes(search.toLowerCase())
    //             || item.catagory.toLowerCase().includes(search.toLowerCase())) {
    //             return item;
    //         }
    //     })
    //     setcproducts(filteredProducts);
    // }


    const handleClick = () => {
                // Construct the URL with just the search term
                const searchQuery = search;
                const url = `http://localhost:4000/search?search=${searchQuery}`;
            
                // Perform the API request to fetch products
                axios.get(url)
                    .then((res) => {
                        
                        // Assuming you're storing the fetched products in the state
                        setcproducts(res.data.products);
                        setissearch(true); // Set the search value to true so that the searched products are displayed
            
                        // Navigate to the search results page with the search term
                        navigate(`/search?search=${searchQuery}`);  // Redirect to '/search-results' page
                    })
                    .catch((err) => {
                        
                        alert('Server couldn\'t fetch products');
                    });
            };

    const handleCatagory = (value) => {
        

        let filteredProducts = allProducts.filter((item) => {
            if (item.catagory.toLowerCase() == (value.toLowerCase())) {
                return item;
            }
        })
        setcproducts(filteredProducts);
    }

    const handleLike = (productId) => {
        let userId = localStorage.getItem('userId');
        
        const url = 'http://localhost:4000/like-product';
        const data = { userId, productId }

        axios.post(url, data)
            .then((res) => {
                if (res.data.message) {
                    alert('Liked-successfully');
                }
            })
            .catch((err) => {
                
                alert('Server couldent fetch products')
            })
    }

    return (
        <div style={{background : 'black' , minHeight : '100vh'}}>
            <Header search={search} handlesearch={handlesearch} handleClick={handleClick} />
            <Catagories handleCatagory={handleCatagory} />

            <div className="d-flex justify-content-center flex-wrap">
                {cproducts && products.length > 0 &&
                    cproducts.map((item, index) => {
                        return (
                            <div key={item._id} className="card m-3">
                                <div onClick={() => handleLike(item._id)} className="icon-con">

                                    <FaHeart className="icons" />

                                </div>
                                <img width="300px" height="200px" src={'http://localhost:4000/' + item.pimage} alt="L" />

                                <p className="m-2">  {item.pname} | {item.catagory}</p>
                                <h3 className="m-2 text-danger"  >  {item.price} </h3>
                                <p className="m-2 text-success">  {item.pdesc} </p>

                            </div>
                        )
                    })}
            </div>


            <div className="cat-items">
                {products && products.length > 0 ? (
                    products.map((product) => (
                        <div
                            key={product._id}
                            className="cat-item"
                            onClick={() => navigate(`/product/${product._id}`)}
                            style={{ cursor: 'pointer', position: 'relative' }} // Position relative to place the button
                        >
                            <div className="item-pic">
                                <img
                                    src={`http://localhost:4000/${product.pimage}`}
                                    alt={product.pname}
                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                />
                            </div>
                            <div className="item-info">
                                <div className="item-name" style={{ fontFamily: 'DMSans_36pt-Medium' }}>
                                    {product.pname}
                                </div>
                                <div className="item-price" style={{ fontFamily: 'DMSans_36pt-Medium' }}>
                                    Rs. {parseFloat(product.price).toFixed(2)} /-
                                </div>
                            </div>

                            <div className="button-delete-cont">
                            <button
                                className="button-delete"
                                onClick={(e) => {
                                    e.stopPropagation(); // Prevent navigating to product details when clicking delete
                                    handleDelete(product._id); // Call delete function
                                }}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 69 14"
                                    className="svgIcon bin-top"
                                >
                                    <g clipPath="url(#clip0_35_24)">
                                        <path
                                            fill="black"
                                            d="M20.8232 2.62734L19.9948 4.21304C19.8224 4.54309 19.4808 4.75 19.1085 4.75H4.92857C2.20246 4.75 0 6.87266 0 9.5C0 12.1273 2.20246 14.25 4.92857 14.25H64.0714C66.7975 14.25 69 12.1273 69 9.5C69 6.87266 66.7975 4.75 64.0714 4.75H49.8915C49.5192 4.75 49.1776 4.54309 49.0052 4.21305L48.1768 2.62734C47.3451 1.00938 45.6355 0 43.7719 0H25.2281C23.3645 0 21.6549 1.00938 20.8232 2.62734ZM64.0023 20.0648C64.0397 19.4882 63.5822 19 63.0044 19H5.99556C5.4178 19 4.96025 19.4882 4.99766 20.0648L8.19375 69.3203C8.44018 73.0758 11.6746 76 15.5712 76H53.4288C57.3254 76 60.5598 73.0758 60.8062 69.3203L64.0023 20.0648Z"
                                        ></path>
                                    </g>
                                    <defs>
                                        <clipPath id="clip0_35_24">
                                            <rect fill="white" height="14" width="69"></rect>
                                        </clipPath>
                                    </defs>
                                </svg>

                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 69 57"
                                    className="svgIcon bin-bottom"
                                >
                                    <g clipPath="url(#clip0_35_22)">
                                        <path
                                            fill="black"
                                            d="M20.8232 -16.3727L19.9948 -14.787C19.8224 -14.4569 19.4808 -14.25 19.1085 -14.25H4.92857C2.20246 -14.25 0 -12.1273 0 -9.5C0 -6.8727 2.20246 -4.75 4.92857 -4.75H64.0714C66.7975 -4.75 69 -6.8727 69 -9.5C69 -12.1273 66.7975 -14.25 64.0714 -14.25H49.8915C49.5192 -14.25 49.1776 -14.4569 49.0052 -14.787L48.1768 -16.3727C47.3451 -17.9906 45.6355 -19 43.7719 -19H25.2281C23.3645 -19 21.6549 -17.9906 20.8232 -16.3727ZM64.0023 1.0648C64.0397 0.4882 63.5822 0 63.0044 0H5.99556C5.4178 0 4.96025 0.4882 4.99766 1.0648L8.19375 50.3203C8.44018 54.0758 11.6746 57 15.5712 57H53.4288C57.3254 57 60.5598 54.0758 60.8062 50.3203L64.0023 1.0648Z"
                                        ></path>
                                    </g>
                                    <defs>
                                        <clipPath id="clip0_35_22">
                                            <rect fill="white" height="57" width="69"></rect>
                                        </clipPath>
                                    </defs>
                                </svg>
                            </button>
                            </div>
                            

                        </div>
                    ))
                ) : (
                    <div className="cat-item">No Products Available</div>
                )}
            </div>

        </div>

    )

}


export default MyProducts; 



