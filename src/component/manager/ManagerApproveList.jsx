// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Table } from 'react-bootstrap';

// const ManagerApproveList = () => {
//     const [data, setData] = useState([]);

//     useEffect(() => {
//         // API 호출 로직
//         const fetchData = async () => {
//             try {
//                 // const response = await axios.get("http://localhost:8080/admin/approvals");
//                 const response = await axios.post("http://localhost:8080/admin/approvals");
//                 if (response.status === 200) {
//                     setData(response.data);
//                 }
//                 console.log(response.data)
//             } catch (error) {
//                 console.error("등록 실패", error);
//             }
//         };

//         fetchData();
//     }, []);

//     return (
//         <div>
//               <Table responsive striped bordered hover>
//                 <thead>
//                     <tr>
//                         <th>#</th>
//                         <th>Owner ID</th>
//                         <th>Store Name</th>
//                         <th>Modification Date</th>
//                         <th>Approval Status</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {data.map((item, index) => (
//                         <tr key={index}>
//                             <td>{index + 1}</td>
//                             <td>{item.owner_id}</td>
//                             <td>{item.store_name}</td>
//                             <td>{item.modification_date}</td>
//                             <td>{item.approval_status}</td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </Table>
//         </div>
//     );
// };

// export default ManagerApproveList;

import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Table, Button } from 'react-bootstrap';

const ManagerApproveList = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.post("http://localhost:8080/admin/approvals");
                if (response.status === 200) {
                    setData(response.data);
                }
                console.log(response.data)
            } catch (error) {
                console.error("등록 실패", error);
            }
        };

        fetchData();
    }, []);

    const handleApprove = async (id) => {
        try {

            // GET 요청: axios를 사용하여 GET 요청을 보내고, URL에 쿼리 파라미터를 포함시킬 수 있습니다.
            // const response = await axios.get(`http://localhost:8080/admin/approve?owner_id=${id}`);
            // 이 경우, owner_id가 URL의 쿼리 스트링으로 전달되어 Spring Boot의 @RequestParam으로 받을 수 있습니다.

            const response = await axios.get('http://localhost:8080/admin/approve', {
                params: { owner_id: id }
            });

            // POST 요청: POST 요청을 사용할 경우, FormData를 생성하여 요청 본문에 데이터를 포함시킬 수 있습니다.
            // Spring Boot에서는 @RequestParam 대신 @RequestBody나 @ModelAttribute 등을 사용하여 요청 본문(body)의 데이터를 읽어올 수 있습니다.
           
       
            if (response.status === 200) {
                // 승인 후 데이터 갱신 새로고침 해야 업데이트
                // setData((prevData) =>
                //     prevData.map((item) =>
                //         item.id === id ? { ...item, approval_status: 1 } : item
                //     )
                // );

                // 승인 후 데이터 바로 업데이트 
                const updatedData = data.map(item =>
                    item.owner_id === id ? { ...item, approval_status: 1 } : item
                );
                setData(updatedData);
            }
        } catch (error) {
            console.error("승인 실패", error);
        }
    };

    return (
        <div>
            <Table responsive striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Owner ID</th>
                        <th>Store Name</th>
                        <th>Modification Date</th>
                        <th>Approval Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{item.owner_id}</td>
                            <td>{item.store_name}</td>
                            <td>{item.modification_date}</td>
                            <td>{item.approval_status === 1 ? "1" : "0"}</td>
                            <td>
                                {item.approval_status === 0 ? (
                                    <Button onClick={() => handleApprove(item.owner_id)}>승인</Button>
                                ) : "완료"}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
};

export default ManagerApproveList;