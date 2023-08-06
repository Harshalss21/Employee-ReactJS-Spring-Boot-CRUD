package com.employee;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.CrossOrigin;

import com.employee.model.Employee;
import com.employee.repository.EmployeeRepo;


@SpringBootApplication
public class EmployeeBackendApplication implements CommandLineRunner{

	public static void main(String[] args) {
		SpringApplication.run(EmployeeBackendApplication.class, args);
	}

	@Autowired
	EmployeeRepo repo;
	
	@Override
	public void run(String... args) throws Exception {
		Employee emp1 = new Employee();
		emp1.setFirstName("Harshal");
		emp1.setLastName("Sharma");
		emp1.setEmailId("harshal@gmail.com");
		repo.save(emp1);
		
		Employee emp2 = new Employee();
		emp2.setFirstName("John");
		emp2.setLastName("Doe");
		emp2.setEmailId("John@gmail.com");
		repo.save(emp2);
	}

}
