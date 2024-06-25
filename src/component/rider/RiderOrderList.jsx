import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import { useContext } from "react";
import { AdminFlagContext } from "../../flag/Flag.jsx";
const RiderOrderList = ({ order, handleOrder, keyProp }) => {
  const navigate = useNavigate();   
  const { user, user_x, setX, user_y, setY } = useContext(AdminFlagContext);
  const apiKey = "d75de8ff5686d9730ec2b1a409f5b7a6";

  useEffect(() => {
      if (!user) {
          alert("로그인해주세요");
          navigate("/");
      }
  }, [user, navigate]);

  useEffect(() => {
      const script = document.createElement("script");
      script.async = true;
      script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${apiKey}&autoload=false`;
      document.head.appendChild(script);

      script.addEventListener("load", () => {
          window.kakao.maps.load(() => {
              const container = document.getElementById(`${keyProp}map`);
              const options = {
                  center: new window.kakao.maps.LatLng(user_y, user_x),
                  level: 7,
              };
              const map = new window.kakao.maps.Map(container, options);
              const imageSrc = "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png";
              
              const markerPosition = new window.kakao.maps.LatLng(order.store_y, order.store_x);
              const positions = [
                  {
                      title: '가게',
                      latlng: new window.kakao.maps.LatLng(order.store_y, order.store_x)
                  },
                  {
                      title: '주문자',
                      latlng: new window.kakao.maps.LatLng(order.user_y, order.user_x)
                  }
              ];

              for (let i = 0; i < positions.length; i++) {
                  const imageSize = new window.kakao.maps.Size(24, 35);
                  const markerImage = new window.kakao.maps.MarkerImage(imageSrc, imageSize);
                  const marker = new window.kakao.maps.Marker({
                      map: map,
                      position: positions[i].latlng,
                      title: positions[i].title,
                      image: markerImage
                  });
                  marker.setMap(map);
              }

              const userMarker = new window.kakao.maps.Marker({
                  position: new window.kakao.maps.LatLng(order.user_y, order.user_x)
              });
              userMarker.setMap(map);
          });
      });

      return () => {
          document.head.removeChild(script); // 컴포넌트가 언마운트될 때 스크립트 제거
      };
  }, [order, user_x, user_y, keyProp]); // keyProp도 의존성 배열에 추가

  return (
      <div>
          <Card style={{ width: '25rem' }}>
              <Card.Body>
                  <Card.Title>가게이름 : {order.storeName}</Card.Title>
                  <Card.Text>가게까지 거리: {order.distanceToStore}km</Card.Text>
                  <Card.Text>가게에서 주문자 거리: {order.distanceToUser}km</Card.Text>
                  <Card.Text>배달가격: {order.deliveryPrice}</Card.Text>
                  <div id={`${keyProp}map`} style={{ width: "100%", height: "400px" }}></div>
                  <Button variant="primary" onClick={() => handleOrder(order)}>완료</Button>
              </Card.Body>
          </Card>
      </div>
  );
};


export default RiderOrderList;