import { Routes } from '@angular/router';
import { PageGeneratorComponent } from './components/contentDisplay/page-generator/page-generator.component';
import { BlogListComponent } from './components/blog/blog-list/blog-list.component';
import { ContentWithSideMenuComponent } from './components/contentDisplay/content-with-side-menu/content-with-side-menu.component';
import { ContentBlankPageComponent } from './components/contentDisplay/content-blank-page/content-blank-page.component';
import { BlogDetailsComponent } from './components/blog/blog-details/blog-details.component';
import { permissionGuard } from './guards/permission.guard';
import { LoginComponent } from './components/login/login.component';
import { HtmlEditorComponent } from './components/html-content/html-editor/html-editor.component';
import { ContentWithMenuComponent } from './components/contentDisplay/content-with-menu/content-with-menu.component';

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
    data: { menu: true, pageContent: [] },
    children: [
      { 
        path: 'cms-components',
        component: ContentWithMenuComponent,
        title: 'CMS Components',
        data: {
          menu: true, 
          pageContent: [
            { contentType: "contentPage", divId: "contentBlockOne", contentFile: "content/pages/cms-information/component-samples/news/news.html" },
            { contentType: "news", divId: "contentBlockTwo", contentFile: "content/pages/cms-information/component-samples/news/page-news.json" }
          ]
        }
      },

  { 
    path: 'cms-components/:url',
    component: ContentWithMenuComponent 
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
                { contentType: "infoHighlight", divId: "infoHighlight", contentFile: "content/pages/cms-information/cms-cards/info-highlite/info-highlite.json" }
              ]
            }
          }
        ]
      },

      { 
        path: 'modal-window',
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
        { contentType: "blogList", divId: "blogList", contentFile: "assets/content/pages/blog/content.json" }
      ]
    }
  },

  { 
    path: 'blog/:url',
    component: ContentWithMenuComponent 
  },

  { 
    path: 'login', 
    component: LoginComponent, 
    title: "Login",
    data: { menu: true, pageContent: [] }
  },

  { 
    path: 'edit-html', 
    component: HtmlEditorComponent, 
    title: "Edit HTML",
    data: { menu: true, pageContent: [] }
  },

  { 
    path: 'content-test', 
    component: ContentWithMenuComponent, 
    title: "Content Test",
    data: { menu: true, pageContent: [] }
  },

  { 
    path: 'content-test/:url',
    component: ContentWithMenuComponent 
  },

  { 
    path: '**', 
    component: PageGeneratorComponent 
  }
];
