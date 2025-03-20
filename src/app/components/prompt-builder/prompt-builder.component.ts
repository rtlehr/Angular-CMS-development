import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-prompt-builder',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './prompt-builder.component.html',
  styleUrls: ['./prompt-builder.component.scss']
})
export class PromptBuilderComponent {
  promptDetails = {
    subject: '',
    details: '',
    style: '',
    lighting: '',
    camera: '',
    environment: '',
    medium: '',
    quality: '',
    negative: '',
    additionalNotes: ''
  };

  artisticStyles: string[] = [
    'Fantasy',
    'Cyberpunk',
    'Impressionism',
    'Vintage',
    'Realism',
    'Anime',
    'Steampunk',
    'Minimalist',
    'Baroque',
    'Abstract'
  ];

  lightingMoods: string[] = [
    'Golden sunset',
    'Dramatic shadows',
    'Soft morning light',
    'Eerie moonlight',
    'Chiaroscuro lighting',
    'Warm ambient',
    'Cool tones'
  ];

  cameraAngles: string[] = [
    'Wide-angle landscape',
    'Close-up portrait',
    'Bird\'s-eye view',
    'Shallow depth-of-field',
    'Low-angle perspective',
    'Over-the-shoulder',
    'Eye-level perspective'
  ];

  generatedPrompt: string = '';
  isLoading: boolean = false;

  constructor(private http: HttpClient) {}

  generatePrompt() {
    this.isLoading = true;

    const apiUrl = 'YOUR_BACKEND_ENDPOINT_URL';
    const body = { ...this.promptDetails };

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    this.http.post<any>(apiUrl, body, { headers }).subscribe({
      next: (response) => {
        this.generatedPrompt = response.generatedPrompt;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error generating prompt:', error);
        this.isLoading = false;
      }
    });
  }

  copyPrompt() {
    navigator.clipboard.writeText(this.generatedPrompt);
    alert('Prompt copied to clipboard!');
  }
}
