import { inject, Injectable } from '@angular/core';
import { Quiz } from './Quiz';
import { Question } from './Question';
import { v4 as uuidv4 } from 'uuid';
import { Preferences } from '@capacitor/preferences';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  public currentQuiz: Quiz = { id: '', quizName: 'newQuiz', questions: [] };
  private http: HttpClient = inject(HttpClient);

  constructor() {
    // this.currentQuiz.questions.push({
    //   id: '1',
    //   title: 'What is the capital of France?',
    //   a1: 'Paris',
    //   a2: 'London',
    //   a3: 'Berlin',
    //   a4: 'Madrid',
    //   correct: 1,
    // });
    //this.loadQuiz();
    this.loadQuizFromJSON();
  }

  loadQuizFromJSON() {
    this.http
      .get<Quiz>('https://www.schmiedl.co.at/json_cors/data.json')
      .subscribe((data: Quiz) => {
        if (data) {
          this.currentQuiz = data;
        } else {
          console.log('No data found');
        }
      });
  }

  public async loadQuiz() {
    const pref = await Preferences.get({ key: 'fSuperQuiz' });
    if (pref.value) {
      this.currentQuiz = JSON.parse(pref.value) as Quiz;
    }
  }

  public async saveQuiz() {
    await Preferences.set({
      key: 'fSuperQuiz',
      value: JSON.stringify(this.currentQuiz),
    });
  }

  public getNewQuestion(): Question {
    return {
      id: '0',
      title: '',
      a1: '',
      a2: '',
      a3: '',
      a4: '',
      correct: 1,
    };
  }

  public getQuestion(qid: string): Question | undefined {
    return this.currentQuiz.questions.find((q) => q.id === qid);
  }

  public addQuestion(q: Question) {
    if (q.id === '0') {
      q.id = uuidv4();
    }
    this.currentQuiz.questions.push(q);
    this.saveQuiz();
  }

  public deleteQuestion(q: Question) {
    this.currentQuiz.questions = this.currentQuiz.questions.filter(
      (question) => question.id !== q.id
    );
    this.saveQuiz();
  }
}
