// Eisdealer-Simulator
// Penelope Vogel, 270002, MKB2
// In Zusammenarbeit mit Julia Mamani, Evelin Sinner, Anna-Lena Jörger

namespace EisdieleSimulator{

    // Bilder werden importiert
    import sauceImages = EisdealerSimulator.sauceImages;
    import moodImages = EisdealerSimulator.moodImages;
    import toppingImages = EisdealerSimulator.toppingImages;
    import sorteImages = EisdealerSimulator.sorteImages;

    // Die verschiedenen Stimmungen von Customer wird exportiert
    export type Mood = 'cool' | 'neutral' | 'annoyed' | 'angry';

    // Klasse von Customer und erbt Methoden und Eigenschaften von Entitaet
    export class Customer extends Entity{

        // Target des Customers ist ein leerer Stuhl
        target: Chair | null = null;

        // Status des Customer
        status: 'enter' | 'waiting' | 'exit' = 'enter';

        // InitialStimmung des Kunden: Cool
        mood: Mood = 'cool';

        // Sauce, Topping und Eis, welche der Kunde will 
        // Werden später gefüllt, wenn Angebot bestellt und erhalten wurde
        givenSauce: Sauce | null = null;
        givenTopping: Topping | null = null;
        givenIce: Sorte[] = [];

        // Beginn des Wartens von Customer
        waitingTimeStart : Date | null = null;

        constructor(initX: number, initY: number, public sauce: Sauce, public topping: Topping, public ice: Sorte[], public angebotName: string, public angebotPrice: number) {
            super(initX, initY);
        }

        // Steuert die Reaktionen des Customer
        move(){
            if(!this.target){
                return;
            }
            // Stimmung ändert sich von Customer, wenn er wartet
            // Bis zu 20s noch normal
            if(this.status === "waiting" && this.waitingTimeStart){
                if(this.waitingTimeStart.getTime()+20000 < Date.now()){
                    this.mood = "neutral";
                }
                // Wenn er bis zu 40s warten muss, wird Customer genervt
                if(this.waitingTimeStart.getTime()+40000 < Date.now()){
                    this.mood = "annoyed"
                }
            }

            // Customer betritt Eisdiele
            if(this.status === "enter"){
                // Customer wird positioniert
                this.pos = new Vector(this.target.pos.x-20, this.target.pos.y-20);
                this.status = "waiting";
                this.waitingTimeStart = new Date();
            }
            // Customer verlässt Eisdiele
            if(this.status === "exit"){

            }
        }

        // Objekt Kundi wird auf der Leinwand (Canva) gezeichnet bzw dargestellt basierend auf seine Eigenschaften
        render(){
            this.move();
            // Mood Images werden von Images.ts entnommen
            let moodImage = moodImages.get(this.mood);
            // Wenn Bild nicht gefunden wird, dann kommt Error
            if(!moodImage){
                throw new Error("mood not found");
            }
            // Bilder werden an die Positionen eingefügt
            ctx.drawImage(moodImage, this.pos.x, this.pos.y, 40, 40);
            ctx.fillStyle = "black";
            ctx.font = '18px Arial'
            ctx.fillText(this.angebotName, this.pos.x-10, this.pos.y-5);

            // Überprüfung, ob User dem Customer die gewünschte Sauce gibt
            if(this.sauce !== this.givenSauce){
                ctx.drawImage(sauceImages.get(this.sauce),this.pos.x - 15, this.pos.y + 5, 20, 20);
            }
            // Überprüfung, ob User dem Customer die gewünschte Topping gibt
            if(this.topping !== this.givenTopping){
                ctx.drawImage(toppingImages.get(this.topping),this.pos.x - 15, this.pos.y + 27, 20, 20);
            }
            // Überprüfung, ob User dem Customer die gewünschte Sorte(n) gibt
            let i = 0;
            for(let sorte of this.ice){
                if(this.givenIce.indexOf(sorte) === -1){
                    ctx.drawImage(sorteImages.get(sorte),this.pos.x + 35, this.pos.y + (i++ * 15), 15, 15);
                }
            }
        }
    }
}
