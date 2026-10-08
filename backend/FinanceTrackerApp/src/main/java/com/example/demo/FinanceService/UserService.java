package com.example.demo.FinanceService;

import java.util.List;

import com.example.demo.FinanceEntity.UserEntity;

public interface UserService {
	
	UserEntity getUserByUsername(String username);

	String saveUser(UserEntity userEntity);
	
	String login (String username , String password);
	
	UserEntity getUser(long id);
	
	List<UserEntity> getallUser();
	
	void deleteUser (long id );

	String deleteallUser();

	
	
	
	
	
	
	
}
