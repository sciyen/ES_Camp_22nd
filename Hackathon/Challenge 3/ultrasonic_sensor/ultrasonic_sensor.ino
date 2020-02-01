// Defines pins numbers
// 設定超音波感測器的資料線
const int trigPin = 12;
const int echoPin = 11;

void setup() {
    //ultra sonic:
    pinMode(trigPin, OUTPUT);     // 設定trigPin為Output
    pinMode(echoPin, INPUT);      // 設定echoPin為Input
    Serial.begin(9600);           // Starts the serial communication
}

void loop() {
    int dist = get_distance();    // 取得距離
    Serial.print("Distance: ");   // 傳送文字訊息給電腦
    Serial.print(dist);
    Serial.println("cm");
}

/* 計算超音波讀到的距離並回傳 */
int get_distance(){
    long duration;
    int distance;

    digitalWrite(trigPin, LOW);           // trigPin設定為2ms的低電位訊號
    delayMicroseconds(2);
  
    digitalWrite(trigPin, HIGH);          // trigPin設定為10us的高電位訊號
    delayMicroseconds(10);
    digitalWrite(trigPin, LOW);           // 回到低電位
  
    duration = pulseIn(echoPin, HIGH);    // 量測echoPin中HIGH pulse (脈波)的長度
    distance= duration*0.035/2;           // 將量測出的值校正成以公分為單位  
    return distance;                      // 回傳
}
