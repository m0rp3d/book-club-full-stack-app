const validation = (account) => {

    let errors = {};

    if(!account.accountName) {
        errors.accountName = "Account name is required";
    }

    if(!account.password) {
        errors.password = "Password is required";
    } else if (account.password.length < 8) {
        errors.passowrd = "Password must be  eight characters or more.";
    }

    if(!account.email) {
        errors.email = "Email is required";
    } else if(!/\S+@\S+\.\S+/.test(account.email)) {
        errors.email = "Email is invalid."
    }



    return errors;
}

export default validation;