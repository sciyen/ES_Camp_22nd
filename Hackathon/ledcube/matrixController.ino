#define length_x 4
#define length_y 4
#define length_map 3

const int control_line_x[length_x] = {2, 3, 4, 5};
const int control_line_y[length_y] = {6, 7, 8, 9};
volatile int map_idx = 0;

const bool ledMap[][length_x][length_y]={
    {{1, 1, 1, 1},
    {1, 0, 0, 1},
    {1, 0, 0, 1},
    {1, 1, 1, 1}},

    {{1, 0, 0, 1},
    {1, 0, 0, 1},
    {1, 0, 0, 1},
    {1, 0, 0, 1}},

    {{1, 1, 1, 1},
    {0, 0, 0, 0},
    {0, 0, 0, 0},
    {1, 1, 1, 1}}
    };

void setup(){
    for(int i =0; i<length_x; i++){
        pinMode(control_line_x[i], OUTPUT);
        digitalWrite(control_line_x[i], LOW);
    }
    for(int i =0; i<length_y; i++){
        pinMode(control_line_y[i], OUTPUT);
        digitalWrite(control_line_y[i], LOW);
    }
    delay(3000);
}

void loop(){
    map_idx = (map_idx+1) % length_map;
    delay(1000);
}

void ISR_enable()
{
  TCCR2A = 0;
  TCCR2B = 0; 
  TCCR2B |= (1<<WGM22);  // CTC mode; Clear Timer on Compare
  TCCR2B |= (1<<CS22) | (1<<CS20);  // Prescaler == 8 ||(1<<CS30)
  TIMSK2 |= (1 << OCIE2A);  // enable CTC for TIMER1_COMPA_vect
  TCNT2=0;  // counter 歸零 
  OCR2A = 1000;
}

void ISR_disable()
{
  TCCR2A = 0;
  TCCR2B = 0; 
}

ISR(TIMER2_COMPA_vect)
{
    static volatile int update_idx = 0;
    digitalWrite(control_line_x[update_idx], false);
    update_idx = (update_idx+1) % length_x;
    for (int i=0; i<length_y; i++){
        digitalWrite(control_line_y[i], ledMap[map_idx][update_idx][i]);
    }
    digitalWrite(control_line_x[++update_idx], true);
}
