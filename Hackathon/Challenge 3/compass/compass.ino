#include <Servo.h>

Servo myservo; // 建立Servo物件，控制伺服馬達

void setup()
{
  myservo.attach(9); // 連接數位腳位9，伺服馬達的訊號線
}

void loop()
{
  //move to direction 0
  myservo.write(0);
  delay(1000);
  //move to direction 5
  myservo.write(35);
  delay(500);
  //move to direction 4
  myservo.write(70);
  delay(500);
  //move to direction 3
  myservo.write(95);
  delay(500);
  //move to direction 2
  myservo.write(130);
  delay(500);
  //move to direction 1
  myservo.write(160);
  delay(500);
}    
