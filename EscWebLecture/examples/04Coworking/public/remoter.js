
var id = 0
$( document ).ready( ()=>{
    $.get("/initial", (data)=>{
        id = data["id"]
        console.log("Initial data: " + data)
    })
    $("#btn_hit").click( ()=>{
        $.get("/hit?id="+id, (data)=>{
            $("#panel").text( data )
        })
    })
})
