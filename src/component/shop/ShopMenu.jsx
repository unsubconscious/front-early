import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import ShopMenuList from './ShopMenuList';
import { Container, Row, Col } from 'react-bootstrap';
import Header from './headside/Header';
import Sidebar from './headside/Sidebar';
import { useContext } from "react";
import { AdminFlagContext } from "../../flag/Flag.jsx";

const ShopMenu = ({menu}) => {
    const {user,setUser,userId,setUserId,shopId,setShopid}=useContext(AdminFlagContext)
    const location = useLocation();
    //상점아이디
    const approvalStatus = location.state?.approvalStatus || -1;
    const navigate = useNavigate();
    const [menus, setMenus] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const rs = await axios.get("http://localhost:8080/store/menulist", {
                    params: { shopid: approvalStatus }
                });
                if (rs.status === 200) {
                    console.log(rs.data);
                    setMenus(rs.data);
                }
            } catch (e) {
                console.log("연결실패", e);
            }
        };

        fetchData();
    }, [approvalStatus]);

    const shopRS = (e) => {
        e.preventDefault();
        navigate("/ShopMenuRs", { state: { approvalStatus: approvalStatus } });
    };

    //하위 컴퍼넌트 삭제 메세지 넘길때 반영하기 위한

    const handleDelete = (menuName) => {
        setMenus((prevMenus) => prevMenus.filter(menu => menu.menuName !== menuName));
    };

    return (
        <div>

            <Header />
            <Container fluid>
                <Row>
                    <Col xs={2} id="sidebar-wrapper">
                        <Sidebar id={userId}/>
                    </Col>
                    <Col xs={10} id="page-content-wrapper">
                            <button onClick={shopRS}>메뉴추가하기</button>

                        {menus.reduce((acc, menu, index) => {
                            // Every 4th item or the first item, create a new container
                            if (index % 4 === 0) {
                                acc.push([]);
                            }
                            // Add the current menu item to the last container
                            acc[acc.length - 1].push(menu);
                            return acc;
                        }, []).map((menuGroup, groupIndex) => (
                            <div id="main_container" key={groupIndex}>
                                {menuGroup.map((menu, index) => (
                                    <ShopMenuList key={index} menu={menu} onDelete={handleDelete}/>
                                ))}
                            </div>
                        ))}

                    </Col>
                </Row>
            </Container>
 
        </div>
    );
};

export default ShopMenu;
