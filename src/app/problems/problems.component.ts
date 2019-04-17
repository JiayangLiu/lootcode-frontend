import { Component, OnInit } from '@angular/core';
import { ProblemService } from '../services/problem.service';

@Component({
  selector: 'app-problems',
  templateUrl: './problems.component.html',
  styleUrls: ['./problems.component.css']
})
export class ProblemsComponent implements OnInit {
  problems: any[];

  constructor(private service: ProblemService) { }

  ngOnInit() {
    this.service.getAllProblems()
      .subscribe(response => {
        this.problems = response.json();
    });
  }

   createProblem(input: HTMLInputElement) {
     let problem = { title: input.value };
     input.value = '';

    //  this.service
   }

}
