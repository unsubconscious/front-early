import React, { useEffect, useState, useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import Nav from 'react-bootstrap/Nav';
import 'bootstrap/dist/css/bootstrap.min.css';
import { AdminFlagContext } from "../../flag/Flag.jsx";
import TabMenu from '../commom/TabMenu.jsx';
import Header from '../commom/Header.jsx';

const UserShopIntroduce = () => {
    const location = useLocation();
    const datas = location.state.data || -1;
    const { user } = useContext(AdminFlagContext);
    const apiKey = "d75de8ff5686d9730ec2b1a409f5b7a6";

    // 카카오 API 호출
    useEffect(() => {
      const script = document.createElement("script");
      script.async = true;
      script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${apiKey}&autoload=false`;
      document.head.appendChild(script);

      script.addEventListener("load", () => {
        window.kakao.maps.load(() => {
          const container = document.getElementById("map");
          const options = {
            center: new window.kakao.maps.LatLng(datas.store_y, datas.store_x), // 초기 중심 좌표 (위도, 경도)
            level: 3, // 지도 확대 레벨
          };
          const map = new window.kakao.maps.Map(container, options);

          // 마커가 표시될 위치입니다 
          const markerPosition = new window.kakao.maps.LatLng(datas.store_y, datas.store_x);

          // 마커를 생성합니다
          const marker = new window.kakao.maps.Marker({
            position: markerPosition
          });

          // 마커가 지도 위에 표시되도록 설정합니다
          marker.setMap(map);
        });
      });
    }, [datas]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/api/userinfo', {
                    headers: {
                        Authorization: `Bearer ${user}`
                    }
                });
                console.log(response.data);
                console.log(response.data.user_id);

            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, [user]);

    return (
        <div>
            <Header />
            <TabMenu />
            <div className='mv'>
                <div className="container">
                    <div className="left-sections">
                        <div className="section" id="a">
                            <div className="item-card">
                                <div className="item-image">
                                    <img src={`/imgs/${datas.store_image}`} width="70" alt="Store" />
                                </div>
                                <div className="item-info">
                                    <p>{datas.store_name}</p>
                                </div>
                            </div>
                        </div>
                        <div className="section" id="b">
                            <Nav fill variant="tabs" defaultActiveKey="/home">
                                <Nav.Item>
                                    <Nav.Link href="#"><Link to={`/UserShopDetail`} state={{ data: datas }}>메뉴</Link></Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="link-1"><Link to={`/UserShopComment`} state={{ data: datas }}>댓글</Link></Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="link-2"><Link to={`/UserShopIntroduce`} state={{ data: datas }}>매장소개</Link></Nav.Link>
                                </Nav.Item>
                            </Nav>
                            <div>
                                <p><strong>설명:</strong> {datas.store_description}</p>
                                <p><strong>주소:</strong> {datas.store_address}</p>
                                <div id="map" style={{ width: "100%", height: "400px" }}></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserShopIntroduce;
