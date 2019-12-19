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

function encodeImageFileAsURL() {
    let filesSelected = document.getElementById("inputFileToLoad").files;
    if (filesSelected.length === 0) {
        let fileToLoad = filesSelected[0];
        let fileReader = new FileReader();
        fileReader.onload = function(fileLoadedEvent) {
            let srcData = fileLoadedEvent.target.result; // <--- data: base64
            let newImage = document.createElement('img');
            newImage.src = srcData.toString();
            base64 = newImage.outerHTML;
        };
        fileReader.readAsDataURL(fileToLoad);
    }
}

function postpost() {
    let title = $('#postTitle').val();
    let username = sessionStorage.getItem("username");
    console.log("1", document.getElementById("upload"));
    console.log("2", document.getElementById("upload").val());

    if (username) {
        if (title && (document.getElementById("postText").value.length > 0 || document.getElementById("upload").files.length === 1)) {
            let type = $('#typeSelection input:radio:checked').val();
            let content;
            if (type === "image") {
                encodeImageFileAsURL();
                content = base64;
            } else if (type === "text") {
                content = document.getElementById("postText").value;
            } else {
                console.log('No picture or text selected');
                return;
            }
            base64 = null;
            document.getElementById("postError").style.display = "none";

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
        } else {
            document.getElementById("postError").style.display = "block";
        }
    } else {
        $('#loginPopup').modal('show');
    }
}


/*
$(document).ready(async function (e) {
    $('#postForm').on('submit',(async function(e) {
        e.preventDefault();
        let formData = await getBase64(this);

        $.ajax({
            type:'POST',
            url: $(this).attr('action'),
            content: formData,
            username: ,
            type: ,
            title: $('#postTitle').val(),
            cache:false,
            contentType: false,
            processData: false,
            success:function(data){
                console.log("success");
                console.log(data);
            },
            error: function(data){
                console.log("error");
                console.log(data);
            }
        });
    }));
});

 */