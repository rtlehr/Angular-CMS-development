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

  // Configure the Quill modules (toolbar options, etc.)
  editorModules = {
    toolbar: [
      ['bold', 'italic', 'underline'], // toggled buttons
      [{ list: 'ordered' }, { list: 'bullet' }], // lists
      ['clean'] // remove formatting button
    ]
  };

  // Optional: Event handler to log content changes
  handleContentChanged(event: any) {
    console.log('Editor content changed:', event);
  }

  saveContent(): void {
    console.log('Save button clicked. Editor content:', this.editorContent);
  }
  
}
