import { Directive, ElementRef, Input, OnInit } from '@angular/core';

import { Name } from '../models';

@Directive({
  selector: '[dsappStarName]'
})
export class StarNameDirective implements OnInit {
  @Input() givenName: string;
  @Input() familyName: string;

  constructor(private elementRef: ElementRef) { }

  ngOnInit() {
    const formatedName = `${this.givenName} ${this.familyName}`;
    this.elementRef.nativeElement.innerHTML = formatedName;
  }

}
