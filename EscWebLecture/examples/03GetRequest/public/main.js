
var div_hide = true
$( document ).ready( ()=>{
    $("#btn_send").click( ()=>{
        $.get("/hello", (data)=>{
            $("#panel").text( data )
            alert(data)
        })
    })
    
    $("#btn_show").click( ()=>{
        if( div_hide ){
            $("#div_invisible").removeClass("invisible")
            $("#btn_show").text("Click me to hide invisible div")
        }
        else{
            $("#div_invisible").addClass("invisible")
            $("#btn_show").text("Click me to Show invisible div")
        }
        div_hide = !div_hide
    })
})
