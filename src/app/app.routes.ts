import { Routes } from '@angular/router';
import { PageGeneratorComponent } from './components/contentDisplay/page-generator/page-generator.component';
import { BlogListComponent } from './components/blog/blog-list/blog-list.component';
import { ContentWithSideMenuComponent } from './components/contentDisplay/content-with-side-menu/content-with-side-menu.component';
import { ContentBlankPageComponent } from './components/contentDisplay/content-blank-page/content-blank-page.component';
import { BlogDetailsComponent } from './components/blog/blog-details/blog-details.component';
import { permissionGuard } from './guards/permission.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  
  { 
    path: 'home', 
    component: PageGeneratorComponent, 
    title: "Home",
    data: {
      menu: true,
      pageContent: [
        { contentType: "contentPage", divId: "homeContentOne", contentFile: "content/pages/home/home-content-one.html" },
        { contentType: "contentPage", permission: "admin", divId: "homeContentTwo", contentFile: "content/pages/home/home-content-two.html" }
      ]
    }
  },
  
  { 
    path: 'cms-information', 
    component: ContentBlankPageComponent,
    title: "CMS Information",
    data: {
      menu: true,
      pageContent: []
    },
    children: [
      { 
        path: 'cms-components',
        component: ContentWithSideMenuComponent,
        title: 'CMS Components',
        data: {
          menu: true, 
          pageContent: [
            { contentType: "contentPage", divId: "contentBlockOne", contentFile: "content/pages/cms-information/component-samples/news/news.html" },
            { contentType: "news", divId: "contentBlockTwo", contentFile: "content/pages/cms-information/component-samples/news/page-news.json" }
          ]
        },
        children: [
          { 
            path: 'content',
            component: PageGeneratorComponent,
            title: 'Content',
            data: {
              menu: true, 
              pageContent: [{"contentType": "contentPage", "divId": "contentBlockOne", "contentFile": "content/pages/cms-information/component-samples/content/content.html"}]
            }
          },{ 
            path: 'news',
            component: PageGeneratorComponent,
            title: 'News',
            data: {
              menu: true, 
              pageContent: [
                { contentType: "contentPage", divId: "contentBlockOne", contentFile: "content/pages/cms-information/component-samples/news/news.html" },
                { contentType: "news", divId: "contentBlockTwo", contentFile: "content/pages/cms-information/component-samples/news/page-news.json" }
              ]
            }
          },
          { 
            path: 'faq',
            component: PageGeneratorComponent,
            title: 'FAQs',
            data: {
              menu: true, 
              pageContent: [
                { contentType: "contentPage", divId: "contentBlockOne", contentFile: "content/pages/cms-information/component-samples/faqs/faqs.html" },
                { contentType: "faq", divId: "contentBlockTwo", contentFile: "content/pages/cms-information/component-samples/faqs/page-faq.json" }
              ]
            }
          },
          { 
            path: 'image-gallery',
            component: PageGeneratorComponent,
            title: 'Image Gallery',
            data: {
              menu: true, 
              pageContent: [
                { contentType: "contentPage", divId: "contentBlockOne", contentFile: "content/pages/cms-information/component-samples/imageGallery/imageGallery.html" },
                { contentType: "imageGallery", divId: "contentBlockTwo", contentFile: "content/pages/cms-information/component-samples/imageGallery/page-image-gallery-images.json" }
              ]
            }
          },
          { 
            path: 'image-display',
            component: PageGeneratorComponent,
            title: 'Image Display',
            data: {
              menu: true, 
              pageContent: [
                { contentType: "contentPage", divId: "contentBlockOne", contentFile: "content/pages/cms-information/component-samples/imageDisplay/imageDisplay.html" },
                { contentType: "imageDisplay", divId: "contentBlockTwo", contentFile: "content/pages/cms-information/component-samples/imageDisplay/page-image-display.json" }
              ]
            }
          },
          { 
            path: 'image-slider',
            component: PageGeneratorComponent,
            title: 'Image Slider',
            data: {
              menu: true, 
              pageContent: [{"contentType": "contentPage", "divId": "contentBlockOne", "contentFile": "content/pages/cms-information/component-samples/imageSlider/imageSlider.html"},
              {"contentType": "imageSlider", "divId": "contentBlockTwo", "contentFile": "content/pages/cms-information/component-samples/imageSlider/image-slider-images.json"}]
            }
          },
          { 
            path: 'tabs',
            component: PageGeneratorComponent,
            title: 'Tabs',
            data: {
              menu: true, 
              pageContent: [{"contentType": "tabs", "divId": "contentBlockOne", "contentFile": "content/pages/cms-information/component-samples/tabs/content-tabs.json"}]
            }
          },
          { 
            path: 'form-sample',
            component: PageGeneratorComponent,
            title: 'Forms',
            data: {
              menu: true, 
              pageContent: [{"contentType": "contentPage", "divId": "contentBlockOne", "contentFile": "content/pages/cms-information/component-samples/forms/forms.html"},
              {"contentType": "form", "divId": "contentBlockTwo", "contentFile": "content/pages/cms-information/component-samples/forms/page-form.json"}]
            }
          }
        ]
      },
      { 
        path: 'cms-cards',
        component: ContentWithSideMenuComponent,
        title: 'Cards',
        data: {
          menu: true, 
          pageContent: [
            { contentType: "contentPage", divId: "contentBlockOne", contentFile: "content/pages/cms-information/component-samples/news/news.html" },
            { contentType: "news", divId: "contentBlockTwo", contentFile: "content/pages/cms-information/component-samples/news/page-news.json" }
          ]
        },
        children: [
          { 
            path: 'info-highlight',
            component: PageGeneratorComponent,
            title: 'Info Highlight',
            data: {
              menu: true,
              pageContent: [
                { contentType: "contentPage", divId: "contentBlockOne", contentFile: "content/pages/cms-information/cms-cards/info-highlite/info-highlite.html" },
                {"contentType": "infoHighlight", "divId": "infoHighlight", "contentFile": "content/pages/cms-information/cms-cards/info-highlite/info-highlite.json"}]
            }
          },
          { 
            path: 'business-cards',
            component: PageGeneratorComponent,
            title: 'Business Cards',
            data: {
              menu: true,
              pageContent: [
                { contentType: "contentPage", divId: "contentBlockOne", contentFile: "content/pages/cms-information/cms-cards/business-card/business-card.html" },
                {"contentType": "businesscard", "divId": "businesscard", "contentFile": "content/pages/cms-information/cms-cards/business-card/business-card.json"}]
            }
          }
        ]
      },
      { 
        path: 'modal-wondow',
        component: PageGeneratorComponent,
        title: 'Modal Window',
        data: {
          menu: true, 
          pageContent: [
            { contentType: "contentPage", divId: "modalWindow", contentFile: "content/pages/cms-information/modal-window/modal-window.html" }
          ]
        }
      },
      { 
        path: 'css-styles',
        component: PageGeneratorComponent,
        title: 'Site CSS Styles',
        data: {
          menu: true, 
          pageContent: [
            { contentType: "contentPage", divId: "css-styles", contentFile: "content/pages/cms-information/css-styles/css-styles.html" }
          ]
        }
      }
    ]
  },
  
  { 
    path: 'blog',
    component: BlogListComponent, 
    title: "Blog",
    data: {
      menu: true,
      pageContent: [
        { contentType: "blogList", divId: "blogList", contentFile: "assets/content/pages/blog/blog-posts.json" }
      ]
    }
  },
  
  { 
    path: 'blog/:url',
    component: BlogDetailsComponent 
  },
  
  { 
    path: '**', 
    component: PageGeneratorComponent 
  }
];

