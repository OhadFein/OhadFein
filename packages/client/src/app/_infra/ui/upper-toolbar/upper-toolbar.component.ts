import { map, filter } from 'rxjs/operators';
import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, ResolveEnd, Router } from '@angular/router';

@Component({
  selector: 'dsapp-upper-toolbar',
  templateUrl: './upper-toolbar.component.html',
  styleUrls: ['./upper-toolbar.component.scss']
})
export class UpperToolbarComponent implements OnInit {
  title: string;

  constructor(private router: ActivatedRoute) {}

  ngOnInit(): void {
    this.router.url
      .pipe(
        map((event) => {
          console.log(event);
        })
      )
      .subscribe();
  }

  @Output() public sideMenuOpen = new EventEmitter();

  public onOpenSideMenu = (): void => {
    this.sideMenuOpen.emit();
  };
}
