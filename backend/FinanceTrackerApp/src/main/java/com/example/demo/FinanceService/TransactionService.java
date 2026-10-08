package com.example.demo.FinanceService;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.demo.FinanceEntity.TransactionEntity;
import com.example.demo.FinanceRepository.TransactionRepository;

@Service
public class TransactionService {

    private final TransactionRepository repository;

    public TransactionService(TransactionRepository repository) {
        this.repository = repository;
    }

    // ADD
    public TransactionEntity addTransaction(
            TransactionEntity transaction) {

        return repository.save(transaction);
    }

    // GET USER TRANSACTIONS
    public List<TransactionEntity> getAllTransactions(
            String username) {

        return repository.findByUsername(username);
    }

    // GET BY ID
    public TransactionEntity getTransactionById(long id) {

        return repository.findById((int) id)
                .orElse(null);
    }

    // DELETE USER TRANSACTION
    public boolean deleteTransaction(
            int id,
            String username) {

        TransactionEntity transaction =
                repository.findByIdAndUsername(
                        id,
                        username
                );

        if (transaction == null) {
            return false;
        }

        repository.delete(transaction);

        return true;
    }
}