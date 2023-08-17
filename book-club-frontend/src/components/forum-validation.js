const forumValidation = (forum) => {

    let errors = {};

    if(!forum.bookName) {
        errors.bookName = "Book name is required";
    } else if (!/^[a-zA-Z0-9-_ ]+$/.test(forum.bookName)) {
        errors.bookName = "Book name must be made of only digits, letters, underscore or '-'";
    }

    if(!forum.bookImage) {
        errors.bookImage = "Book image is required";
    }

    if(!forum.description) {
        errors.description = "Description is required";
    }

    return errors;
}

export default forumValidation;