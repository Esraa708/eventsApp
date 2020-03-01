
function deleteSpeaker(id, speaker){
$.ajax({
    method: "post",
    url: "http://localhost:8080/speaker/delete",
    data: JSON.stringify({_id:id}),
    contentType:"application/json",
    dataType: "text",
    success: function (result) {
        console.log(result)
        console.log(speaker);
        $(speaker).parents('tr').remove();
    },
    error: function (error) {
        console.log(error)
    }


});
}