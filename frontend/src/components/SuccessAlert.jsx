import React from 'react';

const SuccessAlert = ({ message, description, onClose }) => {
    return (
        <>
            <style>
                {`
                    .success-alert-container {
                        display: flex;
                        flex-direction: column;
                        gap: 10px;
                        width: 240px; /* Adjust as needed */
                        font-size: 10px;
                        position: relative;
                        z-index: 50;
                    }

                    .success-alert {
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                        width: 240%;
                        height: 80px;
                        background-color: #232531;
                        border-radius: 8px;
                        padding: 10px;
                    }

                    .success-alert-content {
                        display: flex;
                        gap: 10px;
                        align-items: center;
                    }

                    .success-icon {
                        color: #2b9875;
                        background: rgba(255, 255, 255, 0.05);
                        backdrop-filter: blur(10px);
                        padding: 5px;
                        border-radius: 8px;
                    }

                    .success-icon-svg {
                        width: 24px;
                        height: 24px;
                    }

                    .success-text {
                        color: white;
                        font-size : 13px ;
                    }

                    .success-message {
                        margin: 0;
                        font-weight: bold;
                        font-size : 15px ;
                    }

                    .success-description {
                        margin: 0;
                        color: gray;
                    }

                    .success-close-button {
                        background: none;
                        border: none;
                        color: gray;
                        padding: 5px;
                        border-radius: 4px;
                        cursor: pointer;
                        transition: background-color 0.3s;
                    }

                    .success-close-button:hover {
                        background: rgba(255, 255, 255, 0.05);
                    }

                    .success-close-icon {
                        width: 24px;
                        height: 24px;
                    }
                `}
            </style>

            <div className="success-alert-container">
                <div className="success-alert">
                    <div className="success-alert-content">
                        <div className="success-icon">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="success-icon-svg"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M4.5 12.75l6 6 9-13.5"
                                ></path>
                            </svg>
                        </div>
                        <div className="success-text">
                            <p className="success-message">{message || 'Done successfully :)'}</p>
                            <p className="success-description">{description || 'This is the description section'}</p>
                        </div>
                    </div>
                    <button className="success-close-button" onClick={onClose}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="success-close-icon"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M6 18L18 6M6 6l12 12"
                            ></path>
                        </svg>
                    </button>
                </div>
            </div>
        </>
    );
};

export default SuccessAlert;
