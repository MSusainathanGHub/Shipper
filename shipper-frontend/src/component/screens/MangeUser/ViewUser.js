import React from 'react'
import { RiEditBoxFill } from 'react-icons/ri'
import { MdDelete } from 'react-icons/md'
import moment from 'moment';
import instance from '../../service/axiosConfig'


function ViewUser({ setAddOrganization, addOrganization }) {
  const [userlist,setUserlist]= React.useState([])
  const [deletePopup, setDeletePopup] = React.useState(false)
  const [deletedid, setDeleteid] = React.useState("")
  const handleDeleteOrg = async (id) => {

  }


  React.useEffect(() => {
      instance.get("/viewemployee").then(res=>{
        console.log("res",res);
        setUserlist(res?.data)
      })
  }, [deletePopup, addOrganization])


  return (
    <>


      <div className='table-responsive'>

        <table className='table table-row-dashed table-row-gray-300 align-middle gs-0 gy-3'>
          <thead className='bg-light'>
            <tr className='fw-bolder text-muted'>
              <th className='ps-2 min-w-120px'>ID</th>
              <th className='min-w-120px'>Username</th>
              <th className='min-w-120px'>Email</th>
              <th className='min-w-120px'>Role</th>

              <th className='min-w-100px '>Created At</th>
              <th className='min-w-100px '>Updated At</th>
              <th className='min-w-100px  '>Action</th>
            </tr>
          </thead>

          <tbody>
            {userlist?.map((x, idx) => (
              <tr>
                <td>
                  <div className=' d-flex align-items-center'>
                    <div className='d-flex justify-content-start flex-column'>
                      <p className=' ps-2  text-dark  fs-6'>{idx + 1}</p>
                    </div>
                  </div>
                </td>
                <td>
                  <div className='d-flex align-items-center'>
                    <div className='d-flex justify-content-start flex-column'>
                      <p className=' text-dark  fs-6'>{x.username}</p>
                    </div>
                  </div>
                </td>
                <td className='text-dark' >{x.email}</td>
                <td className='text-dark'>{x.role}</td>
                <td className='text-dark'>{moment(x.createdAt).format('YYYY-MM-DD')}</td>
                <td className='text-dark'>{moment(x.updatedAt).format('YYYY-MM-DD   ')}</td>

                <td>
                  <div className='d-flex  flex-shrink-0'>
                    <button
                      className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'

                    >
                      <RiEditBoxFill size={15} className='svg-icon-3' />
                    </button>

                    <button
                      className='btn btn-icon btn-bg-light btn-active-color-danger btn-sm me-1'
                    >
                      <MdDelete size={15} className='svg-icon-3' />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* {!organizationlist.length && <p className='text-center'>No Organization Found</p>} */}
      </div>
    </>
  )
}

export default ViewUser
