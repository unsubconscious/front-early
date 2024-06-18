import React from 'react';

//상점 상세페이지에서 메뉴 부분
const UserShopDetailMenu = ({data,plus}) => {

    const clickButton=()=>{
        console.log(data)
        plus(data)
        
    }


    return (
        
        <div class="item-card" onClick={clickButton}>
            <div class="item-image">
                <img  src={`/imgs/${data.menuImage}`} width="70"/>
            </div>
            <div class="item-info">
                <p>{data.menuName}</p>
                <p>메뉴가격 : {data.menuPrice}</p>
            </div>
        </div>
    );
};

export default UserShopDetailMenu;