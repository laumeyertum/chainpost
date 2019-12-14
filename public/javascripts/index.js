function getBase64 (file,callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(file);
}

getBase64(fileObjectFromInput, function(base64Data){
    console.log("base 64 of file is",base64Data);//here you can have your code which uses base64 for its operation,//file to base64 by oneshubh
});

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