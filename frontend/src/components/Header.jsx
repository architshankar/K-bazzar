


import './Header.css';
import { Link, useNavigate } from 'react-router-dom';
import { FaSearch, FaUser } from "react-icons/fa";
import { useState, useEffect } from 'react';
import './Home.css';

function Header(props) {
    const [loc, setLoc] = useState(null);
    const [showOver, setShowOver] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [isHidden, setIsHidden] = useState(false); // Tracks if the header is hidden
    const [lastScrollY, setLastScrollY] = useState(0); // Tracks last scroll position

    const navigate = useNavigate();

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            if (currentScrollY > lastScrollY && currentScrollY > 50) {
                setIsHidden(true); // Hide header when scrolling down
            } else {
                setIsHidden(false); // Show header when scrolling up
            }
            setLastScrollY(currentScrollY);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [lastScrollY]);

    const handleLogout = () => {
        setShowOver(false);
        setShowModal(true); // Show the confirmation modal
    };

    const confirmLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        setShowModal(false); // Close the modal
        navigate('/login');
    };

    const cancelLogout = () => {
        setShowModal(false); // Close the modal
    };

    return (
        <div
            className="parent-header"
            style={{
                // position: 'fixed',
                // top: 0,
                // left: 0,
                // width: '100%',
                // zIndex: 1000,

                transform: isHidden ? 'translateY(-100%)' : 'translateY(0)',
                transition: 'transform 0.3s ease',
            }}
        >
            <div className='header-container d-flex justify-content-between'>
                <div className="header">
                    <button
                        className="btn-k"
                        // style={{
                        //     fontFamily: 'Sansation_Regular',
                        //     backgroundColor: 'transparent',
                        //     border: 'none',
                        //     color: 'white',
                        //     textDecoration: 'none',
                        //     cursor: 'pointer',
                        //     fontSize: '35px',
                        //     outline: 'none',
                        //     boxShadow: 'none',
                        // }}
                        onClick={() => window.location.href = '/'}
                    >
                        Kbazzar
                    </button>
                    {/* <input className="search" type="text"
                        value={props && props.search}
                        onChange={(e) => props.handlesearch && props.handlesearch(e.target.value)} /> */}
                    {/* <input
                        className="search"
                        type="text"
                        value={props && props.search}
                        style={{ fontFamily: 'work-sans.regular' }}
                        onChange={(e) => props.handlesearch && props.handlesearch(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                props.handleClick && props.handleClick(); // Trigger the search button's click handler
                            }
                        }}
                    />
                    <button className='search-btn' onClick={() => props.handleClick && props.handleClick()}> <FaSearch /> </button> */}
                </div>
                <div style={{paddingTop : '10px'}}>
                    <input
                        className="search"
                        type="text"
                        value={props && props.search}
                        style={{ fontFamily: 'work-sans.regular' }}
                        onChange={(e) => props.handlesearch && props.handlesearch(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                props.handleClick && props.handleClick(); // Trigger the search button's click handler
                            }
                        }}
                    />
                    
                </div >
                <div style={{paddingTop : '10px'}}><button className='search-btn' onClick={() => props.handleClick && props.handleClick()}> <FaSearch /> </button></div>
                <div className='user-profile' >
                    <div
                    className="user-circle"
                        onClick={() => {
                            setShowOver(!showOver);
                        }}
                        // style={{
                        //     display: 'flex',
                        //     justifyContent: 'center',
                        //     alignItems: 'center',
                        //     width: '50px',
                        //     height: '50px',
                        //     borderRadius: '50%',
                        //     background: '#76767676',
                        //     color: '#fff',
                        //     fontSize: '14px',
                        //     cursor: 'pointer',
                        // }}
                        >
                        <FaUser className='user-logo'  />
                    </div>

                    {showOver && <div className='login-logout-floater'>

                        <div>
                            {!localStorage.getItem('token') ? (
                                <button
                                    className="logout-btn" // Use the same class for consistent styling
                                    onClick={() => {
                                        window.location.href = "/login"; // Redirect to the login page
                                    }}
                                >
                                    LOGIN
                                </button>
                            ) : (
                                <button className="logout-btn" onClick={handleLogout}>
                                    LOGOUT
                                </button>
                            )}
                        </div>

                    </div>}
                </div>
            </div>

            {/* Logout Confirmation Modal */}
            {showModal && (
                <div
                    className="modal-overlay"
                    onClick={cancelLogout} // Close modal if clicked outside
                >
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <h2 style={{ fontFamily: 'DMSans_36pt-Medium' }} >Are you sure you want to logout?</h2>
                        <div className="modal-actions">
                            <button className="yes-btn" style={{ fontFamily: 'DMSans_36pt-Medium' }} onClick={confirmLogout}>YES</button>
                            <button className="cancel-btn" style={{ fontFamily: 'DMSans_36pt-Medium' }} onClick={cancelLogout}>CANCEL</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Header;

