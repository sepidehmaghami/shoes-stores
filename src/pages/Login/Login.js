import React,{useContext, useState} from 'react'
import './Login.css';
import imageLogin from '../../Image/login.png'
import { Col, Row , Image ,Button, Form, Input } from 'antd';
import { AuthContext } from '../../context/auth-context'
function Login() {
    const authContext = useContext(AuthContext)
    const [user,setUser]=useState([]);
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState(0)

    const onUser = event => {
        setUsername(event.target.value);
    }
    const onPass = event => {
        setPassword(event.target.value);
    }

    const loginHandler = () => {
        fetch("https://shoes-store-79369-default-rtdb.firebaseio.com/login.json")
        .then((response)=>{
            return response.json();
          })
          .then((responseData)=>{
              setUser({
                  password:responseData.password,
                  username:responseData.username
                })
        })
        // setUser(loadedProducts)
        if(user.username == username && user.password == password){
            authContext.login()
        }
      }
  return (
   <Row align="middle" justify='center'>
    <Col xs={{ span: 10  }} lg={{ span: 11}}>
    <Image
        preview={false}
        src={imageLogin}
      />
    </Col>

    <Col xs={{ span: 13, offset:2 }} lg={{ span: 11}} > 
        <h2>Welcome</h2>
        <Form 
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        autoComplete="off"
        >
        <Form.Item
            justify='center'
            name="username"
            rules={[{ required: true, message: 'Please input your username!' }]}
        >
            <Input placeholder="username..." onChange={onUser}/>
        </Form.Item>

        <Form.Item
            justify='center'
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
        >
            <Input.Password placeholder="password..." onChange={onPass}/>
        </Form.Item>

        <Form.Item justify='center' style={{textAlign:"center"}}>
            <Button  type="primary" htmlType="submit" className='btn-login' onClick={loginHandler}>
                Login
            </Button>
        </Form.Item>

        </Form>
    </Col>
   </Row>
  )
}

export default Login
