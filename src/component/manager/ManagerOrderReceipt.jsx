import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Row, Col } from 'react-bootstrap';
import Header from './headside/Header';
import Sidebar from './headside/Sidebar';
import ManagerOrderReceiptList from './ManagerOrderReceiptList';

const ManagerOrderReceipt = () => {
    const [order, setOrder] = useState([]); // 주문 정보 상태를 설정합니다.

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('token'); // 로컬 스토리지에서 JWT 토큰 가져오기
                const response = await axios.get("http://localhost:8080/admin/OrderReceipt", {
                    headers: {
                        Authorization: `Bearer ${token}` // 요청 헤더에 JWT 토큰 포함
                    }
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
    }, []); // 빈 배열을 종속성 배열로 추가

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
                        <ManagerOrderReceiptList orders={order} />
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default ManagerOrderReceipt;