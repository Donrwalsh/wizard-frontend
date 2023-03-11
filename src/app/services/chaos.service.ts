import { Injectable } from "@angular/core";
import { GameMove } from "../moves/moves.model";
import { ResourceAmount, ResourceBundle } from "../resources/resources.model";

@Injectable({providedIn: 'root'})
export class ChaosService {
    constructor() {}

    resolveOutcomes(gameMove: GameMove): ResourceBundle {
        let bundle = {
            basicMana: 0,
            basicScrolls: 0
        };
        gameMove.calcOutcomes().forEach((outcome) => {
            if ('amount' in outcome && outcome.type == "Basic Mana") {
                bundle.basicMana += outcome.amount;
            }
            if ('amount' in outcome && outcome.type == "Basic Scroll") {
                bundle.basicScrolls += outcome.amount;
            }
            if ('lowAmount' in outcome && outcome.type == "Basic Mana") {
                bundle.basicMana += Math.floor(Math.random() * (outcome.highAmount - outcome.lowAmount + 1) + outcome.lowAmount);
            }
            if ('lowAmount' in outcome && outcome.type == "Basic Scroll") {
                bundle.basicScrolls += Math.floor(Math.random() * (outcome.highAmount - outcome.lowAmount + 1) + outcome.lowAmount);
            }
        })
        return bundle;
    }
}