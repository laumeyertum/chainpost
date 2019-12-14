function getBase64 (file,callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(file);
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

getBase64(fileObjectFromInput, function(base64Data){
    console.log("base 64 of file is",base64Data);//here you can have your code which uses base64 for its operation,//file to base64 by oneshubh
$('.postForm').on('submit', function () {
    let title = $('#postTitle').val();
    let username = localStorage.getItem("username");
    if (username && title && (document.getElementById("postText").value.length > 0 || document.getElementById("upload").val())) {
        let type = $('#typeSelection input:radio:checked').val();
        encodeImageFileAsURL();
        let content;
        if (type === "image") {
            content = base64;
        } else if (type === "text") {
            content = document.getElementById("postText").value;
        } else {
            console.log('No picture or text selected');
            return;
        }
        base64 = null;
        return [title, content, type, username];
    } else {
        $("loginPopup").show();
    }
});


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
});});

 */