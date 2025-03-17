import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton, IonList, IonItem, IonLabel } from '@ionic/angular/standalone';
import { DataService } from 'src/app/services/data.service';
import { ActivatedRoute } from '@angular/router';
import { Question } from 'src/app/services/Question';

@Component({
  selector: 'app-question',
  templateUrl: './question.page.html',
  styleUrls: ['./question.page.scss'],
  standalone: true,
  imports: [IonLabel, IonItem, IonList, IonBackButton, IonButtons, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class QuestionPage implements OnInit {

  public data: DataService = inject(DataService);
  private route = inject(ActivatedRoute);
  public question!: Question

  constructor() { }

  ngOnInit() {
    let questionId = this.route.snapshot.paramMap.get('id');
    if (!questionId) questionId = '0';
    if (questionId=='0') 
      this.question = this.data.getNewQuestion();
    else
      this.question = this.data.getQuestion(questionId) || this.data.getNewQuestion();
  }

}
