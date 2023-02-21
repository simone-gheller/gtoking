import { useState } from 'react';
import { Alert, Container, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useAuth } from './routes/AuthProvider';

function Login() {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(null)
    const { login } = useAuth()

    const handleSubmit = (event)=>{
        event.preventDefault()
        const credentials = {
            username: username,
            password: password
        }

        let valid = true;
        if (username == '' || password == '')
            valid = false;

        if(valid){
            login(credentials).catch(error=>{
                console.log(error)
                setError(error + '. Wrong username or password')
            })
            
        }
        else{
            setError('Username or password cannot be blank')
        }

    }

    return (
        <Container>
            <Row>
                <h1>
                    Login App
                </h1>
            </Row>
            {
                error &&
                <Alert variant='danger' onClose={()=>setError('')} dismissible>
                    {error}
                </Alert>
            }
            <Row>
                <Form>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Username</Form.Label>
                        <Form.Control onChange={e=>setUsername(e.target.value)} type="email" placeholder="Enter email" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control onChange={e=>setPassword(e.target.value)} type="password" placeholder="Password" />
                    </Form.Group>
                    <Button onClick={handleSubmit} variant="primary" type="submit">
                        Login
                    </Button>
                </Form>
            </Row>
        </Container>

    );
}

export default Login;
