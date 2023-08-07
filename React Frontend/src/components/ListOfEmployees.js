import React, { useEffect, useRef, useState } from 'react'
import { ColumnDirective, ColumnsDirective, GridComponent, Group, Inject, Page, Sort, Filter } from '@syncfusion/ej2-react-grids';
import Service from '../services/Service'
import AddEmployee from './AddEmployee';
import { ButtonComponent } from '@syncfusion/ej2-react-buttons';

const ListOfEmployees = () => {


  const [employees, setEmployees] = useState([]);
  const [delFlag,setDelFlag] = useState(false);  
  let dialogRef = useRef();
  const formRef = useRef(); 


  const showAddForm = () => {
    dialogRef.current.show();
  }

  const showUpdateForm = (employeeId) => {
    dialogRef.current.show();
    getEmployeeById(employeeId);
  }

  useEffect(() =>{
    getAllEmployees();
  },[]);

  const getAllEmployees = () => {
    Service.getAllEmployees().then((response) =>{
      setEmployees(response.data);
      console.log(response.data);
    }).catch(error => {
      console.log(error);
    })
  }

  const getEmployeeById = (employeeId) => {
    Service.getEmployeeById(employeeId).then((response) =>{
      console.log(formRef);
      formRef.parseData(response.data);
      // return response.data;
    }).catch(error => {
      console.log(error);
    })
  }

  const deleteAction = (empId) => {
    Service.deleteEmployee(empId).then((response) =>{
      setDelFlag(!delFlag);
      console.log(response.data);
      getAllEmployees();
    }).catch(error => {
          console.log(error);
    })
  }

  const actions = (e) => {
    return (<div>
              <ButtonComponent cssClass='e-info' onClick={() => {showUpdateForm(e.employeeId)}} content="Update"/>&nbsp;
              <button className='btn btn-danger btn-sm' onClick={() => deleteAction(e.employeeId)}>Delete</button>
            </div>)
  }
  
  const pageSettings = { pageSize: 4 };
  return (
    <div>
      <div className="container">
      <div className='card m-4'> 
      <div className='card-body'>    
          <h2>List Of Empoyees</h2>
          <div style={{textAlign:"start"}}>
          {/* <Link to="/add-employee" className="btn btn-primary">Add Employee</Link> */}
          <ButtonComponent cssClass='e-info' onClick={() => {showAddForm()}} content="Add Employee"/>
          </div>          
          <br/>
          <GridComponent dataSource={employees} allowPaging={true} pageSettings={pageSettings} allowSorting={true} allowFiltering={true}>
            <ColumnsDirective>
                <ColumnDirective field='employeeId' headerText='Employee Id' textAlign='center' width='30'/>
                <ColumnDirective field='firstName' headerText='First Name' textAlign='center' width='30'/>
                <ColumnDirective field='lastName' headerText='Last Name' textAlign='center' width='30'/>
                <ColumnDirective field='emailId' headerText='Email Id' textAlign='center' width='30'/>
                <ColumnDirective headerText='Action' textAlign='center' allowFiltering={false} template={actions} width='30'/>
            </ColumnsDirective>
            <Inject services={[Page, Sort, Filter, Group]}/>
          </GridComponent>
      </div>   
      </div>
      </div>   
      <AddEmployee dialogRef={dialogRef} formRef={formRef} method={getAllEmployees}></AddEmployee>
    </div>
  )

  

  // return (
  //   <div>
  //     <h2>List Of Empoyees</h2>
  //     <Link to="/add-employee" className="btn btn-primary">Add Employee</Link>
  //     <br/>
  //     <br />
  //     <table className='table table-bordered table-striped'> 
  //       <thead>
  //           <tr>
  //               <th>Sr.No</th>
  //               <th>First Name</th>
  //               <th>Last Name</th>
  //               <th>Email Id</th>
  //           </tr>
  //       </thead>
  //       <tbody>
  //          { employees.map((employee,index)=>{
  //           return(
  //               <tr>
  //                   <td>{index+1}</td>
  //                   <td>{employee.firstName}</td>
  //                   <td>{employee.lastName}</td>
  //                   <td>{employee.emailId}</td>
                    
  //               </tr>
                
  //       )})}
  //       </tbody>
  //     </table>
  //   </div>
  // )
}

export default ListOfEmployees
