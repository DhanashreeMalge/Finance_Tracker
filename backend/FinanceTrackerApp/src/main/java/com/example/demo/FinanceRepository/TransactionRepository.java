package com.example.demo.FinanceRepository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.FinanceEntity.TransactionEntity;

public interface TransactionRepository
        extends JpaRepository<TransactionEntity, Integer> {

    List<TransactionEntity> findByUsername(String username);

    TransactionEntity findByIdAndUsername(int id, String username);
}