import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import {MatIconRegistry} from '@angular/material/icon';

const LOGO_SVG = `
<svg id="Layer_1"
     data-name="Layer 1"
     xmlns="http://www.w3.org/2000/svg"
     xmlns:xlink="http://www.w3.org/1999/xlink"
     viewBox="0 0 634.31 118.96">
    <defs>
        <style>
            .cls-1 {
                fill: #343434;
            }

            .cls-2 {
                fill: url(#linear-gradient);
            }
        </style>
        <linearGradient id="linear-gradient"
                        x1="434.56"
                        y1="209.34"
                        x2="434.56"
                        y2="115.97"
                        gradientUnits="userSpaceOnUse">
            <stop offset="0.02"
                  stop-color="#ffb965" />
            <stop offset="1"
                  stop-color="#ffb154" />
        </linearGradient>
    </defs>
    <path class="cls-1"
          d="M158.45,83H137.28a1.42,1.42,0,0,0-1.42,1.41v40.56a41.69,41.69,0,1,0,0,67.68V199a1.43,1.43,0,0,0,1.42,1.42h21.17a1.42,1.42,0,0,0,1.41-1.42V84.36A1.41,1.41,0,0,0,158.45,83Zm-46.92,96.88a21.07,21.07,0,1,1,21.08-21.07A21.07,21.07,0,0,1,111.53,179.83Z"
          transform="translate(-69.85 -82.86)" />
    <rect class="cls-1"
          x="572.06"
          width="24"
          height="117.5"
          rx="1.42" />
    <rect class="cls-1"
          x="610.31"
          width="24"
          height="117.5"
          rx="1.42" />
    <path class="cls-1"
          d="M263,117.4H241.85a1.41,1.41,0,0,0-1.41,1.41v6.11a41.69,41.69,0,1,0,0,67.68V199a1.42,1.42,0,0,0,1.41,1.42H263a1.42,1.42,0,0,0,1.41-1.42V118.81A1.41,1.41,0,0,0,263,117.4Zm-46.91,62.43a21.07,21.07,0,1,1,21.07-21.07A21.07,21.07,0,0,1,216.11,179.83Z"
          transform="translate(-69.85 -82.86)" />
    <rect class="cls-1"
          x="532.99"
          y="34.45"
          width="24"
          height="83.05"
          rx="1.42" />
    <rect class="cls-1"
          x="532.99"
          y="2.98"
          width="24"
          height="24"
          rx="1.42" />
    <path class="cls-1"
          d="M356.09,125.44q9.51,9.28,9.51,27.53v46.22a1.41,1.41,0,0,1-1.42,1.42H342.89a1.42,1.42,0,0,1-1.42-1.42V156.68q0-9.9-4.33-14.77T324.61,137q-9.12,0-14.54,5.65t-5.41,16.78v39.72a1.41,1.41,0,0,1-1.42,1.42H282a1.42,1.42,0,0,1-1.42-1.42V118.81A1.42,1.42,0,0,1,282,117.4h20.21a1.42,1.42,0,0,1,1.42,1.41v8.33A32,32,0,0,1,315.49,119a41.43,41.43,0,0,1,15.62-2.86Q346.58,116.16,356.09,125.44Z"
          transform="translate(-69.85 -82.86)" />
    <path class="cls-1"
          d="M538.81,168l-11.6,11.44v19.77a1.42,1.42,0,0,1-1.42,1.42h-21.3a1.41,1.41,0,0,1-1.41-1.42V87.26a1.42,1.42,0,0,1,1.41-1.42h21.3a1.43,1.43,0,0,1,1.42,1.42v63.55l34.85-33a1.4,1.4,0,0,1,1-.38h24.82a1.42,1.42,0,0,1,1,2.41l-32.28,32.85,35.94,45.66a1.42,1.42,0,0,1-1.12,2.29H565.78a1.38,1.38,0,0,1-1.1-.53Z"
          transform="translate(-69.85 -82.86)" />
    <path class="cls-2"
          d="M484.05,133.18h0c-7.28-12.73-26.47-20.71-41.27-12.35-11.29,6.4-15.1,21.94-18.46,35.65-2.8,11.44-5.22,21.31-11.33,21.31a8.52,8.52,0,0,1-6.45-2.61c-4.86-5.15-4.2-16.57-4-20.86a72,72,0,0,1,8.8-30.44c.35-.64,1.46-2.87.93-4.58a2.43,2.43,0,0,0-1.28-1.49,3.91,3.91,0,0,0-1.81-.32c-6-.08-11.05-.09-16.11.09-4.58.16-6,3.74-7.29,7.2-.17.44-.34.88-.52,1.33a63.73,63.73,0,0,0-3.15,10.38A105.18,105.18,0,0,0,380,153.3c-.64,11.33-.47,23.14,5,32.77,7,12.3,26.16,20.19,41.24,12.36,12.43-6.45,16.58-23.51,19.91-37.22,2.57-10.6,4.8-19.75,9.91-19.75a8.52,8.52,0,0,1,6.45,2.61c4.86,5.15,4.2,16.57,4,20.87a72,72,0,0,1-8.8,30.43c-.35.64-1.46,2.87-.93,4.58a2.44,2.44,0,0,0,1.27,1.49,4.06,4.06,0,0,0,1.82.32c2.24,0,4.63.06,7.1.06,2.95,0,6,0,9-.15,4.58-.16,6-3.74,7.29-7.21.17-.43.34-.88.52-1.32A63.43,63.43,0,0,0,487,182.76,106.34,106.34,0,0,0,489.09,166C489.72,154.62,489.56,142.81,484.05,133.18Z"
          transform="translate(-69.85 -82.86)" />
</svg>
`;
@Component({
  selector: 'ui-logo',
  templateUrl: './logo.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [`
    .ui-logo {
      display: flex;
      width: 40%;
    }
    
  `]
})
export class LogoComponent implements OnInit {
  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
    // Note that we provide the icon here as a string literal here due to a limitation in
    // Stackblitz. If you want to provide the icon from a URL, you can use:
    // `iconRegistry.addSvgIcon('thumbs-up', sanitizer.bypassSecurityTrustResourceUrl('icon.svg'));`
    iconRegistry.addSvgIconLiteral('logo', sanitizer.bypassSecurityTrustHtml(LOGO_SVG));
  }
  ngOnInit() {}
}
