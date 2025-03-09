import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-html-editor',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule], // ✅ Required for standalone components
  templateUrl: './html-editor.component.html',
  styleUrls: ['./html-editor.component.scss'],
})
export class HtmlEditorComponent {
  
  htmlForm: FormGroup;
  successMessage: string = '';
  errorMessage: string = '';

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.htmlForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      permission: ['public', Validators.required],
      content: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  submitForm() {
    if (this.htmlForm.invalid) {
      this.errorMessage = 'Please fill out all required fields.';
      return;
    }

    this.successMessage = '';
    this.errorMessage = '';

    this.http.post('http://yourserver.com/save-html.php', this.htmlForm.value)
      .subscribe({
        next: (response: any) => {
          this.successMessage = response.message;
          this.htmlForm.reset();
        },
        error: (err) => {
          this.errorMessage = 'Failed to save the document.';
          console.error('Error:', err);
        }
      });
  }
}
