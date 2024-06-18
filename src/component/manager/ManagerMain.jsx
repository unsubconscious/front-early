import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import Header from './headside/Header';
import Dashboard from './headside/Dashboard';
import Sidebar from './headside/Sidebar';

const ManagerMain = () => {
    const navigate = useNavigate();    
    
    const approve=(e)=>{
        e.preventDefault()
        navigate("/ManagerApprove")
    }
    return (
        <div>
            <Header />
            <Container fluid>
                <Row>
                    <Col xs={2} id="sidebar-wrapper">
                        <Sidebar />
                    </Col>
                    <Col xs={10} id="page-content-wrapper">
 
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default ManagerMain;