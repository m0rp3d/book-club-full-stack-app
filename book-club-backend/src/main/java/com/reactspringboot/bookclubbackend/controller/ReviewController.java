package com.reactspringboot.bookclubbackend.controller;

import com.reactspringboot.bookclubbackend.dao.ReviewRepository;
import com.reactspringboot.bookclubbackend.entity.Review;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
}