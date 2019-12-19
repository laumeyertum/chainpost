let base64;

function changeInputField() {
    let selected = $('#typeSelection input:radio:checked').val();
    let textinput = document.getElementById("inputTextdiv");
    let imageinput = document.getElementById("inputImagediv");
    if (selected === "text") {
        textinput.style.display = "block";
        imageinput.style.display = "none";
    } else {
        textinput.style.display = "none";
        imageinput.style.display = "block";
    }
}

// async function encodeImageFileAsURL() {
//     let file = document.getElementById('upload').files[0];
//     let reader = new FileReader();
//
//     await reader.addEventListener("load", async function() {
//         base64 = {fuckthis: await reader.result};
//         // document.getElementById('help').src = reader.result;
//         // base64 = document.getElementById('help').src;
//     }, false);
//
//     if (file) {
//         reader.readAsDataURL(file);
//     }
//     console.log("HEEEELP", base64);
// }

async function postpost() {
    console.log("postpost");
    let title = $('#postTitle').val();
    let username = sessionStorage.getItem("username");

    if (username) {
        if (title && (document.getElementById("postText").value.length > 0 || document.getElementById("upload").files.length === 1)) {
            let type = $('#typeSelection input:radio:checked').val();
            console.log(type);
            if (type === "image") {
                console.log("image");
                contentImage(username, title, type);
            } else if (type === "text") {
                contentText(username, title, type)
            } else {
                console.log('No picture or text selected');
            }
        } else {
            document.getElementById("postError").style.display = "block";
        }
    } else {
        $('#loginPopup').modal('show');
    }
}

function contentText(username, title, type) {
    let content = document.getElementById("postText").value;
    sendPostToServer(username, title, type, content);
}

function contentImage(username, title, type) {
    let file = document.getElementById('upload').files[0];
    let reader = new FileReader();
    let content;
    console.log("imagefunction");
    reader.addEventListener("load",  function() {
        console.log("listener");
        content = {content: reader.result};
        sendPostToServer(username, title, type, content);
    }, false);
    if (file) {
        reader.readAsDataURL(file);
    }
}

function sendPostToServer(username, title, type, content) {
    document.getElementById("postError").style.display = "none";
    console.log("here");
    let post =
        {
            username: username,
            title: title,
            type: type,
            content: content
        };
    console.log("here");
    $.ajax({
        type: 'POST',
        url: "/posting",
        data: post,
        dataType: 'json',
        success: function () {
            location.reload();
        }
    });
}