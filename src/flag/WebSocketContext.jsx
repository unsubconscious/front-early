import React, { createContext, useContext, useState, useEffect } from 'react';
import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';
import { AdminFlagContext } from "./Flag";

const WebSocketContext = createContext(null);

export const WebSocketProvider = ({ children }) => {
    const [stompClient, setStompClient] = useState(null);
    const [messages, setMessages] = useState([]);
    const [messages2, setMessages2] = useState([]);
    const [connected, setConnected] = useState(false); // 연결 상태를 나타내는 변수 추가
    const { user } = useContext(AdminFlagContext);

    useEffect(() => {
        if (user) {
            const socket = new SockJS(`http://localhost:8080/ws?token=Bearer ${user}`);
            const client = Stomp.over(socket);

            client.connect({ Authorization: `Bearer ${user}` }, () => {
                client.subscribe('/user/topic/sendMessage', (msg) => {
                    const newMessage = JSON.parse(msg.body);
                    console.log('Message from sendMessage:', newMessage);
                    setMessages(newMessage);
                });

                client.subscribe('/user/topic/sendMessage2', (msg) => {
                    const newMessage = JSON.parse(msg.body);
                    console.log('Message from sendMessage2:', newMessage);
                    setMessages2(newMessage);
                });
                setStompClient(client);
                setConnected(true); // 연결 상태 업데이트
            }, (error) => {
                console.error('Connection error:', error);
                setConnected(false); // 연결 실패 시 상태 업데이트
            });

            return () => {
                if (client) {
                    client.disconnect(() => {
                        console.log('Disconnected');
                        setConnected(false); // 연결 해제 시 상태 업데이트
                    });
                }
            };
        }
        else {
            const socket = new SockJS(`http://localhost:8080/ws`);
            const client = Stomp.over(socket);

            client.connect({}, () => {
                client.subscribe('/user/topic/sendMessage', (msg) => {
                    const newMessage = JSON.parse(msg.body);
                    console.log('Message from sendMessage:', newMessage);
                    setMessages(newMessage);
                });

                client.subscribe('/user/topic/sendMessage2', (msg) => {
                    const newMessage = JSON.parse(msg.body);
                    console.log('Message from sendMessage2:', newMessage);
                    setMessages2(newMessage);
                });
                setStompClient(client);
                setConnected(true); // 연결 상태 업데이트
            }, (error) => {
                console.error('Connection error:', error);
                setConnected(false); // 연결 실패 시 상태 업데이트
            });

            return () => {
                if (client) {
                    client.disconnect(() => {
                        console.log('Disconnected');
                        setConnected(false); // 연결 해제 시 상태 업데이트
                    });
                }
            };
        }
    }, [user]);

    const sendMessage = (message) => {
        if (stompClient && connected) {
            stompClient.send('/app/sendMessage', {}, JSON.stringify(message));
        } else {
            console.warn('STOMP 클라이언트가 연결되지 않았습니다.');
        }
    };

    return (
        <WebSocketContext.Provider value={{ stompClient, messages, sendMessage, setMessages, connected ,messages2, setMessages2}}>
            {children}
        </WebSocketContext.Provider>
    );
};

export const useWebSocket = () => {
    return useContext(WebSocketContext);
};
