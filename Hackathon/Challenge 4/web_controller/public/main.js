// Function to send request back to server
function send_control_req(val){
    $.ajax({
        method:"get",
        url:"./control?cmd="+val,
        success: function(data){
            console.log(data);
        }
    })
}
$(document).ready(()=>{
    $.extend($.support, { touch: "ontouchend" in document });
    
    $("#btn_shoot").click(()=>{
        send_control_req("shoot");
    })

    $(()=>{
        // Detect if the browser support touch screen
        if (!$.support.touch) {
            $("body").html("<span>Not a touchable device!</span>");
            return;
        }
        var canvas = document.getElementById("rocker_canvas");
        canvas.width  = $("#rocker_canvas").width();
        canvas.height = $("#rocker_canvas").height();

        // Top offsetted by upper object
        var offsetY = $("#rocker_canvas").position().top;
        var ctx = canvas.getContext("2d");
        
        // Get target center of the cursor
        var centerX = canvas.width/2, centerY = canvas.height/2+offsetY;
        var rockerX = centerX, rockerY = centerY;

        // Define the maximum position of output
        const limitX=600;
        const limitY=600;

        // Determine if the player is pressing
        var slideBack = true;
        var counter = 0;
        canvas.addEventListener("touchstart", function (e) {
            console.log(e.touches);
            rockerX = e.touches[0].pageX;
            rockerY = e.touches[0].pageY;
            slideBack = false;
        });
        canvas.addEventListener("touchmove", function (e) {
            rockerX = e.touches[0].pageX;
            rockerY = e.touches[0].pageY;
            slideBack = false;
        });
        canvas.addEventListener("touchend", function (e) {
            slideBack = true;
        });

        ctx.lineWidth = 3;
        // Cursor radius
        var radius = 40;
        
        // Draw the cursor
        function drawPoint(x, y, c){
            ctx.beginPath();
            ctx.fillStyle = c;
            ctx.strokeStyle = "#000";
            ctx.arc(x, y-offsetY, radius, 0, 2 * Math.PI, true);
            ctx.fill();
            ctx.stroke();
        }

        // Clear all object in the canvas
        function clearCanvas() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        }

        // Update
        setInterval(()=>{
            clearCanvas();

            // Limit the output
            if(rockerY < centerY-limitY)
                rockerY = centerY-limitY;
            else if(rockerY > centerY+limitY)
                rockerY = centerY+limitY;

            if(rockerX < centerX-limitX)
                rockerX = centerX-limitX;
            else if(rockerX > centerX+limitX)
                rockerX = centerX+limitX;

            // Auto slide back using exponatial decay
            if(slideBack){
                rockerX = centerX + (rockerX-centerX) * 0.85;
                rockerY = centerY + (rockerY-centerY) * 0.85;
            }

            // Draw Axis
            ctx.moveTo(centerX, 0);
            ctx.lineTo(centerX, canvas.height);
            ctx.moveTo(0, centerY-offsetY);
            ctx.lineTo(canvas.width, centerY-offsetY);
            ctx.stroke();

            // Draw Cursor
            drawPoint(rockerX, rockerY, "red");
            counter = counter + 1;

            // Send data back to server
            if(counter>=2){
                // Calculate the percentage of output
                var delX = 200*(rockerX-centerX)/limitX;
                var delY = -200*(rockerY-centerY)/limitY;
                var posStr=(Math.round(delX*100)/100).toString(10) + "," + (Math.round(delY*100)/100).toString(10);
                // It only send request when the cursor is moving
                if(Math.abs(delX)+Math.abs(delY)>0.02)
                    send_control_req(posStr); 
                counter=0;
            }
        }, 50);
    })
})


/*
$("#btn_forward").on("touchstart", ()=>{
    state = "forward"; 
})
$("#btn_forward").on("ontouchend",()=>{
    state = "stop"; 
})
$("#btn_backward").click(()=>{
    send_control_req("backward"); 
})
$("#btn_right").click(()=>{
    send_control_req("right"); 
})
$("#btn_left").click(()=>{
    send_control_req("left"); 
})
})

setInterval(send_control_req(state, 100));
 */
