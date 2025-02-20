import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, Input, SimpleChanges, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { ModalWindowService } from '../../services/modal-window.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

import hljs from 'highlight.js';
import 'highlight.js/styles/atom-one-dark.css';

@Component({
  selector: 'app-main-content',
  standalone: true,
  imports: [HttpClientModule],
  templateUrl: './main-content.component.html',
  styleUrl: './main-content.component.css'
})
export class MainContentComponent {

  @Input() content: string = '';
  @Input() fileToLoad: string = '';
  @Input() divId: string = '';

  htmlContent!: SafeHtml;

  @ViewChild('contentContainer', { static: false }) contentContainer!: ElementRef;

  constructor(
    private http: HttpClient,
    private modalWindow: ModalWindowService,
    private sanitizer: DomSanitizer,
    private renderer: Renderer2
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['fileToLoad'] && changes['fileToLoad'].currentValue) {
      this.loadContent(changes['fileToLoad'].currentValue);
    }
  }

  loadContent(fileName: string) {
    this.http.get(`assets/${fileName}`, { responseType: 'text' }).subscribe({
      next: (html) => {
        this.htmlContent = this.sanitizer.bypassSecurityTrustHtml(html);
        
        setTimeout(() => {
          this.attachClickEvents();
          this.highlightCode();
        }, 10);
      },
      error: (err) => {
        console.error('Failed to load content:', err);
        this.htmlContent = '<p>Sorry, the content could not be loaded.</p>';
      }
    });
  }

  attachClickEvents() {
    if (!this.contentContainer) return;
  
    const buttons = this.contentContainer.nativeElement.querySelectorAll('[data-click]');
  
    buttons.forEach((button: HTMLElement) => {
      const functionName = button.getAttribute('data-click');
      const jsonData = button.getAttribute('data-content');
  
      if (functionName === 'openModalWindow' && jsonData) {
        try {
          const parsedData = JSON.parse(jsonData); // Convert string to JSON object
  
          this.renderer.listen(button, 'click', () => {
            this.openModalWindow(parsedData);
          });
  
        } catch (error) {
          console.error("Invalid JSON in data-content:", error);
        }
      }
    });
  }
  

  highlightCode() {
    if (this.contentContainer) {
      this.contentContainer.nativeElement.querySelectorAll('pre code').forEach((block: HTMLElement) => {
        hljs.highlightElement(block);
      });
    }
  }

  openModalWindow(modalContent: any) {
    console.log("Modal Content:", modalContent); // Should log: { content: "this is modal content from blog list" }
    this.modalWindow.openModalWindow(modalContent);
  }
  
}
