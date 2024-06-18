import React from 'react';
import ManagerApproveList from './ManagerApproveList';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import Header from './headside/Header';
import Dashboard from './headside//Dashboard';
import Sidebar from './headside//Sidebar';

const ManagerApprove = () => {

    //요청 받아서 목록 받아오고 이걸전개 한다 
    return (
        <div>
            <Header />
            <Container fluid>
                <Row>
                    <Col xs={2} id="sidebar-wrapper">
                        <Sidebar />
                    </Col>
                    <Col xs={10} id="page-content-wrapper">
                    <h1>업체 승인 목록</h1>
                    <ManagerApproveList /> 
    

                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default ManagerApprove;