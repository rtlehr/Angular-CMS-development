import { Component} from '@angular/core';
import { MainContentComponent } from '../../main-content/main-content.component';
import { ImageGalleryComponent } from "../../image-gallery/image-gallery.component";
import { NewsComponent } from '../../news/news.component';
import { FaqComponent } from '../../faq/faq.component';
import { ImageDisplayComponent } from '../../image-display/image-display.component';
import { FormGeneratorComponent } from '../../form-generator/form-generator.component';
import { ImageSliderComponent } from '../../image-slider/image-slider.component';
import { ContentTabsComponent } from '../../content-tabs/content-tabs.component';
import { BlogListComponent } from '../../blog/blog-list/blog-list.component'; 
import { pageContent } from '../../../models/page-content.model';
import { InfoHighlightComponent } from '../../cards/info-highlight/info-highlight.component';
import { BusinessCardComponent } from '../../cards/business-card/business-card.component';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

import { PermissionService } from '../../../services/permission.service';

@Component({
  selector: 'app-page-generator',
  standalone: true, 
  imports: [MainContentComponent,
    ImageGalleryComponent,
    NewsComponent,
    FaqComponent,
    ImageDisplayComponent,
    FormGeneratorComponent,
    ImageSliderComponent,
    ContentTabsComponent,
    BlogListComponent,
    InfoHighlightComponent,
    BusinessCardComponent],
  templateUrl: './page-generator.component.html',
  styleUrl: './page-generator.component.scss'
})
export class PageGeneratorComponent {

  divId: String = "";
  
  pageContent: pageContent[] = [];

  permissions: any[] = [];

  constructor(private activatedRoute: ActivatedRoute, 
              private router: Router,
              private permissionService: PermissionService) {}

  ngOnInit() {

    this.permissions = this.permissionService.getPermissionsArray();

    console.log("Permissions");
    console.table(this.permissions);

    //this.pageContent = this.activatedRoute.snapshot.data['pageContent']; 

    this.pageContent = this.filterContentByPermissions(this.activatedRoute.snapshot.data['pageContent'], this.permissions);

    const currentRoutePath = this.activatedRoute.snapshot.routeConfig?.path || "";
    this.divId = `${currentRoutePath}-div`;
    
    console.log('Dynamic Div ID:', this.divId);
  }

  filterContentByPermissions(contentArray: any[], permissions: string[]): any[] {

    return contentArray.filter(item => {
      // If the object has no 'permission' property or the permission is in the provided 'permissions' array
      return !item.permission || permissions.includes(item.permission);
    });

  }

  

}



