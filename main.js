let signup = () => {
    let name = document.querySelector("#fullname").value.trim();
    let email = document.querySelector("#email").value.trim();
    let number = document.querySelector("#phone").value.trim();
    let pass = document.querySelector("#password").value;
    let cpass = document.querySelector("#confirmPassword").value;

    if (name === "") {
        document.querySelector("#fullname").placeholder = "Please enter your name";
        return false;
    }

    if (number === "") {
        document.querySelector("#phone").placeholder = "Please enter your phone number";
        return false;
    }

    if (isNaN(number)) {
        document.querySelector("#phone").placeholder = "Phone number must be numeric";
        return false;
    }

    if (number.length !== 10) {
        document.querySelector("#phone").placeholder = "Phone number must be 10 digits";
        return false;
    }

    if (!(email.includes("@") && email.includes(".com"))) {
        document.querySelector("#email").placeholder = "Please enter a valid email";
        return false;
    }

    if (pass === "") {
        document.querySelector("#password").placeholder = "Please enter your password";
        return false;
    }

    if (pass.length < 8) {
        document.querySelector("#password").placeholder = "Password must be at least 8 characters";
        return false;
    }

    if (pass !== cpass) {
        document.querySelector("#confirmPassword").placeholder = "Passwords do not match";
        document.querySelector("#confirmPassword").value = "";
        document.querySelector("#confirmPassword").focus();
        return false;
    }

    // Check for strong password
    if (
        !/[0-9]/.test(pass) ||
        !/[A-Z]/.test(pass) ||
        !/[a-z]/.test(pass) ||
        !/[!@#$%^&*()_+]/.test(pass)
    ) {
        document.querySelector("#password").value = "";
        document.querySelector("#password").placeholder = "Use uppercase, lowercase, number & symbol";
        return false;
    }

    // All validations passed
    alert("Sign up successful!");
   
    window.location.href="login.html";
     return false;
}

let login=()=>{
    window.location.href="index.html";
    return false;
}