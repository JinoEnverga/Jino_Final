import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import { API_ENDPOINT } from './Api';

function Register() {
    const navigate = useNavigate();

    const [fullname, setFullname] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        try {
            const response = await axios.post(`${API_ENDPOINT}/auth/register`, {
                fullname,
                username,
                password,
            });

            setError('');
            setSuccess('Registration successful! Redirecting to login...');

            // Redirect to login after a short delay
            setTimeout(() => navigate('/login'), 2000);
        } catch (error) {
            console.error('Registration error:', error);
            setError('Failed to register. Please try again.');
        }
    };

    return (
        <>
            {/* Background Image */}
            <div 
                style={{
                    backgroundImage: `url('public/Pictures/BG.png')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    minHeight: '100vh',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
            >
                {/* Registration Form */}
                <div className="w-100" style={{ maxWidth: '400px' }}>
                    <div className="text-center mb-4">
                        <h5>Register to Read all you want!!!</h5>
                    </div>
                    <div className="card p-4 shadow-sm rounded">
                        <Form onSubmit={handleSubmit}>
                            <Form.Group controlId="formFullname" className="mb-3">
                                <Form.Label>Full Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter Full Name"
                                    value={fullname}
                                    onChange={(e) => setFullname(e.target.value)}
                                    required
                                />
                            </Form.Group>

                            <Form.Group controlId="formUsername" className="mb-3">
                                <Form.Label>Username</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter Username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    required
                                />
                            </Form.Group>

                            <Form.Group controlId="formPassword" className="mb-3">
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="Enter Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </Form.Group>

                            <Form.Group controlId="formConfirmPassword" className="mb-3">
                                <Form.Label>Confirm Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="Confirm Password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    required
                                />
                            </Form.Group>

                            {/* Error Message */}
                            {error && <p className="text-danger">{error}</p>}

                            {/* Success Message */}
                            {success && <p className="text-success">{success}</p>}

                            <Button variant="success" type="submit" className="w-100 mb-3">
                                Register Now
                            </Button>

                            {/* Back to Login Button */}
                            <Button
                                variant="outline-secondary"
                                type="button"
                                className="w-100"
                                onClick={() => navigate('/login')}
                            >
                                Back to Login
                            </Button>
                        </Form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Register;
