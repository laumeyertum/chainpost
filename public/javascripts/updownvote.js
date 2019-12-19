function updownvote(buttonobj, updown) {
  let postID = buttonobj.parentElement.parentElement.firstChild.nextSibling.nextSibling.nextSibling.innerHTML;
  console.log(postID);
  let username = sessionStorage.getItem("username");

  //updown is true for an upvote and false for a downvote.

  let like =
      {
        username: username,
        postId: postID,
        type: updown
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