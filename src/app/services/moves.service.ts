import { Injectable } from '@angular/core';
import {
  Move,
  MoveCooldown,
  MoveOutcome,
  MovesData,
  MovesType,
} from '../moves/moves.model';
import { ResourceBundle, ResourceType } from '../resources/resources.model';
import { DiscoveryType, Skill } from '../skills/skills.model';
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
      baseOutcomes: [{ discoveryType: DiscoveryType.basic }],
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

  makeMoveOutcome(
    move: Move,
    resources: ResourceBundle,
    discoveredSkills: Skill[]
  ): MoveOutcome {
    let moveOutcome: MoveOutcome = {
      resource: {
        basicMana: 0,
        basicScrolls: 0,
      },
      discovery: null,
    };

    this.calculateOutcomes(move).forEach((outcome) => {
      if ('amount' in outcome) {
        moveOutcome.resource.basicMana +=
          outcome.type == ResourceType.basicMana ? outcome.amount : 0;
        moveOutcome.resource.basicScrolls +=
          outcome.type == ResourceType.basicScrolls ? outcome.amount : 0;
      }
      if ('lowAmount' in outcome) {
        moveOutcome.resource.basicMana +=
          outcome.type == ResourceType.basicMana
            ? this.chaosService.roll(outcome.lowAmount, outcome.highAmount)
            : 0;
        moveOutcome.resource.basicScrolls +=
          outcome.type == ResourceType.basicScrolls
            ? this.chaosService.roll(outcome.lowAmount, outcome.highAmount)
            : 0;
      }
      if ('discoveryType' in outcome && outcome.discoveryType == 'basic') {
        //lmao this should be simpler
        let learnableSkills = this.skillsService.getAffordableSkills(
          this.skillsService.getDiscoveryEligibleSkillsData(
            discoveredSkills,
            this.skillsService.getUndiscoveredSkillsData(discoveredSkills)
          ),
          resources
        );
        let discoveredSkill = this.chaosService.selectRandom(learnableSkills);

        moveOutcome.resource.basicMana -=
          discoveredSkill.discoveryCost.basicMana || 0;
        moveOutcome.resource.basicScrolls -=
          discoveredSkill.discoveryCost.basicScrolls || 0;
        moveOutcome.discovery = discoveredSkill.name;
      }
    });
    return moveOutcome;
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
