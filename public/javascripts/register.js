let password = document.getElementById("psw")
    , confirm_password = document.getElementById("psw-repeat");
let address = document.getElementById("address");
let re = /[0-9A-Fa-f]{6}/g;

function validatePassword(){
    if(password.value != confirm_password.value) {
        confirm_password.setCustomValidity("Passwords Don't Match");
    } else {
        confirm_password.setCustomValidity('');
    }
}

function validateAddress(){
    console.log("adress");
    if((address.value.size!=40) || (!re.test(address.value))){
        console.log("invalid address");
        address.setCustomValidity("Invalid address format");
    }else{
        address.setCustomValidity('');
    }
}

password.onchange = validatePassword;
confirm_password.onkeyup = validatePassword;
address.onchange = validateAddress;
address.onkeyup = validateAddress;