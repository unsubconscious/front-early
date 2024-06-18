import React from 'react';
import { Card, Badge } from 'react-bootstrap';
import { FaStar } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';

//카테고리 에서 업체 하나 정보 보여주는곳
// const UserMenuCa = ({data}) => {
//     return (
//         <div class="item-card">
//         <div class="item-image">
//                <img  src={`/imgs/${data.store_image}`}  width="70" />
//         </div>
//         <div class="item-info">
//             <p>{data.store_name}</p>
//         </div>
         

//         </div>
        
//     );
// };

// export default UserMenuCa;

const UserMenuCa = ({ data }) => {
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
                            <Badge pill variant="primary" className="mr-1">우수</Badge>
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