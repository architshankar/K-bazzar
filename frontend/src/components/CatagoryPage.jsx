// get the selected catagories from backend and display them 
import { useNavigate, Link, useParams } from "react-router-dom";
import Header from "./Header";
import { useEffect, useState } from "react";
import axios from "axios";
import Catagories from "./Catagories";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import './Home.css';


function CatagoriePage() {

    const navigate = useNavigate();

    const params = useParams();
    

    const [products, setproducts] = useState([]); //variable to set products here 
    const [search, setsearch] = useState('');
    const [cproducts, setcproducts] = useState([]);
    const [allProducts, setAllProducts] = useState([]); // For original product list
    const [issearch, setissearch] = useState(); // checking if the value is coming for serach bar



    useEffect(() => {
        const url = params.catName
            ? 'http://localhost:4000/get-products?catName=' + params.catName // If a category is present
            : 'http://localhost:4000/get-products'; // Fetch all products if category is not provided

        

        axios.get(url)
            .then((res) => {
                

                if (res.data.product) { // Assuming backend returns products in `product` key
                    const approvedProducts = res.data.product.filter(product => product.isApproved);
                    

                    setproducts(approvedProducts); // Set the filtered products
                    setAllProducts(approvedProducts); // Store original products for filtering/searching
                } else {
                    console.log("No product data found in response");
                }
            })
            .catch((err) => {
                console.error("Error fetching products:", err);
                alert('Server couldn\'t fetch products');
            });
    }, [params.catName]); // Dependency is on `params.catName`



    const handlesearch = (value) => {
        setsearch(value);
    }

   
    const handleClick = () => {
        // Construct the URL for the search request
        let url = `http://localhost:4000/search?search=${search}`;

        // Check if user location is available in localStorage
        const userLoc = localStorage.getItem('userLoc');
        if (userLoc) {
            url += `&loc=${userLoc}`; // Add location to the URL if available
        }

        // Make the API request
        axios.get(url)
            .then((res) => {
                if (res.data && res.data.products) {
                    setcproducts(res.data.products);
                    setissearch(true); // Show search results
                } else {
                    setcproducts([]); // If no results are found
                    setissearch(true);
                }
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

    return (
        <div className="catagoryPage-container">
            <Header search={search} handlesearch={handlesearch} handleClick={handleClick} />
            <Catagories
                handleCatagory={handleCatagory}
                style={{ paddingTop: '125px' }}
            />


            <div className="cataContainer">
                {/* {issearch && cproducts &&
                <h5>SEARCH RESULTS
                    <button className="clear-btn" onClick={() => setissearch(false)}> CLEAR </button>
                </h5>}
            {issearch && cproducts && cproducts.length == 0 && <h5> NO RESULTS FOUND </h5>}

            {issearch && <div className="d-flex justify-content-center flex-wrap">
                {cproducts && products.length > 0 &&
                    cproducts.map((item, index) => {
                        return (
                            <div key={item._id} className="card m-3">
                                <div onClick={() => handleLike(item._id)} className="icon-con">

                                    <FaHeart className="icons" />

                                </div>
                                <img width="300px" height="200px" src={'http://localhost:4000/' + item.pimage} alt="L" />

                                <p className="m-2">  {item.pname} | {item.catagory}</p>
                                <h3 className="m-2 text-danger" >Rs.  {item.price} /- </h3>
                                <p className="m-2 text-success">  {item.pdesc} </p>

                            </div>
                        )
                    })}
            </div>} */}

               

                {!issearch && (
                    <div className="category-heading" style={{ fontFamily: 'Satoshi-Bold' }} >
                        {params.catName ? `${params.catName}` : "All Products"}
                    </div>
                )}

                {!issearch && (
                    <div className="cat-items">
                        {products && products.length > 0 ? (
                            products.map((item) => (
                                <div key={item._id} className="cat-item" onClick={() => handleProduct(item._id)} style={{ cursor: 'pointer' }}>
                                    <div className="item-pic">
                                        <img src={`http://localhost:4000/${item.pimage}`} alt={item.pname} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                    </div>
                                    <div className="item-info">
                                        <div className="item-name" style={{ fontFamily: 'DMSans_36pt-Medium' }}>
                                            {item.pname}
                                        </div>
                                        <div className="item-price" style={{ fontFamily: 'DMSans_36pt-Medium' }}>
                                            Rs. {parseFloat(item.price).toFixed(2)} /-
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="cat-item">No Products Available</div>
                        )}
                    </div>
                )}
                {issearch && (
                    <div> <button className="clear-btn" onClick={() => setissearch(false)}>CLEAR</button> </div> 
                )}
                {issearch && (
                    
                    <div className="search-results cat-items" style={{ fontFamily: 'Satoshi-Bold' , display : 'flex' }}>
                        {/* <h1>These are search results</h1> */}
                       
                        
                        {cproducts && cproducts.length > 0 ? (
                            cproducts.map((item) => (
                                
                                <div key={item._id} className="cat-item" onClick={() => handleProduct(item._id)} style={{ cursor: 'pointer' }}>
                                    <div className="item-pic">
                                        <img src={`http://localhost:4000/${item.pimage}`} alt={item.pname} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                    </div>
                                    <div className="item-info">
                                        <div className="item-name" style={{ fontFamily: 'DMSans_36pt-Medium' }}>
                                            {item.pname}
                                        </div>
                                        <div className="item-price" style={{ fontFamily: 'DMSans_36pt-Medium' }}>
                                            Rs. {parseFloat(item.price).toFixed(2)} /-
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div style={{color: 'white' , fontFamily: 'DMSans_36pt-Medium' , fontSize :'30px'}} > No Results Found </div>
                        )}
                        
                    </div>
                )}






                {/* Old styling of the div in catagory page with like option */}
                {/* {!issearch && <div className="d-flex justify-content-center flex-wrap">
                {products && products.length > 0 &&
                    products.map((item, index) => {
                        return (
                            <div onClick={() => handleProduct(item._id)} key={item._id} className="card m-3">
                                <div className="icon-con">

                                    <FaHeart onClick={() => handleLike(item._id)} className="icons" />

                                </div>
                                <img width="250px" height="150px" src={'http://localhost:4000/' + item.pimage} alt="L" />
                                <h3 className="m-2 price-text" > Rs. {item.price} /-</h3>
                                <p className="m-2">  {item.pname} | {item.catagory}</p>
                                <p className="m-2 text-success">  {item.pdesc} </p>

                            </div>
                        )
                    })}
            </div>} */}


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

    )

}

export default CatagoriePage;



