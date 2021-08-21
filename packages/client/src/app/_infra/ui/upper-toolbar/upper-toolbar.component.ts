import { map, filter, mergeMap, pairwise } from 'rxjs/operators';
import { Component, EventEmitter, Output, OnInit, ElementRef, TemplateRef } from '@angular/core';
import {
  ActivatedRoute,
  NavigationEnd,
  ResolveEnd,
  Router,
  RoutesRecognized
} from '@angular/router';
import { UpperToolbarService } from './upper-toolbar.service';

@Component({
  selector: 'dsapp-upper-toolbar',
  templateUrl: './upper-toolbar.component.html',
  styleUrls: ['./upper-toolbar.component.scss']
})
export class UpperToolbarComponent implements OnInit {
  title: string;

  previousUrl: string = '/';

  toolbarButtons: ElementRef;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private upperToolbarService: UpperToolbarService
  ) {}

  ngOnInit(): void {
    this.subscribeForTitleUpdates();
    this.subscribeForPreviousPage();
    this.upperToolbarService.customButtonsComponent.subscribe((customBtnElem) => {
      this.toolbarButtons = customBtnElem;
    });
  }

  @Output() public sideMenuOpen = new EventEmitter();

  public onOpenSideMenu = (): void => {
    this.sideMenuOpen.emit();
  };

  subscribeForPreviousPage(): void {
    this.router.events
      .pipe(
        filter((evt: any) => evt instanceof RoutesRecognized),
        pairwise()
      )
      .subscribe((events: RoutesRecognized[]) => {
        this.previousUrl = events[0].urlAfterRedirects;
      });
  }

  subscribeForTitleUpdates(): void {
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        map(() => this.activatedRoute),
        map((route) => {
          while (route.firstChild) route = route.firstChild;

          return route;
        }),
        filter((route) => route.outlet === 'primary'),
        mergeMap((route) => route.data)
      )
      .subscribe((event) => {
        this.title = event.title;
      });
  }
}
