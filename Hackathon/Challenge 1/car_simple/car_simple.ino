void setup() {
    pinMode(3, OUTPUT);
    pinMode(4, OUTPUT);
    pinMode(5, OUTPUT);
    pinMode(6, OUTPUT);
    pinMode(7, OUTPUT);
    pinMode(8, OUTPUT);
}

void loop() {
    // 控制馬達1
    digitalWrite(3, HIGH);
    digitalWrite(4, LOW);
    analogWrite(5, 128);

    // 控制馬達2
    digitalWrite(8, HIGH);
    digitalWrite(7, LOW);
    analogWrite(6, 128);

    delay(1000);

    
    // 控制馬達1
    digitalWrite(3, HIGH);
    digitalWrite(4, LOW);
    analogWrite(5, 0);

    // 控制馬達2
    digitalWrite(8, HIGH);
    digitalWrite(7, LOW);
    analogWrite(6, 0);

    delay(1000);
}
