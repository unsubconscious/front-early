// import axios from 'axios';
// import React, { useEffect, useState } from 'react';
// import { Link, useLocation, useNavigate } from 'react-router-dom';
// import UserMenuCa from './UserMenuCa';
// import Header from '../commom/Header';
// import './UserMenu.css'
// import TabMenu from '../commom/TabMenu';
// import { useWebSocket } from "../../flag/WebSocketContext.jsx";

// const UserMenuCaList = () => {
//     const location = useLocation();
//     const caInfo = location.state?.ca || -1; // 카테고리 정보
//     const y = location.state?.y;
//     const x = location.state?.x;
//     const [data, setData] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const [searchTerm, setSearchTerm] = useState('');
//     const { stompClient, messages, sendMessage, setMessages, connected ,setMessages2} = useWebSocket();
//     const navigate = useNavigate();
//     const [shop, setShop] = useState(true);
//     const [currentCheck, setCurrentCheck] = useState(null);

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const rs = await axios.get("http://localhost:8080/search/CaList", {
//                     params: { canum: caInfo, x: x, y: y }
//                 });
//                 setData(rs.data);
//                 console.log(rs.data);
//             } catch (e) {
//                 setError("연결실패");
//                 console.log("연결실패", e);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchData();
//     }, [caInfo, x, y]);

//     useEffect(() => {
//         if (currentCheck !== null && messages.content) {
//             if (messages.content === "true") {
//                 setMessages("");
//                 setMessages2("");
//                 navigate("/UserShopDetail", { state: { data: currentCheck } });
                
//             } else {
//                 alert("열려있지 않습니다");
//                 setMessages2("");
//                 setMessages("");
//                 setShop(false);
//             }
//             setCurrentCheck(null); // Reset currentCheck
//         }
//     }, [messages, currentCheck, navigate, setMessages]);

//     if (loading) return <div>Loading...</div>;
//     if (error) return <div>{error}</div>;

//     const handleSearch = (term) => {
//         setSearchTerm(term);
//         console.log('검색어:', term);
//     };

//     // 사전음식점 확인
//     const check = async (array) => {
//         setCurrentCheck(array); // Store the current item being checked

//         try {
//             const rs = await axios.get("http://localhost:8080/search/email_shop", {
//                 params: { id: array.owner_id }
//             });
//             if (connected) {
//                 stompClient.send('/app/sendMessage', {}, JSON.stringify({ from: rs.data, content: "message" }));
//             } else {
//                 alert("STOMP 클라이언트가 연결되지 않았습니다.");
//             }
//         } catch (e) {
//             setError("연결실패");
//             console.log("연결실패", e);
//         }
//     };

//     return (
//         <div>
//             <Header />
//             <TabMenu />

//             <div className="container-custom">
//                 <p className="store-count">음식점 <span className="pd3">{data.length}곳</span>을 찾았습니다.</p>
//                 <p className="superlist"><a href="#" className="badge badge-danger">SuperList</a></p>
//                 <div className="big-column row">
//                     {data.reduce((acc, da, index) => {
//                         if (index % 2 === 0) {
//                             acc.push([]);
//                         }
//                         acc[acc.length - 1].push(da);
//                         return acc;
//                     }, []).map((itemGroup, groupIndex) => (
//                         <div className="row" key={groupIndex}>
//                             {itemGroup.map((item, index) => (
//                                 <div className="col-md-6 mb-4" key={index} onClick={() => check(item)}>
//                                     <UserMenuCa data={item} />
//                                 </div>
//                             ))}
//                         </div>
//                     ))}
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default UserMenuCaList;
// import axios from 'axios';
// import React, { useEffect, useState } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import UserMenuCa from './UserMenuCa';
// import Header from '../commom/Header';
// import './UserMenu.css';
// import TabMenu from '../commom/TabMenu';
// import { useWebSocket } from "../../flag/WebSocketContext.jsx";

// const UserMenuCaList = () => {
//     const location = useLocation();
//     const caInfo = location.state?.ca || -1; // 카테고리 정보
//     const y = location.state?.y;
//     const x = location.state?.x;
//     const [data, setData] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const [searchTerm, setSearchTerm] = useState('');
//     const { stompClient, messages, sendMessage, setMessages, connected, setMessages2 } = useWebSocket();
//     const navigate = useNavigate();
//     const [shopStates, setShopStates] = useState({});
//     const [currentCheck, setCurrentCheck] = useState(null);

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const rs = await axios.get("http://localhost:8080/search/CaList", {
//                     params: { canum: caInfo, x: x, y: y }
//                 });
//                 setData(rs.data);
//                 console.log(rs.data);
//             } catch (e) {
//                 setError("연결실패");
//                 console.log("연결실패", e);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchData();
//     }, [caInfo, x, y]);

//     useEffect(() => {
//         if (messages.content && messages.content === "true") {
//             setMessages("");
//             setMessages2("");
//             setShopStates((prev) => ({
//                 ...prev,
//                 [currentCheck.owner_id]: true,
//             }));
//             navigate("/UserShopDetail", { state: { data: currentCheck } });
//         } else if (messages.content && messages.content !== "true") {
//             alert("열려있지 않습니다");
//             setMessages("");
//             setMessages2("");
//             setShopStates((prev) => ({
//                 ...prev,
//                 [currentCheck.owner_id]: false,
//             }));
//         }
//     }, [messages, setMessages, setMessages2]);

//     if (loading) return <div>Loading...</div>;
//     if (error) return <div>{error}</div>;

//     const handleSearch = (term) => {
//         setSearchTerm(term);
//         console.log('검색어:', term);
//     };

//     // 사전음식점 확인
//     const check = async (array) => {
//         setCurrentCheck(array); // Store the current item being checked

//         try {
//             const rs = await axios.get("http://localhost:8080/search/email_shop", {
//                 params: { id: array.owner_id }
//             });
//             if (connected) {
//                 stompClient.send('/app/sendMessage', {}, JSON.stringify({ from: rs.data, content: array.owner_id }));
//             } else {
//                 alert("STOMP 클라이언트가 연결되지 않았습니다.");
//             }
//         } catch (e) {
//             setError("연결실패");
//             console.log("연결실패", e);
//         }
//     };

//     return (
//         <div>
//             <Header />
//             <TabMenu />

//             <div className="container-custom">
//                 <p className="store-count">음식점 <span className="pd3">{data.length}곳</span>을 찾았습니다.</p>
//                 <p className="superlist"><a href="#" className="badge badge-danger">SuperList</a></p>
//                 <div className="big-column row">
//                     {data.reduce((acc, da, index) => {
//                         if (index % 2 === 0) {
//                             acc.push([]);
//                         }
//                         acc[acc.length - 1].push(da);
//                         return acc;
//                     }, []).map((itemGroup, groupIndex) => (
//                         <div className="row" key={groupIndex}>
//                             {itemGroup.map((item, index) => (
//                                 <div className="col-md-6 mb-4" key={index} onClick={() => check(item)}>
//                                     <UserMenuCa data={item} shop={shopStates[item.owner_id]} />
//                                 </div>
//                             ))}
//                         </div>
//                     ))}
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default UserMenuCaList;

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import UserMenuCa from './UserMenuCa';
import Header from '../commom/Header';
import './UserMenu.css';
import TabMenu from '../commom/TabMenu';
import { useWebSocket } from "../../flag/WebSocketContext.jsx";

const UserMenuCaList = () => {
    const location = useLocation();
    const caInfo = location.state?.ca || -1; // 카테고리 정보
    const y = location.state?.y;
    const x = location.state?.x;
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const { stompClient, messages, setMessages, connected, setMessages2,messages2 } = useWebSocket();
    const navigate = useNavigate();
    const [shopStates, setShopStates] = useState({});
    const [currentCheck, setCurrentCheck] = useState(null);

    // Load initial data and initialize shop states
    useEffect(() => {
        const fetchData = async () => {
            try {
                const rs = await axios.get("http://localhost:8080/search/CaList", {
                    params: { canum: caInfo, x: x, y: y }
                });

                const initialShopStates = {};
                for (const item of rs.data) {
                    initialShopStates[item.owner_id] = false;
                }
                setShopStates(initialShopStates);
                setData(rs.data);
            } catch (e) {
                setError("연결실패");
                console.log("연결실패", e);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [caInfo, x, y]);

    // Handle WebSocket messages
    useEffect(() => {
        if (messages.content) {
            const { content, owner_id } = JSON.parse(messages.content);
            
            if (messages.content === "true") {
            console.log("살아있는집",messages2.content)
                setShopStates((prev) => ({
                    ...prev,
                    [messages2.content]: true,
                }));
                // navigate("/UserShopDetail", { state: { data: currentCheck } });
            } 
            setMessages("");
            setMessages2("");
        }
    }, [messages2, setMessages2, currentCheck, navigate]);

    useEffect(() => {
        const checkAllShops = async () => {
            for (let i = 0; i < data.length; i++) {
                await check(data[i]);
            }
        };
        if (data.length > 0) {
            console.log("for문동작시작")
            checkAllShops();
        }
    }, [data]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    const handleSearch = (term) => {
        setSearchTerm(term);
        console.log('검색어:', term);
    };

    // Check shop status
    const check = async (array) => {
        setCurrentCheck(array); // Store the current item being checked

        try {
            const rs = await axios.get("http://localhost:8080/search/email_shop", {
                params: { id: array.owner_id }
            });
            if (connected) {
                stompClient.send('/app/sendMessage', {}, JSON.stringify({ from: rs.data, content: array.owner_id }));
            } else {
                navigate("/");
            }
        } catch (e) {
            setError("연결실패");
            console.log("연결실패", e);
        }
    };

    //
    const check2=(value,array)=>{
       
        if (value){
            navigate("/UserShopDetail", { state: { data: array } });
        }
        else{
            alert("열려있지않습니다")
        }
    }

    return (
        <div>
            <Header />
            <TabMenu />

            <div className="container-custom">
                <p className="store-count">음식점 <span className="pd3">{data.length}곳</span>을 찾았습니다.</p>
                <p className="superlist"><a href="#" className="badge badge-danger">SuperList</a></p>
                <div className="big-column row">
                    {data.reduce((acc, da, index) => {
                        if (index % 2 === 0) {
                            acc.push([]);
                        }
                        acc[acc.length - 1].push(da);
                        return acc;
                    }, []).map((itemGroup, groupIndex) => (
                        <div className="row" key={groupIndex}>
                            {itemGroup.map((item, index) => (
                                <div className="col-md-6 mb-4" key={index} onClick={() => check2(shopStates[item.owner_id],item)}>
                                    <UserMenuCa data={item} shop={shopStates[item.owner_id]} />
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default UserMenuCaList;