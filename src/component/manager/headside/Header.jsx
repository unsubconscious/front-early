import React from 'react';
import { Navbar, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
const Header = () => {
    return (
        <Navbar bg="dark" variant="dark">
            <Container>
                <Navbar.Brand><Link to='/'>Admin Dashboard</Link></Navbar.Brand>
            </Container>
        </Navbar>
    );
};

export default Header;