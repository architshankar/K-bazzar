

import { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import './Home.css';
import './SearchPage.css'


function SearchPage() {
    const navigate = useNavigate();
    const location = useLocation();
    const query = new URLSearchParams(location.search);
    const searchTerm = query.get("search") || ""; // Get search query from URL

    const [cproducts, setCproducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const url = `http://localhost:4000/search?search=${searchTerm}`;
        // Fetch search results from backend
        axios.get(url)
            .then((res) => {
                if (res.data && res.data.products) {
                    setCproducts(res.data.products);
                }
                setIsLoading(false);
            })
            .catch((err) => {
                console.error("Error fetching search results:", err);
                setIsLoading(false);
            });
    }, [searchTerm]);

    const handleProduct = (id) => {
        navigate('/product/' + id);
    };

    return (
        <div>
            <div className="search-page-container" style={{ backgroundColor: 'black' }}>
                <div className="search-header">
                    <h2 style={{ color: 'white', fontFamily: 'Satoshi-Bold' }}>Search Results for: "{searchTerm}"</h2>
                    
                    <div style={{padding : '5px'}}>
                    <button className="button-back" onClick={()=> navigate('/')} >
                        <svg height="16" width="16" xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 1024 1024"><path d="M874.690416 495.52477c0 11.2973-9.168824 20.466124-20.466124 20.466124l-604.773963 0 188.083679 188.083679c7.992021 7.992021 7.992021 20.947078 0 28.939099-4.001127 3.990894-9.240455 5.996574-14.46955 5.996574-5.239328 0-10.478655-1.995447-14.479783-5.996574l-223.00912-223.00912c-3.837398-3.837398-5.996574-9.046027-5.996574-14.46955 0-5.433756 2.159176-10.632151 5.996574-14.46955l223.019353-223.029586c7.992021-7.992021 20.957311-7.992021 28.949332 0 7.992021 8.002254 7.992021 20.957311 0 28.949332l-188.073446 188.073446 604.753497 0C865.521592 475.058646 874.690416 484.217237 874.690416 495.52477z"></path></svg>
                        <span>Back Home</span>
                    </button>
                    </div>

                </div>

                {isLoading ? (
                    <p style={{ color: 'white' }}>Loading...</p>
                ) : (
                    <div className="search-results">
                        {cproducts.length > 0 ? (
                            <div className="cat-items">
                                {cproducts.map((item) => (
                                    <div key={item._id} className="cat-item" onClick={() => handleProduct(item._id)} style={{ cursor: 'pointer' }}>
                                        <div className="item-pic">
                                            <img src={`http://localhost:4000/${item.pimage}`} alt={item.pname} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                        </div>
                                        <div className="item-info">
                                            <div className="item-name" style={{ fontFamily: 'DMSans_36pt-Medium', color: 'black' }}>
                                                {item.pname}
                                            </div>
                                            <div className="item-price" style={{ fontFamily: 'DMSans_36pt-Medium', color: 'red' }}>
                                                Rs. {parseFloat(item.price).toFixed(2)} /-
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p style={{ color: 'white' , fontSize : '25px' , fontFamily: 'Satoshi-Bold' }}>No results found</p>
                        )}
                    </div>
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

export default SearchPage;
