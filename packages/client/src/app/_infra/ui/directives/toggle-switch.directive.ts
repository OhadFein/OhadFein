import { Directive, HostBinding, Input, OnChanges } from '@angular/core';

@Directive({
  selector: '[uiToggleSwitch]'
})
export class ToggleSwitchDirective implements OnChanges {
  @Input() state = true;
  @Input() disabled = false;

  @HostBinding('class') classes = '';

  baseClass = 'toggle-switch';

  ngOnChanges() {
    const cls = this.state ? 'on' : 'off';
    const dis = this.disabled ? 'disabled' : '';
    this.classes = `${this.baseClass} icon-toggle-${cls} ${dis}`;
  }
}
