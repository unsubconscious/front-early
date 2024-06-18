import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import Nav from 'react-bootstrap/Nav';
import 'bootstrap/dist/css/bootstrap.min.css';
import UserShopDetailMenu from './UserShopDetailMenu';
import { useContext } from "react";
import { AdminFlagContext } from "../../flag/Flag.jsx";
import { CompatClient, Stomp } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import TabMenu from '../commom/TabMenu.jsx';
import Header from '../commom/Header.jsx';

const UserShopDetail = () => {
    const location = useLocation();
    const datas = location.state.data;
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [basket, setBasket] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const { user, setUser } = useContext(AdminFlagContext);
    const [stompClient, setStompClient] = useState(null);
    const [mes, setMes] = useState("");
    const [useid, setUseid] = useState("");
    const [username, setUserName] = useState("");
    const[email,setEmail]=useState("")

    useEffect(() => {
        const fetchData = async () => {
            console.log(datas.store_id)
            try {
                const rs = await axios.get("http://localhost:8080/search/menuList", {
                    params: { id: datas.store_id }
                });
                setData(rs.data);
                console.log(rs.data);
            } catch (e) {
                setError("연결실패");
                console.log("연결실패", e);
            } finally {
                setLoading(false);
            }
        };

        //이메일 탐색
        const emailData = async () => {
            try {
                const rs = await axios.get("http://localhost:8080/search/email_shop", {
                    params: { id: datas.owner_id}
                });
                setEmail(rs.data)
                console.log("이메일탐색",rs.data)

            } catch (e) {
                setError("연결실패");
                console.log("연결실패", e);
            } finally {
                setLoading(false);
            }
        };

        const usedata = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/api/userinfo', {
                    headers: {
                        Authorization: `Bearer ${user}`
                    }
                });
                console.log(response.data);
                console.log(response.data.user_id);
                setUseid(response.data.user_id);
                setUserName(response.data.email);
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
        usedata();
        emailData();
        const socket = new SockJS(`http://localhost:8080/ws?token=Bearer ${user}`);
        const client = Stomp.over(socket);

        client.connect({ Authorization: `Bearer ${user}` }, () => {
            client.subscribe('/user/topic/sendMessage', (msg) => {
                console.log("응답 메세지");
                console.log(msg);
                const newMessage = JSON.parse(msg.body);
                setMes(newMessage);
            });
            setStompClient(client);
        });

        return () => {
            if (client) {
                client.disconnect(() => {
                    console.log('Disconnected');
                });
            }
        };
    }, [datas]);

    useEffect(() => {
        const calculateTotalPrice = () => {
            const price = basket.reduce((sum, item) => sum + item.menuPrice * item.quantity, 0);
            setTotalPrice(price);
        };

        calculateTotalPrice();
    }, [basket]);

    useEffect(() => {
        const handleMesUpdate = async () => {
            if (mes.content === "true") {
                const orderDetails = JSON.stringify(basket);
                console.log("주문클릭");

                const orderData = {
                    customerId: useid,
                    storeId: datas.store_id,
                    orderDetails: orderDetails,
                    totalPrice: totalPrice,
                };

                try {
                    const response = await axios.post('http://localhost:8080/search/order', orderData);
                    console.log('Order response:', response.data);
                    if (response.data == 1) {
                        alert("주문 성공");
                    }
                } catch (error) {
                    console.error('Order error:', error);
                }
            } else {
                alert("현재 음식점이 열려있지 않습니다")
                console.log("주문 실패");
            }
        };

        if (mes.content) {
            handleMesUpdate();
        }
    }, [mes, basket, datas.store_id, totalPrice, useid]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    const handlePlus = (add) => {
        setBasket((prevBasket) => {
            const existingItem = prevBasket.find(menu => menu.menuName === add.menuName);
            if (existingItem) {
                return prevBasket.map(menu =>
                    menu.menuName === add.menuName ? { ...menu, quantity: menu.quantity + 1 } : menu
                );
            } else {
                const { menuName, menuPrice } = add;
                return [...prevBasket, { menuName, menuPrice, quantity: 1 }];
            }
        });
    };

    const increaseQuantity = (menuName) => {
        console.log("증가");
        setBasket((prevBasket) =>
            prevBasket.map(menu =>
                menu.menuName === menuName ? { ...menu, quantity: menu.quantity + 1 } : menu
            )
        );
    };

    const decreaseQuantity = (menuName) => {
        console.log("감소");
        setBasket((prevBasket) =>
            prevBasket.map(menu =>
                menu.menuName === menuName ? { ...menu, quantity: menu.quantity - 1 } : menu
            ).filter(menu => menu.quantity > 0)
        );
    };

    const handleOrder = async () => {
        console.log("유저아이디", username);
        if (stompClient) {
            //from 에 나중에 이 상점 주인 아이디를 넣어야 하는데 이때 앞에서 상점 주인 아이디(이메일을)까지 받아와야한다.
            stompClient.send('/app/sendMessage', {}, JSON.stringify({ from: email, content: "message" }));
        }
    };

    return (
        <div>
            <Header />
            <TabMenu />
            <div className='mv'>
                <div className="container">
                    <div className="left-sections">
                        <div className="section" id="a">
                            <div className="item-card">
                                <div className="item-image">
                                    <img src={`/imgs/${datas.store_image}`} width="70" alt="Store" />
                                </div>
                                <div className="item-info">
                                    <p>{datas.store_name}</p>
                                </div>
                            </div>
                        </div>
                        <div className="section" id="b">
                            <Nav fill variant="tabs" defaultActiveKey="/home">
                                <Nav.Item>
                                    <Nav.Link href="#">Active</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="link-1">Loooonger NavLink</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="link-2">Link</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="disabled" disabled>
                                        Disabled
                                    </Nav.Link>
                                </Nav.Item>
                            </Nav>
                            {data && data.map(array => (
                                <UserShopDetailMenu key={array.menuName} data={array} plus={handlePlus} />
                            ))}
                        </div>
                    </div>
                    <div className="section" id="c">
                        <div className="basket-header"><strong>장바구니</strong></div>
                        <div className="basket-body">
                        {basket.map((array) => (
                            <div className='basket' key={array.menuName}>
                                <div>{array.menuName}</div>
                                <div className='basket-data'>
                                    <button onClick={() => decreaseQuantity(array.menuName)}>-</button>
                                    {array.quantity}
                                    <button onClick={() => increaseQuantity(array.menuName)}>+</button>
                                    <div>{array.menuPrice} 원</div>

                                </div>
                            </div>
                        ))}
                        </div>
                        <hr/>
                        <div>총금액 {totalPrice} 원</div>
                        <hr/>
                        <div>
                        <button onClick={handleOrder}>주문하기</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserShopDetail;




// return (
//     <div>
//     <div id='detail_container'>
//         <div class="item-card">
//         <div class="item-image">
//             <img  src={`/imgs/${datas.store_image}`} width="70"/>
//         </div>
//         <div class="item-info">
//             <p>{datas.store_name}</p></div>
//         </div>
//         <div>장바구니</div>


//     </div>
//     <div id='detail_container'>

//     </div>

//     {data.map(array=>(
//         <div>
//             <p>{array.menuName}</p>
//             <img  src={`/imgs/${array.menuImage}`} width="70"/>
//             </div>

//         ))}
//     </div>
// );