import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

export interface InfoItem {
  id: number;
  icon: string;
  title: string;
  description: string;
  link: string;
}

@Component({
  selector: 'app-info-cards',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './info-cards.component.html',
  styleUrl: './info-cards.component.scss'
})
export class InfoCardsComponent {

  infoItems: InfoItem[] = [
    { id: 1, icon: 'bi-lightbulb', title: 'Innovative Ideas', description: 'Discover fresh perspectives.', link: '/ideas' },
    { id: 2, icon: 'bi-bar-chart', title: 'Growth Analytics', description: 'Track progress with insights.', link: '/analytics' },
    { id: 3, icon: 'bi-people', title: 'Team Collaboration', description: 'Work together seamlessly.', link: '/collaboration' },
    { id: 4, icon: 'bi-shield-lock', title: 'Enhanced Security', description: 'State-of-the-art security.', link: '/security' },
    { id: 5, icon: 'bi-lightning', title: 'Lightning Fast', description: 'Unparalleled speed.', link: '/performance' },
    { id: 6, icon: 'bi-headset', title: '24/7 Support', description: 'Get help anytime.', link: '/support' },
  ];

  
}
