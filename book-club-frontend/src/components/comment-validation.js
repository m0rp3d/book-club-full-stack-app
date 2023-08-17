const commentValidation = (review) => {

    let errors = {};

    if(!review.comment) {
        errors.comment = "Comment is required";
    } 

    return errors;
}

export default commentValidation;