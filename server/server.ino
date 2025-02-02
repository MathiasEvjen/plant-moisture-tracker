#include <WiFi.h>
#include <WebServer.h>

#define AOUT_PIN 12

const char* ssid = "Mathias Evjens Nettverk";
const char* password = "LisanAlGaib";

WebServer server(80);

void handleDataRequest() {
  server.sendHeader("Access-Control-Allow-Origin", "*");
  server.sendHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  server.sendHeader("Access-Control-Allow-Headers", "Content-Type");

  String moistureData = String(analogRead(AOUT_PIN));
  String jsonMoistureData ="{\"value\": " + moistureData + "}";
  server.send(200, "application/json", jsonMoistureData);
  Serial.println("Sent moisture data: " + moistureData);
}

void setup() {
  Serial.begin(115200);
  WiFi.begin(ssid, password);

  // WiFi-tilkobling
  Serial.println("Kobler til Wi-Fi");
  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.print(".");
  }
  Serial.println("\nTilkoblet");
  Serial.println("IP: " + WiFi.localIP().toString());

  // Starter server
  server.on("/data", handleDataRequest);
  server.begin();
  Serial.println("---Server started---");
}

void loop() {
  server.handleClient();
}
