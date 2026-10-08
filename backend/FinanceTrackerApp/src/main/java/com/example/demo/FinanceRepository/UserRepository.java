
package com.example.demo.FinanceRepository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.FinanceEntity.UserEntity;

public interface UserRepository extends JpaRepository<UserEntity, Long> {

    // Login: check username and password
    UserEntity findByUsernameAndPassword(
            String username,
            String password
    );

    // Find user by username
    UserEntity findByUsername(String username);

    // Check whether phone number already exists
    

	boolean existsByPhone(long phone);
}
