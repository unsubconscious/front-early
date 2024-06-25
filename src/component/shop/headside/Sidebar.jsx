import axios from 'axios';
import React, { useEffect } from 'react';
import { Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useContext } from "react";
import { AdminFlagContext } from "../../../flag/Flag.jsx"
const Sidebar = () => {
    const {user,setUser,userId,setUserId,shopId,setShopid}=useContext(AdminFlagContext)

    const navigate = useNavigate(); 
    useEffect(() => {
        //상점아이디를 플래그 에 저장하는 파트 
        const fetchData = async () => {
            try {
                const rs = await axios.get("http://localhost:8080/store/menuRs", {
                    params: { id: userId }
                });
                if (rs.status === 200) {
                    console.log(rs.data)
                    if (rs.data != -1) {
                        setShopid(rs.data)
                    } else {
                        console.log("승인받지 못함");
                    }
                }
            } catch (e) {
                console.log("연결실패", e);
            }} 
        
        if(userId){

        fetchData();}
    }, [userId]); 
    

    const shoppMenu=async(e)=>{
        e.preventDefault()
        //아이디값을 넘겨서 그 아이디값의 상점 주인이 승인 되었는 확인하는 절차
    
        //상점 아이디값이 받아오는
        try {
            const rs = await axios.get("http://localhost:8080/store/menuRs", {
                params: { id: userId }
            });
            if (rs.status === 200) {
                console.log(rs.data)
                if (rs.data != -1) {
                    setShopid(rs.data)
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
            <LinkContainer to="/ShopOrder">
                <Nav.Link>현재 주문상태</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/ShopOrderReceipt">
                <Nav.Link>주문내역</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/ShopRevenue">
                <Nav.Link>매출내역</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/ShopEdit">
                <Nav.Link>업체관리</Nav.Link>
            </LinkContainer>

        </Nav>
    );
};

export default Sidebar;