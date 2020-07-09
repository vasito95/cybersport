import {Component, OnInit} from '@angular/core';
import {DataService} from './service/data.service';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  data: any[];
  isLoaded = false;
  isTestFinished = false;
  currentQuestion: any;
  currentQuestionNumber = 0;
  overllQuestions = 0;
  correctAnswers = 0;

  constructor(private dataService: DataService) {

  }

  ngOnInit(): void {
    this.dataService.getDate().subscribe((res) => {
      this.data = Object.values(res);
      this.overllQuestions = this.data.length;
      this.correctAnswers = 0;
      this.currentQuestion = this.data[0];
      this.isLoaded = true;
    });
  }

  onSubmit(ansForm: NgForm): void {
    const {answer} = ansForm.value;
    if (this.currentQuestion.correct_answers[0] === answer) {
        this.correctAnswers++;
    }
    if (this.currentQuestionNumber < (this.overllQuestions - 1)) {
      this.currentQuestionNumber++;
      this.currentQuestion = this.data[this.currentQuestionNumber];
    } else {
      this.isTestFinished = true;
    }
  }
}
