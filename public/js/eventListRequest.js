
function deleteEvent(id, event){
    $.ajax({
        method: "post",
        url: "http://localhost:8080/event/delete",
        data: JSON.stringify({_id:id}),
        contentType:"application/json",
        dataType: "text",
        success: function (result) {
            console.log(result)
            // console.log(speaker);
            $(event).parents('tr').remove();
        },
        error: function (error) {
            console.log(error)
        }
    
    
    });
    }