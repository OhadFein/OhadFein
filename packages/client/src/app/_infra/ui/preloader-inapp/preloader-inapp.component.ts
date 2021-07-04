import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'ui-preloader-inapp',
  templateUrl: './preloader-inapp.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PreloaderInappComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
