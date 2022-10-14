import React,{useState,useEffect} from 'react'
import './Cart.css'
import { Space } from 'antd';
import { Col, Row , Image } from 'antd';
import imageCart from '../../Image/Cart.png'
import { HomeOutlined , ShoppingOutlined , LogoutOutlined} from '@ant-design/icons';
import {Link} from 'react-router-dom'
function Cart(props) {
      const [totalPrice,setTotalPrice] = useState();
      const [basket,setBasket] = useState([]);
      const loadedBasket=[]

      const toggleAuth=()=>{
        props.setIsloggedIn(false) 
    }

    useEffect(()=>{
      //Reading products from database
      fetch('https://shoes-store-79369-default-rtdb.firebaseio.com/buy/product.json')
      .then((response)=>{
        return response.json();
      })
      .then((resData)=>{
        for (let items in resData) {
          console.log(items)
          loadedBasket.push({
            id:resData[items].id,
            name:resData[items].name,
            price:resData[items].price
          })
        }
        setBasket(loadedBasket)
      })
    },[loadedBasket])

      useEffect(()=>{
      fetch("https://shoes-store-79369-default-rtdb.firebaseio.com/buy/totalPrice.json")
      .then((response)=>{
        return response.json();
      })
      .then((responseData)=>{
        setTotalPrice(responseData)
      })
    },[totalPrice])
    

    const removeProduct =(id) =>{
      fetch(`https://shoes-store-79369-default-rtdb.firebaseio.com/buy/product${id}.json` , {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json' // Indicates the content 
       }
    })

    fetch("https://shoes-store-79369-default-rtdb.firebaseio.com/buy/product/-NCdnQD7es99GhYHD2f3.json")
  .then((response)=>{
    return response.json();
  })
  .then((responseData)=>{
    const newPrice = totalPrice - responseData
    setTotalPrice(newPrice)
  })

          
      //Update the total price in the database
      fetch('https://shoes-store-79369-default-rtdb.firebaseio.com/buy/totalPrice.json',{
        method: 'PUT',
        body:JSON.stringify(totalPrice), 
        headers: { 'Content-Type': 'application/json' },
      })  
    }
    
  return (
   <>
    <Row>
        <Col  span={8}> 
            <h2 className='cart-title'>Youre Basket</h2>
        </Col>
       
        <Col span={8} offset={8}>
            <ul className='cart-list'>
            <li>
                        <Link to="/" onClick={toggleAuth}>
                            <LogoutOutlined />
                        </Link>
                    </li>
                    <li>
                        <Link to="/cart">
                            <ShoppingOutlined />
                        </Link>
                    </li>
                    <li>
                        <Link to="/home">
                            <HomeOutlined />
                        </Link>
                    </li>
            </ul>
        </Col>    
    </Row>
    <Row align="middle" justify='center'>
        <Col xs={{ span: 12 }} lg={{ span: 11}} justify="center" >
            <Image
                preview={false}
                src={imageCart}
                style={{width:"90%"}}
            />
        </Col>

        <Col xs={{ span: 17 }} lg={{ span: 11}} > 
            <p className='total-price'>Total Price : {totalPrice}$</p>

            <table  className="styled-table-cart">
      <thead>
        <tr>
            <td>Id</td>
            <td>Name</td>
            <td>Price</td>
            <td>Manage</td>
          </tr>
      </thead>
       <tbody>
       { basket.map((item)=>{
          return (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.price}$</td>
              <td>
              <Space size="middle" >
                <button className='remove-product' onClick={() =>removeProduct(item.id)}>Remove</button>
              </Space>
              </td>
            </tr>
            )
        })}
       </tbody>
  
      </table>

        </Col>
    </Row>
   </>
  )
}

export default Cart

