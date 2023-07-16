package com.reactspringboot.bookclubbackend.entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name="Forum")
public class Forum {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id")
    private long id;

    @Column(name="book_name")
    private String bookName;

    @Column(name="book_image")
    private String bookImage;

    @Lob
    @Column(name="description")
    private String description;

    @JsonManagedReference
    @OneToMany(mappedBy = "forum", cascade = CascadeType.ALL)
    private List<Review> reviews;

    public Forum() {
    }

    public Forum(String bookName, String bookImage, String description, List<Review> reviews) {
        this.bookName = bookName;
        this.bookImage = bookImage;
        this.description = description;
        this.reviews = reviews;
    }

    public long getId() {
        return id;
    }

    public String getBookName() {
        return bookName;
    }

    public void setBookName(String bookName) {
        this.bookName = bookName;
    }

    public String getBookImage() {
        return bookImage;
    }

    public void setBookImage(String bookImage) {
        this.bookImage = bookImage;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public List<Review> getReviews() {
        return reviews;
    }

    public void setReviews(List<Review> reviews) {
        this.reviews = reviews;
    }
}
