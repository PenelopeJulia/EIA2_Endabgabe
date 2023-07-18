"use strict";
// Eisdealer-Simulator
// Penelope Vogel, 270002, MKB2
// In Zusammenarbeit mit Julia Mamani, Evelin Sinner, Anna-Lena Jörger
var EisdieleSimulator;
(function (EisdieleSimulator) {
    // Wenn Brwoser Seite geladen hat, dann triggert der Eventlistener die Funktion "start" 
    window.addEventListener("load", start);
    // Datenbank vordefinieren
    // Nimmt Teil aus URL, um diese zur Verbindung mit der Datenbank zu nutzen
    let database = new URL(location.href).search.slice(1);
    // Browser hat Seite geladen und Funktion "start" wird aufgerufen
    async function start(_event) {
        // Überprüfen, ob Verbindung mit Datenbank hergestellt wurde
        // Leeres "send" schicken -> wenn Verbindung mit Datenbank hergestellt wurde, passiert nichts -> User kann somit Spiel anfangen
        try {
            await send("?", null);
            console.log("database connected!");
            // Wenn Verbindung mit Datenbank nicht hergestellt wurde, dann Error (Catch wird ausgeführt -> User erhält in Browser Fehlermeldung)
            // User soll richtigen Link hinzufügen
        }
        catch (_e) {
            let output = `Add the correct address of your database as get-parameter in the url.\n`;
            output += `Example .../Client.html?https://mywebspace/Database/\n\n`;
            output += _e;
            output += `\n\nSee more information in the console.`;
            alert(output);
        }
        // Menu neu laden
        // Angebote im Menü erscheinen nun
        generateMenu();
        // Mit getElementById auf Form-Element im DOM zugreifen
        const form = document.getElementById("auswahlMenu");
        // Auf Form-Element wird EventListener installiert
        // Wenn submit-Button geklickt wird, wird Funktion submitform getriggered
        form.addEventListener("submit", submitform);
        // Mit Id auf start-Button im DOM zugreifen
        const startGameBtn = document.getElementById("startgame");
        // Event-Listener (Klick-Event) auf Start-Button installieren
        startGameBtn.addEventListener("click", startGame);
    }
    async function startGame(e) {
        // Liest Angebote aus Datenbank aus
        let database = await EisdieleSimulator.Simulator.DB("find", "Angebote", null);
        // Erstellt die Klasse Simulator mit Daten aus der Datenbank und dem Canvas-ID
        new EisdieleSimulator.Simulator(database.data, "simulator");
    }
    EisdieleSimulator.startGame = startGame;
    // Funktion um das Menü (Angebote in der Datenbank) zu laden
    // Menü besteht aus Angeboten in der Datenbank
    async function generateMenu() {
        // Get Menu-Div by ID in DOM
        // Mit getElementById auf menu-div in DOM zugreifen
        let menu = document.getElementById("menu");
        // Menü soll leer sein, also wird es hier nochmal entleert
        menu.innerHTML = "";
        // Alle Angebote in Datenbank auslesen und der Variable database zuweisen
        // find = command, Angebote = Collection
        let database = await EisdieleSimulator.Simulator.DB("find", "Angebote", null);
        console.log(database);
        // Titel: Verfügbare Menüs erstellen -> und mit appenChild an Menu-Div hängen
        let h1 = document.createElement("h1");
        h1.innerText = "Verfügbare Menüs";
        menu.appendChild(h1);
        // Überprüfen, ob Daten in Datenbank aufzufinden -> Wenn ja, dann wird for-Schleife aufgerufen
        if (!database.data) {
            // Sind keine Daten aufzufinden wird ein Error ausgerufen
            throw new Error("invalid data");
        }
        // Wenn Daten in Datenbank gefunden worden soll For-Schleife initiert werden
        //For-Schleife, weil es mehrere Angebote gibt und so kann man sich easy einmal durch die ganzen Angebote in der Datenbank durcharbeiten, ohne es mehrmals machen zu müssen
        // Jedes Angebot hat eigenes ID und muss nur noch im Menu-Div sichtbar gemacht werden (sichtbar im Browser)
        // Hier werden alle Elemente zusammengestellt, so dass wir ein Angebot erhalten (als Zeile in Menü)
        for (let id in database.data) {
            // Angebote in Datenbank haben alle jeweils eigene ID, so dass man immer das richtige Angebot mit seiner ID rauspicken kann
            // Hier wird ein Angebot mit seiner ID der Variable element zugewiesen
            let element = database.data[id];
            // Neues Div erstellen, wo alle Elemente (Name, Preis, Sorte, Sauce, Topping) später reingepackt werden (Zeile)
            let div = document.createElement("div");
            // Neues h3-Element erstellen -> Titel des Angebots z.B. Schokobecher
            let h3 = document.createElement("h3");
            // h3 kriegt den Name des elements (Angebot aus Datenbank, welches wir oben element zugewiesen haben) zugewiesen 
            h3.innerText = element.name;
            // Neues p-Element für den Preis erstellen
            let pPrice = document.createElement("p");
            // Preis von Angebot in Datenbank pPrice zuweisen
            pPrice.innerText = element.price + " €";
            // Neues p-Element für Sauce erstellen
            let pSauce = document.createElement("p");
            // p-Element bekommt Name der Sauce aus Angebot zugewiesen
            pSauce.innerText = "Sauce: ";
            // Neue sauceImg-Variable, die ein Bild zugwiesen bekommt von einer Größe 30x30
            let sauceImg = new Image(30, 30);
            // Bild von Sauce sauceImg-Variable zuweisen
            sauceImg.src = "Bilder/sauce/" + element.sauce + ".png";
            // Bild an p-Element(Name der Sauce) mit appendChild angehängt
            pSauce.appendChild(sauceImg);
            // Neues p-Element für Toppings erstellen
            let pTopping = document.createElement("p");
            // Bildgröße vorgeben
            let toppingImg = new Image(30, 30);
            // Bild zuweisen
            toppingImg.src = "Bilder/topping/" + element.topping + ".png";
            pTopping.innerText = "Topping: ";
            pTopping.appendChild(toppingImg);
            // Eis-Sortiment
            // Neues p-Element für Sorten erstellen (z.B. Vanilla oder Mango)
            let pSorten = document.createElement("p");
            pSorten.innerText = "Sorten : ";
            for (let sorte of element.sorten) {
                let sorteImg = new Image(30, 30);
                sorteImg.src = "Bilder/sorte/" + sorte + ".png";
                pSorten.appendChild(sorteImg);
            }
            // Delete-Button erstellen
            let deletebtn = document.createElement("button");
            deletebtn.innerText = "Delete";
            // Wenn der Delete-button geklickt wurde, wird das Angebot aus Datenbank gelöscht
            // Da jedes Angebot eigene ID hat, wird sichergestellt, dass man auch das richtige Angebot löscht (gleiche ID)
            deletebtn.addEventListener("click", async () => {
                // Command: Delete from Collection: Angebote an Datenbank schicken
                await EisdieleSimulator.Simulator.DB("delete", "Angebote", null, id);
                // Menü neu laden
                // Gelöschtes Angebot verschwindet somit sichtbar vom Menü 
                generateMenu();
            });
            // Alle neuen Angebots-Elemente an Div hängen
            div.appendChild(h3);
            div.appendChild(pPrice);
            div.appendChild(pSauce);
            div.appendChild(pSauce);
            div.appendChild(pTopping);
            div.appendChild(pSorten);
            div.appendChild(deletebtn);
            // Div mit appendChild an Menü in DOM anhängen
            menu.appendChild(div);
        }
    }
    EisdieleSimulator.generateMenu = generateMenu;
    // Funktion, die getriggered wird, wenn die Form abgeschickt wurde über Klick auf Submit-Button
    async function submitform(e) {
        // Standardverhalten von Form ist Seite ständig neu laden
        // Dieses mit preventDefault verhindern
        e.preventDefault();
        // Daten aus der Form auslesen
        let data = new FormData(e.target);
        let formData = Array.from(data.entries());
        // Ausgewählte Sorten mit Value "on" herausfiltern, so dass wir wissen, welche Sorten der User ausgewählt hat
        // Mit Map sammeln wir diese Sorten in neuem Array -> sorten
        let sorten = formData.filter((a) => a[1] === "on").map((a) => a[0]);
        // Wenn keine Sorte ausgewählt wurde = 0 -> dann wird ein Error ausgerufen
        // User muss mindest. eine Sorte wählen
        if (sorten.length === 0) {
            throw new Error("bitte mindestens eine Sorte auswählen");
        }
        // Angebot aus Daten, die in Form gespeichert wurden, erstellen
        let angebot = {
            // Aus den Daten den Preis herauslesen
            price: Number(data.get("price")),
            // Aus den Daten die Sauce herauslesen
            sauce: data.get("sauce"),
            // rAus den Daten die Sorte herauslesen
            sorten: sorten,
            // Aus den Daten das Topping herauslesen
            topping: data.get("topping"),
            // Aus den Daten den Name herauslesen
            name: data.get("aname")
        };
        // Angebot in saveAnegbot-Funktion speichern
        // Daten aus der Form werden ausgelesen und in Variable angebot gespeichert -> angebot wird dann wiederum in Collection: Angebote in Datenbank gespeichert
        await saveAngebot(angebot);
        // Neues Angebot wurde gespeichert
        // Menü refreshen, so dass neues Angebot auf Seite im Menü geladen werden kann
        await generateMenu();
    }
    async function saveAngebot(angebot) {
        // Collection Angebote erstellen, falls noch nicht vorhanden
        await EisdieleSimulator.Simulator.DB("create", "Angebote", null);
        // Angebot in Datenbank in Collection: Angebote speichern
        await EisdieleSimulator.Simulator.DB("insert", "Angebote", angebot);
    }
    // aus EIA-Kurs entnommen
    // Serverkommunikation
    async function send(_query, _data) {
        let query = _query + (_data ? "&data=" + JSON.stringify(_data) : "");
        let response = await fetch(database + query);
        return response.json();
    }
    EisdieleSimulator.send = send;
})(EisdieleSimulator || (EisdieleSimulator = {}));
