import { Component, OnInit } from '@angular/core';
import { ProblemService } from '../services/problem.service';
import { HttpClient } from '@angular/common/http';
import { Http } from '@angular/http';
import { Problem } from '../problems/problem.model';
import {Subscription} from "rxjs";

@Component({
  selector: 'app-problems',
  templateUrl: './problems.component.html',
  styleUrls: ['./problems.component.css']
})
export class ProblemsComponent implements OnInit {
  problems: Problem[];
  subscriptionProblems: Subscription;

  constructor(private service: ProblemService) {
  }

  ngOnInit() {
    this.subscriptionProblems = this.service.getAllProblems()
      .subscribe(problems => this.problems = problems);
  }

  // createProblem(input: HTMLInputElement) {
  //   let problem = { title: input.value };
  //   input.value = '';

  //   this.service.createProblem(problem)
  //     .subscribe(
  //       newProblem => {
  //         problem['id'] = newProblem.id;
  //           this.problems.splice(0, 0, problem);
  //       });
  // }

  // updateProblem(problem) {
  //   this.service.updateProblem(problem)
  //     .subscribe(
  //       updatedProblem => {
  //         console.log(updatedProblem);
  //       });
  // }

  // deleteProblem(problem) {
  //   this.service.deleteProblem(problem.id)
  //     .subscribe(
  //       () => {
  //         let index = this.problems.indexOf(problem);
  //         this.problems.splice(index, 1);
  //       });
  // }
}
