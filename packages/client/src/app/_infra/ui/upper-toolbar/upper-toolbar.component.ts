import { map, filter, mergeMap, pairwise, takeUntil } from 'rxjs/operators';
import { Component, EventEmitter, Output, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RoutesRecognized } from '@angular/router';
import { Subject } from 'rxjs';

@Component({
  selector: 'dsapp-upper-toolbar',
  templateUrl: './upper-toolbar.component.html',
  styleUrls: ['./upper-toolbar.component.scss']
})
export class UpperToolbarComponent implements OnInit, OnDestroy {
  title: string;

  previousUrl: string = '/';

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {}

  private unsubscribe: Subject<void> = new Subject();

  ngOnInit(): void {
    this.subscribeForTitleUpdates();
    this.subscribeForPreviousPage();
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  @Output() public sideMenuOpen = new EventEmitter();

  public onOpenSideMenu = (): void => {
    this.sideMenuOpen.emit();
  };

  subscribeForPreviousPage(): void {
    this.router.events
      .pipe(
        takeUntil(this.unsubscribe),
        filter((evt: any) => evt instanceof RoutesRecognized),
        pairwise()
      )
      .subscribe((events) => {
        this.previousUrl = events[0].urlAfterRedirects;
      });
  }

  subscribeForTitleUpdates(): void {
    this.router.events
      .pipe(
        takeUntil(this.unsubscribe),
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
