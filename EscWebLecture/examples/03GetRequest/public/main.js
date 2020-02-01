var div_hide = true
$( document ).ready( ()=>{
    $("#div_A").click( ()=>{
        if( div_hide ){
            $("#div_B").removeClass("invisible")
            $("#text_A").text("Click me to hide invisible div")
        }
        else{
            $("#div_B").addClass("invisible")
            $("#text_A").text("Click me to Show invisible div")
        }
        div_hide = !div_hide
    })
})
