import { Injectable } from '@angular/core';
import {
  Move,
  MoveCooldown,
  MoveOutcome,
  MovesData,
  MovesType,
} from '../moves/moves.model';
import {
  ResourceBundle,
  ResourceRange,
  ResourceType,
} from '../resources/resources.model';
import { DiscoveryType, Skill } from '../skills/skills.model';
import { ChaosService } from './chaos.service';
import { SkillsService } from './skills.service';
import * as icons from '../copy/icons';

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
      image: icons.focusMove,
    },
    {
      name: MovesType.learn,
      baseCooldown: 300,
      baseOutcomes: [{ discoveryType: DiscoveryType.basic }],
      image: icons.learnMove,
    },
    {
      name: MovesType.cast,
      baseCooldown: 600,
      baseOutcomes: [],
      image: icons.castMove,
    },
    {
      name: MovesType.mission,
      baseCooldown: 3000,
      baseOutcomes: [],
      image: icons.missionMove,
    },
  ];

  canAnythingBeLearned(discoveredSkills: Skill[], resources: ResourceBundle) {
    return this.skillsService.canSomeSkillBeLearned(
      discoveredSkills,
      resources
    );
  }

  getImage(moveType: string) {
    return this.movesData.find((moveData) => moveData.name == moveType)?.image;
  }

  getInfoDescription(move: Move) {
    let output = '';
    switch (move.type) {
      case 'Focus': {
        let basicManaRange = this.calculateOutcomes(move).find(
          (outcome) =>
            'type' in outcome && outcome.type == ResourceType.basicMana
        ) as ResourceRange;
        let basicScrollsRange = this.calculateOutcomes(move).find(
          (outcome) =>
            'type' in outcome && outcome.type == ResourceType.basicScrolls
        ) as ResourceRange;
        output +=
          `Put your mind to it and manifest ${basicManaRange.lowAmount} - ${basicManaRange.highAmount} {basic mana}. ` +
          `Jot down some notes and scribe ${basicScrollsRange.lowAmount} - ${basicScrollsRange.highAmount} {basic scrolls}.`;
        break;
      }
      case 'Learn': {
        output +=
          'Discover a random new skill. Only usable when there is at least one discoverable skill you can afford.';
        break;
      }
      case 'Cast': {
        output +=
          'Begin casting a random spell from your spellbook. Only usable when there is at least one eligible spell you can afford to cast.';
        break;
      }
      default: {
        output +=
          'Embark on a random mission from your logbook. Only usable when there is at least one eligible mission you can afford to embark on.';
      }
    }
    return icons.parseText(output);
  }

  calculateCooldown(move: Move) {
    // do some calculation
    return this.movesData.find((data) => data.name == move.type)!.baseCooldown;
  }

  calculateOutcomes(move: Move) {
    //do some calculation
    return this.movesData.find((data) => data.name == move.type)!.baseOutcomes;
  }

  getDisplayCooldown(move: Move) {
    return this.formatTimeDisplay(this.calculateCooldown(move));
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

  formatTimeDisplay(ticks: number) {
    let output = '';
    let minutesTens = '0';
    let minutesOnes = Math.floor(ticks / 600);
    let secondsTens = Math.floor(ticks / 100) % 6;
    let secondsOnes = Math.floor(ticks / 10) % 10;
    if (minutesOnes > 0) {
      output += `${minutesOnes} minute${minutesOnes != 1 ? 's' : ''} `;
    }
    if (secondsOnes > 0 || secondsTens > 0) {
      output += `${secondsTens}${secondsOnes} second${
        secondsTens != 0 && secondsOnes != 1 ? 's' : ''
      }`;
    }
    return output;
  }
}
