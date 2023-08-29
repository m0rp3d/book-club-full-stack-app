const validation = (account) => {

    let errors = {};

    if(!account.accountName) {
        errors.accountName = "Account name is required";
    } else if (account.accountName.length < 3) {
        errors.accountName = "Account name must be 3 charcters or more."
    } else if (!/^[a-zA-Z0-9-_]+$/.test(account.accountName)) {
        errors.accountName = "Account name must be made of only digits, letters, underscore or -"
    }
    

    if(!account.password) {
        errors.password = "Password is required";
    } else if (account.password.length < 8) {
        errors.password = "Password must be  eight characters or more.";
    }

    if(!account.email) {
        errors.email = "Email is required";
    } else if(!/\S+@\S+\.\S+/.test(account.email)) {
        errors.email = "Email is invalid."
    }

    return errors;
}

export default validation;