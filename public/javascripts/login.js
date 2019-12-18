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

function afterLogin(username){
    $("#loginPopup").modal('hide');
    sessionStorage.username = username;
}