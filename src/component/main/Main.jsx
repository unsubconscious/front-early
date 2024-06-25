import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios"
import Header from '../commom/Header';
import Card from 'react-bootstrap/Card';
import { useContext } from "react";
import { AdminFlagContext } from "../../flag/Flag.jsx";
import { useCookies } from 'react-cookie';
import { useWebSocket  } from "../../flag/WebSocketContext.jsx";

const Main = () => {
    const navigate = useNavigate();
    const {user,setUser,userInfo, setUserInfo}=useContext(AdminFlagContext)
    // const [cookies] = useCookies(['jwtToken']);
    const { stompClient, messages, sendMessage ,setMessages} = useWebSocket();
   setMessages("")
    //유저인증테스트
    

    const onButtonClick=async(e) =>{
        e.preventDefault();
        // const token = cookies.jwtToken;
        const token = user;
        try{
            const response = await axios.get('http://localhost:8080/api/api/userinfo', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            console.log(response.data)
            console.log(response.data.user_id)
        
        }catch(error){
            console.log(error)
        }


    }

    //유저로그인 페이지이동 
    const userbutton=(e)=>{
        e.preventDefault()
         navigate("/UserMain")

    }

    //업체 페이지 이동
    const shopbutton=(e)=>{
        e.preventDefault()
       navigate("/ShopMain")

    }
    //관리자 페이지 이동

    const managerbutton=(e)=>{
        e.preventDefault()
       navigate("/ManagerMain")

    }

    //라이더 페이지이동
    const riderbutton=(e)=>{
        e.preventDefault()
       navigate("/RiderMain")

    }

    return (
        <div>

        <Header></Header>
        <div id="main_container">

        <div class="item-list " onClick={userbutton}>
            <div class="item ">
                <p class="item-maintext">유저 페이지</p>
            </div>
        </div>
        <div class="item-list" onClick={shopbutton}>
            <div class="item">
                <p class="item-maintext">업체 페이지</p>
            </div>
        </div>
        <div class="item-list" onClick={managerbutton}>
            <div class="item">
                <p class="item-maintext">관리자 페이지</p>
            </div>
        </div>

        <div class="item-list" onClick={riderbutton}>
            <div class="item">
                <p class="item-maintext">라이더 페이지</p>
            </div>
        </div>


            <button onClick={onButtonClick}>유저인증테스트</button>
            
        </div>
        </div>
    );
};

export default Main;