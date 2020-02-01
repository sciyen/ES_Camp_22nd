#include <Servo.h>
#include "util.h"

// Pins Setting
#define MOTOT_PIN_RIGHT_A 3
#define MOTOT_PIN_RIGHT_B 4
#define MOTOT_PIN_RIGHT_EN 5
#define MOTOT_PIN_LEFT_A 8
#define MOTOT_PIN_LEFT_B 7
#define MOTOT_PIN_LEFT_EN 6

Motor motorRight(MOTOT_PIN_RIGHT_A, MOTOT_PIN_RIGHT_B, MOTOT_PIN_RIGHT_EN);
Motor motorLeft( MOTOT_PIN_LEFT_A,  MOTOT_PIN_LEFT_B,  MOTOT_PIN_LEFT_EN);

void setup()
{
}
void loop()
{
    forward(150);
    delay(2000);
    turnRight(150);
    delay(2000);
}
void forward(int val){
    motorRight.setSpeed(val);
    motorLeft.setSpeed(val);
}

void turnRight(int val){
    motorRight.setSpeed(0);
    motorLeft.setSpeed(val);
}

void turnLeft(int val){
    motorRight.setSpeed(val);
    motorLeft.setSpeed(0);
}

void backward(int val){
    motorRight.setSpeed(-1*val);
    motorLeft.setSpeed(-1*val);
}

void stop(){
    motorRight.setSpeed(0);
    motorLeft.setSpeed(0);
}
