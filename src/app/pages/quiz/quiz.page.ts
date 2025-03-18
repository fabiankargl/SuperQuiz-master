import { Component, OnInit, inject, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonBackButton,
  IonButtons,
  IonItem,
  IonLabel,
  IonList,
  IonButton,
  ToastController,
  IonModal,
} from '@ionic/angular/standalone';
import { Question } from 'src/app/services/Question';
import { DataService } from 'src/app/services/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.page.html',
  styleUrls: ['./quiz.page.scss'],
  standalone: true,
  imports: [
    IonModal,
    IonButton,
    IonList,
    IonLabel,
    IonItem,
    IonButtons,
    IonBackButton,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
  ],
})
export class QuizPage implements OnInit {
  @ViewChild(IonModal) modal!: IonModal;

  public data = inject(DataService);
  public toastController = inject(ToastController);

  public shuffledQuestions: Question[] = [];
  public pointer: number = 0;
  public currElement: Question | null = null;
  public score: number = 0;

  public toastMessage: string = '';
  public toastColor: string = '';

  private router = inject(Router);

  constructor() {}

  async ngOnInit() {
    await this.data.loadQuiz();
    this.shuffledQuestions = [...this.data.currentQuiz.questions];
    this.shuffleArray(this.shuffledQuestions);
    this.pointer = 0;
    this.currElement = this.shuffledQuestions[this.pointer];
    console.log(this.shuffledQuestions);
  }

  private shuffleArray(array: Question[]): void {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  async checkAnswer(selectedAnswer: number) {
    const isCorrect =
      this.currElement && selectedAnswer === this.currElement.correct;

    this.toastMessage = isCorrect ? 'Correct!' : 'Wrong!';
    this.toastColor = isCorrect ? 'success' : 'danger';

    await this.showToast();

    if (isCorrect) {
      this.score++;
    }
    this.pointer++;
    if (this.pointer < this.shuffledQuestions.length) {
      this.currElement = this.shuffledQuestions[this.pointer];
    } else {
      this.modal.present();
    }
  }

  public async showToast() {
    const toast = await this.toastController.create({
      message: this.toastMessage,
      duration: 1000,
      color: this.toastColor,
    });
    await toast.present();
  }

  public confirm() {
    this.modal.dismiss(null, 'confirm');
    this.router.navigate(['/home']);
  }
}
