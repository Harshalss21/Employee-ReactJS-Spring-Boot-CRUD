import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ListOfEmployees from './components/ListOfEmployees';
import AddEmployee from './components/AddEmployee';
import { registerLicense } from '@syncfusion/ej2-base';
registerLicense('ORg4AjUWIQA/Gnt2VFhhQlJBfV5AQmBIYVp/TGpJfl96cVxMZVVBJAtUQF1hSn5XdENjXHtbdX1ST2Ze');

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<ListOfEmployees />}></Route>
          <Route exact path="/employees" element={<ListOfEmployees />}></Route>
          <Route path="/add-employee" element={<AddEmployee />}></Route>    
          <Route path="/edit-employee/:employeeId" element={<AddEmployee />}></Route>        
        </Routes>   
      </BrowserRouter>   
    </div>
  );
}

export default App;
