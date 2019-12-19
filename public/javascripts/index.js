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

/*
function previewFile() {
  var preview = document.querySelector('img');
  var file    = document.querySelector('input[type=file]').files[0];
  var reader  = new FileReader();

  reader.addEventListener("load", function () {
    preview.src = reader.result;
  }, false);

  if (file) {
    reader.readAsDataURL(file);
  }
}
 */

async function encodeImageFileAsURL() {
    let file = document.getElementById('upload').files[0];
    let reader = new FileReader();

    await reader.addEventListener("load", async function() {
        base64 = {fuckthis: await reader.result};
        // document.getElementById('help').src = reader.result;
        // base64 = document.getElementById('help').src;
    }, false);

    if (file) {
        reader.readAsDataURL(file);
    }
    console.log("HEEEELP", base64);
}

async function postpost() {
    let title = $('#postTitle').val();
    let username = sessionStorage.getItem("username");

    if (username) {
        if (title && (document.getElementById("postText").value.length > 0 || document.getElementById("upload").files.length === 1)) {
            let type = $('#typeSelection input:radio:checked').val();
            let content;
            if (type === "image") {
                await encodeImageFileAsURL();
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