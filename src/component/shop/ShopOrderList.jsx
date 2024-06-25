import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';


const ShopOrderList = ({ menu }) => {
    let orderDetailsArray = [];
    const[st,setSt]=useState(false)
    const[refuses,setrefuse]=useState(false)

    try {
        orderDetailsArray = JSON.parse(menu.orderDetails);
    } catch (e) {
        console.error("orderDetails가 유효한 JSON 배열이 아닙니다:", e);
        // JSON 변환 실패 시, menu.orderDetails를 단일 문자열로 처리
        orderDetailsArray = [menu.orderDetails];
    }

    const cleanOrderDetails = orderDetailsArray.map(detail => {
        if (typeof detail === 'string') {
            return detail.replace(/[\\{}[\]"]/g, "");
        } else if (typeof detail === 'object' && detail !== null) {
            // 객체일 경우, 모든 키-값 쌍을 문자열로 결합
            return Object.entries(detail).map(([key, value]) => `${key}: ${value}`).join(", ");
        } else {
            console.error("detail이 문자열이나 객체가 아닙니다:", detail);
            return ""; // 알 수 없는 형식인 경우 빈 문자열 반환
        }
    }).join(", ");

    //배달기사 배정하기 2부여
    const ondeliver= async(e)=>{
        e.preventDefault();

        if(menu.orderApprovalStatus==1){
            try{
                const rs=await axios.get("http://localhost:8080/store/rider",{params:{orderId:menu.orderId}})
                if(rs.data!=-1){
                    console.log("라이더배정중")
                    menu.orderApprovalStatus=2;
                    setSt(false)
                }
                
            }
             catch (e) {
                    console.log("연결실패", e);
            }
            }

    }

    //주문거절은 3부여 
    const refuse= async(e)=>{
        e.preventDefault();
        //주문상태가 0 일경우에만
        if(menu.orderApprovalStatus==0){
            try{
                const rs=await axios.get("http://localhost:8080/store/refuse",{params:{orderId:menu.orderId}})
                if(rs.data!=-1){
                    setrefuse(true)
                    menu.orderApprovalStatus=5
                }
                
            }
             catch (e) {
                    console.log("연결실패", e);
            }
            }

    }
    //조리중
    const cook= async(e)=>{
        e.preventDefault();
        //주문상태가 0 일경우에만
        if(menu.orderApprovalStatus==0){
            try{
                const rs=await axios.get("http://localhost:8080/store/cook",{params:{orderId:menu.orderId}})
                if(rs.data!=-1){
                    console.log("조리하기")
                    menu.orderApprovalStatus=1;
                    setSt(true)
                }
                
            }
             catch (e) {
                    console.log("연결실패", e);
            }
            }

    }

    return (
        <Card style={{ width: '18rem' }}>
            <Card.Body>
            <Card.Title>고객 아이디:{menu.customerId}</Card.Title>
                <Card.Title>{cleanOrderDetails}</Card.Title>
                <Card.Text>
                    Price: {menu.totalPrice}
                </Card.Text>
                {/* <Button variant="primary" onClick={ondeliver}>
                    {(st || menu.orderApprovalStatus !== 0 )? '배달중' : '배달'}
                    </Button>
                <Button variant="primary" onClick={refuse}> {(menu.orderApprovalStatus !== 0 )? '불가' : '거절'}</Button>
             */}
            { menu.orderApprovalStatus==0 && <div> 
                <Button variant="primary" onClick={cook}>
                    조리하기</Button>
                <Button variant="primary" onClick={refuse}> 거절</Button>
            </div>}
            { menu.orderApprovalStatus==1 && <div> 
                <Button variant="primary" onClick={ondeliver}>
                    라이더배정하기</Button>
            </div>}
            { menu.orderApprovalStatus==2 && <div> 
                <Button variant="primary">
                    라이더 배정중</Button>
            </div>}
            { menu.orderApprovalStatus==3 && <div> 
                <Button variant="primary">
                    배달중</Button>
            </div>}
            { menu.orderApprovalStatus==5 && <div> 
                <Button variant="primary" onClick={refuse}> 거절됨</Button>
            </div>}
            </Card.Body>
        </Card>
    );
};

export default ShopOrderList;

