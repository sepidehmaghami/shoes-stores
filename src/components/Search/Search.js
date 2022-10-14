import React ,{useState,useEffect}from 'react'
import './Search.css'
import { Input ,Space } from 'antd';

const Search = (props) => {
  const { Search } = Input;

  const { onLoadProducts } = props
  const onSearch = (value) => setSearchItem(value);
  const [searchItem, setSearchItem] = useState('')

  useEffect(() => {
    const timer = setTimeout(() => {
        const query = searchItem.length === 0 ? '' : `?orderBy="name"&equalTo="${searchItem}"`
        fetch('https://shoes-store-79369-default-rtdb.firebaseio.com/products.json' + query)
          .then((response) => {
            return response.json()
          })
          .then((responseData) => {
            const loadedProducts = []
            for (let items in responseData) {
              loadedProducts.push({
                id: responseData[items].id,
                name: responseData[items].name,
                price: responseData[items].price,
              })
            }
            onLoadProducts(loadedProducts)
          }) 
    }, 500)

    return () => {
      clearTimeout(timer)
    }
  }, [searchItem, onLoadProducts])

  return (
    <>
          <Space direction="vertical" className='search-align'>
          <Search 
            allowClear 
            placeholder="input search text" 
            className='search-input'
            onSearch={onSearch}
/>
          </Space>


    </>
  )
}

export default Search;
