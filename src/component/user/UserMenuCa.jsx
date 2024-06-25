// import React, { useEffect, useState } from 'react';
// import { Card, Badge } from 'react-bootstrap';
// import { FaStar } from 'react-icons/fa';
// import axios from 'axios';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import { useWebSocket } from "../../flag/WebSocketContext.jsx";

// const UserMenuCa = ({ data }) => {
//     const [shop, setShop] = useState(true);
//     const { stompClient, messages, sendMessage, setMessages, connected, messages2, setMessages2 } = useWebSocket();
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         const stm = async () => {
//             try {
//                 const rs = await axios.get("http://localhost:8080/search/email_shop", {
//                     params: { id: data.owner_id }
//                 });
//                 if (connected) {
//                     stompClient.send('/app/sendMessage', {}, JSON.stringify({ from: rs.data, content: data.owner_id }));
//                 } else {
//                     alert("STOMP 클라이언트가 연결되지 않았습니다.");
//                 }
//             } catch (e) {
//                 setError("연결실패");
//                 console.log("연결실패", e);
//             }
//         };
//         stm();
//     }, [connected, data.owner_id, stompClient]);

//     useEffect(() => {
//         if (messages2.content) {
//             console.log("dl",messages2.content)
//             if (messages2.content === data.owner_id) {
//                 setMessages("");
//                 setMessages2("");
//                 setShop(true);
//                 console.log("이집은살아있음",data.owner_id)
//             } else {
//                 setMessages("");
//                 setMessages2("");
//                 setShop(false);
//             }
//         }
//     }, [messages,messages2, setMessages, setMessages2]);

//     return (
//         <Card className="item-card mb-3">
//             <Card.Body className="d-flex">
//                 <div className="item-image">
//                     <img src={`/imgs/${data.store_image}`} alt="item" width="70" />
//                 </div>
//                 <div className="item-info ml-3">
//                     <Card.Title>
//                         <strong style={{ textDecoration: shop ? 'none' : 'underline' }}>{data.store_name}</strong>
//                         <span className="special-tags ml-2">
//                             <Badge pill variant="primary" className="mr-1">우수</Badge>
//                         </span>
//                     </Card.Title>
//                     <Card.Text>
//                         <FaStar className="scope-rate" /> <strong>{data.rating}</strong>
//                         <span className="pd2">최근리뷰 {data.recent_reviews}+ 최근사장님댓글 {data.recent_comments}</span>
//                     </Card.Text>
//                     <Card.Text className="info-detailmenu pd1">
//                         {data.menu}
//                     </Card.Text>
//                 </div>
//             </Card.Body>
//         </Card>
//     );
// };

// export default UserMenuCa;
// import React, { useEffect, useState } from 'react';
// import { Card, Badge } from 'react-bootstrap';
// import { FaStar } from 'react-icons/fa';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import { useWebSocket } from "../../flag/WebSocketContext.jsx";

// const UserMenuCa = ({ data, shop }) => {
//     return (
//         <Card className="item-card mb-3">
//             <Card.Body className="d-flex">
//                 <div className="item-image">
//                     <img src={`/imgs/${data.store_image}`} alt="item" width="70" />
//                 </div>
//                 <div className="item-info ml-3">
//                     <Card.Title>
//                         <strong style={{ textDecoration: shop ? 'none' : 'underline' }}>{data.store_name}</strong>
//                         <span className="special-tags ml-2">
//                             <Badge pill variant="primary" className="mr-1">우수</Badge>
//                         </span>
//                     </Card.Title>
//                     <Card.Text>
//                         <FaStar className="scope-rate" /> <strong>{data.rating}</strong>
//                         <span className="pd2">최근리뷰 {data.recent_reviews}+ 최근사장님댓글 {data.recent_comments}</span>
//                     </Card.Text>
//                     <Card.Text className="info-detailmenu pd1">
//                         {data.menu}
//                     </Card.Text>
//                 </div>
//             </Card.Body>
//         </Card>
//     );
// };

// export default UserMenuCa;

import React from 'react';
import { Card, Badge } from 'react-bootstrap';
import { FaStar } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';

const UserMenuCa = ({ data, shop }) => {
    console.log(data.store_name)
    console.log(shop)
    return (
        <Card className="item-card mb-3">
            <Card.Body className="d-flex">
                <div className="item-image">
                    <img src={`/imgs/${data.store_image}`} alt="item" width="70" />
                </div>
                <div className="item-info ml-3">
                    <Card.Title>
                        <strong>{data.store_name}</strong>
                        <span className="special-tags ml-2">
                        {shop ? <Badge pill variant="primary" className="mr-1"> 우수 </Badge> : <Badge pill variant="primary" bg="danger" className="mr-1">운영종료</Badge>}
                           
                        </span>
                    </Card.Title>
                    <Card.Text>
                        <FaStar className="scope-rate" /> <strong>{data.rating}</strong>
                        <span className="pd2">최근리뷰 {data.recent_reviews}+ 최근사장님댓글 {data.recent_comments}</span>
                    </Card.Text>
                    <Card.Text className="info-detailmenu pd1">
                        {data.menu}
                    </Card.Text>
                </div>
            </Card.Body>
        </Card>
    );
};

export default UserMenuCa;
