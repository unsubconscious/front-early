import React from 'react';
import { ListGroup } from 'react-bootstrap';
import { Card } from 'react-bootstrap';

const ShopOrderList = ({ orders }) => {

    if (!orders || orders.length === 0) {
        return <p>배달매칭된 주문이 없습니다.</p>;
    }

    return (
        <ListGroup>
            {orders.map(order => {
                let orderDetailsArray = [];
                try {
                    orderDetailsArray = JSON.parse(order.order_details);
                } catch (e) {
                    console.error("order_details가 유효한 JSON 배열이 아닙니다:", e);
                    // JSON 변환 실패 시, order.order_details를 단일 문자열로 처리
                    orderDetailsArray = [order.order_details];
                }

                const cleanOrderDetails = orderDetailsArray.map((order_details, index) => {
                    if (typeof order_details === 'string') {
                        return order_details.replace(/[\\{}[\]"]/g, "");
                    } else if (typeof order_details === 'object' && order_details !== null) {
                        // 객체일 경우, 모든 키-값 쌍을 문자열로 결합
                        return Object.entries(order_details).map(([key, value]) => `${key}: ${value}`).join(", ");
                    } else {
                        console.error("detail이 문자열이나 객체가 아닙니다:", order_details);
                        return ""; // 알 수 없는 형식인 경우 빈 문자열 반환
                    }
                });

                return (
                    <div>
                        <Card key={order.order_id} style={{ width: '40rem', margin: 'auto', marginBottom: '20px' }}>
                            <Card.Body>
                                <h5><strong>Order ID:</strong> {order.order_id}</h5>
                                <p>고객정보 Username : {order.name}, 이메일(Id) : ({order.email})</p>
                                <p>주문정보: {cleanOrderDetails.join(", ")}</p>
                                <p>가격: {order.total_price}</p>
                            </Card.Body>
                        </Card>
                    </div>
                );
            })}
        </ListGroup>
    );
};

export default ShopOrderList;


// return (
//     <ListGroup>
//         {orders.map(order => (
//             <ListGroup.Item key={order.order_id}>
//                 <h5><strong>Order ID:</strong>{order.order_id}</h5>
//                 <p>고객정보: {order.name} ({order.email})</p>
//                 <p>주문정보: {cleanOrderDetails.join(", ")}</p>
//                 <p>가격: {order.total_price}</p>
//             </ListGroup.Item>
//         ))}
//     </ListGroup>
// );