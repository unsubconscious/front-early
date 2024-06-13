import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import Header from './Header';
import Dashboard from './Dashboard';
import Sidebar from './Sidebar';

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
                        <div style={{ padding: '20px' }}>
                            <button onClick={approve} style={{ padding: '10px 20px', fontSize: '16px', cursor: 'pointer' }}>
                                업체 승인하기
                            </button>
                            <Dashboard />
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default ManagerMain;