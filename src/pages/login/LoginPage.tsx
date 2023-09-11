import { Button, Card, Col, Form, Input, Typography, Row, message } from 'antd';
import './login.css';
import { auth } from '../../firebase/FirebaseApp'
import { signInWithEmailAndPassword } from 'firebase/auth';
import { FirebaseError } from 'firebase/app';
const { Text } = Typography;

type FieldType = {
    email?: string;
    password?: string;
};


async function loginWithEmailAndPassword(email: string, password: string) {
    try {
        await signInWithEmailAndPassword(auth, email, password);
        message.success('Login success!');
    } catch (err) {
        if (err instanceof FirebaseError) {
            switch (err.code) {
                case 'auth/invalid-email':
                    message.error('Inavlid credentials!');
                    break;

                case 'auth/wrong-password':
                    message.error('Inavlid credentials!');
                    break;
                default:
                    message.error(err.code);
            }

        }
    }

}

function handleSubmit(values: any) {
    loginWithEmailAndPassword(values.email, values.password);
}

function LoginPage() {
    
    return (
        <Row className='container' align={'middle'} justify={'center'}>
            <Col span={6}>
                <Card bordered={false} style={{ borderRadius: '1.2rem' }}>
                    <Text className='login-instruction' strong>
                        Please login with admin credentials
                    </Text>
                    <Form
                        layout='vertical'
                        requiredMark={false}
                        size='large'
                        onFinish={handleSubmit}
                    >

                        <Form.Item<FieldType>
                            label="Email"
                            name="email"
                            rules={[{ required: true, message: 'Please enter admin email!' }]}
                        >
                            <Input placeholder="Email address" />
                        </Form.Item>

                        <Form.Item<FieldType>
                            label="Password"
                            name="password"
                            rules={[{ required: true, message: 'Please enter admin password!' }]}
                        >
                            <Input.Password placeholder="Passowrd" />
                        </Form.Item>

                        <Form.Item>
                            <Button
                                block
                                shape='round'
                                type='primary'
                                style={{ boxShadow: 'none', marginTop: '20px' }}
                                htmlType='submit'
                            >Login</Button>
                        </Form.Item>
                    </Form>
                </Card>
            </Col>
        </Row>
    );
}

export default LoginPage;