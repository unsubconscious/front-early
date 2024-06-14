import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';


const UserShopDetail = () => {
    const location = useLocation();
    const datas=location.state.data;
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            //상점아이디 넘기기 (메뉴 불러오기 위해서)
            try {
                const rs = await axios.get("http://localhost:8080/search/menuList", {
                    params: { id: datas.store_id}
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
    }, [datas]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;



    return (
        <div>
            <h3>{datas.store_name}</h3>
            <img  src={`/imgs/${datas.store_image}`} />

            {data.map(array=>(
            <div>
                <p>{array.menuName}</p>
                <img  src={`/imgs/${array.menuImage}`} />
                </div>

            ))}
        </div>
    );
};

export default UserShopDetail;