import React from 'react';

//카테고리 에서 업체 하나 정보 보여주는곳
const UserMenuCa = ({data}) => {
    return (
        <div class="item-card card01 row">
        <div class="item-image">
               <img  src={`/imgs/${data.store_image}`}  width="70" />
        </div>
        <div class="item-info">
            <p>{data.store_name}</p>
        </div>
         

        </div>
        
    );
};

export default UserMenuCa;