package com.reactspringboot.bookclubbackend.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;

import java.util.Date;

@Entity
@Table(name="review")
public class Review {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id")
    private long id;

    @Column(name="date_posted")
    @CreationTimestamp
    private Date datePosted;

    @Lob
    @Column(name="comment")
    private String comment;

    @Column(name="star_rating")
    private double starRating;


    //@JsonIgnore
    @ManyToOne
    @JoinColumn(name = "account_id",nullable = false, insertable = true, updatable = true)
    private Account account;


    //@JsonIgnore
    @ManyToOne
    @JoinColumn(name = "forum_id",nullable = false, insertable = true, updatable = true)
    private Forum forum;


    public Review() {
    }

    public Review(Date datePosted, String comment, double starRating, Account account, Forum forum) {
        this.datePosted = datePosted;
        this.comment = comment;
        this.starRating = starRating;
        this.account = account;
        this.forum = forum;
    }

    public long getId() {
        return id;
    }

    public Date getDatePosted() {
        return datePosted;
    }

    public void setDatePosted(Date datePosted) {
        this.datePosted = datePosted;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    public double getStarRating() {
        return starRating;
    }

    public void setStarRating(double starRating) {
        this.starRating = starRating;
    }

    //@JsonIgnore
    public Account getAccount() {
        return account;
    }

    public void setAccount(Account account) {
        this.account = account;
    }

    //@JsonIgnore
    public Forum getForum() {
        return forum;
    }

    public void setForum(Forum forum) {
        this.forum = forum;
    }
}

