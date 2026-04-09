const { Servient } = require("@node-wot/core");
const { HttpServer } = require("@node-wot/binding-http");

const servient = new Servient();
servient.addServer(new HttpServer({ 
    port: 8082, 
    cors: { origin: "*", methods: ["GET", "POST", "PUT"] } 
}));

servient.start().then((WoT) => {
    // --- THING 1: IrrigationSystem ---
    WoT.produce({
        title: "IrrigationSystem",
        actions: {
            toggle: { input: { type: "boolean" } }
        }
    }).then((thing) => {
        thing.setActionHandler("toggle", async (input) => {
            console.log(input ? "💧 [ATTUATORE] Pompa: ON" : "💧 [ATTUATORE] Pompa: OFF");
            return input;
        });
        thing.expose().then(() => {
            console.log("✅ IrrigationSystem pronto su http://localhost:8082/irrigationsystem");
        });
    });

    // --- THING 2: SmartLamp ---
    WoT.produce({
        title: "SmartLamp",
        actions: { 
            switch: { input: { type: "boolean" } } 
        }
    }).then((thing) => {
        thing.setActionHandler("switch", async (input) => {
            console.log(input ? "💡 [ATTUATORE] Lampada: ON" : "💡 [ATTUATORE] Lampada: OFF");
            return input;
        });
        thing.expose().then(() => {
            console.log("✅ SmartLamp pronta su http://localhost:8082/smartlamp");
        });
    });
}).catch(err => console.error("Errore attuatori:", err));