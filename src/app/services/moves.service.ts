import { Injectable } from '@angular/core';
import {
  Move,
  MoveCooldown,
  MoveOutcome,
  MovesData,
  MovesType,
} from '../moves/moves.model';
import { ResourceBundle, ResourceType } from '../resources/resources.model';
import { Skill } from '../skills/skills.model';
import { ChaosService } from './chaos.service';
import { SkillsService } from './skills.service';

@Injectable({ providedIn: 'root' })
export class MovesService {
  constructor(
    private chaosService: ChaosService,
    private skillsService: SkillsService
  ) {}

  movesData: MovesData[] = [
    {
      name: MovesType.focus,
      baseCooldown: 100,
      baseOutcomes: [
        { type: ResourceType.basicMana, lowAmount: 0, highAmount: 3 },
        { type: ResourceType.basicScrolls, lowAmount: 0, highAmount: 1 },
      ],
    },
    {
      name: MovesType.learn,
      baseCooldown: 300,
      baseOutcomes: [],
    },
    {
      name: MovesType.cast,
      baseCooldown: 300,
      baseOutcomes: [],
    },
    {
      name: MovesType.mission,
      baseCooldown: 300,
      baseOutcomes: [],
    },
  ];

  canAnythingBeLearned(discoveredSkills: Skill[], resources: ResourceBundle) {
    return this.skillsService.canSomeSkillBeLearned(
      discoveredSkills,
      resources
    );
  }

  calculateCooldown(move: Move) {
    // do some calculation
    return this.movesData.find((data) => data.name == move.type)!.baseCooldown;
  }

  calculateOutcomes(move: Move) {
    //do some calculation
    return this.movesData.find((data) => data.name == move.type)!.baseOutcomes;
  }

  makeMoveCooldown(move: Move, ticks: number) {
    let cooldown: MoveCooldown = {
      onCooldown: true,
      ticksStart: ticks,
      ticksFinish: ticks + this.calculateCooldown(move),
      animation: 1,
    };
    return cooldown;
  }

  makeMoveOutcome(move: Move): MoveOutcome {
    let bundle = {
      basicMana: 0,
      basicScrolls: 0,
    };
    this.calculateOutcomes(move).forEach((outcome) => {
      if ('amount' in outcome) {
        bundle.basicMana +=
          outcome.type == ResourceType.basicMana ? outcome.amount : 0;
        bundle.basicScrolls +=
          outcome.type == ResourceType.basicScrolls ? outcome.amount : 0;
      }
      if ('lowAmount' in outcome) {
        bundle.basicMana +=
          outcome.type == ResourceType.basicMana
            ? this.chaosService.roll(outcome.lowAmount, outcome.highAmount)
            : 0;
        bundle.basicScrolls +=
          outcome.type == ResourceType.basicScrolls
            ? this.chaosService.roll(outcome.lowAmount, outcome.highAmount)
            : 0;
      }
      // Discovery happens here.
    });
    return { resource: bundle };
  }

  calculateCooldownPercent(move: Move, ticks: number): number {
    let percent = 0;
    if (move.cooldown.onCooldown === true) {
      let ticksDuration =
        move.cooldown.ticksFinish! - move.cooldown.ticksStart!;
      let ticksElapsed = ticks - move.cooldown.ticksStart!;
      let proportion = ticksElapsed / ticksDuration;
      percent = proportion * 100;
    }
    return percent;
  }
}
