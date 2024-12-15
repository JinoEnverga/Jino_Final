import React, { useEffect, useState } from 'react';
import { Button, Row, Col, Container, Card, ListGroup, Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

function Shopping() {
    const [cart, setCart] = useState([]);
    const [darkMode, setDarkMode] = useState(() => {
        // Initialize theme from localStorage or default to false
        return JSON.parse(localStorage.getItem('darkMode')) || false;
    });
    const [items] = useState([
        { id: 1, name: 'Oppo A3X', price: 4399, image: 'public/Mp1.png' },
        { id: 2, name: 'Infinix Note 30', price: 6599, image: 'public/Mp2.png' },
        { id: 3, name: 'Fico Pro Ultra', price: 23999, image: 'public/Lt.png' },
        { id: 4, name: 'M11 Turbo Fan', price: 678, image: 'public/M11_TurboFan.png' },
        { id: 5, name: 'Kawes Electric Guitar', price: 3456, image: 'public/Kawes_EG.png' },
        { id: 6, name: 'Xiomi TV A32', price: 8536, image: 'public/Xiomi_tva32.png' },
        { id: 7, name: 'Lipstick', price: 100, image: 'public/Lipstick.png' }
    ]);
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    const getToken = () => {
        const storedToken = localStorage.getItem('token');
        if (!storedToken) return null;

        try {
            const parsed = JSON.parse(storedToken);
            return parsed?.data?.token || parsed.token || storedToken;
        } catch {
            return storedToken;
        }
    };

    useEffect(() => {
        const fetchDecodedUserID = async () => {
            try {
                const token = getToken();
                if (!token) throw new Error('No token found');

                const decodedToken = jwtDecode(token);
                setUser(decodedToken);
            } catch (error) {
                console.error('Error decoding token:', error);
                navigate("/login");
            }
        };

        fetchDecodedUserID();
    }, [navigate]);

    const handleLogout = () => {
        try {
            localStorage.removeItem('token');
            navigate("/login");
        } catch (error) {
            console.error('Logout failed', error);
        }
    };

    const addToCart = (item) => {
        setCart([...cart, item]);
    };

    const removeFromCart = (item) => {
        setCart(cart.filter((cartItem) => cartItem.id !== item.id));
    };

    const totalPrice = cart.reduce((sum, item) => sum + item.price, 0);

    const toggleDarkMode = () => {
        setDarkMode((prevMode) => {
            const newMode = !prevMode;
            localStorage.setItem('darkMode', JSON.stringify(newMode));
            return newMode;
        });
    };

    return (
        <div className={darkMode ? 'dark-mode' : 'light-mode'}>
            <Navbar bg={darkMode ? 'dark' : 'light'} variant={darkMode ? 'dark' : 'light'}>
                <Container>
                    <Navbar.Brand href="/dashboard">JE.SHOP</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link href="/dashboard">Users</Nav.Link>
                        <Nav.Link href="/Shopping">Shopping</Nav.Link>
                    </Nav>
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ms-auto">
                            <Button variant={darkMode ? 'secondary' : 'dark'} onClick={toggleDarkMode}>
                                {darkMode ? 'Light Mode' : 'Dark Mode'}
                            </Button>
                            <NavDropdown title={user ? user.username : 'Dropdown'} id="basic-nav-dropdown" align="end">
                                <NavDropdown.Item href="#">Profile</NavDropdown.Item>
                                <NavDropdown.Item href="#">Settings</NavDropdown.Item>
                                <NavDropdown.Item href="#" onClick={handleLogout}>Logout</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <Container
                style={{
                    backgroundColor: darkMode ? '#343a40' : '#f8f9fa',
                    color: darkMode ? '#f8f9fa' : '#343a40',
                    padding: '20px',
                    borderRadius: '10px',
                    marginTop: '20px',
                }}
            >
                <h2 className="text-center mb-4" style={{ fontWeight: 'bold' }}>Shopping</h2>
                <Row>
                    <Col md={4} style={{ borderRight: '1px solid #dee2e6', padding: '0' }}>
                        <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                            <div style={{ padding: '15px', backgroundColor: darkMode ? '#495057' : '#e9ecef', fontWeight: 'bold', textAlign: 'center' }}>Your Cart</div>
                            <div style={{ flex: 1, height: '500px', overflowY: 'auto', padding: '15px' }}>
                                {cart.length > 0 ? (
                                    <>
                                        <ListGroup variant="flush">
                                            {cart.map((item, index) => (
                                                <ListGroup.Item
                                                    key={index}
                                                    style={{
                                                        display: 'flex',
                                                        justifyContent: 'space-between',
                                                        alignItems: 'center',
                                                        backgroundColor: darkMode ? '#495057' : '#fff',
                                                        color: darkMode ? '#f8f9fa' : '#000',
                                                    }}
                                                >
                                                    <span>{item.name}</span>
                                                    <div>
                                                        <span style={{ fontWeight: 'bold', marginRight: '10px' }}>₱{item.price}</span>
                                                        <Button
                                                            variant="danger"
                                                            size="sm"
                                                            onClick={() => removeFromCart(item)}
                                                        >
                                                            Remove
                                                        </Button>
                                                    </div>
                                                </ListGroup.Item>
                                            ))}
                                        </ListGroup>
                                        <div style={{ marginTop: '15px', fontWeight: 'bold', textAlign: 'center' }}>Total: ₱{totalPrice}</div>
                                    </>
                                ) : (
                                    <p style={{ color: '#868e96', fontStyle: 'italic', textAlign: 'center' }}>Your cart is empty.</p>
                                )}
                            </div>
                        </div>
                    </Col>
                    <Col md={8} style={{ padding: '0' }}>
                        <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                            <div style={{ padding: '15px', backgroundColor: darkMode ? '#495057' : '#e9ecef', fontWeight: 'bold', textAlign: 'center' }}>Available Items</div>
                            <div style={{ flex: 1, height: '500px', overflowY: 'auto', padding: '15px' }}>
                                <Row>
                                    {items.map((item) => (
                                        <Col key={item.id} md={6} lg={4} style={{ marginBottom: '20px' }}>
                                            <Card style={{ border: 'none', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', backgroundColor: darkMode ? '#495057' : '#fff', color: darkMode ? '#f8f9fa' : '#000' }}>
                                                <Card.Img
                                                    variant="top"
                                                    src={item.image}
                                                    alt={item.name}
                                                    style={{ height: '200px', objectFit: 'cover' }}
                                                />
                                                <Card.Body className="text-center">
                                                    <Card.Title>{item.name}</Card.Title>
                                                    <Card.Text>₱{item.price}</Card.Text>
                                                    <Button variant="primary" onClick={() => addToCart(item)}>Add to Cart</Button>
                                                </Card.Body>
                                            </Card>
                                        </Col>
                                    ))}
                                </Row>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default Shopping;
