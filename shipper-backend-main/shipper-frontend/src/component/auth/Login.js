
import React, { useEffect } from 'react';
import { Button, Checkbox, Form, Input, Layout } from 'antd';
import { Content } from 'antd/es/layout/layout';
import { Controller, useForm } from 'react-hook-form';
import axios from 'axios';
import { useAuth } from './AuthContext';
import { Navigate, useNavigate } from 'react-router-dom';

const Login = () => {
    const { login, authenticated, role } = useAuth()
    const { handleSubmit, control, formState: { errors } } = useForm();
    const navigate = useNavigate();

    const onSubmit = (data) => {

        axios.post("http://localhost:8080/login/", data).then(res => {
            if (res) {
                console.log("res", res?.data)
                const accessToken = res?.data?.accessToken;
                const role = res?.data?.roles
                login(accessToken, role);

            }
            else {
            }
        })
    }

    useEffect(() => {
        if (authenticated && role == "ADMIN") {
            navigate("/admin/dashboard");
        } else if (authenticated && role == "USER") {

            navigate('/user/form');
        }
    }, [navigate]);
    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Content style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: "white" }}>
                <div className=" p-3 rounded-3" style={{ width: '400px', boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }} >
                    <h4 className='text-center mb-4'>Merchant Login</h4>
                    <Form className="ms-2" onFinish={handleSubmit(onSubmit)}
                        name="basic"
                        labelAlign="left"
                        labelCol={{
                            span: 6,
                        }}
                        wrapperCol={{
                            span: 16,
                        }}
                        style={{
                            maxWidth: 600,
                        }}
                        initialValues={{
                            remember: true,
                        }}

                        autoComplete="off"
                    >
                        <Form.Item className="mb-4"

                            label="Email" name="email"
                            validateStatus={
                                errors?.email ? "error" : ""
                            }
                            help={errors?.email?.message}
                        >
                            <Controller
                                name="email"
                                control={control}
                                rules={{
                                    required: "Required Field",
                                }}

                                render={({ field }) => <Input {...field} />}
                            />
                        </Form.Item>



                        <Form.Item className="mb-4"
                            label="Password"
                            name="password"
                            validateStatus={
                                errors?.password ? "error" : ""
                            }
                            help={errors?.password?.message}
                        >
                            <Controller
                                name="password"
                                control={control}
                                rules={{
                                    required: "Required Field",
                                }}

                                render={({ field }) => <Input.Password {...field} />}
                            />
                        </Form.Item>


                        {/* <Form.Item
                            name="remember"
                            valuePropName="checked"
                            wrapperCol={{
                                offset: 7,
                                span: 12,
                            }}
                        >
                            <Checkbox>Remember me</Checkbox>
                        </Form.Item> */}

                        <Form.Item
                            wrapperCol={{
                                offset: 7,
                                span: 16,
                            }}
                        >
                            <button type='submit' className='btn btn-primary'>
                                Login
                            </button>
                        </Form.Item>
                    </Form>
                </div>
            </Content>
        </Layout>
    );
}

export default Login;
