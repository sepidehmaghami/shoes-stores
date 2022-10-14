import React,{useContext} from "react";
import Login from "./pages/Login/Login";
import Products from "./pages/Products/Products";
import Cart from "./pages/Cart/Cart";
import {AuthContext} from './context/auth-context'
import {Route ,Routes,Navigate } from 'react-router-dom'
function App() {
  const authContext = useContext(AuthContext)
//   let content =  <Login/>
//   if(authContext.isAuth){
//     content = <Products/>
// }
  return (
    <div className="App">
        
<Routes>


  {!authContext.isAuth ? ( 
    <Route path="/" element={<Login/>}/>
  ):( 
    <Route path="/" element={<Navigate replace to="/home"/>}/>
  )}
  <Route path="/home" element={<Products/>}/>
  <Route path="/cart" element={<Cart/>}/>
</Routes>
      {/* {content} */}
    </div>
  );
}

export default App;
