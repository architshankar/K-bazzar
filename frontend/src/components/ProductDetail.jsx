

import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "./Header";
// import LikeUtility from "./likeUtility";
import { FaRegHeart } from "react-icons/fa";
import './Home.css';
import { FaRegBookmark } from "react-icons/fa6";
import { MdBookmarkAdd } from "react-icons/md";
import API_URL from "../constants";

function ProductDetail() {
    const navigate = useNavigate();
    const { productId } = useParams();

    const [product, setProduct] = useState(null);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(API_URL + `/get-product/${productId}`);
                if (response.data.product) {
                    setProduct(response.data.product);
                }
            } catch (error) {
                console.error("Error fetching product:", error);
                alert("Could not fetch product details");
            }
        };
        fetchProduct();
    }, [productId]);

    const handleContact = async (addedBy) => {
        
        try {
            const response = await axios.get(API_URL + `/get-user/${addedBy}`);
            if (response.data.user) {
                setUser(response.data.user);
            }
        } catch (error) {
            console.error("Error fetching contact details:", error);
            alert("Could not fetch contact details");
        }
    };

    const handleLike = async (productId, e) => {
        e.stopPropagation(); // Prevent the event from propagating to parent elements
        const userId = localStorage.getItem("userId");

        if (!userId) {
            alert("Please log in to like the product");
            return;
        }

        try {
            const response = await axios.post(API_URL + "/like-product", { userId, productId });
            if (response.data) {
                alert("Product liked successfully!");
            }
        } catch (error) {
            console.error("Error liking product:", error);
            alert("Could not like the product");
        }
    };

    return (
        <div className="ProductDetail-outer">
            <div className="ProductDetail-header">
                <Header />
            </div>
            <div className="ProductDetail-body">
                {product ? (
                    <div className="d-flex justify-content-between flex-wrap" style={{ paddingTop: "100px" }}>
                        <div className="ProductDetail-imgcont">
                            <div className="ProductDetail-image">
                                <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel" data-bs-interval="false">
                                    <ol className="carousel-indicators">
                                        <li data-target="#carouselExampleIndicators" data-slide-to="0" className="active"></li>
                                        {product.pimage2 && <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>}
                                    </ol>
                                    <div className="carousel-inner">
                                        <div className="carousel-item active">
                                            <img
                                                className="d-block w-100 rounded-image"
                                                width="500px"
                                                height="350px"
                                                src={API_URL + `/${product.pimage}`}
                                                alt="Product Image unavailable"
                                            />
                                        </div>
                                        {product.pimage2 && (
                                            <div className="carousel-item">
                                                <img
                                                    className="d-block w-100 rounded-image"
                                                    width="500px"
                                                    height="350px"
                                                    src={API_URL + `/${product.pimage2}`}
                                                    alt="Second Product Image unavailable"
                                                />
                                            </div>
                                        )}
                                    </div>
                                    <a
                                        className="carousel-control-prev"
                                        href="#carouselExampleIndicators"
                                        role="button"
                                        data-slide="prev"
                                    >
                                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                        <span className="sr-only">Previous</span>
                                    </a>
                                    <a
                                        className="carousel-control-next"
                                        href="#carouselExampleIndicators"
                                        role="button"
                                        data-slide="next"
                                    >
                                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                        <span className="sr-only">Next</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="ProductDetail-desc">
                            <div style={{ display: 'flex', }}>
                                <div
                                    role="alert"
                                    style={{
                                        maxWidth: "150px",
                                        padding: "4px",
                                        backgroundColor: "#484848cc",
                                        borderRadius: "9999px",
                                        color: "#ebf4ff",
                                        display: "flex",
                                        alignItems: "center",
                                        lineHeight: "1.5",
                                        border: "0.5px solid white",
                                        minWidth: '110px'
                                    }}
                                >
                                    <span
                                        style={{
                                            fontWeight: "600",
                                            marginRight: "8px",
                                            flex: "1",
                                            textAlign: "left",
                                            padding: "2px 8px",
                                        }}
                                    >
                                        {product.catagory}
                                    </span>

                                </div>
                                <div style={{ paddingLeft: '50px' }}>
                                    <button onClick={(e) => handleLike(product._id, e)} className="btn btn-outline-light">
                                        <MdBookmarkAdd size={25} /> Favourites
                                    </button> </div>
                            </div>


                            <div className="ProductDetail-name">{product.pname}</div>
                            <div className="ProductDetail-price">Rs. {product.price} /-</div>
                            <div className="ProductDetail-descFull">{product.pdesc}</div>
                            <div className="like-button-container">

                            </div>
                            <div className="show-contact-button-container">
                                <button
                                    className="show-contact-button"
                                    onClick={() => {
                                        if (!localStorage.getItem("token")) {
                                            alert("Please log in to view the contact details.");
                                        } else {
                                            handleContact(product.addedBy);
                                        }
                                    }}
                                >
                                    Show Contact
                                </button>
                                {localStorage.getItem("token") && user && (
                                    <div className="show-contact-info-container">
                                        {user.Username && <h4>Name: {user.Username}</h4>}
                                        {user.mobile && <h4>Phone: {user.mobile}</h4>}
                                        {user.email && <h4>Email: {user.email}</h4>}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                ) : (
                    <h3>Loading product details...</h3>
                )}
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
                                    href="#!"
                                    role="button"
                                >
                                    <i className="fab fa-twitter"></i>
                                </a>


                                {/* Instagram */}
                                <a
                                    className="btn btn-outline-light btn-floating m-1"
                                    href="#!"
                                    role="button"
                                >
                                    <i className="fab fa-instagram"></i>
                                </a>

                                {/* LinkedIn */}
                                <a
                                    className="btn btn-outline-light btn-floating m-1"
                                    href="#!"
                                    role="button"
                                >
                                    <i className="fab fa-linkedin-in"></i>
                                </a>

                                {/* GitHub */}
                                <a
                                    className="btn btn-outline-light btn-floating m-1"
                                    href="#!"
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
    );
}

export default ProductDetail;



