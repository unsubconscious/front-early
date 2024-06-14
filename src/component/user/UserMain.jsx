import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const UserMain = () => {
    const navigate = useNavigate();    
    const userlogin=(e)=>{
        e.preventDefault()
        navigate("/UserLogin")

    }

    const userjoiin=(e)=>{
        e.preventDefault()
        navigate("/UserJoin")

    }


    return (
        <div>
            <button onClick={userlogin}>로그인</button>
            <button onClick={userjoiin}>회원가입</button>

            <div id="main_container">

            <Link class="item-list " to={'/UserMenuCaList'}  state={{ca:1}}>
                <div class="item ">
                    <p class="item-maintext">한식</p>
                </div>
            </Link>
            <div class="item-list" >
                <div class="item">
                    <p class="item-maintext">치킨</p>
                </div>
            </div>
            <div class="item-list" >
                <div class="item">
                    <p class="item-maintext">중국집</p>
                </div>
            </div>
                
            </div>
        </div>
    );
};

export default UserMain;