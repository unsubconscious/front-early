import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Main from '../component/main/Main';
import UserMain from '../component/user/UserMain';
import ShopMain from '../component/shop/ShopMain';
import UserLogin from '../component/user/UserLogin';
import UserJoin from '../component/user/UserJoin';
import ShopJoin from '../component/shop/ShopJoin';
import ManagerMain from '../component/manager/ManagerMain';
import ManagerApprove from '../component/manager/ManagerApprove';
import ShopMenu from '../component/shop/ShopMenu';
import ShopMenuRs from '../component/shop/ShopMenuRs';
import ShopMenuList from '../component/shop/ShopMenuList';
import ShopMenuedit from '../component/shop/ShopMenuedit';
import UserMenuCaList from '../component/user/UserMenuCaList';
import UserShopDetail from '../component/user/UserShopDetail';
import ShopOrder from '../component/shop/ShopOrder';
const Path = () => {
    return (
        <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/UserMain" element={<UserMain />} />
            <Route path="/ShopMain" element={<ShopMain />} />
            <Route path="/UserLogin" element={<UserLogin />} />
            <Route path="/UserJoin" element={<UserJoin />} />
            <Route path="/ShopJoin" element={<ShopJoin />} />
            <Route path="/ManagerMain" element={<ManagerMain />} />
            <Route path="/ManagerApprove" element={<ManagerApprove />} />
            <Route path="/ShopMenu" element={<ShopMenu />} />
            <Route path="/ShopMenuRs" element={<ShopMenuRs />} />
            <Route path="/ShopMenuList" element={<ShopMenuList />} />
            <Route path="/ShopMenuedit" element={<ShopMenuedit />} />
            <Route path="/UserMenuCaList" element={<UserMenuCaList />} />
            <Route path="/UserShopDetail" element={<UserShopDetail />} />
            <Route path="/ShopOrder" element={<ShopOrder />} />
            
        </Routes>
        
            

    );
};

export default Path;