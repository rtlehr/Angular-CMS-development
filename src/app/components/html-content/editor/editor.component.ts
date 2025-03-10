import { Component } from '@angular/core';
import { QuillModule } from 'ngx-quill';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-editor',
  standalone: true,
  imports: [QuillModule, FormsModule],
  templateUrl: './editor.component.html',
  styleUrl: './editor.component.scss',
})
export class EditorComponent {
  // Bind the editor content to a variable for two-way binding
  editorContent: string = '';
  quillInstance: any;

  // Configure the Quill modules (toolbar options, etc.)
  editorModules = {
    toolbar: [
      ['bold', 'italic', 'underline'], // toggled buttons
      [{ list: 'ordered' }, { list: 'bullet' }], // lists
      ['clean'] // remove formatting button
    ]
  };

  // Capture the underlying Quill instance when it is created.
  onEditorCreated(quill: any): void {
    console.log('onEditorCreated fired:', quill);
    this.quillInstance = quill;
  }

  // Optional: Event handler to log content changes
  handleContentChanged(event: any) {
    console.log('Editor content changed:', event);
  }

  saveContent(): void {
    if (this.quillInstance) {
      console.log('Delta content:', this.quillInstance.getContents());
      console.log('HTML content:', this.quillInstance.root.innerHTML);
    } else {
      console.warn('Quill instance is not available.');
    }
  }
  
}
