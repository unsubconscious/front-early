import React from 'react';
import { useNavigate } from 'react-router-dom';



const ShopMain = () => {
    const navigate = useNavigate();    
    //이것또한 나중에 아이디 값으로 조회해서 역할이 상점 주인일경우에만 넘어가도록 요청 api를 추가한다.
    const shopjoin=(e)=>{
    e.preventDefault()
    navigate("/ShopJoin")

    }

const shopRS=(e)=>{
    e.preventDefault()
    navigate("/ShopMenu")

}
    return (
        <div>
            <button onClick={shopjoin}>업체등록하기</button>
            <button onClick={shopRS}>메뉴목록</button>

        </div>
    );
};

export default ShopMain;