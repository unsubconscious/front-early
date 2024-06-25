import React, { useState, useEffect, useContext } from 'react';
import { CompatClient, Stomp } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import axios from 'axios';
import { AdminFlagContext } from "../../flag/Flag.jsx";
import { Container, Row, Col } from 'react-bootstrap';
import Header from './headside/Header';
import Sidebar from './headside/Sidebar';
import ShopOrderList from './ShopOrderList';
import { useWebSocket  } from "../../flag/WebSocketContext.jsx";

const ShopOrder = () => {
    const [message, setMessage] = useState('');
    const [mes, setMes] = useState([]);
    const [name, setName] = useState("");
    // const [stompClient, setStompClient] = useState(null);
    const [names, setNames] = useState("user123");
    const { user, setUser, userId, setUserId, shopId, setShopid } = useContext(AdminFlagContext);
    const { stompClient, messages, sendMessage } = useWebSocket();
    //주문 정보
    const[order,setOrder]=useState()

    // useEffect(() => {
    //     const token = user.token; // user.token이 올바른지 확인
    //     const socket = new SockJS(`http://localhost:8080/ws?token=Bearer ${user}`);
    //     const client = Stomp.over(socket);

    //     client.connect({ Authorization: `Bearer ${user}` }, () => {
    //         client.subscribe('/user/topic/sendMessage', (msg) => {
    //             console.log(msg);
    //             const newMessage = JSON.parse(msg.body);
    //             setMes((prevMessages) => [...prevMessages, newMessage]);
    //         });
    //         setStompClient(client);
    //     });

    //     return () => {
    //         if (client) {
    //             client.disconnect(() => {
    //                 console.log('Disconnected');
    //             });
    //         }
    //     };
    // }, [user]); // 'user'가 변경될 때마다 이 효과 실행

    useEffect(() => {
        console.log("실행")
        const fetchData = async () => {
            console.log("상점",shopId)
            try {
                const rs = await axios.post("http://localhost:8080/store/order", { storeId: shopId });
                if (rs.status === 200) {
                    console.log(rs.data);
                    setOrder(rs.data)
                    if (rs.data) {
                        // 응답 데이터 처리
                    } else {
                        console.log("없음");
                    }
                }
            } catch (e) {
                console.log("연결실패", e);
            }
        };
        const timer = setTimeout(() => {
            fetchData();
          }, 450);
      
          // 컴포넌트가 언마운트될 때 타이머를 정리
          return () => clearTimeout(timer);

    }, [messages]); // 'mes'가 변경될 때마다 이 효과 실행

    const hsendMessage = () => {
        if (stompClient) {
            stompClient.send('/app/sendMessage', {}, JSON.stringify({ from: name, content: message }));
            setMessage('');
        }
    };

    return (
        <div>
            <Header />
            <Container fluid>
                <Row>
                    <Col xs={2} id="sidebar-wrapper">
                        <Sidebar />
                    </Col>
                    <Col xs={10} id="page-content-wrapper">
                        
                    {order&&order.reduce((acc, menu, index) => {
                            // Every 4th item or the first item, create a new container
                            if (index % 4 === 0) {
                                acc.push([]);
                            }
                            // Add the current menu item to the last container
                            acc[acc.length - 1].push(menu);
                            return acc;
                        }, []).map((menuGroup, groupIndex) => (
                            <div id="main_container" key={groupIndex}>
                                {menuGroup.map((menu, index) => (
                  
                                    <ShopOrderList key={index} menu={menu} />
                                ))}
                            </div>
                        ))}

                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default ShopOrder;

{/* <input type='text' onChange={(e) => setName(e.target.value)} />
<input
    type="text"
    value={message}
    onChange={(e) => setMessage(e.target.value)}
/>
<button onClick={sendMessage}>Send</button>

{mes.map((list, index) => <p key={index}>{list.content}</p>)} */}
