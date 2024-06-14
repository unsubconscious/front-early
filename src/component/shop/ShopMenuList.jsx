import React, { useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ShopMenuList = ({ menu,onDelete }) => {
    //이름
    //가격
    //이미지주소
    //상점아이디

    const navigate = useNavigate();
    //수정버튼
    const editButton=()=>{
        navigate("/ShopMenuedit", { state: { menu: menu } });

    }

    //삭제버튼
    const delButton=async()=>{
      try{ 
        const rs=await axios.get("http://localhost:8080/store/menuedel",{
          params: { id: menu.storeId , name:menu.menuName}
      })
      if(rs.data==1){
        onDelete(menu.menuName);
      }
        //다시 메뉴 목록으로 넘어가자

      }catch(e){
        console.log("실패",e)
      }

      
    }

    


    
    return (
 
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={`/imgs/${menu.menuImage}`} />
      <Card.Body>
        <Card.Title>{menu.menuName}</Card.Title>
        <Card.Text>
        Price: {menu.menuPrice}
        </Card.Text>
        <Button variant="primary" className='menu_list' onClick={editButton}>수정</Button>
        <Button variant="primary" onClick={delButton}>삭제</Button>
      </Card.Body>
    </Card>
            


            

    );
};

export default ShopMenuList;

