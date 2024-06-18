import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import UserMenuCa from './UserMenuCa';
import Header from '../commom/Header';
import './UserMenu.css'
import TabMenu from '../commom/TabMenu';

// const UserMenuCaList = () => {
//     const location = useLocation();
//     const caInfo = location.state?.ca;
//     const y = location.state?.y;
//     const x = location.state?.x;
//     const [data, setData] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const [searchTerm, setSearchTerm] = useState('');


//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const rs = await axios.get("http://localhost:8080/search/CaList", {
//                     params: { canum: caInfo ,x:x,y:y}
//                 });
//                 setData(rs.data);
//                 console.log(rs.data)
//             } catch (e) {
//                 setError("연결실패");
//                 console.log("연결실패", e);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchData();
//     }, [caInfo]);

//     if (loading) return <div>Loading...</div>;
//     if (error) return <div>{error}</div>;

//     const handleSearch = (term) => {
//       setSearchTerm(term);
//       // Perform search or update state accordingly
//       console.log('검색어:', term);
//     };

//     return (
//         <div>
            
//             <Header/>
            
//             {/* Render your data here {item.store_name} */}
//             {/* {data && data.map(item => (
                
//                 <Link to={`/UserShopDetail`} state={{data:item}}> <UserMenuCa  data={item}></UserMenuCa></Link>
//             ))} */}



//                 { data.reduce((acc, da, index) => {
//                     // Every 4th item or the first item, create a new container
//                     if (index % 2 === 0) {
//                         acc.push([]);
//                     }
//                     // Add the current menu item to the last container
//                     acc[acc.length - 1].push(da);
//                     return acc;
//                 }, []).map((item, groupIndex) => (
//                     <div id="shop_container" key={groupIndex}>
//                         {item.map((items, index) => (
//                             <Link to={`/UserShopDetail`} state={{data:items}}> <UserMenuCa  data={items}></UserMenuCa></Link>
//                         ))}
//                     </div>
//                 ))}

//         </div>


//     );
// };

// export default UserMenuCaList;

const UserMenuCaList = () => {
    const location = useLocation();
    const caInfo = location.state?.ca;
    const y = location.state?.y;
    const x = location.state?.x;
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const rs = await axios.get("http://localhost:8080/search/CaList", {
                    params: { canum: caInfo ,x:x,y:y}
                });
                setData(rs.data);
                console.log(rs.data)
            } catch (e) {
                setError("연결실패");
                console.log("연결실패", e);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [caInfo, x, y]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    const handleSearch = (term) => {
      setSearchTerm(term);
      console.log('검색어:', term);
    };

    return (
        <div>
            <Header />
            <TabMenu />

            <div className="container-custom">
                <p className="store-count">음식점 <span className="pd3">{data.length}곳</span>을 찾았습니다.</p>
                <p className="superlist"><a href="#" className="badge badge-danger">SuperList</a></p>
                <div className="big-column row">
        {/* data.reduce(): data 배열을 사용하여 두 개씩의 항목을 그룹화합니다. 
        reduce() 함수는 초기값([])을 가진 누산기(acc) 배열을 반환합니다. da는 현재 요소, index는 인덱스를 나타냅니다. 
        index % 2 === 0 조건에 따라 새로운 배열을 acc에 추가하고, 그 배열에 현재 항목(da)을 추가합니다. */}
                    {data.reduce((acc, da, index) => {
                        if (index % 2 === 0) {
                            acc.push([]);
                        }
                        acc[acc.length - 1].push(da);
                        return acc;
                    }, []).map((itemGroup, groupIndex) => (
                        <div className="row" key={groupIndex}>
                            {itemGroup.map((item, index) => (
                                <div className="col-md-6 mb-4" key={index}>
                                    <Link to={`/UserShopDetail`} state={{ data: item }}>
                                        <UserMenuCa data={item} />
                                    </Link>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default UserMenuCaList;