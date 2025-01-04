import { useNavigate, Link } from "react-router-dom";
import Header from "./Header";
import { useEffect, useState } from "react";
import axios from "axios";
import Catagories from "./Catagories";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import './Home.css'
import './button.css'
import '@fortawesome/fontawesome-free/css/all.min.css';
import { MdOutlineAddShoppingCart } from "react-icons/md";
import { IoIosStar } from "react-icons/io";
import { FaCartArrowDown } from "react-icons/fa6";
import API_URL from "../constants";

// import background from '../images/bk4.jpg'

function Home() {

    const navigate = useNavigate();

    const [products, setproducts] = useState([]); //variable to set products here 
    const [search, setsearch] = useState('');
    const [cproducts, setcproducts] = useState([]);
    const [allProducts, setAllProducts] = useState([]); // For original product list
    const [issearch, setissearch] = useState(); // checking if the value is coming for serach bar

    const [showMessage, setShowMessage] = useState(true); // State to control the visibility of the message


    useEffect(() => {
        const url = API_URL + '/get-products';

        // Check if the server has recently been active
        const serverRefreshedAt = localStorage.getItem('serverRefreshedAt');
        const isServerActive = serverRefreshedAt && (Date.now() - Number(serverRefreshedAt)) < 10 * 60 * 1000; // 10 minutes threshold

        if (!isServerActive) {
            setShowMessage(true); // Show the message if the server is potentially inactive
        }

        axios.get(url)
            .then((res) => {

                if (res.data.product) {   //this data is coming from backend has the name product and not products 
                    setproducts(res.data.product); // set the data into the array products 
                    setAllProducts(res.data.product); // Set original products

                    // Set server refresh time in local storage
                    localStorage.setItem('serverRefreshedAt', Date.now().toString());
                    setShowMessage(false); // Hide the message since the server is active
                }
            })
            .catch((err) => {

                alert('Server couldent fetch products')
            })
    }, []);
    // After reaching home page the products are displayed 

    const handlesearch = (value) => {
        setsearch(value);
    }


    const handleClick = () => {
        // Construct the URL with just the search term
        const searchQuery = search;
        const url = API_URL + `/search?search=${searchQuery}`;

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

    const handleLike = (productId, e) => {

        e.stopPropagation(); //will only work for the child element and not the parent element , i.e the outer div
        let userId = localStorage.getItem('userId');

        if (!userId) {
            alert('Login to continue')
            return;
        }

        const url = API_URL + '/like-product';
        const data = { userId, productId }

        axios.post(url, data)
            .then((res) => {
                if (res.data) {
                    alert('Liked-successfully');
                }
            })
            .catch((err) => {

                alert('Server couldent fetch products')
            })
    }

    const handleProduct = (id) => {
        navigate('/product/' + id);
    }


    const images = [
        "/images/bk1.jpg",
        "/images/bk2.jpg",
        "/images/bk3.jpg",
        "/images/bk4.jpg",
    ];

    // State to hold the current background image
    const [currentIndex, setCurrentIndex] = useState(0);

    // Function to update the background image index
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 4000); // Change every 2 seconds

        return () => clearInterval(interval); // Cleanup on component unmount
    }, [images.length]);

    // Current background image
    const background = images[currentIndex];

    const [isRotated, setIsRotated] = useState(false);
    const [isVisible, setIsVisible] = useState(false); // State to manage visibility

    const handleButtonClick = () => {
        setIsVisible(!isVisible);
        setIsRotated((prev) => !prev); // Toggle rotation state

    };


    const renderCategoryItems = (category) => {
        let filteredProducts;

        if (category) {
            // Filter products by category and only approved products
            filteredProducts = allProducts.filter(
                (product) =>
                    product.isApproved === true &&
                    product.catagory?.toLowerCase() === category.toLowerCase()
            );
        } else {
            // If no category is provided, show all approved products
            filteredProducts = allProducts.filter((product) => product.isApproved === true);
        }

        // Get only the first 3 products
        const topProducts = filteredProducts.slice(0, 3);

        return (
            <div className="cat-items">
                {topProducts.map((product) => (
                    <div
                        key={product._id}
                        className="cat-item"
                        onClick={() => handleProduct(product._id)}
                        style={{ cursor: 'pointer' }}
                    >
                        <div className="item-pic">
                            <img
                                src={API_URL + '/' + product.pimage}
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
                    </div>
                ))}
                {/* If no products exist */}
                {topProducts.length === 0 && (
                    <div className="cat-item">No Products Available</div>
                )}
            </div>
        );
    };



    return (
        <div className="home-parent-parent" >
            {localStorage.getItem('token') ?
                <div className="add-prod-bottom">


                    <div className="cards">
                        <div className="grid-container">

                            <div className={`row-1 ${isVisible ? "visible" : "hidden"} `}>
                                <div
                                    className="card red"
                                    onClick={() => navigate('/add-product')}
                                    style={{ cursor: 'pointer' }}
                                >
                                    <div
                                        style={{
                                            color: 'black',
                                            padding: '10px',
                                            fontSize: '18px',
                                            fontFamily: 'DMSans_36pt-Medium',
                                            display: 'flex',
                                            alignItems: 'center',
                                        }}
                                    >
                                        <MdOutlineAddShoppingCart size={25} style={{ marginRight: '10px' }} /> Add Product
                                    </div>
                                </div>
                            </div>

                            <div className={`row-2-left ${isVisible ? "visible" : "hidden"}`}>

                                <div
                                    className="card blue"
                                    onClick={() => navigate('/liked-products')}
                                    style={{ cursor: 'pointer' }}
                                >
                                    <div
                                        style={{
                                            color: 'black',
                                            padding: '10px',
                                            fontSize: '18px',
                                            fontFamily: 'DMSans_36pt-Medium',
                                            display: 'flex',
                                            alignItems: 'center',
                                        }}
                                    >
                                        <IoIosStar size={25} style={{ marginRight: '10px' }} /> Favourites
                                    </div>
                                </div>
                            </div>

                            <div className="row-2-right">
                                <button
                                    className={`button-container ${isVisible ? "rotated" : ""}`}
                                    onClick={handleButtonClick}
                                    title="Add New"
                                >
                                    <svg
                                        className="button-icon"
                                        viewBox="0 0 24 24"
                                        height="50px"
                                        width="50px"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            strokeWidth="1.5"
                                            d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z"
                                        ></path>
                                        <path strokeWidth="1.5" d="M8 12H16"></path>
                                        <path strokeWidth="1.5" d="M12 16V8"></path>
                                    </svg>
                                </button>
                            </div>

                            <div className={`row-3 ${isVisible ? "visible" : "hidden"}`}>

                                <div
                                    className="card blue"
                                    onClick={() => navigate('/my-products')}
                                    style={{ cursor: 'pointer' }}
                                >
                                    <div
                                        style={{
                                            color: 'black',
                                            padding: '10px',
                                            fontSize: '18px',
                                            fontFamily: 'DMSans_36pt-Medium',
                                            display: 'flex',
                                            alignItems: 'center',
                                        }}
                                    >
                                        <FaCartArrowDown size={25} style={{ marginRight: '10px' }} /> My Products
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>

                </div> :
                <div> </div>
            }
            <div className="home-parent-cover">
                {/* The server refresh message div */}
                {showMessage && (
                    <div style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        backgroundColor: 'rgba(0, 0, 0, 0.8)', // Semi-transparent black background
                        color: 'white',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        flexDirection: 'column',
                        zIndex: 1000,
                    }}>
                        <div style={{
                            maxWidth: '80%',
                            textAlign: 'center',
                            padding: '20px',
                            borderRadius: '8px',
                            border: '1px solid white',
                        }}>
                            <p style={{ fontSize: '18px', marginBottom: '20px' }}>
                                The backend is deployed on a budget-friendly server. Please refresh the page in approximately 30 seconds if you don't see any products on the website. (Helps the server refresh). Thanks!
                            </p>
                            <button onClick={() => setShowMessage(false)} style={{
                                padding: '10px 20px',
                                backgroundColor: 'white',
                                color: 'black',
                                border: 'none',
                                borderRadius: '5px',
                                cursor: 'pointer',
                            }}>
                                Close ✖
                            </button>
                        </div>
                    </div>
                )}


                <div className="home-parent" style={{ backgroundImage: `url(${background})` }}>
                    <div className=""><Header search={search} handlesearch={handlesearch} handleClick={handleClick} /></div>
                    <div className="catagory-container"><Catagories handleCatagory={handleCatagory} /></div>

                    <div className="intro-text">
                        <div className="intro-l1" style={{ fontFamily: 'DMSans_24pt-Bold' }}> One stop point </div>
                        <div className="intro-l2" style={{ fontFamily: 'DMSans_36pt-Medium' }}> for great prices and better deals.. </div>
                    </div>


                </div>

            </div>



            <div className="home-cat">
                {/* All Products Section */}
                <div className="cat-electric-outer">
                    <div className="cat-heading" style={{ fontFamily: 'Satoshi-Bold' }}>
                        Latest Deals
                    </div>
                    <div className="cat-subheading" style={{ fontFamily: 'Satoshi-Bold' }}>
                        <Link to="/catagory/" className="see-more-link">
                            see more {'>>'}
                        </Link>
                    </div>
                    {renderCategoryItems('')}
                </div>

                {/* Electronics */}
                <div className="cat-electric-outer">
                    <div className="cat-heading" style={{ fontFamily: 'Satoshi-Bold' }}>
                        Electronics
                    </div>
                    <div className="cat-subheading" style={{ fontFamily: 'Satoshi-Bold' }}>
                        <Link to="/catagory/Electronics" className="see-more-link">
                            see more {'>>'}
                        </Link>
                    </div>
                    {renderCategoryItems('Electronics')}
                </div>
                {/* Books Section */}
                <div className="cat-electric-outer">
                    <div className="cat-heading" style={{ fontFamily: 'Satoshi-Bold' }}>
                        Books
                    </div>
                    <div className="cat-subheading" style={{ fontFamily: 'Satoshi-Bold' }}>
                        <Link to="/catagory/Books" className="see-more-link">
                            see more {'>>'}
                        </Link>
                    </div>
                    {renderCategoryItems('Books')}
                </div>
                {/* Household Section */}
                <div className="cat-electric-outer">
                    <div className="cat-heading" style={{ fontFamily: 'Satoshi-Bold' }}>
                        Household
                    </div>
                    <div className="cat-subheading" style={{ fontFamily: 'Satoshi-Bold' }}>
                        <Link to="/catagory/Electronics" className="see-more-link">
                            see more {'>>'}
                        </Link>
                    </div>
                    {renderCategoryItems('Household')}
                </div>




                <div className="home-footer">
                    <div style={{ backgroundColor: 'black', paddingTop: '50px' }}>
                        <footer className="bg-dark text-center text-white" >

                            {/* Grid container */}
                            <div className="container ">
                                {/* Section: Social media */}
                                <section className="mb-4">


                                    {/* Twitter */}
                                    <a
                                        className="btn btn-outline-light btn-floating m-1"
                                        href="https://x.com/archit__shankar"
                                        role="button"
                                    >
                                        <i className="fab fa-twitter"></i>
                                    </a>


                                    {/* Instagram */}
                                    <a
                                        className="btn btn-outline-light btn-floating m-1"
                                        href="https://www.instagram.com/archit.shankar/"
                                        role="button"
                                    >
                                        <i className="fab fa-instagram"></i>
                                    </a>

                                    {/* LinkedIn */}
                                    <a
                                        className="btn btn-outline-light btn-floating m-1"
                                        href="https://www.linkedin.com/in/archit-shankar-815756262/"
                                        role="button"
                                    >
                                        <i className="fab fa-linkedin-in"></i>
                                    </a>

                                    {/* GitHub */}
                                    <a
                                        className="btn btn-outline-light btn-floating m-1"
                                        href="https://github.com/architshankar"
                                        role="button"
                                    >
                                        <i className="fab fa-github"></i>
                                    </a>
                                </section>
                                {/* Section: Social media */}
                            </div>
                            {/* Grid container */}

                            {/* Copyright */}
                            <div
                                className="text-center p-3"
                                style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}
                            >
                                © 2024 Copyright :
                                <a
                                    className="text-white"
                                    href=""
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    _Archit_Shankar
                                </a>
                            </div>
                            {/* Copyright */}
                        </footer>
                    </div>
                </div>
            </div>


        </div>

    )

}

export default Home; 