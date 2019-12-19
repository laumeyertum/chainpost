function report(buttonobj) {
    let postID = buttonobj.parentElement.parentElement.parentElement.parentElement.parentElement.previousSibling.previousSibling.firstChild.nextSibling.nextSibling.nextSibling.innerHTML;

  console.log(postID);
    let proofID = document.getElementById("proofID").value;
    console.log(proofID);
    let username = sessionStorage.getItem("username");
    let report =
        {
            username: username,
            originalId: proofID,
            repostId: postID
        };

    $.ajax({
        type: 'POST',
        url: "report",
        data: report,
        dataType: 'json',
        success: function () { $('#reportModal').modal('hide') },
    });
}