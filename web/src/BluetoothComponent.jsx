import { useState } from "react"


const BluetoothComponent = () => {
    const [data, setData] = useState("");

    const connectBluetooth = async () => {
        try {
            const device = await navigator.bluetooth.requestDevice({
                filters: [{name: "ESP32" }],
                optionalServices: ["4fafc201-1fb5-459e-8fcc-c5c9c331914b"]
            });

            device.addEventListener("gattserverdisconnected", async () => {
                console.warn("Enhet frakoblet");
                await connectBluetooth();
            });

            console.log("Kobler til " + device.name)
            const server = await device.gatt.connect();
            const service = await server.getPrimaryService("4fafc201-1fb5-459e-8fcc-c5c9c331914b");
            
            console.log("Henter karakteristikk")
            const characteristic = await service.getCharacteristic("beb5483e-36e1-4688-b7f5-ea07361b26a8");

            await characteristic.startNotifications();
            characteristic.addEventListener("characteristicvaluechanged", (event) => {
                let value = event.target.value;
                let decodedValue = new TextDecoder().decode(value);
                if (decodedValue) {
                    setData(decodedValue);
                    console.log("Mottatt data: " + decodedValue);
                } else {
                    console.warn("Data ikke mottat");
                }
                setData(decodedValue);
            });

        } catch (error) {
            console.error("Bluetooth connection failed", error);
        }
    };

    return (
        <div>
            <button onClick={connectBluetooth}>Connect to ESP32</button>
            <p>Data from ESP32: {data}</p>
        </div>
    );
}

export default BluetoothComponent;