import { Component, HostListener } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { HeaderMenuComponent } from './components/header-menu/header-menu.component';
import { DisplayLogoComponent } from './components/display-logo/display-logo.component';
import { DisplayContactInfoComponent } from './components/display-contact-info/display-contact-info.component';
import { RouterOutlet } from '@angular/router';
import { ModalWindowComponent } from './components/modal-window/modal-window.component';

import { HasPermissionDirective } from './directives/permission.directive';
import { PermissionService } from './services/permission.service';

import { EditorComponent } from './components/html-content/editor/editor.component';

import { ContentWithMenuComponent } from './components/contentDisplay/content-with-menu/content-with-menu.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    HeaderMenuComponent,
    DisplayLogoComponent,
    DisplayContactInfoComponent,
    RouterOutlet,
    ModalWindowComponent,
    HasPermissionDirective,
    EditorComponent,
    ContentWithMenuComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {

  private lastScrollTop = 0;
  private header!: HTMLElement | null;
  private navbar!: HTMLElement | null;
  private navbarPlaceholder!: HTMLElement | null;

  permissionValue: any[] = ['public'];

  constructor(
    private permissionService: PermissionService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    
    this.header = document.getElementById("pageHeader");
    this.navbar = document.getElementById("stickyNavbar");
    this.navbarPlaceholder = document.getElementById("navbarPlaceholder");

    window.addEventListener("scroll", this.handleScroll.bind(this));

    this.activatedRoute.queryParamMap.subscribe((params) => {

      const pvArray = params.get('pv')?.split(",");

      if(pvArray)
      {

        for(let count=0;count<pvArray.length;count++)
        {
          this.permissionValue.push(pvArray[count]); // Get the 'bob' query parameter
        }

        if (this.permissionValue) {
          this.permissionService.setUserPermissions(this.permissionValue); // Set permission
          console.log('Permissions Set:', [this.permissionValue]);
        }

      }

    });
  }

  @HostListener("window:scroll", [])
  handleScroll() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (this.header && this.navbar && this.navbarPlaceholder) {
      // When Scrolling Down → Hide Header
      if (scrollTop > this.lastScrollTop) {
        this.header.style.transform = "translateY(-100%)";
      } else {
        // When Scrolling Up → Show Header
        this.header.style.transform = "translateY(0)";
      }

      // If Navbar Reaches the Top, Stick It 
      if (scrollTop >= this.header.clientHeight) {
        this.navbar.classList.add("navbar-sticky");
        this.navbarPlaceholder.style.display = "block"; // Prevents jump
      } else {
        this.navbar.classList.remove("navbar-sticky");
        this.navbarPlaceholder.style.display = "none";
      }
    }

    this.lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
  }

}
