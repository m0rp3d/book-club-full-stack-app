package com.reactspringboot.bookclubbackend.dao;

import com.reactspringboot.bookclubbackend.entity.Forum;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.Optional;

@CrossOrigin(origins = "http://localhost:3000")
public interface ForumRepository extends JpaRepository<Forum, Long> {

    //public Optional<Forum> findById(Long id);
    //http://localhost:8080/api/forums?id=1
}
