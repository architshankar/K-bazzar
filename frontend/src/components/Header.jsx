
// import header from './Header.css'
// import { Link, useNavigate } from 'react-router-dom';
// import { FaSearch } from "react-icons/fa";
// import { useState } from 'react';
// import home from './Home.css';
// import { FaUser } from "react-icons/fa";



// function Header(props) {

//     const [loc, setLoc] = useState(null);
//     const [showOver, setshowOver] = useState(false);

//     const navigate = useNavigate();
//     const handleLogout = () => {
//         localStorage.removeItem('token');
//         localStorage.removeItem('userId');

//         navigate('/login')
//     }

//     let locations = [
//         {
//             "latitude": 20.356207,
//             "longitude": 85.819933,
//             "placeName": "Kp-5 , Kiit university "
//         },
//         {
//             "latitude": 20.356041,
//             "longitude": 85.820658,
//             "placeName": "Kp-6 , Kiit university "
//         },
//         {
//             "latitude": 20.355983,
//             "longitude": 85.821383,
//             "placeName": "Kp-7 , Kiit university "
//         },
//         {
//             "latitude": 27.176678417753145,
//             "longitude": 78.0080858675087,
//             "placeName": "Agra"
//         },
//         {
//             "latitude": 33.2778,
//             "longitude": 75.3412,
//             "placeName": "Kashmir"
//         },
//     ]


//     // the above funtion ensures to remove the token from local storage and navigate the user to the login page

//     return (<div className='parent-header'>
//         <div className='header-container d-flex justify-content-between'>
//             <div className="header">

//                 {/* <Link className='links' to="/" style={{ fontFamily: 'Sansation_Regular' }}> Kbazzar </Link> */}
//                 <button
//                     className="btn"
//                     style={{
//                         fontFamily: 'Sansation_Regular',
//                         backgroundColor: 'transparent',
//                         border: 'none',
//                         color: 'white',
//                         textDecoration: 'none',
//                         cursor: 'pointer',
//                         fontSize: '35px',
//                         outline: 'none',
//                         boxShadow: 'none', 
//                     }}
//                     onClick={() => window.location.href = '/'}
//                 >
//                     Kbazzar
//                 </button>



//                 {/* <select value={loc} onChange={(e) => {
//                 localStorage.setItem('userLoc', e.target.value)
//                 setLoc(e.target.value);
//             }}>
//                 {locations.map((item, index) => {
//                     return (
//                         <option key={index} value={`${item.latitude},${item.longitude}`}>
//                             {item.placeName}
//                         </option>
//                     )
//                 })}
//             </select> */}

//                 <input className="search" type="text"
//                     value={props && props.search}
//                     onChange={(e) => props.handlesearch && props.handlesearch(e.target.value)} />

//                 <button className='search-btn' onClick={() => props.handleClick && props.handleClick()}> <FaSearch /> </button>

//                 {/* <span className="mt-3">Sell your products online</span> */}

//             </div>
//             <div style={{ paddingTop: '8px' , paddingRight : '6px' }}>
//                 <div
//                     // this div handles the outer click button which when on click shows the options 
//                     onClick={() => {
//                         setshowOver(!showOver)
//                     }}
//                     style={{

//                         display: 'flex',
//                         justifyContent: 'center',
//                         alignItems: 'center',
//                         width: '50px',
//                         height: '50px',
//                         borderRadius: '50%',
//                         background: '#76767676',
//                         color: '#fff',
//                         fontSize: '14px' , 
//                         cursor: 'pointer' ,
//                     }}>  <FaUser size={25} /> </div>

//                 {showOver && <div style={{  // this div contains three divs which has buttons like add product , logout etc
//                     minHeight: '30px',
//                     width: '150px',
//                     background: '#ffff',
//                     position: 'absolute',
//                     top: '40px',
//                     // right: '0',
//                     marginTop: '50px',
//                     marginRight: '50px',
//                     color: 'red',
//                     fontSize: '14px',
//                     zIndex: 1,
//                     borderRadius: '7px',
//                     display : 'flex', 
//                     justifyContent : 'center'
//                 }}>

//                     {/* <div>
//                         {localStorage.getItem('token') && <Link to="/add-product">
//                             <button className="logout-btn">
//                                 ADD PRODUCT
//                             </button>
//                         </Link>}

//                     </div> */}

//                         {/* if token is there then add product button to be shown */}

//                     {/* <div>
//                         {localStorage.getItem('token') && <Link to="/liked-products">
//                             <button className="logout-btn">
//                                 FAVOURITES
//                             </button>
//                         </Link>}
//                     </div> */}
//                     {/* <div>
//                         {localStorage.getItem('token') && <Link to="/my-products">
//                             <button className="logout-btn">
//                                 MY ADS
//                             </button>
//                         </Link>}
//                     </div> */}

//                     <div>
//                         {/* we only need to show the login button when the user is not logged in  */}
//                         {!localStorage.getItem('token') ?
//                             <Link to="/login"> LOGIN </Link> :
//                             <button className='logout-btn' onClick={handleLogout}> LOGOUT </button>}
//                     </div>


//                 </div>}

//             </div>
//         </div>
//     </div>

//     )



// }

// export default Header;

// import './Header.css';
// import { Link, useNavigate } from 'react-router-dom';
// import { FaSearch, FaUser } from "react-icons/fa";
// import { useState } from 'react';
// import './Home.css';

// function Header(props) {
//     const [loc, setLoc] = useState(null);
//     const [showOver, setShowOver] = useState(false);
//     const [showModal, setShowModal] = useState(false);

//     const navigate = useNavigate();

//     const handleLogout = () => {
//         setShowOver(false);
//         setShowModal(true); // Show the confirmation modal
//     };

//     const confirmLogout = () => {
//         localStorage.removeItem('token');
//         localStorage.removeItem('userId');
//         setShowModal(false); // Close the modal
//         navigate('/login');
//     };

//     const cancelLogout = () => {
//         setShowModal(false); // Close the modal
//     };

//     return (
//         <div className='parent-header'>
//             <div className='header-container d-flex justify-content-between'>
//                 <div className="header">
//                     <button
//                         className="btn"
//                         style={{
//                             fontFamily: 'Sansation_Regular',
//                             backgroundColor: 'transparent',
//                             border: 'none',
//                             color: 'white',
//                             textDecoration: 'none',
//                             cursor: 'pointer',
//                             fontSize: '35px',
//                             outline: 'none',
//                             boxShadow: 'none',
//                         }}
//                         onClick={() => window.location.href = '/'}
//                     >
//                         Kbazzar
//                     </button>
//                     <input className="search" type="text"
//                         value={props && props.search}
//                         onChange={(e) => props.handlesearch && props.handlesearch(e.target.value)} />
//                     <button className='search-btn' onClick={() => props.handleClick && props.handleClick()}> <FaSearch /> </button>
//                 </div>
//                 <div style={{ paddingTop: '8px', paddingRight: '6px' }}>
//                     <div
//                         onClick={() => {
//                             setShowOver(!showOver);
//                         }}
//                         style={{
//                             display: 'flex',
//                             justifyContent: 'center',
//                             alignItems: 'center',
//                             width: '50px',
//                             height: '50px',
//                             borderRadius: '50%',
//                             background: '#76767676',
//                             color: '#fff',
//                             fontSize: '14px',
//                             cursor: 'pointer',
//                         }}>  
//                         <FaUser size={25} />
//                     </div>

//                     {showOver && <div style={{
//                         minHeight: '30px',
//                         width: '150px',
//                         background: '#ffff',
//                         position: 'absolute',
//                         top: '40px',
//                         marginTop: '50px',
//                         marginRight: '50px',
//                         color: 'red',
//                         fontSize: '14px',
//                         zIndex: 1,
//                         borderRadius: '7px',
//                         display: 'flex',
//                         justifyContent: 'center'
//                     }}>
//                         <div>
//                             {!localStorage.getItem('token') ? (
//                                 <Link to="/login"> LOGIN </Link>
//                             ) : (
//                                 <button className='logout-btn' onClick={handleLogout}> LOGOUT </button>
//                             )}
//                         </div>
//                     </div>}
//                 </div>
//             </div>

//             {/* Logout Confirmation Modal */}
//             {showModal && (
//                 <div
//                     className="modal-overlay"
//                     onClick={cancelLogout} // Close modal if clicked outside
//                 >
//                     <div className="modal-content" onClick={(e) => e.stopPropagation()}>
//                         <h2 style={{ fontFamily: 'DMSans_36pt-Medium' }} >Are you sure you want to logout?</h2>
//                         <div className="modal-actions">
//                             <button className="yes-btn" style={{ fontFamily: 'DMSans_36pt-Medium' }} onClick={confirmLogout}>YES</button>
//                             <button className="cancel-btn" style={{ fontFamily: 'DMSans_36pt-Medium' }} onClick={cancelLogout}>CANCEL</button>
//                         </div>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// }

// export default Header;


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
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                zIndex: 1000,

                transform: isHidden ? 'translateY(-100%)' : 'translateY(0)',
                transition: 'transform 0.3s ease',
            }}
        >
            <div className='header-container d-flex justify-content-between'>
                <div className="header">
                    <button
                        className="btn"
                        style={{
                            fontFamily: 'Sansation_Regular',
                            backgroundColor: 'transparent',
                            border: 'none',
                            color: 'white',
                            textDecoration: 'none',
                            cursor: 'pointer',
                            fontSize: '35px',
                            outline: 'none',
                            boxShadow: 'none',
                        }}
                        onClick={() => window.location.href = '/'}
                    >
                        Kbazzar
                    </button>
                    {/* <input className="search" type="text"
                        value={props && props.search}
                        onChange={(e) => props.handlesearch && props.handlesearch(e.target.value)} /> */}
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
                    <button className='search-btn' onClick={() => props.handleClick && props.handleClick()}> <FaSearch /> </button>
                </div>
                <div style={{ paddingTop: '8px', paddingRight: '6px' }}>
                    <div
                        onClick={() => {
                            setShowOver(!showOver);
                        }}
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            width: '50px',
                            height: '50px',
                            borderRadius: '50%',
                            background: '#76767676',
                            color: '#fff',
                            fontSize: '14px',
                            cursor: 'pointer',
                        }}>
                        <FaUser size={25} />
                    </div>

                    {showOver && <div style={{
                        minHeight: '30px',
                        width: '150px',
                        background: '#ffff',
                        position: 'absolute',
                        top: '40px',
                        marginTop: '50px',
                        marginRight: '50px',
                        color: 'red',
                        fontSize: '14px',
                        zIndex: 1,
                        borderRadius: '7px',
                        display: 'flex',
                        justifyContent: 'center'
                    }}>

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

