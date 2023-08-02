const validation = (account) => {

    let errors = {};

    if(!account.accountName) {
        errors.accountName = "Account name is required";
    }

    if(!account.password) {
        errors.password = "Password is required";
    } else if (account.password.length < 8) {
        errors.passowrd = "Password must be more than five characters.";
    }

    if(!account.email) {
        errors.email = "Email is required";
    }


    return errors;
}

export default validation;