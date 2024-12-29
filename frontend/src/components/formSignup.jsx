


import React, { useState } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import API_URL from '../constants';

const FormSignup = () => {
    const [username, setUsername] = useState('');
    const [mobile, setMobile] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [otp, setOtp] = useState('');
    const [error, setError] = useState('');
    const [otpSent, setOtpSent] = useState(false);
    const [isLoading, setIsLoading] = useState(false); // Loader state
    const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
    const navigate = useNavigate();

    const validateInputs = () => {
        if (!/^[^\s@]+@(kiit\.ac\.in|kims\.ac\.in)$/.test(email)) {
            setError('Please enter a valid college email (e.g., @kiit.ac.in or @kims.ac.in).');
            return false;
        }
        if (!/^\d{10}$/.test(mobile)) {
            setError('Mobile number must be exactly 10 digits long.');
            return false;
        }
        setError('');
        return true;
    };

    const handleSendOtp = () => {
        if (!validateInputs()) return;

        setIsLoading(true); // Show loader
        axios
            .post(API_URL + '/send-otp', { email })
            .then(() => {
                setOtpSent(true);
                alert('OTP has been sent to your email.');
            })
            .catch((err) => {
                console.error(err);
                alert('Error sending OTP. Please try again.');
            })
            .finally(() => {
                setIsLoading(false); // Hide loader
            });
    };

    const handleVerifyOtp = () => {
        setIsLoading(true); // Show loader
        axios
            .post(API_URL + '/verify-otp', { email, otp })
            .then(() => {
                alert('Email verified successfully!');
                // After successful OTP verification, send user details to the backend for signup
                axios
                    .post(API_URL + '/signup', { username, mobile, email, password })
                    .then(() => {
                        alert('User registered successfully!');
                        navigate('/login'); // Redirect to login page after successful registration
                    })
                    .catch((err) => {
                        console.error(err);
                        alert('Error registering user. Please try again.');
                    });
            })
            .catch((err) => {
                console.error(err);
                alert('Invalid OTP. Please try again.');
            })
            .finally(() => {
                setIsLoading(false); // Hide loader
            });
    };

    return (
        <StyledWrapper>
            {/* Loader */}
            {isLoading && (
                <div className="loader-overlay">
                    <div className="lds-hourglass"></div>
                </div>
            )}

            <form
                className="form"
                onSubmit={(e) => {
                    e.preventDefault();
                    otpSent ? handleVerifyOtp() : handleSendOtp();
                }}
            >
                <p className="title">Register</p>

                {error && <p className="error-message">{error}</p>}

                {!otpSent && (
                    <>
                        <label>
                            <input
                                className="input"
                                type="text"
                                placeholder="Enter your username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                            <span>Username</span>
                        </label>

                        <label>
                            <input
                                className="input"
                                type="text"
                                placeholder="Enter your mobile number"
                                value={mobile}
                                onChange={(e) => setMobile(e.target.value)}
                                required
                            />
                            <span>Mobile Number</span>
                        </label>

                        <label>
                            <input
                                className="input"
                                type="email"
                                placeholder="Enter college email only"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                            <span>Email</span>
                        </label>

                        <label>
                            <div className="password-field">
                              
                                <input
                                    className="input"
                                    type={showPassword ? "text" : "password"} // Toggle password visibility
                                    placeholder="Enter your password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                                <span>Password</span>
                                <button
                                    type="button"
                                    className="password-toggle"
                                    onClick={() => setShowPassword(!showPassword)} // Toggle showPassword state
                                >
                                    {showPassword ? 'Hide' : 'Show'}
                                </button>
                            </div>
                            
                        </label>

                        <button type="submit" className="submit">
                            Verify Email
                        </button>
                    </>
                )}

                {otpSent && (
                    <div className="overlay">
                        <div className="overlay-content">
                            <label>
                                <input
                                    className="input"
                                    type="text"
                                    placeholder="Enter your OTP"
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value)}
                                    required
                                />
                                <span>OTP</span>
                                <span> Cheack your spam folder </span>
                                <span style={{fontFamily: 'DMSans_36pt-Medium'}} > *Check your spam folder </span>
                            </label>

                            <button type="submit" className="submit">
                                Verify OTP
                            </button>
                        </div>
                    </div>
                )}
                
                   
             

                <p className="signin">
                    Already have an account? <Link to="/login">Login</Link>
                </p>
            </form>
        </StyledWrapper>
    );
};

const StyledWrapper = styled.div`
    /* Loader styles */
    .loader-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.6);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 100;
    }

    .lds-hourglass {
        display: inline-block;
        width: 64px;
        height: 64px;
        position: relative;
    }

    .lds-hourglass:after {
        content: ' ';
        display: block;
        border-radius: 50%;
        width: 0;
        height: 0;
        margin: 6px;
        box-sizing: border-box;
        border: 32px solid #fff;
        border-color: #fff transparent #fff transparent;
        animation: lds-hourglass 1.2s infinite;
    }

    @keyframes lds-hourglass {
        0% {
            transform: rotate(0);
            animation-timing-function: ease-in;
        }
        50% {
            transform: rotate(900deg);
            animation-timing-function: ease-out;
        }
        100% {
            transform: rotate(1800deg);
        }
    }

    .form {
        display: flex;
        flex-direction: column;
        gap: 5px;
        max-width: 350px;
        padding: 5px 15px;
        border-radius: 20px;
        position: relative;
        background-color: #1a1a1a;
        color: #fff;
        border: 1px solid #333;
    }

    .title {
        font-size: 28px;
        font-weight: 600;
        letter-spacing: -1px;
        position: relative;
        display: flex;
        align-items: center;
        padding-left: 30px;
        color: rgb(255, 255, 255);
    }

    /* Password field container */
    .password-field {
        display: flex;
        align-items: center;
        gap: 10px;
    }

    .password-toggle {
        background: none;
        border: none;
        color: #fff;
        cursor: pointer;
        font-size: 14px;
    }

    .password-toggle:focus {
        outline: none;
    }

    /* Other styles remain unchanged */
      .form {
    display: flex;
    flex-direction: column;
    gap: 5px;
    max-width: 350px;
    padding: 5px 15px;
    border-radius: 20px;
    position: relative;
    background-color: #1a1a1a;
    color: #fff;
    border: 1px solid #333;
  }

  .title {
    font-size: 28px;
    font-weight: 600;
    letter-spacing: -1px;
    position: relative;
    display: flex;
    align-items: center;
    padding-left: 30px;
    color: rgb(255, 255, 255);
  }

  .title::before {
    width: 18px;
    height: 18px;
  }

  .title::after {
    width: 18px;
    height: 18px;
    animation: pulse 1s linear infinite;
  }

  .title::before,
  .title::after {
    position: absolute;
    content: "";
    height: 16px;
    width: 16px;
    border-radius: 50%;
    left: 0px;
    background-color: rgb(255, 255, 255);
  }

  .message,
  .signin {
    font-size: 14.5px;
    color: rgba(255, 255, 255, 0.7);
  }

  .signin {
    text-align: center;
  }

  .signin a:hover {
    text-decoration: underline royalblue;
  }

  .signin a {
    color: #00bfff;
  }

  .flex {
    display: flex;
    width: 100%;
    gap: 6px;
  }

  .form label {
    position: relative;
  }

  .form label .input {
    background-color: #333;
    color: #fff;
    width: 100%;
    padding: 20px 05px 05px 10px;
    outline: 0;
    border: 1px solid rgba(105, 105, 105, 0.397);
    border-radius: 10px;
  }

  .form label .input + span {
    color: rgba(255, 255, 255, 0.5);
    position: absolute;
    left: 10px;
    top: 0px;
    font-size: 0.9em;
    cursor: text;
    transition: 0.3s ease;
  }

  .form label .input:placeholder-shown + span {
    top: 1.5px;
    font-size: 0.8em;
  }

  .form label .input:focus + span,
  .form label .input:valid + span {
    color: rgb(255, 255, 255);
    top: 0px;
    font-size: 0.7em;
    font-weight: 600;
  }

  .input {
    font-size: medium;
  }

  .submit {
    border: none;
    outline: none;
    padding: 10px;
    border-radius: 10px;
    color: #fff;
    font-size: 16px;
    transform: 0.3s ease;
    background-color: rgb(255, 255, 255);
    color: black;
  }

  .submit:hover {
    background-color: rgba(229, 229, 229, 0.59);
  }

  @keyframes pulse {
    from {
      transform: scale(0.9);
      opacity: 1;
    }

    to {
      transform: scale(1.8);
      opacity: 0;
    }
  }

  /* Overlay style for OTP input */
  .overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.6);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 100;
  }

  .overlay-content {
    background-color: #1a1a1a;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.5);
    display: flex;
    flex-direction: column;
    gap: 10px;
    max-width: 350px;
  }
`;

export default FormSignup;


