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

    public boolean checkLoginCredentials() {

        return true;
    }


    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("check-login/{account_name}/{password}")
    public boolean checkIfLoginAccountExist(@RequestBody @PathVariable String account_name, @RequestBody @PathVariable String password) {
        List<Account> accounts = accountRepository.getAccountsUsingAccountNameAndPassword(account_name, password);

        if(accounts.size() > 0) {
            return true;
        }
        return false;
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("get-id/{account_name}/{password}")
    public long getIdUsingAccountNameAndPassword(@RequestBody @PathVariable String account_name, @RequestBody @PathVariable String password) {
        long tempId = 0;
        tempId = accountRepository.getIdUsingAccountNameAndPassword(account_name, password);

        return tempId;
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("get-role/{account_name}/{password}")
    public String getRoleUsingAccountNameAndPassword(@RequestBody @PathVariable String account_name, @RequestBody @PathVariable String password) {
        String theRole = "";
        theRole = accountRepository.getRoleUsingAccountNameAndPassword(account_name, password);

        return theRole;
    }




    /*
    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("check-login")
    public boolean checkIfLoginAccountExist(@RequestBody Account account) {
        List<Account> accounts = accountRepository.getAccountsUsingAccountNameAndPassword(account.getAccountName(), account.getPassword());

        if(accounts.size() > 0) {
            return true;
        }
        return false;
    }

     */





}
