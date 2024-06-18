import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { Container, Row, Col } from 'react-bootstrap';
import Header from './headside/Header';
import Sidebar from './headside/Sidebar';
import ShopJoin from './ShopJoin';
import ShopMenu from './ShopMenu';
import { useContext } from "react";
import { AdminFlagContext } from "../../flag/Flag.jsx";


const ShopMain = () => {
    const navigate = useNavigate();    
    //이것또한 나중에 아이디 값으로 조회해서 역할이 상점 주인일경우에만 넘어가도록 요청 api를 추가한다.
    const [cookies] = useCookies(['jwtToken']);
    const [userDate,setUserDate]=useState("")
    //상점아이디
    const[shopid,setShopid]=useState("")
    const {user,setUser}=useContext(AdminFlagContext)
    //쿠키에 저장된 jwt를 기반으로 아이디값 받아오기
    useEffect(() => {
        const fetchUserInfo = async () => {

            const token = user
            console.log(token)
            console.log("jwt 불러오는ㄴ")
            try {
                const response = await axios.get('http://localhost:8080/api/api/userinfo', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                console.log(response.data);
                console.log(response.data.user_id);
                setUserDate(response.data.user_id)
            } catch (error) {
                console.log(error);
            }
        };

        fetchUserInfo();
    }, [cookies]);
    
    const shopjoin=(e)=>{
    e.preventDefault()
    if(userDate){
        navigate("/ShopJoin",{state : {id:userDate}})
    }
    else{
        alert("로그인해주세요")
    }

    

    }

const shoppMenu=async(e)=>{
    e.preventDefault()
    //아이디값을 넘겨서 그 아이디값의 상점 주인이 승인 되었는 확인하는 절차

    //상점 아이디값이 받아오는
    try {
        const rs = await axios.get("http://localhost:8080/store/menuRs", {
            params: { id: userDate }
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

    const shopOrder=async(e)=>{
        e.preventDefault()
        //아이디값을 넘겨서 그 아이디값의 상점 주인이 승인 되었는 확인하는 절차
    
        //상점 아이디값이 받아오는
    

            navigate("/ShopOrder", {state : {id:userDate}})




}
    return (
        <div>
                
            <Header />
            <Container fluid>
                <Row>
                    <Col xs={2} id="sidebar-wrapper">
                        <Sidebar id={userDate}/>
                    </Col>
                    <Col xs={10} id="page-content-wrapper">
                        <div style={{ padding: '20px' }}>
                            <button onClick={shopjoin} style={{ padding: '10px 20px', fontSize: '16px', cursor: 'pointer' }}>업체등록하기</button>
                            <button onClick={shoppMenu} style={{ padding: '10px 20px', fontSize: '16px', cursor: 'pointer' }}>메뉴목록</button>
                            <tr/>
                            // 여기서는 등록이 되는데 사이드바에서는 등록이 안됨
                        </div>

                    </Col>
                </Row>
            </Container>
    
            <button onClick={shopOrder}>주문</button>

        </div>
    );
};

export default ShopMain;