import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AdminFlagContext } from "../../flag/Flag.jsx";
import { Card } from 'react-bootstrap';
import Header from '../commom/Header.jsx';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';

const MypageDetailsList = ({ order }) => {
    const navigate = useNavigate();
    let orderDetailsArray = [];
    try {
        orderDetailsArray = JSON.parse(order.orderDetails);
    } catch (e) {
        console.error("orderDetails가 유효한 JSON 배열이 아닙니다:", e);
        // JSON 변환 실패 시, menu.orderDetails를 단일 문자열로 처리
        orderDetailsArray = [order.orderDetails];
    }

    const cleanOrderDetails = orderDetailsArray.map((detail, index) => {
        if (typeof detail === 'string') {
            return detail.replace(/[\\{}[\]"]/g, "");
        } else if (typeof detail === 'object' && detail !== null) {
            // 객체일 경우, 모든 키-값 쌍을 문자열로 결합
            return Object.entries(detail).map(([key, value]) => `${key}: ${value}`).join(", ");
        } else {
            console.error("detail이 문자열이나 객체가 아닙니다:", detail);
            return ""; // 알 수 없는 형식인 경우 빈 문자열 반환
        }
    });

    // 리뷰 페이지 이동
    const comment = (e) => {
        e.preventDefault();
        navigate("/MypageComments", { state: { cleanOrderDetails: JSON.stringify(cleanOrderDetails) ,order:order} });
    }

    const but=(e)=>{
        e.preventDefault();
    }

    return (
        <div>
            <Card key={order.orderId} style={{ width: '40rem', margin: 'auto', marginBottom: '20px' }}>
                <Card.Img variant="top" src={`/imgs/${order.storeImage}`} style={{ width: '5rem', aspectRatio: '1/1', margin: 'auto' }} />
                <Card.Body>
                    <div key={order.orderId}>
                        <p><strong>가게이름:</strong> {order.storeName}</p>
                        <p style={{
                            margin: 'auto',
                            width: '20rem',
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis'
                        }}><strong>주문내용:</strong> {cleanOrderDetails.join(", ")}</p>
                        <p><strong>가격:</strong> {order.totalPrice}</p>
                        <p><strong>주문날짜:</strong> {order.orderDate}</p>
                        <hr />
                        {order.orderApprovalStatus==4&&
                        <Button onClick={comment}>리뷰쓰기</Button>}
                        {order.orderApprovalStatus==5&&
                        <Button onClick={but}>주문이 거절 되었습니다.</Button>}
                        {order.orderApprovalStatus==3&&
                        <Button onClick={but}>배달중입니다.</Button>}
                        {order.orderApprovalStatus==2&&
                        <Button onClick={but}>라이더 배정중입니다.</Button>}
                          {order.orderApprovalStatus==1&&
                        <Button onClick={but}>조리중</Button>}
                        {order.orderApprovalStatus==0&&
                        <Button onClick={but}>음식점에서 주문확인중</Button>}
                    </div>
                </Card.Body>
            </Card>
        </div>
    );
};

export default MypageDetailsList;