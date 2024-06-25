import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const ManagerRechart = () => {

  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8080/admin/ManagerRevenue", {
          params: { order_approval_status: 4 } // approvalStatus 대신 고정된 값 4를 사용
        });

        if (response.status === 200) {
          console.log("매출 내역 조회 결과:", response.data);
          const processedData = processSalesData(response.data);
          setData(processedData);
        } else {
          console.log("매출 내역 없음");
          setData([]); // 데이터가 없을 경우 빈 배열로 설정합니다.
        }
      } catch (error) {
        console.error("매출 내역 조회 실패:", error);
        setData([]); // 에러 발생 시 빈 배열로 설정합니다.
      }
    };
    fetchData();
  }, []); // approvalStatus가 아닌 빈 배열로 useEffect를 실행

  const processSalesData = (salesData) => {
    const salesByDate = salesData.reduce((acc, sale) => {
      
      const koreanDate = new Date(new Date(sale.order_date).getTime() + (9 * 60 * 60 * 1000));
      console.log(koreanDate.toISOString())
      const date = koreanDate.toISOString().split('T')[0]; // 날짜만 추출
      if (!acc[date]) {
        acc[date] = 0;
      }
      acc[date] += sale.total_price;
      return acc;
    }, {});

    // 객체를 배열로 변환하고 날짜를 기준으로 정렬
    return Object.keys(salesByDate)
      .map(date => ({
        order_date: date,
        total_price: salesByDate[date]
      }))
      .sort((a, b) => new Date(a.order_date) - new Date(b.order_date));
  };

  return (
    <div style={{ width: '100%' }}>
      <h4>일 단위 매출내역 그래프</h4>
      <ResponsiveContainer width="100%" height={400}>
        <AreaChart
          width={500}
          height={200}
          data={data}
          syncId="anyId"
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="order_date" />
          <YAxis />
          <Tooltip />
          <Area type="monotone" dataKey="total_price" stroke="#82ca9d" fill="#82ca9d" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ManagerRechart;
