import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useLocation,useNavigate } from 'react-router-dom';
import UserMenuCa from './UserMenuCa';
import Header from '../commom/Header';
import './UserMenu.css'
import TabMenu from '../commom/TabMenu';
import { useContext } from "react";
import { AdminFlagContext } from "../../flag/Flag.jsx";
const UserSearchList = () => {
    const location = useLocation();
    const searchTerm = location.state?.searchTerm || -1;//검색정보
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const { user,user_x,setX,user_y,setY } = useContext(AdminFlagContext);
    const navigate = useNavigate();  

    useEffect(() => {
        if (!user_x) {
            alert("잘못된 접근입니다");
            navigate("/");
        }
    }, []);    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const rs = await axios.get("http://localhost:8080/search/searchList", {
                    params: {x:user_x,y:user_y,searchTerm:searchTerm}
                });
                setData(rs.data);
                console.log(rs.data)
            } catch (e) {
                setError("연결실패");
                console.log("연결실패", e);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [user_x,user_y,searchTerm]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;



    return (
        <div>
            <Header />
            <TabMenu />

            <div className="container-custom">
                <p className="store-count">음식점 <span className="pd3">{data.length}곳</span>을 찾았습니다.</p>
                <p className="superlist"><a href="#" className="badge badge-danger">SuperList</a></p>
                <div className="big-column row">
        {/* data.reduce(): data 배열을 사용하여 두 개씩의 항목을 그룹화합니다. 
        reduce() 함수는 초기값([])을 가진 누산기(acc) 배열을 반환합니다. da는 현재 요소, index는 인덱스를 나타냅니다. 
        index % 2 === 0 조건에 따라 새로운 배열을 acc에 추가하고, 그 배열에 현재 항목(da)을 추가합니다. */}
                    {data.reduce((acc, da, index) => {
                        if (index % 2 === 0) {
                            acc.push([]);
                        }
                        acc[acc.length - 1].push(da);
                        return acc;
                    }, []).map((itemGroup, groupIndex) => (
                        <div className="row" key={groupIndex}>
                            {itemGroup.map((item, index) => (
                                <div className="col-md-6 mb-4" key={index}>
                                    <Link to={`/UserShopDetail`} state={{ data: item }}>
                                        <UserMenuCa data={item} />
                                    </Link>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default UserSearchList;