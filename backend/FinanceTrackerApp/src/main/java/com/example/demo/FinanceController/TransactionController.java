package com.example.demo.FinanceController;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.FinanceEntity.TransactionEntity;
import com.example.demo.FinanceService.TransactionService;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/transactions")
public class TransactionController {

    private final TransactionService service;

    public TransactionController(TransactionService service) {
        this.service = service;
    }


    // ADD TRANSACTION
    @PostMapping("/addTransaction")
    public TransactionEntity addTransaction(
            @RequestBody TransactionEntity transaction) {

        return service.addTransaction(transaction);
    }


    // GET ONLY LOGGED-IN USER'S TRANSACTIONS
    @GetMapping("/getall")
    public List<TransactionEntity> getAllTransactions(
            @RequestParam String username) {

        return service.getAllTransactions(username);
    }


    // GET TRANSACTION BY ID
    @GetMapping("/{id}")
    public TransactionEntity getTransactionById(
            @PathVariable long id) {

        return service.getTransactionById(id);
    }


    @DeleteMapping("/{id}")
    public String deleteTransaction(
            @PathVariable Integer id,
            @RequestParam String username) {

        boolean deleted =
                service.deleteTransaction(id, username);

        if (deleted) {
            return "Transaction deleted successfully";
        }

        return "Transaction not found";
    }
}