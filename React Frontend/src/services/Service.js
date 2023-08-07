import axios from "axios";


const BASE_URL = 'http://localhost:8080/api/v1';

class Service{
   
    getAllEmployees(){
        return axios.get(BASE_URL+"/getAllEmployees");
    }

    createEmployee(employee){
        return axios.post(BASE_URL+"/create",employee);
    }

    getEmployeeById(empId){
        return axios.get(BASE_URL+"/employee/"+empId);
    }

    updateEmployee(empId,employee){
        return axios.put(BASE_URL+"/update/"+empId,employee);
    }

    deleteEmployee(empId){
        return axios.delete(BASE_URL+"/delete/"+empId);
    }
}

export default new Service();