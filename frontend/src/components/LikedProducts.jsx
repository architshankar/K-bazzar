

import { useNavigate } from "react-router-dom";
import Header from "./Header";
import { useEffect, useState } from "react";
import axios from "axios";
import Catagories from "./Catagories";
import './Home.css';

function LikedProducts() {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]); // Liked products
    const [search, setSearch] = useState('');
    const [filteredProducts, setFilteredProducts] = useState([]); // Filtered for search and categories
    const [cproducts, setcproducts] = useState([]);
    const [issearch, setissearch] = useState();

    // Fetch liked products on component load
    useEffect(() => {
        const fetchLikedProducts = async () => {
            try {
                const url = 'http://localhost:4000/liked-products';
                const data = { userId: localStorage.getItem('userId') };
                const res = await axios.post(url, data);

                if (res.data.products) {
                    setProducts(res.data.products);
                    setFilteredProducts(res.data.products); // Initialize filtered list
                }
            } catch (err) {
                alert('Error fetching liked products.');
            }
        };

        fetchLikedProducts();
    }, []);

    // Handle search input changes
    const handleSearch = (value) => {
        setSearch(value);

        const filtered = products.filter((product) =>
            product.pname.toLowerCase().includes(value.toLowerCase())
        );

        setFilteredProducts(filtered);
    };

    // Render each product card
    const renderProductCard = (product) => (
        <div
            key={product._id}
            className="cat-item"
            onClick={() => navigate(`/product/${product._id}`)}
            style={{ cursor: 'pointer' }}
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
        </div>
    );



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

    return (
        <div style={{background : 'black' , minHeight : '100vh'}}>
            <Header search={search} handlesearch={handleSearch} handleClick={handleClick} />
            <Catagories handleCatagory={(category) => handleSearch(category)} />

            {/* <h5>SEARCH RESULTS</h5> */}
            {/* <div className="cat-items">
                {filteredProducts.length > 0 ? (
                    filteredProducts.map((product) => renderProductCard(product))
                ) : (
                    <div className="cat-item">No Products Found</div>
                )}
            </div> */}

            {/* <h5>ALL LIKED PRODUCTS</h5> */}
            <div className="cat-items">
                {products.length > 0 ? (
                    products.map((product) => renderProductCard(product))
                ) : (
                    <div className="cat-item">No Liked Products</div>
                )}
            </div>

            
        </div>
    );
}

export default LikedProducts;
