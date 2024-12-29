

// export default AddProductForm;
import React from "react";
import styled from "styled-components";

const AddProductForm = () => {
    return (
        <StyledWrapper>
            <div className="container">
                <form className="form">
                    <div className="form_left">
                        <span className="title">Add Product</span>
                        <div className="form_control">
                            <input type="text" className="input" required />
                            <label className="label">Enter Product Name</label>
                        </div>
                        <div className="form_control">
                            <input type="number" className="input" required />
                            <label className="label">Enter Price</label>
                        </div>
                        <div className="form_control">
                            <textarea className="input textarea" required></textarea>
                            <label className="label">Enter Description</label>
                        </div>
                        <div className="form_control">
                            <input type="text" className="input" required />
                            <label className="label">Enter Hostel</label>
                        </div>
                        <div className="form_control">
                            <select className="input" required>
                                <option value="" disabled selected>
                                    Select Category
                                </option>
                                <option value="electronics">Electronics</option>
                                <option value="clothing">Clothing</option>
                                <option value="books">Books</option>
                                <option value="other">Other</option>
                            </select>
                            <label className="label">Select Category</label>
                        </div>
                        <button>Add Product</button>
                    </div>
                    <div className="upload_section">
                        {/* <label className="upload_label">Upload Pictures</label>
            <input type="file" className="file_input" accept="image/*" multiple /> */}

                        <label htmlFor="file" className="custum-file-upload">
                            <div className="icon">
                                <svg
                                    viewBox="0 0 24 24"
                                    fill=""
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        fillRule="evenodd"
                                        clipRule="evenodd"
                                        d="M10 1C9.73478 1 9.48043 1.10536 9.29289 1.29289L3.29289 7.29289C3.10536 7.48043 3 7.73478 3 8V20C3 21.6569 4.34315 23 6 23H7C7.55228 23 8 22.5523 8 22C8 21.4477 7.55228 21 7 21H6C5.44772 21 5 20.5523 5 20V9H10C10.5523 9 11 8.55228 11 8V3H18C18.5523 3 19 3.44772 19 4V9C19 9.55228 19.4477 10 20 10C20.5523 10 21 9.55228 21 9V4C21 2.34315 19.6569 1 18 1H10ZM9 7H6.41421L9 4.41421V7ZM14 15.5C14 14.1193 15.1193 13 16.5 13C17.8807 13 19 14.1193 19 15.5V16V17H20C21.1046 17 22 17.8954 22 19C22 20.1046 21.1046 21 20 21H13C11.8954 21 11 20.1046 11 19C11 17.8954 11.8954 17 13 17H14V16V15.5ZM16.5 11C14.142 11 12.2076 12.8136 12.0156 15.122C10.2825 15.5606 9 17.1305 9 19C9 21.2091 10.7909 23 13 23H20C22.2091 23 24 21.2091 24 19C24 17.1305 22.7175 15.5606 20.9844 15.122C20.7924 12.8136 18.858 11 16.5 11Z"
                                    />
                                </svg>
                            </div>
                            <div className="text">
                                <span>Click to upload image</span>
                            </div>
                            <input id="file" type="file" />
                        </label>

                    </div>
                </form>
            </div>
        </StyledWrapper>
    );
};

const StyledWrapper = styled.div`
  .container {
    // width: 700px;
    width: 100vw;
    margin: auto;
    border-radius: 5px;
    overflow: hidden;
    color: white;
    box-shadow: 1.5px 1.5px 3px #0e0e0e, -1.5px -1.5px 3px rgb(95 94 94 / 25%), inset 0px 0px 0px #0e0e0e, inset 0px -0px 0px #5f5e5e;
  }

  .form {
    display: flex;
    flex-wrap: wrap;
    padding: 2em;
    width: 100vw ; 
  }

  .form_left {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  .upload_section {
    width: 40%;
    margin-left: auto;
    margin-top: -30px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: #1e1e1e;
    padding: 20px;
    border-radius: 5px;
    box-shadow: inset 3px 3px 6px #0e0e0e, inset -3px -3px 6px #5f5e5e;
  }

  .upload_label {
    margin-bottom: 15px;
    font-size: 1em;
    font-weight: 700;
  }

  .file_input {
    display: block;
    width: 100%;
    color: #b0b0b0;
    margin-top: 10px;
  }

  .title {
    text-align: left;
    font-weight: 700;
    font-size: 1.8em;
  }

  .form_control {
    position: relative;
    overflow: hidden;
  }

  .label {
    position: absolute;
    top: 50%;
    left: 10px;
    transition: transform ease 0.2s;
    transform: translate(0%, -50%);
    font-size: 0.9em;
    user-select: none;
    pointer-events: none;
    color: #b0b0b0;
  }

  .input {
    width: 100%;
    background-color: transparent;
    border: none;
    outline: none;
    color: #fff;
    padding: 0.8rem;
    font-size: 0.9rem;
    border-radius: 5px;
    transition: box-shadow ease 0.2s;
    box-shadow: 0px 0px 0px #0e0e0e, 0px 0px 0px rgb(95 94 94 / 25%), inset 1.5px 1.5px 3px #0e0e0e, inset -1.5px -1.5px 3px #5f5e5e;
  }

  .textarea {
    height: 80px;
  }

  .input:focus,
  .input:valid {
    box-shadow: 0px 0px 0px #0e0e0e, 0px 0px 0px rgb(95 94 94 / 25%), inset 3px 3px 4px #0e0e0e, inset -3px -3px 4px #5f5e5e;
  }

  .input:focus + .label,
  .input:valid + .label {
    transform: translate(-150%, -50%);
  }

  button {
    width: 100%;
    background-color: transparent;
    border: none;
    outline: none;
    color: #fff;
    padding: 0.8rem;
    font-size: 0.9rem;
    border-radius: 5px;
    transition: box-shadow ease 0.1s;
    box-shadow: 1.5px 1.5px 3px #0e0e0e, -1.5px -1.5px 3px rgb(95 94 94 / 25%), inset 0px 0px 0px #0e0e0e, inset 0px -0px 0px #5f5e5e;
  }

  button:active {
    box-shadow: 0px 0px 0px #0e0e0e, 0px 0px 0px rgb(95 94 94 / 25%), inset 3px 3px 4px #0e0e0e, inset -3px -3px 4px #5f5e5e;
  }
`;

export default AddProductForm;
