import {
  Directive,
  ElementRef,
  HostBinding,
  Input,
  OnChanges,
  Renderer2
} from '@angular/core';

@Directive({
  selector: '[uiToggleSwitch]'
})
export class ToggleSwitchDirective implements OnChanges {
  @Input() state = true;
  @Input() disabled = false;

  @HostBinding('class') classes = '';

  baseClass = 'toggle-switch';

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnChanges() {
    const cls = this.state ? 'on' : 'off';
    const dis = this.disabled ? 'disabled' : '';
    this.classes = `${this.baseClass} icon-toggle-${cls} ${dis}`;
  }
}
