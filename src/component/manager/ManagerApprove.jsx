import React from 'react';
import ManagerApproveList from './ManagerApproveList';

const ManagerApprove = () => {

    //요청 받아서 목록 받아오고 이걸전개 한다 
    return (
        <div>
            <h1>업체 승인 목록</h1>
            <ManagerApproveList /> 
        </div>
    );
};

export default ManagerApprove;