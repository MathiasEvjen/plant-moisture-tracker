import { useEffect, useState } from "react";

const MoistureData = () => {
    const [moistureData, setMoistureData] = useState("");
    const ESPIP = "http://192.168.4.30/data";

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(ESPIP);
                console.log(response);
                const data = await response.json();
                console.log(data.text());
                setMoistureData(data.value);
                console.log("Hentet data: " + data.value);
            } catch (error) {
                console.error("Feil ved henting av data: " + error);
                setMoistureData("Feil ved henting");
            }
        };

        const interval = setInterval(fetchData, 1500);
        return () => clearInterval(interval);
    }, []);

    return (
        <div>
            <h1>Moisture Data:</h1>
            <h2>{moistureData}</h2>
        </div>
    );
}

export default MoistureData;