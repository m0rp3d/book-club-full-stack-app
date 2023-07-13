package com.reactspringboot.bookclubbackend.dao;

import com.reactspringboot.bookclubbackend.entity.Forum;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ForumRepository extends JpaRepository<Forum, Long> {
}
