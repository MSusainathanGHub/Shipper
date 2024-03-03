import { Card, Checkbox, Col, Form, Input, Row, Select } from 'antd';
import axios from 'axios';
import React from 'react'
import { Controller, useForm } from 'react-hook-form';
import instance from '../../service/axiosConfig';



function AddUser({ addModuleopen, setModuleopen }) {
  const [moduleinfo, setModuleInfo] = React.useState([]);

  const { handleSubmit, control, formState: { errors } } = useForm();
  const onSubmit = (data) => {
    console.log(data);

    const filteredKeys = Object.keys(data).filter(key => data[key] === true);

   data.schemaName=filteredKeys?.toString();
 
    instance.post("http://localhost:8080/addemployee/", data).then(res => {
      if (res) {
        setModuleopen(false);
      }
      else {
        setModuleopen(true);
      }
    })

  };
  React.useEffect(() => {
    axios
      .get("http://localhost:8080/create/viewmodule")
      .then((res) => {
        if (res) {
          setModuleInfo(res?.data);
        }

      })

      .catch((err) => console.log(err));
  }, []);

  console.log("v", moduleinfo)
  return (
    <div id='kt_account_profile_details' className='collapse show'>

      <div className='card-body  p-9 mt-3 '>

        <Form onFinish={handleSubmit(onSubmit)}
          labelCol={{ flex: '110px' }}
          labelAlign="left"
          labelWrap
          colon={false}
         >


          <Row gutter={40}>

            <Col span={12}>

              <Form.Item className="mb-4"

                label="Username" name="username"
                validateStatus={
                  errors?.username ? "error" : ""
                }
                help={errors?.username?.message}
              >
                <Controller
                  name="username"
                  control={control}
                  rules={{
                    required: "Champs requis",
                  }}

                  render={({ field }) => <Input {...field} />}
                />
              </Form.Item>

              <Form.Item label="Email"
                className="mb-4" name="email"
                validateStatus={
                  errors?.email ? "error" : ""
                } help={errors?.email?.message}
              >

                <Controller
                  name="email"
                  control={control}
                  rules={{
                    required: "Champs requis", pattern: /^\S+@\S+$/i
                  }}
                  render={({ field }) => <Input {...field} />}
                />

              </Form.Item>


              <Form.Item label="Password"
                className="mb-4" name="password"
                validateStatus={
                  errors?.email ? "error" : ""
                } help={errors?.email?.message}
              >

                <Controller
                  name="password"
                  control={control}
                  rules={{
                    required: "Champs requis"
                  }}
                  render={({ field }) => <Input {...field} />}
                />

              </Form.Item>

              <Form.Item name="role"

                validateStatus={
                  errors?.role ? "error" : ""
                }
                help={errors?.role?.message}

                className="mb-4" label="Role"  >
                <Controller
                  name="role"
                  rules={{ required: "Champs requis" }}
                  control={control}
                  render={({ field }) => (
                    <Select {...field}>
                      <Select.Option value="USER">User</Select.Option>
                      <Select.Option value="ADMIN">Admin</Select.Option>
                    </Select>
                  )}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Card
                title="Modules"
                bordered={false}
                style={{
                  width: 300,
                }}
              >
               {moduleinfo.map((option, id) => (
  <div key={id}>
    <Controller
      name={`${option?.TABLE_NAME}`}
      control={control}
      defaultValue={false}
      render={({ field: { onChange, value } }) => (
        <Checkbox
          checked={value}  
          onChange={(e) => onChange(e.target.checked)}  
          value={option.value}
        >
          {option.TABLE_NAME}
        </Checkbox>
      )}
    />
  </div>
))}

              </Card>


            </Col>
          </Row>
          <div className='card-footer d-flex justify-content-end py-6 px-9'>
            <button
              type='submit'
              onClick={() => {
                setModuleopen(false)
              }}
              className='btn btn-secondary me-4'
            >
              Cancel
            </button>
            <button type='submit' className='btn btn-primary'>
              Submit
            </button>
          </div>

        </Form>


      </div>



    </div>
  )
}

export default AddUser
