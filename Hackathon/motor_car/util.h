/*
 * Copyright 2019, NCKU ES Camp, All rights reserved.
 * Auther: Yencheng, Chu
 */
#ifndef UTIL_H
#define UTIL_H

#include <Arduino.h>

#define uint8 unsigned char

#define BUFFER_SIZE 5

class Command{
    private:
    void resolve(String cmd);

    public:
    int cmdBuffer[BUFFER_SIZE];
    Command(int baudrate=9600);
    void waitForData();
};

class Motor{
    private:
    uint8 Pin_A, Pin_B, Pin_EN;

    public:
    Motor(uint8 pin_A, uint8 pin_B, uint8 pin_EN);
    void setSpeed(int speed);
};

#define JUDGE_LEVEL 512
#define UPDATE_FREQ 10
class Throttle{
    private:
    double throttle;
    unsigned long last_update_time;
    bool judge(int val);

    public:
    Throttle();
    void setKey(int val);
    int getWeightedVal(int val);
};
#endif
