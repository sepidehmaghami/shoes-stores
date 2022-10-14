import './Header.css'
import imageHeader from '../../Image/header.svg';
import { Image } from 'antd';
import {ShoppingCartOutlined , HomeOutlined , ShoppingOutlined , LogoutOutlined} from '@ant-design/icons';
import {Link} from 'react-router-dom'

function Header(props) {
const toggleAuth=()=>{
    props.setIsloggedIn(false) 
}
    return (
    <header>
                <Image
                    className='header-image'
                    preview={false}
                    src={imageHeader}
                />
                <h2 className='title'><span><ShoppingCartOutlined/></span> Online shoese store</h2>
                
                <ul className='header-list'>
                    <li>
                        <Link to="/https://sepidehmaghami.github.io/shoes-stores" onClick={toggleAuth}>
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
    </header>
  )
}

export default Header