void setup() {
    pinMode(A0, INPUT);
    Serial.begin();
}

void loop() {
    int voltage = analogRead(A0);
    Serial.println(voltage);
    delay(100);
}
