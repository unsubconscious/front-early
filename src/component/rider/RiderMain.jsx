import React, { useEffect,useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import Header from './headside/Header';
import Sidebar from './headside/Sidebar';
import { useContext } from "react";
import { AdminFlagContext } from "../../flag/Flag.jsx";
import axios from 'axios';
const RiderMain = () => {
    const {user,setUser,userId,setUserId,shopId,setShopid,user_x,setX,user_y,setY}=useContext(AdminFlagContext)
    //jwt 아이디 저장한다.
    const navigate = useNavigate();    
    const [error, setError] = useState(null);
    useEffect(() => {
        if (!user){
            alert("로그인해주세요")
            navigate("/")
        }
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
                // console.log(response.data.user_id);
                // setUserDate(response.data.user_id)
                //유저아이디를 플래그에 저장
                setUserId(response.data.user_id)
            } catch (error) {
                console.log(error);
            }
        };
        //라이더 위치 조회
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
              (position) => {

                setX(position.coords.longitude)
                setY(position.coords.latitude)
                setError(null);
              },
              (error) => {
                setError(error.message);
              },
              {
                enableHighAccuracy: true,
                timeout: 5000,
                maximumAge: 0,
              }
            );
          } else {
            setError('Geolocation is not supported by this browser.');
          }

        fetchUserInfo();
    }, []);
     
    //콜받기에서는
    //주문 오더와 상점 정보를 기반으로 나와의 거리 상점과의 거리 값과 배달 비 받아온다.
    //오더 주문no,시킨사람아이디 이렇게 4개 받아온다. 
    //배달비도 보여준다.(서비스단에서) 계산 돌리자

    //주문내역확인
    //서로간의 거리와
    //배달비 를 받는다.


    return (
        <div>
         <Header />
            <Container fluid>
                <Row>
                    <Col xs={2} id="sidebar-wrapper">
                        <Sidebar/>
                    </Col>
                    <Col xs={10} id="page-content-wrapper">
 

                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default RiderMain;