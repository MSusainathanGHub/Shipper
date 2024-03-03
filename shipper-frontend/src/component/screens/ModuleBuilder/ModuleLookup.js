import axios from "axios";
import React, { useEffect } from "react";
import { FiEdit } from "react-icons/fi";
import { MdOutlineDeleteOutline } from "react-icons/md";


function ModuleLookup({addModuleopen}) {
  const [moduleinfo, setModuleInfo] = React.useState([]);
  const [deletedstate,setDeleteStatus] =React.useState(false);
  useEffect(() => {
    axios
      .get("http://localhost:8080/create/viewmodule")
      .then((res) => {
        if(res){
          setModuleInfo(res?.data);
        }
       
         
      })

      .catch((err) => console.log(err));
      setDeleteStatus(false)
  }, [addModuleopen ,deletedstate]);

  const onDeleteModule=(tname)=>{
    axios
      .delete(`http://localhost:8080/create/deletemodule/${tname}`)
      .then((res) => {
        if(res){
          setDeleteStatus(true)
          console.log("res",res)
        }
       
         
      })
      .catch((err) => console.log(err));
    
  }
  return (
    <table className="table">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Module Name</th>
          <th scope="col">Created At</th>
          <th scope="col">Assign to</th>
          <th scope="col">Created By</th>
          <th scope="col">Action</th>
        </tr>
      </thead>
      <tbody>

      {moduleinfo?.length && moduleinfo.map((item, index) => (
          <tr key={index}>
            <td>{index+1}</td>
           <td>{item?.TABLE_NAME}</td>
           <td>1-02-2024</td>
              <td>Marie susai</td>
              <td>Mark</td>
              <td>
                <FiEdit size={20} className="me-3" />
                <MdOutlineDeleteOutline size={20} onClick={()=>{onDeleteModule(item?.TABLE_NAME)}} />
              </td>
          </tr>
        ))}

        
      </tbody>
    </table>
  );
}

export default ModuleLookup;
