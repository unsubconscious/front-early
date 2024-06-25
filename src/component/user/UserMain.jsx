import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../commom/Header';
import { useContext } from "react";
import { AdminFlagContext } from "../../flag/Flag.jsx";
const UserMain = () => {
  const {user_x,setX,user_y,setY}=useContext(AdminFlagContext)
    const [location, setLocation] = useState({ latitude: null, longitude: null });
    const [error, setError] = useState(null);

    
    const navigate = useNavigate();    
    const userlogin=(e)=>{
        e.preventDefault()
        navigate("/UserLogin")

    }

    const userjoin=(e)=>{
        e.preventDefault()
        navigate("/UserJoin")

    }

    //현재 위치 확인 기능 
    useEffect(() => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setLocation({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            });
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
      }, []);
    


    return (
        <div>
            <Header></Header>
            <button onClick={userlogin}>로그인</button>
            <button onClick={userjoin}>회원가입</button>

            <div id="main_container">

            <Link class="item-list " to={'/UserMenuCaList'}  state={{ca:1,y:location.latitude,x:location.longitude}}>
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

            <h1>User Location</h1>
      {error ? (
        <p>Error: {error}</p>
      ) : (
        <div>
          <p>Latitude Y: {location.latitude}</p>
          <p>Longitude X: {location.longitude}</p>
        </div>
      )}

        </div>
    );
};

export default UserMain;