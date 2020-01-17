#include "util.h"
Command rasp(9600); // 傳送速率為9600
void setup() {
}

void loop() {
    rasp.waitForData(); // 等待資料

    // rasp將資料解析之後會放在cmdBuffer這個陣列中
    // 用不同的index可以選擇不同位置的資料
    if( rasp.cmdBuffer[0] == 0 ){
        // Do something
    }
    else if( rasp.cmdBuffer[0] == 1 ){
        // Do something
    }
}
