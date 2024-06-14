import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import UserMenuCa from './UserMenuCa';

const UserMenuCaList = () => {
    const location = useLocation();
    const caInfo = location.state?.ca;
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const rs = await axios.get("http://localhost:8080/search/CaList", {
                    params: { canum: caInfo }
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
    }, [caInfo]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div class="main_container">
        <div class="form_container">
            {/* Render your data here {item.store_name} */}
            {data && data.map(item => (
                <Link to={`/UserShopDetail`} state={{data:item}}> <UserMenuCa  data={item}></UserMenuCa></Link>
            ))}
        </div>
        </div>
    );
};

export default UserMenuCaList;
