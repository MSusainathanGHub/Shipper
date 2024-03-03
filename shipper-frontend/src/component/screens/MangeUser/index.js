import React from 'react'
import { Button, Card } from 'antd'
import { BsFillPeopleFill } from 'react-icons/bs'
import { IoAdd } from 'react-icons/io5'
import ViewUser from './ViewUser';
import AddUser from './AddUser';

function ManageUser() {
    const [addModuleopen, setModuleopen] = React.useState(false);
    return (
        <Card
            size="large"
            title={
                <>
                    <BsFillPeopleFill className="me-2" /> <span>Users </span>
                </>
            }
            extra={
                <Button
                    type="primary"
                    icon={<IoAdd />}
                    onClick={() => setModuleopen(true)}
                >
                    Add User
                </Button>
            }
        >
            {!addModuleopen ? <ViewUser addModuleopen={addModuleopen} />
                : <AddUser
                    addModuleopen={addModuleopen}
                    setModuleopen={setModuleopen}
                />}


        </Card>
    )
}

export default ManageUser
