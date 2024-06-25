import React, { useState, useEffect, useContext } from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Search from './Search';
import UserInfo from './UserInfo';
import { Link, useNavigate } from 'react-router-dom';
import { AdminFlagContext } from "../../flag/Flag.jsx";
import axios from 'axios';


const Header = () => {


    const { user,setUser,userDate,setUserDate,userId,setUserId,shopId,setShopid,user_x,setX,user_y,setY,userInfo,setUserInfo} = useContext(AdminFlagContext);
    const navigate = useNavigate();  

    
    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/api/userinfo', {
                    headers: {
                        Authorization: `Bearer ${user}`
                    }
                });
                console.log(response.data);
                setUserId(response.data.user_id)
                setUserInfo(response.data)
            } catch (error) {
                console.log(error);
            }
        };
        if(user!=null){

        fetchUserInfo();}
    }, [user]);
    
    const userlogin=(e)=>{
        e.preventDefault()
        navigate("/UserLogin")

    }

    const userjoin=(e)=>{
        e.preventDefault()
        navigate("/UserJoin")

    }

    const userlogout=(e)=>{
        e.preventDefault()
        setUser(null)
        window.location.href = "/";

    }


    return (
        
        <Navbar expand="xl" className="navbar">
            <Container>
                <Link to="/"><h2>Delivery.Oracle</h2></Link>

                <Search/>
                <Form className="d-flex">
                    {user==null&&
                    <div>
                    <Button onClick={userlogin}>로그인</Button>
                    <Button onClick={userjoin}>회원가입</Button></div>}
                    {user&& <Button onClick={userlogout}>로그아웃</Button>}
                </Form>
                {user&&
                <UserInfo />}
            </Container>


        </Navbar >

    );
};

export default Header;