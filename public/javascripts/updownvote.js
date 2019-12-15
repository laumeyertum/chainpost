function updownvote(buttonobj, updown) {
    let postID = buttonobj.parentElement.previousSibling.val();
    let username = localStorage.getItem("username");
    //updown is true for an upvote and false for a downvote.

    let like =
        {
            username: username,
            postId: postID,
            type: updown
        };
    $.post(like);
}