import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { HeaderMenuComponent } from './components/header-menu/header-menu.component';
import { DisplayLogoComponent } from './components/display-logo/display-logo.component';
import { DisplayContactInfoComponent } from './components/display-contact-info/display-contact-info.component';
import { RouterOutlet } from '@angular/router';
import { ModalWindowComponent } from './components/modal-window/modal-window.component';

import { HasPermissionDirective } from './directives/permission.directive';
import { PermissionService } from './services/permission.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    HeaderMenuComponent,
    DisplayLogoComponent,
    DisplayContactInfoComponent,
    RouterOutlet,
    ModalWindowComponent,
    HasPermissionDirective
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  bobValue: string | null = null;

  constructor(
    private permissionService: PermissionService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.activatedRoute.queryParamMap.subscribe((params) => {
      this.bobValue = params.get('bob'); // Get the 'bob' query parameter

      if (this.bobValue) {
        this.permissionService.setUserPermissions(['public', this.bobValue]); // Set permission
        console.log('Permissions Set:', [this.bobValue]);
      }
    });
  }
}
