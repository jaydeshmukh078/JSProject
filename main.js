let signup = () => {
    let fullname = document.querySelector("#fullname").value.trim();
    let email = document.querySelector("#email").value.trim();
    let number = document.querySelector("#phone").value.trim();
    let pass = document.querySelector("#password").value;
    let cpass = document.querySelector("#confirmPassword").value;

    if (fullname === "") {
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


    //local storage

    localStorage.setItem("Name", fullname)
    localStorage.setItem("Email", email)
    localStorage.setItem("Number", number)
    localStorage.setItem("Password", pass)
    window.location.reload()        //isse page bar bar refresh nhi krne pdta
    window.location.href = ""          //page jump and add

    // All validations passed
    alert("Sign up successful!");

    window.location.href = "login.html";
    return false;
}

// let rdata = () => {
//     localStorage.removeItem("Name")
//     window.location.reload()
//      window.localStorage.clear()  //for alll clear
// }

let login = () => {
    let email = document.querySelector("#email").value;
    let pass = document.querySelector("#password").value;

    // check email and password are same our not
    if (email != localStorage.getItem("Email")) {
        document.querySelector("#email").value = ""
        document.querySelector("#email").placeholder = "Invalid Email"
        return false;
    }

    // check local storage password same or not
    if (pass != localStorage.getItem("Password")) {
        document.querySelector("#password").value = ""
        document.querySelector("#password").placeholder = "Invalid Password"
        return false
    }


    window.location.href = "index.html";
    return false;
}

// Check user login our not
let checkk = () => {
    if (localStorage.getItem("name") == "") {
        window.location.href = "order.html";
    }
    else {
        window.location.href = "signup.html";
    }
}
