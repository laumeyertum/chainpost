function report(buttonobj) {
    let postID = buttonobj.parentElement.parentElement.parentElement.parentElement.parentElement.previousSibling.previousSibling.firstChild.nextSibling.nextSibling.nextSibling.innerHTML;
    let proofID = document.getElementById("proofID").value;
    // let username = localStorage.getItem('username');
    //TODO change to real username
    let username = "test1";
    let report =
        {
            username: username,
            originalId: proofID,
            repostId: postID
        };

    $.ajax({
        type: 'POST',
        url: "/report",
        data: report,
        dataType: 'json',
        success: function () { $('#reportModal').hide() },
    });
}