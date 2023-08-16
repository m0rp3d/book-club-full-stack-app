package com.reactspringboot.bookclubbackend.controller;

import com.reactspringboot.bookclubbackend.dao.ForumRepository;
import com.reactspringboot.bookclubbackend.entity.Forum;
import com.reactspringboot.bookclubbackend.entity.Review;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.web.bind.annotation.*;

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

    @PostMapping("/forum-add")
    public Forum createForum(@RequestBody Forum forum) {
        return forumRepository.save(forum);
    }

    @DeleteMapping("/forum/{id}")
    public void deleteForumById(@PathVariable Long id) {
        forumRepository.deleteById(id);
    }

    @PutMapping("/forum-update/{id}")
    public void updateForumById(@RequestBody Forum newForum, @PathVariable Long id) {
        Forum tempForum = forumRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Forum with id doesn't exist: " + id));

        tempForum.setBookName(newForum.getBookName());
        tempForum.setBookImage(newForum.getBookImage());
        tempForum.setDescription(newForum.getDescription());

        forumRepository.save(tempForum);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/get-forum/{id}")
    public Forum getForumById(@PathVariable Long id) {
        return forumRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Forum with id doesn't exist: " + id));
    }


}
