package com.reactspringboot.bookclubbackend.dao;

import com.reactspringboot.bookclubbackend.entity.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
public interface ReviewRepository extends JpaRepository<Review, Long> {

    // get id for the food item using name
    @Query(value = "SELECT * FROM Review r where r.forum_id = :forum_id", nativeQuery = true)
    public List<Review> getReviewsUsingForumId(@Param("forum_id") Long forum_id);
}
