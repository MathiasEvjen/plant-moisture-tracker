import { useEffect, useState } from "react";
import FishBowl from "./FishBowl";
const MoistureData = () => {
    const [moistureData, setMoistureData] = useState("Henter data...");
    const [isData, setIsData] = useState(false)
    const serverURL = "http://192.168.4.30/data";

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(serverURL);
                console.log(response);
                const data = await response.json();
                setMoistureData(data.value);
                console.log("Hentet data: " + data.value);
                setIsData(true);
            } catch (error) {
                console.error("Feil ved henting av data: " + error);
                setMoistureData("Feil ved henting");
                setIsData(false);
            }
        };

        const interval = setInterval(fetchData, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div>
            <FishBowl pct={moistureData} moistureData={moistureData} isData={isData}/>
        </div>
    );
}

export default MoistureData;