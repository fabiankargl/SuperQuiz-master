import { Injectable } from '@angular/core';
import { Quiz } from './Quiz';
import { Question } from './Question';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  public currentQuiz: Quiz = {id: '', quizName: 'newQuiz', questions: []};

  constructor() { 
    this.currentQuiz.questions.push({
      id: '1',
      title: 'What is the capital of France?',
      a1: 'Paris',
      a2: 'London',
      a3: 'Berlin',
      a4: 'Madrid',
      correct: 1
    })
  }

  public getNewQuestion(): Question {
    return {
      id: '0',
      title: '',
      a1: '',
      a2: '',
      a3: '',
      a4: '',
      correct: 1
    }
  }

  public getQuestion(qid: string): Question | undefined {
    return this.currentQuiz.questions.find(q => q.id === qid);
  }

}
