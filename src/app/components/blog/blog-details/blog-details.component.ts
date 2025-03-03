declare var bootstrap: any;

import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BlogService } from '../../../services/blog.service';
import { BlogPost } from '../../../models/blog-post.model';
import { CommonModule } from '@angular/common';
import { Location } from '@angular/common';
import { pageContent } from '../../../models/page-content.model';
import { MainContentComponent } from '../../main-content/main-content.component';
import { ImageGalleryComponent } from '../../image-gallery/image-gallery.component';
import { ImageDisplayComponent } from '../../image-display/image-display.component';
import { ImageSliderComponent } from '../../image-slider/image-slider.component';
import { NewsComponent } from '../../news/news.component';
import { FaqComponent } from '../../faq/faq.component';
import { FormGeneratorComponent } from '../../form-generator/form-generator.component';
import { InfoHighlightComponent } from '../../cards/info-highlight/info-highlight.component';
import { BusinessCardComponent } from '../../cards/business-card/business-card.component';
import { ContentTabsComponent } from '../../content-tabs/content-tabs.component';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { PermissionService } from '../../../services/permission.service';

@Component({
  selector: 'app-blog-details', 
  standalone: true,
  imports: [CommonModule,
            MainContentComponent,
            ImageDisplayComponent,
            ImageGalleryComponent,
            ImageSliderComponent,
            NewsComponent,
            FaqComponent,
            FormGeneratorComponent,
            ContentTabsComponent,
            RouterModule, 
            InfoHighlightComponent,
            BusinessCardComponent],
  templateUrl: './blog-details.component.html',
  styleUrl: './blog-details.component.scss',
  providers: [BlogService],
})
export class BlogDetailsComponent {

  constructor(
    private activatedRoute: ActivatedRoute,
    private blogService: BlogService,
    private location: Location,
    private permissionService: PermissionService
  ) {}

  blogPost: BlogPost | null = null;

  blogAllPost: BlogPost[] = [];

  blogPostsUrl: string = ''; 

  error: string | null = null;

  pageContent: pageContent [] = [];
  
  blogURL: String = "";

  permissions: any[] = [];
  
  ngOnInit(): void {

    this.permissions = this.permissionService.getPermissionsArray();

    this.activatedRoute.paramMap.subscribe((params) => {
      const blogUrl = params.get('url'); // Extract blog URL from the route parameters

      if (blogUrl) {

          const currurl = this.location.path();

          const cleanedURL = currurl.split("/").slice(0, -1).join("/");

          this.blogURL = cleanedURL;

          this.blogPostsUrl = "assets/content/pages" + cleanedURL + "/blog-posts.json"; 

          // Retrieve the blog post ID from the route parameters
          const url = String(this.activatedRoute.snapshot.paramMap.get('url'));

          if (url) {
            this.blogService.getPostByURL(this.blogPostsUrl, url).subscribe(
              (post) => (this.blogPost = post),              
              (error) => (this.error = 'Failed to load blog post')
            );
          } else {
            this.error = 'Invalid blog post ID';
          }

          this.blogService.getAllPosts(this.blogPostsUrl).subscribe({
            next: (posts) => (this.blogAllPost = posts),
            error: (err) => (this.error = 'Failed to load blog posts: ' + err.message),
          });


      } else {
        this.error = 'Invalid blog URL';
      }
    });

  }

  filterContentByPermissions(contentArray: any[], permissions: string[]): any[] {

    return contentArray.filter(item => {
      // If the object has no 'permission' property or the permission is in the provided 'permissions' array
      return !item.permission || permissions.includes(item.permission);
    });

  }
  
  closeSidebar() {
    const sidebarElement = document.getElementById('sidebarMenu');
    if (sidebarElement) {
      const bsOffcanvas = bootstrap.Offcanvas.getInstance(sidebarElement);
      if (bsOffcanvas) {
        bsOffcanvas.hide(); // Properly close offcanvas
      }
    }
  }


}
