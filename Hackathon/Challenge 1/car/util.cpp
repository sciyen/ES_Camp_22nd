/*
 * Copyright 2019, NCKU ES Camp, All rights reserved.
 * Auther: Yencheng, Chu
 */

#include "util.h"
#include <Arduino.h>

Command::Command(int baudrate){
    Serial.begin(baudrate);
}

/*
 * Resolve command from String type cmd.
 *
 * Command Format:
 * mode,v1,v2,v3,v4\n
 * All variables should composed with number only.
 */
void Command::resolve(String cmd){
    int idx = 0;
    int bufferIdx = 0;
    while(idx < cmd.length() && bufferIdx < BUFFER_SIZE){
        int endIdx = cmd.indexOf(',', idx);
        if (endIdx == -1) break;
        cmdBuffer[bufferIdx] = cmd.substring(idx, endIdx).toInt();
        idx = endIdx+1;
        bufferIdx++;
    }
    for( ; bufferIdx<BUFFER_SIZE; bufferIdx++)
        cmdBuffer[bufferIdx] = 0;
}

/*
 * Get one line String from Serial, and call resolve() to depart comma.
 */
void Command::waitForData(){
    String cmd = Serial.readStringUntil('\n');
    resolve(cmd);
}

/*
 * Motor pin setup.
 * NOTE:
 * pin_EN should be pins with PWM.
 */
Motor::Motor(uint8 pin_A, uint8 pin_B, uint8 pin_EN){
    Pin_A = pin_A;
    Pin_B = pin_B;
    Pin_EN = pin_EN;
    pinMode(Pin_A, OUTPUT);
    pinMode(Pin_B, OUTPUT);
    pinMode(Pin_EN, OUTPUT);
}

/*
 * Speed: range from -250 to 250.
 * Set direction pin according to the sign of speed.
 */
void Motor::setSpeed(int speed){
    bool dir = speed >= 0;
    digitalWrite(Pin_A, dir);
    digitalWrite(Pin_B, !dir);
    speed = abs(speed);
    speed = speed > 250 ? 250 : speed;
    analogWrite(Pin_EN, speed);
}

/**/
Throttle::Throttle(){
    throttle = 0;
    last_update_time = 0;
}
bool Throttle::judge(int val){
    return val > JUDGE_LEVEL;
}

void Throttle::setKey(int val){
    static bool lastKey = true;
    bool key = judge(val);
    lastKey = lastKey && key;
    if ( millis() - 1000/UPDATE_FREQ > last_update_time ){
        if ( !lastKey )
            throttle *= 0.8;
        else
            throttle += 0.02;
        throttle = ( throttle>1 ) ? 1 : (( throttle<0) ? 0 : throttle);
        lastKey = true;
        last_update_time = millis();
    }
}

int Throttle::getWeightedVal(int val){
    return (int)((float)val * throttle);
}
