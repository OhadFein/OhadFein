import { NgModule } from '@angular/core';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';

@NgModule({
  imports: [MatSidenavModule, MatToolbarModule, MatIconModule, MatListModule],
  exports: [MatSidenavModule, MatToolbarModule, MatIconModule, MatListModule]
})
export class MaterialModule {}
