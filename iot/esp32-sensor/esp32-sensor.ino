#include <WiFi.h>
#include <PubSubClient.h>

const char* ssid = "WiFiName"; // replace with your ssid
const char* password = "WiFiPassword"; // replace with your password
const char* mqtt_server = "MqttServerIP"; // replace with your mqtt server
const int wifi_channel = 6;

WiFiClient espClient;
PubSubClient client(espClient);

void setup() {
  delay(5000);

  // Start serial connection and wait for the serial monitor to be opened
  Serial.begin(115200);

  // Connect to WiFi
  WiFi.mode(WIFI_STA);       // Set WiFi to station mode
  WiFi.disconnect(true);     // Clean any previous connection

  WiFi.begin(ssid, password, wifi_channel);

  Serial.println("Connecting to WiFi...");
  int attempts = 0;
  while (WiFi.status() != WL_CONNECTED && attempts < 40) {
    delay(500);
    Serial.println(WiFi.status());
    Serial.print(".");
    attempts++;
  }

  if(WiFi.status() == WL_CONNECTED){
    Serial.println("\nConnected to WiFi!");
    Serial.print("IP Address: ");
    Serial.println(WiFi.localIP());
  } else {
    Serial.println("\nFailed to connect to WiFi.");
  }

  // Set MQTT Server details
  client.setServer(mqtt_server, 1122);
}

void loop() {
  if(!client.connected()){
    reconnect();
  }

  // TODO: add sending logic of data from sensors

}

void reconnect() {
  while (!client.connected()){
    Serial.print("\nMQTT not connected...");
    Serial.print("\nTrying to connect");

    // Create client ID
    String clientId = "ESP32Client-";
    clientId += String(random(0xffff), HEX);

    // Try to connect
    if (client.connect(clientId.c_str())) {
      Serial.print("\nConnection successful!");
    }
    else{
      Serial.print("\nFailed, code=");
      Serial.print(client.state());
      delay(5000);
    }
  }
}


