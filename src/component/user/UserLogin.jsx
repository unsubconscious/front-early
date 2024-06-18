import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../apis/api.js'
import * as auth from '../../apis/auth.js';
import { useContext } from "react";
import { AdminFlagContext } from "../../flag/Flag.jsx";
import { useCookies } from 'react-cookie';
const UserLogin = () => {
    const {user,setUser}=useContext(AdminFlagContext)
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const [cookies, setCookie] = useCookies(['jwtToken']);
    const loginClick = async(e) => {
        e.preventDefault();


        const rs=await auth.login(email,password)
        const data=rs.data
        const headers=rs.headers
        console.log(headers.authorization.replace("Bearer ",""))
        if (rs.status==200){

            //토큰으로 저장
            // setCookie('jwtToken', headers.authorization.replace("Bearer ",""), { path: '/', maxAge: 100 }); // 쿠키 유효 기간을 설정
            //플래그에 유저 인증 jwt 토큰 저장
            setUser(headers.authorization.replace("Bearer ",""))

            navigate("/")
        }


    }

    return (
        <div>
            <div id="main_container">
                <div className="form_container">
                    <div className="form">
                        <form action="#">
                            <p className="login_user_name">
                                <label htmlFor="user_name">사용자명:</label>
                                <input type="text" id="user_name" onChange={(e) => setEmail(e.target.value)} />
                            </p>

                            <p className="login_user_password">
                                <label htmlFor="user_password">비밀번호:</label>
                                <input type="password" id="user_password" onChange={(e) => setPassword(e.target.value)} />
                            </p>

                            <input type="submit" id="submit_btn" value="로그인" className="submit_btn" onClick={loginClick} />
                        </form>
                    </div>

                    <div className="bottom_box">
                        <div>
                            <span>아이디가 없으신가요?</span><a href="#">회원가입</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserLogin;
