import React , {useState}from "react";
export const AuthContext = React.createContext({
    isAut : false,
    login:() =>{}
})

const AuthContextProvider = (props) =>{
    const[isLoggedIn,setIsloggedIn]=useState(false)
    
    const loginHandler =()=>{
        setIsloggedIn(true)
    }
    return (
        <AuthContext.Provider
            value={{
                isAuth: isLoggedIn,
                login:loginHandler
            }}
        >
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider;