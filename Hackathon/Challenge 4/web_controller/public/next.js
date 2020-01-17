var key;
var last_one;
$(document).ready(()=>{
    $.ajax({
        method:"get",
        url:"./update",
        success: function(data){
            key = data;
            console.log(key);
        }
    })
    $("#next").click(()=>{
        console.log("click");
        if(key.length>0){
            last_one = key.shift();
            $.ajax({
                method: "get",
                url: "./modify?remove="+last_one,
                success: function(data){
                    $("#info").text("#" + last_one + " remove successfully");
                    console.log("Remove" + key);
                    $("#now_playing").text(data);
                }
            })
        }
        else{
            $("#info").text("Queue empty!");
        }
    })
    $("#undo").click(()=>{
        key.unshift(last_one);
        $.ajax({
            method: "get",
            url: "./modify?add="+last_one,
            success: function(data){
                $("#info").text(last_one + "Undo successfully");
                console.log("Undo " + last_one);
                $("#now_playing").text(data);
            }
        })
    })
})

