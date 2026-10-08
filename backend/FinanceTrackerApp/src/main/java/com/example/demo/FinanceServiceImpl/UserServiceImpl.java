
package com.example.demo.FinanceServiceImpl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.FinanceEntity.UserEntity;
import com.example.demo.FinanceRepository.UserRepository;
import com.example.demo.FinanceService.UserService;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userrepository;


    // =========================
    // SAVE / REGISTER USER
    // =========================

    @Override
    public String saveUser(UserEntity userEntity) {

        // Check if phone number already exists
        if (userrepository.existsByPhone(userEntity.getPhone())) {

            return "Phone number already exists";
        }

        // Save user in database
        userrepository.save(userEntity);

        return "User created successfully";
    }


    // =========================
    // LOGIN USER
    // =========================

    @Override
    public String login(String username, String password) {

        UserEntity user =
                userrepository.findByUsernameAndPassword(
                        username,
                        password
                );

        if (user != null) {

            return "Login successful";
        }

        return "Invalid username or password";
    }


    // =========================
    // GET ALL USERS
    // =========================

    @Override
    public List<UserEntity> getallUser() {

        return userrepository.findAll();
    }


    // =========================
    // GET USER BY ID
    // =========================

    @Override
    public UserEntity getUser(long id) {

        Optional<UserEntity> user =
                userrepository.findById(id);

        return user.orElse(null);
    }


    // =========================
    // DELETE USER
    // =========================

    @Override
    public void deleteUser(long id) {

        userrepository.deleteById(id);
    }


    // =========================
    // DELETE ALL USERS
    // =========================

    @Override
    public String deleteallUser() {

        userrepository.deleteAll();

        return "All users deleted";
    }

    @Override
    public UserEntity getUserByUsername(
            String username) {

        return userrepository.findByUsername(username);
    }
}

