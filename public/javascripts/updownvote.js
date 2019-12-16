function updownvote(buttonobj, updown) {
  let postID = buttonobj.parentElement.previousElementSibling.valueOf().value;
  console.log(postID);
  // let username = localStorage.getItem('username');
  //TODO change to real username
  let username = "test1";
  //updown is true for an upvote and false for a downvote.

  let like =
      {
        username: username,
        postId: postID,
        type: updown,
      };

  $.ajax({
    type: 'POST',
    url: "/upDownVote",
    data: like,
    dataType: 'json',
    success: changeColor(updown),
  });
}

function changeColor(updown) {
//  change colour of button on success
}