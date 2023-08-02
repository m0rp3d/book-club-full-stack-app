package com.reactspringboot.bookclubbackend.controller;

import com.reactspringboot.bookclubbackend.dao.AccountRepository;
import com.reactspringboot.bookclubbackend.entity.Account;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/")
public class AccountController {

    @Autowired
    private AccountRepository accountRepository;

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/account-add")
    public Account createAccount(@RequestBody Account account) {
        return accountRepository.save(account);
    }

    /*
    @GetMapping("check-account/{account_name}/{email}")
    public List<Account> checkIfAccountExists(@RequestBody @PathVariable String account_name, @RequestBody @PathVariable String email) {
        return accountRepository.getAccountsUsingAccountNameAndEmail(account_name, email);
    }

     */

    // check if account with account_name and email exists
    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("check-account/{account_name}/{email}")
    public boolean checkIfAccountExists(@RequestBody @PathVariable String account_name, @RequestBody @PathVariable String email) {
        List<Account> accounts = accountRepository.getAccountsUsingAccountNameAndEmail(account_name, email);

        if(accounts.size()< 1) {
            return false;
        }
        return true;
    }
}
