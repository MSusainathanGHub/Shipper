import {
  Button,
  Card,
  Checkbox,
  Col,
  Drawer,
  Form,
  Input,
  Row,
  Select,
} from "antd";
import React from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { FaRegTrashAlt } from "react-icons/fa";
import { MdAdd } from "react-icons/md";
import { BsSave2 } from "react-icons/bs";
import axios from "axios";
const { Option } = Select;

function Componentbuilder({ addModuleopen, setModuleopen }) {
  const {
    control,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({});

  const { fields, append, remove } = useFieldArray({
    control,
    name: "component",
    defaultValues: {
      component: [{ name: "", type: "", required: false }],
    },
  });
  const componentInit = watch("component");

  const onSubmit = (data) => {
    console.log(data);
 
    axios.post("http://localhost:8080/create/module/",data).then(res=>{
      if(res){
        setModuleopen(false);
      }
      else{
        setModuleopen(true);
      }
    })
   
  };

  React.useEffect(() => {
    if (componentInit?.length === 0) {
      append({ name: "", type: "", required: false });
    }
  }, [componentInit]);

  return (
    <>
      <Drawer
        title="Create a new Module"
        width={500}
        onClose={() => {
          setModuleopen(false);
          reset();
        }}
        open={addModuleopen}
        styles={{
          body: {
            paddingBottom: 80,
          },
        }}
      >
        <Form layout="vertical" onFinish={handleSubmit(onSubmit)}>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Module Name"
                validateStatus={errors?.tablename ? "error" : ""}
                help={errors?.tablename?.message}
              >
                <Controller
                  control={control}
                  name={`tablename`}
                  rules={{ required: "Champs requis" }}
                  render={({ field }) => <Input {...field} />}
                />
              </Form.Item>
            </Col>
          </Row>

          <div>
            <label className="form-label d-flex justify-content-end">
              <Button
                type="primary"
                onClick={() => append({ name: "", type: "" })}
              >
                <MdAdd size={20} Option />{" "}
                <span className="ms-2"> Add Field</span>
              </Button>
            </label>

            {fields.map((item, index) => (
              <Card key={item.id} className="mb-2">
                <div className="row mb-2">
                  <div className="row">
                    <div className="d-flex justify-content-end">
                      <FaRegTrashAlt
                        className="text-danger ms-1 mb-2"
                        size={15}
                        onClick={() => remove(index)}
                      />
                    </div>
                  </div>
                  <Row gutter={16}>
                    <Col span={12}>
                      <Form.Item
                        label="Field Name"
                        validateStatus={
                          errors?.component?.[index]?.name ? "error" : ""
                        }
                        help={errors?.component?.[index]?.name?.message}
                      >
                        <Controller
                          control={control}
                          name={`component[${index}].name`}
                          rules={{ required: "Champs requis" }}
                          render={({ field }) => <Input {...field} />}
                        />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item
                        label="Type"
                        validateStatus={
                          errors?.component?.[index]?.type ? "error" : ""
                        }
                        help={errors?.component?.[index]?.type?.message}
                      >
                        <Controller
                          control={control}
                          name={`component[${index}].type`}
                          rules={{ required: "Champs requis" }}
                          render={({ field }) => (
                            <Select
                              {...field}
                              placeholder="Please select an owner"
                            >
                              <Option value="INTEGER">Integer</Option>
                              <Option value="VARCHAR(255)">Text</Option>
                            </Select>
                          )}
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                </div>
                <Row>
                  <Col span={12}>
                    <Form.Item>
                      <Controller
                        control={control}
                        name={`component[${index}].required`}
                        defaultValue={false}
                        render={({ field }) => (
                          <Checkbox {...field}>is Required</Checkbox>
                        )}
                      />
                    </Form.Item>{" "}
                  </Col>
                </Row>
              </Card>
            ))}
          </div>

          <button className="btn  btn-sm btn-primary mt-3" type="submit">
            <BsSave2 /> Save
          </button>
        </Form>
      </Drawer>
    </>
  );
}

export default Componentbuilder;
