/*
 * Copyright 2019, NCKU ES Camp, All rights reserved.
 * Auther: Yencheng, Chu
 */
#include <Servo.h>
#include "util.h"

// Pins Setting
#define MOTOT_PIN_RIGHT_A 3
#define MOTOT_PIN_RIGHT_B 4
#define MOTOT_PIN_RIGHT_EN 5
#define MOTOT_PIN_LEFT_A 8
#define MOTOT_PIN_LEFT_B 7
#define MOTOT_PIN_LEFT_EN 6

#define MIC_PIN A0

// Parameters Setting
#define TURNNING_RATIO 2

void setMotor(int cVel, int aVel);
Servo myservo;

Motor motorRight(MOTOT_PIN_RIGHT_A, MOTOT_PIN_RIGHT_B, MOTOT_PIN_RIGHT_EN);
Motor motorLeft( MOTOT_PIN_LEFT_A,  MOTOT_PIN_LEFT_B,  MOTOT_PIN_LEFT_EN);
Command rasp(9600);
Throttle thr;

void setup()
{
  pinMode(MIC_PIN, INPUT);
  setMotor(0, 0);
  myservo.attach(9);
  myservo.write(0);
  Serial.begin(9600);
}
void loop()
{
  rasp.waitForData();
    /*Serial.print(rasp.cmdBuffer[0]);
    Serial.print(", ");
    Serial.print(rasp.cmdBuffer[1]);
    Serial.print(", ");
    Serial.println(rasp.cmdBuffer[2]);*/
  //setMotor(100, 0);
  switch( rasp.cmdBuffer[0] ){
    case 1:  // Shoot
      Serial.println("Shoot");
      setMotor(0, 0);
      delay(1000);
      myservo.write(180);
      delay(2000);
      myservo.write(0);
      /*for(int i = 180; i >= 0; i-=1){
        myservo.write(i);// 使用write，傳入角度，從180度轉到0度
        delay(30);
      }
      delay(100);*/
      break;
      
    case 0:  // Motor Control
      int centralVel = rasp.cmdBuffer[1];
      int angularVel = rasp.cmdBuffer[2];
      setMotor(centralVel, angularVel);
      break;
      
    default: // Set motor stop by default
      setMotor(0, 0);
      break;
  }
  thr.setKey( getMicValue() );
}

/* Set motor speed according to 
 * Central Speed: cVel
 * Angular Speed: aVel
 */
void setMotor(int cVel, int aVel){
  int rightVel = cVel + aVel/TURNNING_RATIO;
  int leftVel  = cVel - aVel/TURNNING_RATIO;
  //rightVel = thr.getWeightedVal(rightVel);
  //leftVel  = thr.getWeightedVal(leftVel);
  motorRight.setSpeed(rightVel);
  motorLeft.setSpeed(leftVel);
  Serial.print(cVel);
  Serial.print(",");
  Serial.println(aVel);
}

int getMicValue(){
  int val = analogRead(MIC_PIN);
}
