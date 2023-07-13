package com.reactspringboot.bookclubbackend.dao;

import com.reactspringboot.bookclubbackend.entity.Review;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReviewRepository extends JpaRepository<Review, Long> {
}
