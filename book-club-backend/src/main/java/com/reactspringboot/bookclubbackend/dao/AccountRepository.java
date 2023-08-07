package com.reactspringboot.bookclubbackend.dao;

import com.reactspringboot.bookclubbackend.entity.Account;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
public interface AccountRepository extends JpaRepository<Account, Long> {


    @Query(value = "SELECT * FROM Account a where a.account_name = :account_name OR a.email = :email", nativeQuery = true)
    public List<Account> getAccountsUsingAccountNameAndEmail(@Param("account_name") String account_name, @Param("email") String email);

    @Query(value = "SELECT * FROM Account a where a.account_name = :account_name AND a.password = :password", nativeQuery = true)
    public List<Account> getAccountsUsingAccountNameAndPassword(@Param("account_name") String account_name, @Param("password") String password);

    @Query(value = "SELECT a.id FROM Account a where a.account_name = :account_name AND a.password = :password", nativeQuery = true)
    public long getIdUsingAccountNameAndPassword(@Param("account_name") String account_name, @Param("password") String password);

    @Query(value = "SELECT a.role FROM Account a where a.account_name = :account_name AND a.password = :password", nativeQuery = true)
    public String getRoleUsingAccountNameAndPassword(@Param("account_name") String account_name, @Param("password") String password);
}
