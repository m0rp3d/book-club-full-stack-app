package com.reactspringboot.bookclubbackend.dao;

import com.reactspringboot.bookclubbackend.entity.Forum;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin(origins = "http://localhost:3000")
public interface ForumRepository extends JpaRepository<Forum, Long> {
}
