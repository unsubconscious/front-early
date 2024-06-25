import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import { useContext } from "react";
import { AdminFlagContext } from "../../flag/Flag.jsx";

const RiderCallList = ({ order, handleOrder }) => {
    const navigate = useNavigate();   
    const { user } = useContext(AdminFlagContext);
    
    useEffect(() => {
        if (!user) {
            alert("로그인해주세요");
            navigate("/");
        }
    }, [user, navigate]);

    return (
        <div>
            <Card style={{ width: '18rem' }}>
                <Card.Body>
                    <Card.Title>가게이름 : {order.storeName}</Card.Title>
                    <Card.Text>가게까지 거리: {order.distanceToStore}km</Card.Text>
                    <Card.Text>가게에서 주문자 거리: {order.distanceToUser}km</Card.Text>
                    <Card.Text>배달가격: {order.deliveryPrice}</Card.Text>
                    <Button variant="primary" onClick={() => handleOrder(order)}>수락</Button>
                </Card.Body>
            </Card>
        </div>
    );
};

export default RiderCallList;
