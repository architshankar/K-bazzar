


import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import API_URL from '../constants';

const OtpVerify = ({ email }) => { // Accept email as a prop
    const [otp1, setOtp1] = useState('');
    const [otp2, setOtp2] = useState('');
    const [otp3, setOtp3] = useState('');
    const [otp4, setOtp4] = useState('');
    const [error, setError] = useState('');

    const handleVerifyOtp = () => {
        const otp = otp1 + otp2 + otp3 + otp4;

        if (otp.length === 4) {
            // Call the API to verify the OTP
            axios
                .post(API_URL + '/verify-otp', { email, otp }) // Include email in the request
                .then((response) => {
                    alert(response.data.message); // Show success message
                    // Navigate to another page or handle success
                })
                .catch((err) => {
                    const errorMsg = err.response?.data?.error || 'Failed to verify OTP';
                    setError(errorMsg);
                });
        } else {
            setError('Please enter a valid OTP.');
        }
    };

    const handleOtpChange = (e, setOtp) => {
        const { value } = e.target;
        if (/[^0-9]/.test(value)) return; // Only allow numbers
        setOtp(value);
    };

    const moveToNext = (currentInput, nextInputId, prevInputId, e) => {
        const { value } = currentInput;
    
        if (e.key === "Backspace") {
            if (value === "" && prevInputId) {
                document.getElementById(prevInputId).focus(); // Move to the previous input if empty
            }
        } else if (value.length === 1 && nextInputId) {
            document.getElementById(nextInputId).focus(); // Move to the next input if one character is entered
        }
    };
    
    return (
        <StyledWrapper>
            <form
                className="form"
                onSubmit={(e) => {
                    e.preventDefault();
                    handleVerifyOtp();
                }}
            >
                <div className="content">
                    <p align="center">Enter your OTP Code</p>
                    {error && <p className="error-message">{error}</p>}
                    <div className="inp">
                        <input
                            maxLength={1}
                            className="input"
                            type="text"
                            value={otp1}
                            onChange={(e) => handleOtpChange(e, setOtp1)}
                            id="otp1"
                            onKeyDown={(e) => moveToNext(e.target, 'otp2', null, e)}
                        />
                        <input
                            maxLength={1}
                            className="input"
                            type="text"
                            value={otp2}
                            onChange={(e) => handleOtpChange(e, setOtp2)}
                            id="otp2"
                            onKeyDown={(e) => moveToNext(e.target, 'otp3', 'otp1', e)}
                        />
                        <input
                            maxLength={1}
                            className="input"
                            type="text"
                            value={otp3}
                            onChange={(e) => handleOtpChange(e, setOtp3)}
                            id="otp3"
                            onKeyDown={(e) => moveToNext(e.target, 'otp4', 'otp2', e)}
                        />
                        <input
                            maxLength={1}
                            className="input"
                            type="text"
                            value={otp4}
                            onChange={(e) => handleOtpChange(e, setOtp4)}
                            id="otp4"
                            onKeyDown={(e) => moveToNext(e.target, null, 'otp3', e)}
                        />
                    </div>

                    <button type="submit">Verify OTP</button>
                </div>
            </form>
        </StyledWrapper>
    );
};

const StyledWrapper = styled.div`
  .form {
    display: flex;
    flex-direction: column;
    gap: 10px;
    background: #333333;
    border-radius: 5px;
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(8.2px);
    -webkit-backdrop-filter: blur(8.2px);
    border: 1px solid #fff;
    width: 17em;
    height: 12em;
  }

  .content {
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-top: auto;
    margin-bottom: auto;
  }

  .form p {
    color: #fff;
    font-weight: bolder;
  }

  .inp {
    display: flex;
    justify-content: center;
    gap: 0.5em;
  }

  .input {
    color: #fff;
    height: 2em;
    width: 2em;
    text-align: center;
    background: #00000000;
    outline: none;
    border: 1px #fff solid;
    border-radius: 5px;
    font-size: larger;
  }

  .input:focus {
    outline: none;
    border: 1px #fff solid;
  }

  .input:not(:placeholder-shown) {
    background-color: #fff;
    width: 1em;
    height: 1em;
  }

  .form button {
    margin-left: auto;
    margin-right: auto;
    background-color: #00000000;
    color: #fff;
    width: 8.5em;
    height: 2.3em;
    border: #fff 0.1em solid;
    border-radius: 5px;
    transition: all 0.5s ease;
  }

  .form button:hover {
    background-color: #fff;
    color: #000;
  }

  .error-message {
    color: red;
    font-size: 14px;
    margin-bottom: 10px;
    text-align: center;
  }
`;

export default OtpVerify;
