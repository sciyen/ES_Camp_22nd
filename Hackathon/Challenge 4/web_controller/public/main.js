// Function to send request back to server
// 將訊息透過get方法送回server(後端)
// 網址是/control，屬性為cmd
function send_control_req(val){
    $.ajax({
        method:"get",
        url:"./control?cmd="+val,
        success: function(data){
            console.log(data);
        }
    })
}

// Wait for page loaded
// 等待網頁都下載完後，再開始執行以下的程式碼
$(document).ready(()=>{
    // 當id為btn_shoot的物件被按下，傳送"shoot"的資料給Server(後端)
    $("#btn_shoot").click(()=>{
        send_control_req("shoot");
    })

    $.extend($.support, { touch: "ontouchend" in document });
    $(()=>{
        // Detect if the browser support touch screen
        // 確定有支援觸碰螢幕，否則就顯示警告訊息
        if (!$.support.touch) {
            $("body").html("<span>Not a touchable device!</span>");
            return;
        }
        // 取得畫布tag的DOM物件
        var canvas = document.getElementById("rocker_canvas");
        canvas.width  = $("#rocker_canvas").width();
        canvas.height = $("#rocker_canvas").height();

        // Top offsetted by upper object
        var offsetY = $("#rocker_canvas").position().top;
        var ctx = canvas.getContext("2d");
        
        // Get target center of the cursor
        // 計算畫線座標
        var centerX = canvas.width/2, centerY = canvas.height/2+offsetY;
        var rockerX = centerX, rockerY = centerY;

        // Define the maximum position of output
        const limitX=600;
        const limitY=600;

        // Determine if the player is pressing
        var slideBack = true;
        var counter = 0;

        // 按下觸碰螢幕引發的事件，讀取碰下的座標
        canvas.addEventListener("touchstart", function (e) {
            console.log(e.touches);
            rockerX = e.touches[0].pageX;   // event會包含觸碰的座標資訊
            rockerY = e.touches[0].pageY;
            slideBack = false;
        });
        // 按下觸碰螢幕並且滑動時引發的事件
        canvas.addEventListener("touchmove", function (e) {
            rockerX = e.touches[0].pageX;
            rockerY = e.touches[0].pageY;
            slideBack = false;
        });
        // 離開觸碰螢幕引發的事件
        canvas.addEventListener("touchend", function (e) {
            slideBack = true;
        });

        ctx.lineWidth = 3;
        // Cursor radius
        // 設定搖桿的半徑
        var radius = 40;
        
        // Draw the cursor
        // 畫出搖桿的function，參數為
        // 中心X座標, 中心Y座標, 填滿顏色
        function drawPoint(x, y, c){
            ctx.beginPath();                // 開始繪圖
            ctx.fillStyle = c;              // 填滿顏色
            ctx.strokeStyle = "#000";       // 邊框顏色
            ctx.arc(x, y-offsetY, radius, 0, 2 * Math.PI, true);    // 畫圓形
            ctx.fill();                     // 填滿
            ctx.stroke();                   // 結束繪圖
        }

        // Clear all object in the canvas
        // 畫布清除
        function clearCanvas() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        }

        // Update
        // 設定每50毫秒更新畫布
        setInterval(()=>{
            clearCanvas();

            // Limit the output
            // 計算搖桿在畫布上的座標，並且限制座標的範圍
            if(rockerY < centerY-limitY)
                rockerY = centerY-limitY;
            else if(rockerY > centerY+limitY)
                rockerY = centerY+limitY;

            if(rockerX < centerX-limitX)
                rockerX = centerX-limitX;
            else if(rockerX > centerX+limitX)
                rockerX = centerX+limitX;

            // Auto slide back using exponatial decay
            // 讓搖桿自動慢慢回到中心點
            if(slideBack){
                rockerX = centerX + (rockerX-centerX) * 0.85;
                rockerY = centerY + (rockerY-centerY) * 0.85;
            }

            // Draw Axis
            // 繪製參考軸線
            ctx.moveTo(centerX, 0);
            ctx.lineTo(centerX, canvas.height);         // 畫直線
            ctx.moveTo(0, centerY-offsetY);
            ctx.lineTo(canvas.width, centerY-offsetY);  // 畫直線
            ctx.stroke();

            // Draw Cursor
            // 畫出搖桿
            drawPoint(rockerX, rockerY, "red");
            counter = counter + 1;

            // Send data back to server
            // 每0.1秒將獨到的搖桿數值傳回server後端
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
