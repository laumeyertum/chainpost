function sendUserInfo(){
    console.log("senduserinfo");
    let username = $('#enteredUsername').val();
    let password = $('#passphrase').val();
    console.log(username);

    let login =
        {
            username: username,
            password: password,
        };

    $.ajax({
        type: 'POST',
        url: "register/loginForm",
        data: login,
        dataType: 'json',
        success: afterLogin(username)
    });
}

function loginTest() {
    console.log("found function");
    if(typeof sessionStorage.username==='undefined'){
        $('#loginPopup').modal('show');
    } else {
        console.log("loggedin");
        window.location.href = '/profile';
    }
}

function afterLogin(username){
    $("#loginPopup").modal('hide');
    sessionStorage.username = username;
}