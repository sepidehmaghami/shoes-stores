import React ,{useState , useEffect} from 'react'
import "./Products.css"
import Header from '../../components/Header/Header'
import Search from '../../components/Search/Search'
import { Space } from 'antd';
function Products() {
  const [products,setProducts] = useState([]);
  const [newProducts,setNewProducts] = useState([]);
  const [totalPrice,setTotalPrice] = useState();

  const loadedProducts=[]

  useEffect(()=>{
    //Reading products from database
  fetch("https://shoes-store-79369-default-rtdb.firebaseio.com/products.json")
  .then((response)=>{
    return response.json();
  })
  .then((responseData)=>{
    for (let item in responseData) {
      loadedProducts.push({
        id:responseData[item].id,
        name:responseData[item].name,
        price:responseData[item].price
      })
    }
    setProducts(loadedProducts)

  })

  //Reading total price of database
  fetch("https://shoes-store-79369-default-rtdb.firebaseio.com/buy/totalPrice.json")
  .then((response)=>{
    return response.json();
  })
  .then((responseData)=>{
    setTotalPrice(responseData)
  })
},[])

useEffect(()=>{
  //Update the total price in the database
   fetch('https://shoes-store-79369-default-rtdb.firebaseio.com/buy/totalPrice.json',{
    method: 'PUT',
    body:JSON.stringify(totalPrice), 
    headers: { 'Content-Type': 'application/json' },
  })  
},[totalPrice])

  useEffect(()=>{
    // Update the new product in the database
  fetch('https://shoes-store-79369-default-rtdb.firebaseio.com/buy/product.json',{
    method: 'POST',
    body:JSON.stringify(newProducts), 
    headers: { 'Content-Type': 'application/json' },
  })  
},[newProducts])

const addProducts = (id) => {
  //Reading price and updating total price
 
  fetch(`https://shoes-store-79369-default-rtdb.firebaseio.com/products/product${id}/price.json`)
  .then((response)=>{
    return response.json();
  })
  .then((responseData)=>{
    const newPrice = totalPrice + responseData
    setTotalPrice(newPrice)
  })

  fetch(`https://shoes-store-79369-default-rtdb.firebaseio.com/products/product${id}.json`)
  .then((response)=>{
    return response.json();
  })
  .then((responseData)=>{
        setNewProducts({
        id:responseData.id,
        name:responseData.name,
        price:responseData.price
      })
  })
  id= ''
}

const searchProductsHandler = (product) => {
  setProducts(product )
}

  return (
    <>
      <Header/>
      <section className='content'>
      <Search onLoadProducts={searchProductsHandler} />

      <table  className="styled-table">
      <thead>
        <tr>
            <td>Id</td>
            <td>Name</td>
            <td>Price</td>
            <td>Manage</td>
          </tr>
      </thead>
       <tbody>
       { products.map((item)=>{
          return (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.price}$</td>
              <td>
              <Space size="middle" >
                <button className='add-product' onClick={()=>addProducts(item.id)}>Add</button>
              </Space>
              </td>
            </tr>
            )
        })}
       </tbody>
  
      </table>
      </section>
    </>
  )
}

export default Products