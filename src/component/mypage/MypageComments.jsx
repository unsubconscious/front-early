import React, { useEffect, useState } from 'react';
import Header from '../commom/Header.jsx';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import { useLocation, useNavigate } from 'react-router-dom';
import StarRating from './StarRating .jsx'; 
import axios from 'axios';
import { useContext } from "react";
import { AdminFlagContext } from "../../flag/Flag.jsx";

const MypageComments = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const cleanOrderDetailsString = location.state?.cleanOrderDetails || "[]";
    const order = location.state?.order || "[]";
    console.log("주문정보",order)
    const {user,setUser,userInfo, setUserInfo,userId}=useContext(AdminFlagContext)
    console.log("내정보",userInfo)

    const [comments,setComments]=useState("")
    
    // JSON 문자열을 배열로 변환
    let cleanOrderDetailsArray;
    try {
        cleanOrderDetailsArray = JSON.parse(cleanOrderDetailsString);
    } catch (e) {
        console.error("cleanOrderDetailsString이 유효한 JSON 배열이 아닙니다:", e);
        cleanOrderDetailsArray = [];
    }

    const cleanOrderDetails = cleanOrderDetailsArray.map((detail, index) => (
        <p key={index}>{detail}</p>
    ));

    // cleanOrderDetails가 빈 배열일 때 리다이렉션
    useEffect(() => {
        if (cleanOrderDetailsArray.length === 0) {
            navigate('/');
        }
    }, [cleanOrderDetailsArray, navigate]);


    const [rating, setRating] = useState(0); // 초기 별점 상태는 0으로 설정

    // 별점이 변경될 때 호출되는 콜백 함수
    const handleRatingChange = (newRating) => {
        setRating(newRating);
    };

    // 실제 서버로 별점을 전송하는 함수 (예시)
    const sendRatingToServer = async(e) => {
        e.preventDefault();
        // 여기서 서버로 rating 변수를 전송하는 로직을 추가할 수 있음
        console.log(`별점 ${rating}을 서버에 전송합니다.`);
        try {
            const rs = await axios.post("http://localhost:8080/comments", {storeId:order.storeId,authorId:userId,authorName:userInfo.name,content:comments,rating:rating});
            if (rs.status === 201) {
                console.log(rs.data);


                if (rs.data) {
                  navigate("/");
                } else {
                    console.log("없음");
                }
            }
        } catch (e) {
            console.log("연결실패", e);
        }

    };


    return (
        <div>
            <Header />
            <div id="main_container">
                <div className="shop_container">
                    <div className="form">
                        <form action="#">
                            <h3 className='from_padding'>주문내역</h3>
                            {cleanOrderDetails}
                            <hr></hr>
                            <StarRating initialRating={rating} onRatingChange={handleRatingChange} />
                            <p className="shop_text">
                                <label htmlFor="shop_text">댓글작성</label>
                                <textarea name="postContent" rows={6} onChange={(e)=>setComments(e.target.value)}/>
                            </p>
                            <div className="d-grid gap-2">
                                <Button variant="primary" type="submit" id="submit_btn" className="submit_btn" onClick={sendRatingToServer}>등록하기</Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MypageComments;
