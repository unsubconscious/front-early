import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import { FaUserCircle } from 'react-icons/fa'; // Using react-icons for the account circle icon

const UserInfo = () => {
  return (
    <Dropdown align="end">
      <Dropdown.Toggle variant="link" id="dropdown-basic">
        <FaUserCircle size={30} />
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item href="#/action-1">내 정보</Dropdown.Item>
        <Dropdown.Item href="#/action-2">장바구니</Dropdown.Item>
        <Dropdown.Item href="#/action-3">포인트</Dropdown.Item>
        <Dropdown.Item href="#/action-4">쿠폰</Dropdown.Item>
        <Dropdown.Item href="#/action-5">찜한 가게</Dropdown.Item>
        <Dropdown.Item href="#/action-6">결재 내역</Dropdown.Item>
        <Dropdown.Item href="#/action-7">리뷰관리</Dropdown.Item>
        <Dropdown.Item href="#/action-8">고객센터</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default UserInfo;
