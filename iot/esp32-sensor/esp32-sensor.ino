#include <WiFi.h>
#include <PubSubClient.h>
#include <ArduinoJson.h> // <- přidej tuto knihovnu

const char* ssid = "IoTWiFi24GHz";
const char* password = "ubpm4h36m36u";
const char* mqtt_server = "192.168.1.65";
const int wifi_channel = 6;

WiFiClient espClient;
PubSubClient client(espClient);

const int analogPin = 32;
const float referenceVoltage = 3.3;
const int adcMax = 4095;

const float R1 = 22000.0;
const float R2 = 8350.0;

unsigned long lastSend = 0;
const unsigned long sendInterval = 5000;

String macStr;

void setup() {
  delay(5000);
  Serial.begin(115200);

  WiFi.mode(WIFI_STA);
  WiFi.disconnect(true);
  WiFi.begin(ssid, password, wifi_channel);

  Serial.println("Connecting to WiFi...");
  int attempts = 0;
  while (WiFi.status() != WL_CONNECTED && attempts < 40) {
    delay(500);
    Serial.print(".");
    attempts++;
  }

  if (WiFi.status() == WL_CONNECTED) {
    Serial.println("\nConnected to WiFi!");
    Serial.print("IP Address: ");
    Serial.println(WiFi.localIP());
  } else {
    Serial.println("\nFailed to connect to WiFi.");
  }

  // Get and clean MAC address
  macStr = WiFi.macAddress();
  macStr.replace(":", "");

  client.setServer(mqtt_server, 1122);
}

void loop() {
  if (!client.connected()) {
    reconnect();
  }

  client.loop();

  unsigned long now = millis();
  if (now - lastSend > sendInterval) {
    lastSend = now;

    int rawADC = analogRead(analogPin);
    float Vout = (rawADC / (float)adcMax) * referenceVoltage;
    float VinMeasured = Vout * ((R1 + R2) / R2);
    float current_mA = (VinMeasured / (R1 + R2)) * 1000.0;

    StaticJsonDocument<200> doc;
    doc["system_id"] = macStr;
    doc["current"] = current_mA;
    doc["voltage"] = VinMeasured;
    doc["temperature"] = 20.0;

    char jsonBuffer[256];
    serializeJson(doc, jsonBuffer);

    // print 
    Serial.print("\nSending data...");
    client.publish("/battery/data/submit", jsonBuffer);

    // Print to Serial
    Serial.print("\nRaw ADC: "); Serial.print(rawADC);
    Serial.print(" | Vout: "); Serial.print(Vout, 3); Serial.print(" V");
    Serial.print(" | Vin: "); Serial.print(VinMeasured, 3); Serial.print(" V");
    Serial.print(" | Current: "); Serial.print(current_mA, 3); Serial.println(" mA");
  }
}

void reconnect() {
  while (!client.connected()) {
    Serial.print("\nMQTT not connected...");
    Serial.print("\nTrying to connect");

    String clientId = "ESP32Client-";
    clientId += String(random(0xffff), HEX);

    if (client.connect(clientId.c_str())) {
      Serial.println("\nConnection successful!");
    } else {
      Serial.print("\nFailed, code=");
      Serial.print(client.state());
      delay(5000);
    }
  }
}
