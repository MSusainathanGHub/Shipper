import React from "react";
import userService from "../../service/userService";
import { Controller, useForm } from "react-hook-form";
import { Card, Col, Form, Input, InputNumber, Row } from "antd";
import DynamicTable from "./DynamicaTable";

export const UserForm = () => {
    const [userforms, setUserform] = React.useState(null);
    const [modulename, setModulename] = React.useState(null);
    const [tableData, setTableData] = React.useState([]);

    const { errors, handleSubmit,reset, control } = useForm();
    const [added, setAdded] = React.useState(false);
    const getModules = async () => {
        const data = await userService.getModulesforUser();
        const filteredData = data?.data?.filter(item => !item?.name?.endsWith("_id"));
        setModulename(data)
        setUserform(filteredData)
        if (data) {
            const tabledata = await userService.getTableDataService(data);
 
            setTableData(tabledata?.data)
        }

    }
    const onSubmit = (e) => {
        setAdded(false)
        const payload = {
            tablename: modulename?.tablename,
            data: e
        }
        console.log(payload)

        userService.addDataintoModule(payload).then(res => {
            if (res) {
                setAdded(true);
                reset();

            }
        }).catch(err => console.log(err))


    }


    React.useEffect(() => {
        getModules()
    }, [added]);
    console.log("field", userforms)
    return (
        <>
            <h5 className="mb-3">Welcome User</h5>
            <Row gutter={16}>


                <Col span={12}>
                    <Card style={{ height: "100%" }}
                        size="large"
                        title={
                            <>
                                <span>{modulename?.tablename} </span>
                            </>
                        }

                    >
                        {userforms?.length ? 
                        <form onSubmit={handleSubmit(onSubmit)}>
                            {userforms?.map((field, index) => (
                                <div key={index}>
                                    {field?.type === 'int' ? (
                                        <>
                                            <Form.Item className="mb-4"

                                                key={index}
                                                label={field?.name}
                                                name={field?.name}
                                                validateStatus={errors?.[field?.name] ? "error" : ""}
                                                help={errors?.[field.name]?.message}
                                            >

                                                <Controller
                                                    name={field.name}
                                                    control={control}
                                                    rules={{ required: field?.isRequired === "YES" && 'Field is required' }}
                                                    render={({ field }) => <InputNumber {...field} />}
                                                />
                                            </Form.Item>

                                        </>
                                    ) : (

                                        <Form.Item className="mb-4"
                                            label={field?.name} name={field?.name}
                                            validateStatus={errors?.[field?.name] ? "error" : ""}
                                            help={errors?.[field.name]?.message}
                                        >
                                            <Controller
                                                name={field?.name}
                                                control={control}
                                                rules={{ required: field?.isRequired === "YES" && 'Field is required' }}
                                                render={({ field }) => <Input {...field} />}
                                            />
                                        </Form.Item>
                                    )}
                                </div>
                            ))}
                            <button className="btn btn-primary btn-sm" type="submit">Submit</button>
                        </form> : <p className="text-center">No Module assigned to this User</p>}
                    </Card>
                </Col>
                <Col span={12}>
                    <Card style={{ height: "100%" }}
                        size="large"
                        title={
                            <>
                                <span>{modulename?.tablename} Data </span>
                            </>
                        }

                    >
                        {tableData?.length ? <DynamicTable data={tableData} /> : <p className="text-center">No Data found</p>}
                    </Card>
                </Col>
            </Row>

        </>
    )
}