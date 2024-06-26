import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios"
import Header from '../commom/Header';
import Card from 'react-bootstrap/Card';

const Main = () => {
    const navigate = useNavigate();

    //연결테스트

    const onButtonClick=async(e) =>{
        e.preventDefault();

        try{
            const rs=await axios.get("http://localhost:8080/api/hello")
            console.log(rs.data)
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


            <button onClick={onButtonClick}>연결테스트</button>
            
        </div>
        </div>
    );
};

export default Main;