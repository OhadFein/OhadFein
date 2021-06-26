import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'dsapp-preloader-icon',
  templateUrl: './preloader-icon.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PreloaderIconComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
