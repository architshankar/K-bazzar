
import header from './Header.css';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import catagories from './CatagoriesList';

function Catagories(props) {
    const navigate = useNavigate();
    const location = useLocation();

    // Define the paths where padding should be applied
    const pathsWithPadding = ['/catagory', '/liked-products', '/my-products'];

    // Check if the current path matches any of the paths that require padding
    const shouldApplyPadding = pathsWithPadding.some((path) =>
        location.pathname.startsWith(path)
    );

    return (
        <div
            className='cat-container-outer'
            style={shouldApplyPadding ? { paddingTop: '125px' } : {}}
        >
            <div className='cat-container d-flex'>
                <div className='nav-catagories'>
                    <span className='cat-left' style={{ fontFamily: 'work-sans.regular' }}>Catagories</span>
                    {
                        catagories && catagories.length > 0 &&
                        catagories.map((item, index) => {
                            return (
                                <span
                                    onClick={() => navigate('/catagory/' + item)}
                                    className='catagory'
                                    style={{ fontFamily: 'work-sans.regular' }}
                                    key={index}
                                >
                                    {item}
                                </span>
                            );
                        })
                    }
                </div>
            </div>
        </div>
    );
}

export default Catagories;
