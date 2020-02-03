void setup() {
  // 開啟 Serial port, 通訊速率為 9600 bps
  Serial.begin(9600);
  // 初始化 LED 接腳
  for (int thisPin = 2; thisPin <= 6; thisPin++) {
    pinMode(thisPin, OUTPUT);
  }      
}
void loop() {
  // 檢查是否有資料可供讀取
  if (Serial.available() > 0) { //當監控視窗可以讀取資料時
    // 讀取進來的 byte
    int inByte = Serial.read();
    // 根據收到的字元決定要打開哪顆 LED

    /*if( ){
               //改這裡喔ㄎ
    }
    else if( ){
               //改這裡喔ㄎㄎ
    }
    else if( ){
               //改這裡喔ㄎㄎㄎ
    }
    else{
               //改這裡喔ㄎㄎㄎㄎ
    }
    */
    
  }
}
