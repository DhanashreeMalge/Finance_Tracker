package com.example.demo.FinanceController;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.FinanceEntity.UserEntity;
import com.example.demo.FinanceService.UserService;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/auth")

public class UserController {

	@Autowired
	UserService userService;

	// CREATE USER / SIGNUP
	@PostMapping("/singup")
	public String saveUser(@RequestBody UserEntity userEntity) {

		userService.saveUser(userEntity);

		return "User created successfully";
	}

	// LOGIN
	@PostMapping("/login")
	public String login(@RequestBody UserEntity userEntity) {

		return userService.login(userEntity.getUsername(), userEntity.getPassword());
	}

	@GetMapping("/profile")
	public UserEntity getProfile(@RequestParam String username) {

		return userService.getUserByUsername(username);
	}

	@GetMapping("/{id}")
	UserEntity getUser(@PathVariable int id) {

		return userService.getUser(id);

	}

// get all id 
	@GetMapping("/all")
	List<UserEntity> getallUser() {
		return userService.getallUser();
	}

	// delete only id

	@DeleteMapping("/{id}")
	public void deleteUser(@PathVariable int id) {
		userService.deleteUser(id);
	}

// delete all user
	@DeleteMapping("/all")
	String deleteallUser() {
		return userService.deleteallUser();
	}

}