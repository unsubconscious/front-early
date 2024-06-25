import React from 'react';
import { Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const Sidebar = () => {

    return (
        <Nav defaultActiveKey="/dashboard" className="flex-column bg-light" style={{ height: '100vh', padding: '10px' }}>
            <LinkContainer to="/RiderCall">
                <Nav.Link>콜받기</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/RiderOrder">
                <Nav.Link>진행중인 배달</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/manager-approve">
                <Nav.Link>완료내역</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/">
                <Nav.Link>총수익</Nav.Link>
            </LinkContainer>
            {/* Add more links as needed */}
        </Nav>
    );
};

export default Sidebar;