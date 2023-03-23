import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SkillData } from '../skills.model';
import * as icons from '../../copy/icons';

@Component({
  selector: 'app-skill-node',
  templateUrl: './skill-node.component.html',
  styleUrls: ['./skill-node.component.sass'],
})
export class SkillNodeComponent {
  ngOnInit() {}

  @Input() position!: number;
  @Input() skillData!: SkillData | undefined;
  @Input() discovered!: boolean;
  @Input() unlocked!: boolean;

  @Output() skillNodeHover = new EventEmitter<SkillData>();

  getUnkownImage() {
    return icons.unknownSkill;
  }

  onMouseEnter() {
    this.skillNodeHover.emit(this.skillData);
  }
}
