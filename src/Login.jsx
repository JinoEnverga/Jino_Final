import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {jwtDecode} from 'jwt-decode'; // Correct import for jwt-decode

const API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT;

function Login() {
    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    // Verify if there is an active session
    useEffect(() => {
        const verifySession = () => {
            const token = localStorage.getItem('token');
            if (token) {
                try {
                    const decoded = jwtDecode(token); // Decode token directly
                    if (decoded) {
                        navigate('/dashboard');
                    }
                } catch (err) {
                    console.error('Invalid token:', err.message);
                    localStorage.removeItem('token'); // Remove invalid token
                }
            }
        };

        verifySession();
    }, [navigate]);

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(`${API_ENDPOINT}/auth/login`, {
                username,
                password,
            });

            const { token } = response.data; // Extract token from response
            localStorage.setItem('token', token); // Store only the token
            setError('');
            navigate('/dashboard');
        } catch (error) {
            console.error('Login error:', error.response?.data || error.message);
            setError('Invalid username or password');
        }
    };

    // Navigate to Register Page
    const handleRegisterRedirect = () => {
        navigate('/register');
    };

    return (
        <div
            style={{
                backgroundImage: `url('public/BG.png')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <div className="w-100" style={{ maxWidth: '400px' }}>
                <div className="card p-4 shadow-sm rounded">
                    <Form onSubmit={handleSubmit}>
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

                        {error && <p className="text-danger">{error}</p>}

                        <Button variant="success" type="submit" className="w-100 mb-3">
                            Log in Now
                        </Button>

                        <Button
                            variant="outline-secondary"
                            type="button"
                            className="w-100"
                            onClick={handleRegisterRedirect}
                        >
                            Register Account
                        </Button>
                    </Form>
                </div>
            </div>
        </div>
    );
}

export default Login;
