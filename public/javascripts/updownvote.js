function updownvote(buttonobj, updown) {
  let postID = buttonobj.parentElement.previousSibling.previousSibling.innerHTML;
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
    success: changeColor(updown),
    dataType: dataType,
  });
}

function changeColor(updown) {
//  chage colour of button on success
}