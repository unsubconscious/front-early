import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const UserJoin = () => {
    const navigate=useNavigate()
    const emailPass=true

    const [name,setName] = useState("")
    const [email,setEmail] = useState("")
    const [password,setPassword]=useState("")



    //회원가입
    const joinClick= (e) => {
        e.preventDefault();
       axios.post("/user/join/~~",{
            name:name,
            password:password,
            email:email

        }).then(rs => {
            const response = rs.data;
            console.log("회원가입");

            // 회원가입 성공 여부 확인
            if (response == 1) {
                navigate('/');
            } else {
                alert("가입 실패");
            }
        }).catch(error => {
            console.log(error);
            alert("오류가 발생했습니다. 다시 시도해 주세요.");
        });


    }
    return (

    <div>
        <div id="main_container">
    
            <div class="form_container">
    
                <div class="form">
    
    
                    <form action="#">
                        <p class="user_name">
                            <label for="user_name">사용자명</label>
                            <input type="text" id="user_name" onChange={(e)=>setName(e.target.value)}/>
                        </p>

                        <p class="user_email">
                            <label for="user_email">이메일(id)</label>
                            <input type="email" id="user_email"  onChange={(e)=>setEmail(e.target.value)}/>
                        </p>

                    <button  class="submit_btn">이메일 인증하기</button>
                    {emailPass==true && <p class="login_user_password"> <label for="user_password">인증번호 확인:
                    </label><input type="text"  class="emailpass" /> <button  class="btn_con">확인</button></p>}
    
                        <p class="user_password">
                            <label for="user_password">비밀번호</label>
                            <input type="password" id="user_password" onChange={(e)=>setPassword(e.target.value)}/>
                        </p>
 
    
                        <input type="submit" id="submit_btn" value="회원가입" class="submit_btn" />
                    </form>
    
    
    
        </div>
 
    </div>
    
    </div>
                
            </div>
    );
};

export default UserJoin;