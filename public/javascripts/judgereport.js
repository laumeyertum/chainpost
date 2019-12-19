function judgereport(buttonobj, checkcross) {
    let postID = buttonobj.parentElement.parentElement.firstChild.nextSibling.firstChild.nextSibling.innerHTML;
    let username = sessionStorage.getItem("username");

    //checkcross is true for 'yes this is a repost' and false for 'no this is original'
    let like =
        {
            username: username,
            postId: postID,
            type: checkcross
        };

    $.ajax({
        type: 'POST',
        url: "policing/confirmRepost",
        data: like,
        dataType: 'json'
    });
}