import axios from 'axios';
import React from 'react';
import { Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useNavigate } from 'react-router-dom';
const Sidebar = ({id}) => {

    const navigate = useNavigate();    
    const shoppMenu=async(e)=>{
        e.preventDefault()
        //아이디값을 넘겨서 그 아이디값의 상점 주인이 승인 되었는 확인하는 절차
    
        //상점 아이디값이 받아오는
        try {
            const rs = await axios.get("http://localhost:8080/store/menuRs", {
                params: { id: id }
            });
            if (rs.status === 200) {
                console.log(rs.data)
                if (rs.data != -1) {
                    navigate("/ShopMenu", { state: { approvalStatus: rs.data } });
                } else {
                    console.log("승인받지 못함");
                }
            }
        } catch (e) {
            console.log("연결실패", e);
        }}
    return (
        <Nav defaultActiveKey="/dashboard" className="flex-column bg-light" style={{ height: '100vh', padding: '10px' }}>
            <LinkContainer to="/ShopJoin">
                <Nav.Link>업체 등록</Nav.Link>
            </LinkContainer>
            <div onClick={shoppMenu}>
                <Nav.Link>메뉴 목록</Nav.Link>
            </div>
            <LinkContainer to="/manager-approve">
                <Nav.Link>댓글 관리</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/ShopOrder" state={{id:id}}>
            {/* <LinkContainer to="/ShopOrder" state={{id:email}}> */}
                <Nav.Link>주문</Nav.Link>
            </LinkContainer>
            {/* Add more links as needed */}
        </Nav>
    );
};

export default Sidebar;