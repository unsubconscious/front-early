import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AdminFlagContext } from "../../flag/Flag.jsx";
import { Card } from 'react-bootstrap';
import Header from '../commom/Header.jsx';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import MypageDetailsList from './MypageDetailsList.jsx';

//주문내역
const MyorderDetails = () => {
    const {user,setUser,userId,setUserId,shopId,setShopid}=useContext(AdminFlagContext)
    const [orderDetails, setOrderDetails] = useState([]);

    

    useEffect(() => {
        const fetchOrderDetails = async () => {
           
                const response = await axios.get('http://localhost:8080/search/details', {
                    params: {
                        userId: userId
                    }
                });

                console.log(response.data);
                setOrderDetails(response.data);
        };

        fetchOrderDetails();
    }, [user]);

    return (
        <div>
            <Header />
        <div id="main_container2" className="text-center">

                    {/* <Card.Title>주문 내역</Card.Title> */}
                    {
                        orderDetails.map(order => (<MypageDetailsList order={order} />
            
                            
                        ))
                   }
  
        </div>
        </div>
    );
};

export default MyorderDetails;

