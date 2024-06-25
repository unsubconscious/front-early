import React from 'react';
import { Navbar, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
const Header = () => {
    return (
        <Navbar bg="dark" variant="dark">
            <Container>
                <Navbar.Brand><Link to='/' style={{ textDecoration: 'none', color: 'inherit' }}>Rider Dashboard</Link></Navbar.Brand>
            </Container>
        </Navbar>
    );
};

export default Header;