import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Container, Row, Col } from 'react-bootstrap';
import Header from './headside/Header';
import Sidebar from './headside/Sidebar';
import ShopOrderReceiptList from './ShopOrderReceiptList'; // ShopOrderReceiptList를 불러옵니다.
import { AdminFlagContext } from "../../flag/Flag.jsx"; // AdminFlagContext를 불러옵니다.

const ShopOrderReceipt = () => {
    const { shopId } = useContext(AdminFlagContext);
    const [order, setOrder] = useState(); // 주문 정보 상태를 설정합니다.

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:8080/store/orderReceipt", {
                    params: { store_id: shopId }
                });

                if (response.status === 200) {
                    console.log("주문 내역 조회 결과:", response.data);
                    setOrder(response.data);
                } else {
                    console.log("주문 내역 없음");
                    setOrder([]); // 데이터가 없을 경우 빈 배열로 설정합니다.
                }
            } catch (error) {
                console.error("주문 내역 조회 실패:", error);
                setOrder([]); // 에러 발생 시 빈 배열로 설정합니다.
            }
        };
        fetchData();
    }, [shopId]);

    return (
        <div>
            <Header />
            <Container fluid>
                <Row>
                    <Col xs={2} id="sidebar-wrapper">
                        <Sidebar />
                    </Col>
                    <Col xs={10} id="page-content-wrapper">
                        <h1>주문내역 확인</h1>
                        <ShopOrderReceiptList orders={order} />
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default ShopOrderReceipt;
