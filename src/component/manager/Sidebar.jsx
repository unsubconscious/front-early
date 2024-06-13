import React from 'react';
import { Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const Sidebar = () => {
    return (
        <Nav defaultActiveKey="/dashboard" className="flex-column bg-light" style={{ height: '100vh', padding: '10px' }}>
            <LinkContainer to="/dashboard">
                <Nav.Link>Dashboard</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/manager-main">
                <Nav.Link>Manager Main</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/manager-approve">
                <Nav.Link>Manager Approve</Nav.Link>
            </LinkContainer>
            {/* Add more links as needed */}
        </Nav>
    );
};

export default Sidebar;