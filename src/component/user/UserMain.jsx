import React from 'react';
import { useNavigate } from 'react-router-dom';

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
        </div>
    );
};

export default UserMain;