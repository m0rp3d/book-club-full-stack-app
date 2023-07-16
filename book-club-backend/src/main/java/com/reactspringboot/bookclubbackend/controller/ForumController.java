package com.reactspringboot.bookclubbackend.controller;

import com.reactspringboot.bookclubbackend.dao.ForumRepository;
import com.reactspringboot.bookclubbackend.entity.Forum;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api")
public class ForumController {

    @Autowired
    private ForumRepository forumRepository;

    @GetMapping("/forum")
    public List<Forum> getAllForums() {
        return forumRepository.findAll();
    }
}
