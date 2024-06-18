import React, { useState, useEffect } from 'react';
import { CompatClient, Stomp } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import axios from 'axios';
import { useContext } from "react";
import { AdminFlagContext } from "../../flag/Flag.jsx";

const ShopOrder = () => {
    const [message, setMessage] = useState('');
    const [mes, setMes] = useState([]);
    const [name, setName] = useState("");
    const [stompClient, setStompClient] = useState(null);
    const [names, setNames] = useState("user123");
    const {user,setUser}=useContext(AdminFlagContext)

    useEffect(() => {
        const token = user.token; // Ensure user.token is correct
        const socket = new SockJS(`http://localhost:8080/ws?token=Bearer ${user}`);
        const client = Stomp.over(socket);
    
        client.connect({ Authorization: `Bearer ${user}` },  () => {

            client.subscribe('/user/topic/sendMessage', (msg) => {
                console.log(msg);
                const newMessage = JSON.parse(msg.body);
                setMes((prevMessages) => [...prevMessages, newMessage]);
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
    }, [user]); // Ensure the effect runs when 'user' changes
    





    const sendMessage = () => {
        if (stompClient) {
            stompClient.send('/app/sendMessage', {}, JSON.stringify({ from: name, content: message }));
            setMessage('');
        }
    };

    return (
        <div>
            <input type='text' onChange={(e) => setName(e.target.value)} />
            <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
            />
            <button onClick={sendMessage}>Send</button>

            {mes.map((list, index) => <p key={index}>{list.content}</p>)}
        </div>
    );
};

export default ShopOrder;
