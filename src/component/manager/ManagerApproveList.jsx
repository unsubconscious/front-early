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
            const response = await axios.post(`http://localhost:8080/admin/approve/${id}`);
            if (response.status === 200) {
                // 승인 후 데이터 갱신
                setData((prevData) =>
                    prevData.map((item) =>
                        item.id === id ? { ...item, approval_status: 1 } : item
                    )
                );
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
                                {item.approval_status === 0 && (
                                    <Button onClick={() => handleApprove(item.id)}>승인</Button>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
};

export default ManagerApproveList;