import React from 'react';
import { Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const Sidebar = () => {

    return (
        <Nav defaultActiveKey="/dashboard" className="flex-column bg-light" style={{ height: '100vh', padding: '10px' }}>
            <LinkContainer to="/ManagerApprove">
                <Nav.Link>업체승인하기</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/ManagerShopleave">
                <Nav.Link>악덕 업체 퇴출</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/ManagerUserblock">
                <Nav.Link>악성 이용자 차단</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/ManagerOrderReceipt">
                <Nav.Link>주문내역</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/ManagerRevenue">
                <Nav.Link>매출내역</Nav.Link>
            </LinkContainer>
            {/* Add more links as needed */}
        </Nav>
    );
};

export default Sidebar;