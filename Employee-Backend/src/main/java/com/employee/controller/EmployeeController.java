package com.employee.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.employee.model.Employee;
import com.employee.repository.EmployeeRepo;

@RestController
@CrossOrigin("*")
@RequestMapping(value ="/api/v1")
public class EmployeeController {
	
	@Autowired
	EmployeeRepo repo;
	
	@GetMapping(value = "/getAllEmployees")
	public List<Employee> getAllEmployees(){
		List<Employee> empList = repo.findAll();
		return empList;
	}
	
	@PostMapping(value = "/create")
	public ResponseEntity<String> create(@RequestBody Employee employee){
		System.out.println(employee);
		repo.save(employee);
		return ResponseEntity.ok("Employee Created");
	}
	
	@GetMapping(value = "/employee/{employeeId}")
	public Employee getEmployeeById(@PathVariable("employeeId") String empId){
		Optional<Employee> emp = repo.findById(Integer.parseInt(empId));
		Employee employee = emp.orElse(null);
		return employee;
	}
	
	@PutMapping(value = "/update/{id}")
	public ResponseEntity<String> update(@PathVariable("id") String empId,@RequestBody Employee employee){		
		Optional<Employee> emp = repo.findById(Integer.parseInt(empId));
		Employee empl = emp.get();
		empl.setFirstName(employee.getFirstName());
		empl.setLastName(employee.getLastName());
		empl.setEmailId(employee.getEmailId());
		
		repo.save(empl);
		return ResponseEntity.ok("Employee Updated");
	}
	
	@DeleteMapping(value = "/delete/{id}")
	public ResponseEntity<String> delete(@PathVariable("id") String empId){
		repo.deleteById(Integer.parseInt(empId));
		return ResponseEntity.ok("Employee Deleted");
	}

}
