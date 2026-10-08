package com.example.demo.FinanceEntity;

import java.time.LocalDate;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class TransactionEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String username;
    private String description;
    private int amount;
    private String category;
    private String type;
    private LocalDate transactionDate;

    // NEW: stores the username who created this transaction
  


    // GETTER AND SETTER FOR USERNAME

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }


    // TYPE

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }


    // ID

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }


    // AMOUNT

    public int getAmount() {
        return amount;
    }

    public void setAmount(int amount) {
        this.amount = amount;
    }


    // CATEGORY

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }


    // DATE

    public LocalDate getTransactionDate() {
        return transactionDate;
    }

    public void setTransactionDate(LocalDate transactionDate) {
        this.transactionDate = transactionDate;
    }


    // DESCRIPTION

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}