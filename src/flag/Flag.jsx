import { createContext,useState } from "react";

export const AdminFlagContext = createContext({});

//사용법
    //플래그 만들기

export const Flag =(props) => {

    const {children}=props
    const [user, setUser] = useState(null) //로그인 여부(jwt)
    const [userDate, setUserDate] = useState(null) // 현재 유저 정보
    const [userId,setUserId]=useState(null) //유저아이디
    const[shopId,setShopid]=useState(null) //업체아이디
    const[user_x,setX]=useState(null) // 유저x좌표
    const[user_y,setY]=useState(null)//유저y좌표
    const [userInfo, setUserInfo] = useState(null); // 유저 정보
     

    const [approvalStatus, setapprovalStatus] = useState(null); // 승인상태


    //AdminFlagContext 안에 provider 이 있으으로 감싸면 된다
    return (
        <AdminFlagContext.Provider value={{user,setUser,userDate,setUserDate,userId,setUserId,shopId,setShopid,user_x,setX,user_y,setY,userInfo,setUserInfo,approvalStatus,setapprovalStatus}}>
            {children}
        </AdminFlagContext.Provider>
    )
}