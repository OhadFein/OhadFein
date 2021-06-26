import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';
import { LabPlayerJumpDirection } from '@app/_infra/core/models';

@Component({
  selector: 'ui-player-controls',
  templateUrl: './player-controls.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlayerControlsComponent {
  @Input() playing = false;
  @Output() toggleVideos = new EventEmitter();
  @Output() stop = new EventEmitter();
  @Output() jump = new EventEmitter<LabPlayerJumpDirection>();

  onToggleVideos() {
    this.toggleVideos.emit();
  }

  onStop() {
    this.stop.emit();
  }

  onJump(direction: LabPlayerJumpDirection) {
    this.jump.emit(direction);
  }
}
