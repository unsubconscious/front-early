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
    //현재로그인한 아이디
    const [userDate,setUserDate]=useState("")
    //상점아이디
    const {user,setUser,userId,setUserId,shopId,setShopid}=useContext(AdminFlagContext)
    //쿠키에 저장된 jwt를 기반으로 아이디값 받아오기
    useEffect(() => {
        const fetchUserInfo = async () => {

            const token = user
            console.log(token)
            console.log("jwt 불러오는 중")
            try {
                const response = await axios.get('http://localhost:8080/api/api/userinfo', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                console.log(response.data);
                console.log(response.data.user_id);
                // setUserDate(response.data.user_id)
                //유저아이디를 플래그에 저장
                setUserId(response.data.user_id)
            } catch (error) {
                console.log(error);
            }
        };

        fetchUserInfo();
    }, [user]);
    
    const shopjoin=(e)=>{
    e.preventDefault()
    if(userDate){
        navigate("/ShopJoin",{state : {id:userId}})
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
            params: { id: userId }
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
    

            navigate("/ShopOrder", {state : {id:userId}})




}
    return (
        <div>
                
            <Header />
            <Container fluid>
                <Row>
                    <Col xs={2} id="sidebar-wrapper">
                        <Sidebar id={userId}/>
                    </Col>
                    <Col xs={10} id="page-content-wrapper">
                  

                    </Col>
                </Row>
            </Container>


        </div>
    );
};

export default ShopMain;