
import { useNavigate, Link } from "react-router-dom";
import Header from "./Header";
import { useEffect, useState } from "react";
import axios from "axios";
import catagories from "./CatagoriesList";
import './addProduct.css'
import SuccessAlert from "./SuccessAlert";
import CustomFileUpload from "./uploadpic";
import UploadForm from "./uploadpic";
import API_URL from "../constants";

function AddProduct() {

    const navigate = useNavigate();

    const [pname, setpname] = useState(''); //product name storing variable
    const [pdesc, setpdesc] = useState(''); // product description storing variable
    const [price, setprice] = useState('');  // product price storing varable
    const [catagory, setcatagory] = useState('');
    const [pimage, setpimage] = useState('');
    const [pimage2, setpimage2] = useState('');
    const [hostel, setHostel] = useState("");
    const [hostelNumber, setHostelNumber] = useState("");
    const [showSuccessAlert, setShowSuccessAlert] = useState(false);
    const [isLoading, setIsLoading] = useState(false); // loading state

    useEffect(() => {
        if (!localStorage.getItem('token')) {
            navigate('/login');   //token not present , go to the login page
        }
    }, []);

    // const handleApi = () => {
    //     // Show loader immediately when submit is clicked
    //     setIsLoading(true);

    //     if (!pimage && !pimage2) {
    //         alert('Please upload at least one product image');
    //         setIsLoading(false);
    //         return;
    //     }

    //     if (!pname || !pdesc || !price || !catagory  ) {
    //         alert('Please fill in all required fields');
    //         setIsLoading(false);
    //         return;
    //     }

    //     navigator.geolocation.getCurrentPosition((position) => {
    //         const formData = new FormData();
    //         formData.append('pname', pname);
    //         formData.append('plat', position.coords.latitude);
    //         formData.append('plong', position.coords.longitude);
    //         formData.append('pdesc', pdesc);
    //         formData.append('price', price);
    //         formData.append('catagory', catagory);
    //         formData.append('pimage', pimage);
    //         formData.append('pimage2', pimage2);
    //         formData.append('userId', localStorage.getItem('userId'));
    //         formData.append('hostel', hostel);

    //         if (hostel !== 'Other' && hostel !== '') {
    //             formData.append('hostelNumber', hostelNumber);
    //         }

    //         const url = 'http://localhost:4000/add-product';
    //         axios
    //             .post(url, formData)
    //             .then((res) => {
    //                 setIsLoading(false); // stop loading
    //                 if (res.data) {
    //                     setShowSuccessAlert(true);
    //                     setTimeout(() => {
    //                         setShowSuccessAlert(false);
    //                         navigate('/');
    //                     }, 3000);
    //                 }
    //             })
    //             .catch((err) => {
    //                 alert('Server error');
    //                 setIsLoading(false); // stop loading
    //             });
    //     });
    // };

    const handleApi = () => {
        // Show loader immediately when submit is clicked
        setIsLoading(true);
    
        // Check if product images are uploaded
        if (!pimage && !pimage2) {
            alert('Please upload at least one product image');
            setIsLoading(false);
            return;
        }
    
        // Check if required fields are filled
        if (!pname || !pdesc || !price || !catagory) {
            alert('Please fill in all required fields');
            setIsLoading(false);
            return;
        }
    
        // Validate hostel selection and hostel number
        if (!hostel) {
            alert('Please select a hostel');
            setIsLoading(false);
            return;
        }
    
        if ((hostel === "KP" || hostel === "QC") && !hostelNumber) {
            alert('Please enter the hostel number');
            setIsLoading(false);
            return;
        }
    
        // Handle geolocation
        navigator.geolocation.getCurrentPosition((position) => {
            const formData = new FormData();
            formData.append('pname', pname);
            formData.append('plat', position.coords.latitude);
            formData.append('plong', position.coords.longitude);
            formData.append('pdesc', pdesc);
            formData.append('price', price);
            formData.append('catagory', catagory);
            formData.append('pimage', pimage);
            formData.append('pimage2', pimage2);
            formData.append('userId', localStorage.getItem('userId'));
            formData.append('hostel', hostel);
    
            // Add hostelNumber only if hostel is KP or QC and hostelNumber is provided
            if ((hostel === "KP" || hostel === "QC") && hostelNumber) {
                formData.append('hostelNumber', hostelNumber);
            }
    
            const url = API_URL + '/add-product';
            axios
                .post(url, formData)
                .then((res) => {
                    setIsLoading(false); // stop loading
                    // if (res.data) {
                    //     setShowSuccessAlert(true);
                    //     setTimeout(() => {
                    //         setShowSuccessAlert(false);
                    //         navigate('/');
                    //     }, 3000);
                    // }
                    if (res.data) {
                        setShowSuccessAlert(true);
                    }
                })
                .catch((err) => {
                    alert('Server error');
                    setIsLoading(false); // stop loading
                });
        });
    };
    
    
    const background = "./images/add-prod.jpg";

    return (
        <div className="add-product-form" style={{ backgroundImage: `url(${background})`, minHeight: "100vh" }} >
            {/* Content Wrapper with Blur */}
            <div className={`content-wrapper ${isLoading ? 'blurred' : ''}`}>
                <div className="add-product-form-info" style={{ fontFamily: 'Electrolize-Regular' }}>
                    <div className="add-product-form-info-left">
                        <div className="addprod" style={{ fontFamily: 'DMSerifText-Regular' }}> Add Product </div>
                        <div className="outer-add-prod-info">
                            <label > Product Name</label>
                            <input type="text" className="form-control" value={pname}
                                onChange={(e) => { setpname(e.target.value) }} />
                        </div>

                        <div className="outer-add-prod-info">
                            <label>Price</label>
                            <div className="price-input">
                                <input
                                    type="text"
                                    className="form-control"
                                    value={price}
                                    onChange={(e) => {
                                        const value = e.target.value;
                                        if (/^\d*\.?\d{0,2}$/.test(value)) {
                                            setprice(value);
                                        }
                                    }}
                                    onBlur={(e) => {
                                        const value = parseFloat(price);
                                        if (!isNaN(value)) {
                                            setprice(value.toFixed(2));
                                        }
                                    }}
                                />
                            </div>
                        </div>

                        <div className="outer-add-prod-info">
                            <label>Product Description</label>
                            <textarea
                                className="form-control"
                                value={pdesc}
                                onChange={(e) => {
                                    const value = e.target.value;
                                    if (value.length <= 200) { // Limit to 200 characters
                                        setpdesc(value);
                                    }
                                }}
                                rows="3" // Adjust the height of the text area
                            ></textarea>
                            <div className="char-count">{200 - pdesc.length} characters remaining</div>
                        </div>

                    </div>
                    <div className="add-product-form-info-right">
                        <div className="upload-pics">
                            <div className="upload-pic1">
                                <UploadForm
                                    label="First Image"
                                    onChange={setpimage}
                                />
                            </div>
                            <div className="upload-pic2">
                                <UploadForm
                                    label="Second Image"
                                    onChange={setpimage2}
                                />
                            </div>
                        </div>
                        <div className="file-preview">
                            <p style={{ paddingRight: '15px' }}>First Image: {pimage ? pimage.name : 'No file selected'}</p>
                            <p>Second Image: {pimage2 ? pimage2.name : 'No file selected'}</p>
                        </div>
                        <div className="outer-add-prod-info">
                            <label>Product Category</label>
                            <select
                                className="form-control"
                                value={catagory}
                                onChange={(e) => setcatagory(e.target.value)}
                            >
                                <option value="" disabled>
                                    Select a category
                                </option>
                                {catagories && catagories.length > 0 ? (
                                    catagories.map((item, index) => (
                                        <option key={`option-${index}`} value={item}>
                                            {item}
                                        </option>
                                    ))
                                ) : (
                                    <option disabled>No categories available</option>
                                )}
                            </select>
                            {catagory === "" && (
                                <div className="error-message">Please select a category</div>
                            )}
                        </div>
                        <div className="outer-add-prod-info">
                            <label>Hostel</label>
                            <div className="hostel-combined-input" style={{ display: "flex", gap: "10px" }}>
                                <select
                                    className="form-control"
                                    value={hostel}
                                    onChange={(e) => {
                                        setHostel(e.target.value);
                                        if (e.target.value === "Other") {
                                            setHostelNumber(""); // Clear the alphanumeric input when "Other" is selected
                                        }
                                    }}
                                    style={{ flex: 1 }}
                                >
                                    <option value="" disabled>Select</option>
                                    <option value="KP">KP</option>
                                    <option value="QC">QC</option>
                                    <option value="Other">Other</option>
                                </select>

                                {/* Render alphanumeric input only if hostel is KP or QC */}
                                {(hostel === "KP" || hostel === "QC") && (
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={hostelNumber}
                                        onChange={(e) => setHostelNumber(e.target.value)}
                                        placeholder="Enter Hostel number"
                                        style={{ flex: 1 }}
                                    />
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="submit-product">
                    <button onClick={handleApi} className="btn-submit"> SUBMIT</button>
                </div>

            </div>

            {/* Loader */}
            {isLoading && (
                <div className="loader-overlay">
                    <div class="lds-hourglass"></div>
                </div>
            )}

            {/* Success Alert */}
            {showSuccessAlert && (
                <div className="centered-success-alert">
                    <SuccessAlert
                        message="Your request to add a product has been sent to the admin panel."
                        description="You will be notified once the admin approves your product."
                        // onClose={() => setShowSuccessAlert(false)}
                        onClose={() => {
                            setShowSuccessAlert(false); // Close the success alert
                            navigate('/'); // Redirect to the homepage immediately
                        }}
                    />
                </div>
            )}

        </div>
    )
}

export default AddProduct;
