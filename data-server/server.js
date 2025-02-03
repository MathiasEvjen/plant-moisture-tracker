const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const port = process.env.PORT || 3000;

app.use(cors({origin: "*"}));
app.use(bodyParser.json());

app.post("/data", (req, res) => {
    const moistureData = req.body.value;
    console.log("Mottatt fuktighetsdata: ", moistureData);
    res.status(200).send({status: "Data mottatt", value: moistureData});
});

app.get("/data", (req, res) => {
    res.getHeader("Content-Type", "application/json");
    res.json({value: 42});
});

app.listen(port, () => {
    console.log("Server kjører på http://localhost:" + port);
});