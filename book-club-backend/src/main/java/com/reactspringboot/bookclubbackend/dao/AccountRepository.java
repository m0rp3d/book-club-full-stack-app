package com.reactspringboot.bookclubbackend.dao;

import com.reactspringboot.bookclubbackend.entity.Account;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AccountRepository extends JpaRepository<Account, Long> {
}
