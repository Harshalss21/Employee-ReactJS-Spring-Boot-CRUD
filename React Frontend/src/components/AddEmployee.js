import React, { useEffect } from 'react'
import { DialogComponent } from '@syncfusion/ej2-react-popups';
import Service from '../services/Service';
import { useForm ,Controller} from 'react-hook-form';
import { TextBoxComponent , FormValidator} from "@syncfusion/ej2-react-inputs";
import { ErrorMessage } from "@hookform/error-message";
import {
  ButtonComponent,
 } from "@syncfusion/ej2-react-buttons";
 import './common.css';

var empId;
let formObject;
const AddEmployee = (props) => {

    console.log(props.formRef)

  // const [firstName,setFirstName] = useState();
  // const [lastName,setLastName] = useState();
  // const [emailId,setEmailId] = useState();

  const {register,handleSubmit,reset,control, formState: { errors }} = useForm({criteriaMode: "all"});
//   const history = useNavigate();
  // const {employeeId} = useParams();
  // const [emp,setEmp] = useState({firstName:"",lastName:"",emailId:"",employeeId:""});

const formTitle = () => {
  if(empId){
    return <h2 className='text-center'>Edit Employee</h2>
  }else{
    return <h2 className='text-center'>Add Employee</h2>
  }
}


  var saveEmployee = (e) =>{ 
    // e.preventDefault();

    // const submittedData = Object.fromEntries(new FormData(e));
    // console.log("submittedData", submittedData)

    // var employee = {firstName,lastName,emailId};
    // console.log(employee);
    // formObject.validate();
    if(empId){
        Service.updateEmployee(empId,e).then((response) =>{
            console.log(response.data)
            closeDialog();
            empId = ""
            props.method();
        })
    }else{
        Service.createEmployee(e).then((response) => {
            console.log(response.data)
            closeDialog();
            props.method();
        }).catch(error =>{
            console.log(error);
        })
     }
    reset({
      firstName: "",
      lastName: "",
      emailId: ""
   })
    console.log(e);
  }

  const parseData = (formData) => {
    console.log(formData);  
    empId = formData.employeeId;  
    reset({
       firstName: formData.firstName,
       lastName: formData.lastName,
       emailId: formData.emailId
    })
    // setEmp({formData});
    // setFirstName(formData.firstName);
    // setLastName(formData.lastName);
    // setEmailId(formData.emailId);
  }
  props.formRef.parseData = parseData;

 

  const closeDialog = () => {
    reset({
      firstName: "",
      lastName: "",
      emailId: ""
   })
    props.dialogRef.current.hide();
  }

  const onSubmit = (data) => console.log(data);

  const addEmployeeForm = () => {
    return (
    
     <div>
      <form onSubmit={handleSubmit(saveEmployee)} id="form1">
        <section> 
        <div className='row mb-2'>
          <div className='col-sm-2'>     
         <label>First Name</label>
         </div> 
         <div className='col-sm-10'> 
         <Controller
           name="firstName"
           control={control}
           rules={{ required: "required" }}
           defaultValue=""
           render={({ field }) => (
             <TextBoxComponent
               placeholder="Enter your First Name"
               // floatLabelType="Auto"
               change={({ value }) => field.onChange(value)}
               value={field.value}
               data-msg-containerid="errorFirstName"
             />
           )}
         />       
         </div>                 
         </div>  
         <div id="errorFirstName">
          <ErrorMessage errors={errors} name="firstName" />     
          <ErrorMessage
            errors={errors}
            name="firstName"
            render={({ message }) => <p>{message}</p>}
            />
        </div>                 
       </section>
       
       <section> 
       <div className='row mb-2'>
          <div className='col-sm-2'>        
         <label>Last Name</label>
         </div> 
         <div className='col-sm-10'> 
         <Controller
           name="lastName"
           control={control}
           rules={{ required: {
                               value : true,
                               message : "This field is required"
                              }}}
           defaultValue=""
           render={({ field }) => (
             <TextBoxComponent
               placeholder="Enter your Last Name"
               // floatLabelType="Auto"
               change={({ value }) => field.onChange(value)}
               value={field.value}
             />
           )}
         />  
         {errors.lastName && errors.lastName.type === "required" && (
            <p className="errorMsg">Email is required.</p>
          )}
         </div>          
         </div>
         {/* <ErrorMessage errors={errors} name="lastName" />
         <ErrorMessage
        errors={errors}
        name="lastName"
        render={({ message }) => <p>{message}</p>} 
         />          */}
       </section>

       <section>       
       <div className='row mb-2'>
          <div className='col-sm-2'>    
         <label>Email Id</label>
         </div> 
         <div className='col-sm-10'> 
         <Controller
           name="emailId"
           control={control}
           rules={{ required: "This is required" }}
           defaultValue=""
           render={({ field }) => (
             <TextBoxComponent
               placeholder="Enter your Email Id"
               // floatLabelType="Auto"
               change={({ value }) => field.onChange(value)}
               value={field.value}
             />
           )}
         /> 
         </div> 
         </div> 
         <ErrorMessage errors={errors} name="emailId" />    
         <ErrorMessage
        errors={errors}
        name="emailId"
        render={({ message }) => <p>{message}</p>}
      />           
       </section>
       <div style={{ textAlign: "center" }}>
         <ButtonComponent type="submit" cssClass="e-success">
           Submit
         </ButtonComponent>
         <ButtonComponent type="reset" cssClass="e-danger" onClick={closeDialog}>
           Cancel
         </ButtonComponent>
       </div>
       </form>
    </div>
    )
  }

 

return ( 
    <div>
        <DialogComponent
               width={600}
               isModal={true}
               showCloseIcon={true}
               closeOnEscape={true}
               visible={false}
               close={closeDialog}
               header={formTitle}
               content={addEmployeeForm}
               ref={props.dialogRef}
               //cssClass="dialog"
             />
    </div>
      
  )
}

export default AddEmployee
