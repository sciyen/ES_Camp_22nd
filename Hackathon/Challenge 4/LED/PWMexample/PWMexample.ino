void setup()
{
pinMode(ledPin, OUTPUT); // 設定 PWM角位:pin 3/5/6/10/11 為輸出腳位
}
// 下面這個 loop 會讓 LED 燈由暗變為一半亮度，最後變成最大亮度
void loop()
{
  //PWM輸出範圍:0~255
analogWrite(ledPin, 0);  // LED 不亮
delay (1000);
analogWrite(ledPin, 127);  // LED 一半亮度
delay (1000);
analogWrite(ledPin, 255);  // LED 最大亮度
delay (1000);
}
