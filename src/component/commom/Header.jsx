import React from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const Header = () => {
    return (
        
        <Navbar expand="xl" className="navbar">
            <Container>
                <p>배달</p>
                <Form className="d-flex">
                  <Form.Control
                    type="search"
                    placeholder="Search"
                    className="me-2"
                    aria-label="Search"
                  />
                <Button variant="outline-success">Search</Button>
                </Form><p>로그인</p>
            </Container>


        </Navbar >

    );
};

export default Header;