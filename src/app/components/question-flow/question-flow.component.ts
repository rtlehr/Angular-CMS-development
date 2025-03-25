import {
  Component,
  Input,
  OnInit,
  OnChanges,
  SimpleChanges
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { JsonDataService } from '../../services/json-data.service';

interface Question {
  id: string;
  text: string;
  type: 'textbox' | 'textarea' | 'radio' | 'checkbox' | 'dropdown';
  required: boolean;
  options?: string[];
  next?: { [answer: string]: string };
}

@Component({
  selector: 'app-question-flow',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './question-flow.component.html',
  styleUrls: ['./question-flow.component.scss']
})
export class QuestionFlowComponent implements OnInit, OnChanges {
  @Input() fileToLoad: string = '';

  questions: { [id: string]: Question } = {};
  currentQuestionId: string = '';
  currentAnswer: any = null;
  answers: { [id: string]: any } = {};
  isReady: boolean = false;

  constructor(private jsonDataService: JsonDataService) {}

  ngOnInit(): void {
   // if (this.fileToLoad) {
      //this.loadQuestions(this.fileToLoad);
      this.loadQuestions('JSON/questions-branching.json');
   // }
  }

  ngOnChanges(changes: SimpleChanges): void {
   // if (changes['fileToLoad'] && changes['fileToLoad'].currentValue) {
      //this.loadQuestions(changes['fileToLoad'].currentValue);
    //  this.loadQuestions('questions.json');
   // }
  }

  loadQuestions(filename: string): void {
    console.log("loadQuestions: " + filename);
    this.jsonDataService.loadData('assets/' + filename).subscribe(() => {
      //this.jsonDataService.loadData(filename).subscribe(() => {
      const data: Question[] = this.jsonDataService.getData();
      console.log('Loaded questions:', data);
      this.questions = {};
      for (const q of data) {
        this.questions[q.id] = q;
      }
      this.currentQuestionId = data.length > 0 ? data[0].id : '';
      this.currentAnswer = null;
      this.answers = {};
      this.isReady = true;
    });
  }

  isAnswered(): boolean {
    const current = this.questions[this.currentQuestionId];
    if (!current.required) return true;

    if (current.type === 'checkbox') {
      return Array.isArray(this.currentAnswer) && this.currentAnswer.length > 0;
    }

    return !!this.currentAnswer;
  }

  nextQuestion(): void {
    if (!this.isAnswered()) return;

    this.answers[this.currentQuestionId] = this.currentAnswer;

    const current = this.questions[this.currentQuestionId];
    const answerKey = Array.isArray(this.currentAnswer)
      ? this.currentAnswer.join(',')
      : this.currentAnswer;
    const nextId = current.next?.[answerKey] || current.next?.['default'];

    if (nextId && this.questions[nextId]) {
      this.currentQuestionId = nextId;
      this.currentAnswer = null;
    } else {
      this.currentQuestionId = '';
    }
  }

  isFinished(): boolean {
    return !this.currentQuestionId;
  }

  toggleCheckbox(option: string): void {
    if (!this.currentAnswer) this.currentAnswer = [];
    const idx = this.currentAnswer.indexOf(option);
    if (idx > -1) {
      this.currentAnswer.splice(idx, 1);
    } else {
      this.currentAnswer.push(option);
    }
  }

  get totalQuestions(): number {
    return Object.keys(this.questions).length;
  }
  
  get answeredQuestions(): number {
    return Object.keys(this.answers).length;
  }
  
  get progress(): number {
    return this.totalQuestions > 0
      ? Math.round((this.answeredQuestions / this.totalQuestions) * 100)
      : 0;
  }
  
}
