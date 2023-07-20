package com.reactspringboot.bookclubbackend.controller;

import com.reactspringboot.bookclubbackend.dao.ReviewRepository;
import com.reactspringboot.bookclubbackend.entity.Review;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/")
public class ReviewController {

    @Autowired
    private ReviewRepository reviewRepository;

    // create review rest api
    @PostMapping("/review-add")
    public Review createReview(@RequestBody Review review) {
        return reviewRepository.save(review);
    }

    @GetMapping("/forum-reviews/{forumId}")
    public List<Review> getReviewsByForumId(@RequestBody @PathVariable Long forumId) {
        return reviewRepository.getReviewsUsingForumId(forumId);
    }
}