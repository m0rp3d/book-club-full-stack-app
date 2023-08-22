package com.reactspringboot.bookclubbackend.controller;

import com.reactspringboot.bookclubbackend.dao.ReviewRepository;
import com.reactspringboot.bookclubbackend.entity.Review;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/")
public class ReviewController {

    @Autowired
    private ReviewRepository reviewRepository;


    // create review rest api
    //@CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/review-add")
    public Review createReview(@RequestBody Review review) {
        return reviewRepository.save(review);
    }

    @GetMapping("/forum-reviews/{forumId}")
    public List<Review> getReviewsByForumId(@RequestBody @PathVariable Long forumId) {
        return reviewRepository.getReviewsUsingForumId(forumId);
    }

    @GetMapping("/account-reviews/{accountId}")
    public List<Review> getReviewsByAccountId(@RequestBody @PathVariable Long accountId) {
        return reviewRepository.getReviewsUsingAccountId(accountId);
    }

    @DeleteMapping("/review/{id}")
    public void deleteReviewById(@PathVariable Long id) {
        reviewRepository.deleteById(id);
    }

    @PutMapping("/review-update/{id}")
    public void updateReviewById(@RequestBody Review newReview, @PathVariable Long id) {
        Review tempReview = reviewRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Review with id doesn't exist: " + id));

        tempReview.setComment(newReview.getComment());

        reviewRepository.save(tempReview);
    }

    @GetMapping("/get-review/{id}")
    public Review getReviewById(@PathVariable Long id) {
        return reviewRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Review with id doesn't exist: " + id));
    }

}