import axios from 'axios';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const ShopMenu = () => {
    const navigate=useNavigate()


    //메뉴 추가버튼 누르기전에 현재 업체가 승인 되었는지 먼전 확인하는 절차 완성하기
    //아이디값을 넘겨서 그 아이디값의 상점 주인이 승인 되었는 확인하는 절차

    const shopRS = async (e) => {
        e.preventDefault();
        try {
            const rs = await axios.get("http://localhost:8080/store/menuRs", {
                params: { id: 3 }
            });
            if (rs.status === 200) {
                console.log(rs.data)
                if (rs.data != -1) {
                    navigate("/ShopMenuRs", { state: { approvalStatus: rs.data } });
                } else {
                    console.log("승인받지 못함");
                }
            }
        } catch (e) {
            console.log("연결실패", e);
        }
    };
    
    return (
        <div>
            <button onClick={shopRS}>메뉴추가하기</button>
        </div>
    );
};

export default ShopMenu;