import instance from "./axiosConfig";

const getModulesforUser =()=>{
    return(
     instance.get('/create/viewModuleforuser')
     .then(response => {
         if (response.status) {
           return response.data;
            }
            else{
             return response?.data?.error
            }
            
          
     })
     .catch(error => {
       console.error('Error:', error);
     })
 )

} 

const addDataintoModule =(payload)=>{
  return(
   instance.post('/create/insertData',payload)
   .then(response => {
       if (response.status) {
         return response.data;
          }
          else{
           return response?.data?.error
          }
          
        
   })
   .catch(error => {
     console.error('Error:', error);
   })
)

} 
const getTableDataService =(data)=>{
  const tablename = data?.tablename
  return(
   instance.get(`/create/getTabledata/${tablename}`)
   .then(response => {
       if (response.status) {
         return response.data;
          }
          else{
           return response?.data?.error
          }
          
        
   })
   .catch(error => {
     console.error('Error:', error);
   })
)

} 
const userService = {
    getModulesforUser,addDataintoModule,getTableDataService
  };
  export default userService;
