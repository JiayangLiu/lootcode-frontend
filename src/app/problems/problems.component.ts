import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProblemService } from '../services/problem.service';
<<<<<<< HEAD
import { HttpClient } from '@angular/common/http';
import { Http } from '@angular/http';
import { Problem } from '../problems/problem.model';
import {Subscription} from "rxjs";
=======
import { Problem } from '../problems/problem.model';
import { Subscription } from "rxjs";
import { DataTableResource } from 'angular7-data-table';
>>>>>>> origin

@Component({
  selector: 'app-problems',
  templateUrl: './problems.component.html',
  styleUrls: ['./problems.component.css']
})
<<<<<<< HEAD
export class ProblemsComponent implements OnInit {
  problems: Problem[];
  subscriptionProblems: Subscription;
=======
export class ProblemsComponent implements OnInit, OnDestroy {
  problems: Problem[];  // problems array from Server(Backend)
  subscriptionProblems: Subscription;
  tableResource: DataTableResource<Problem>;
  items: Problem[] = [];  // problems array to be rendered in the current page
  itemCount: number;
>>>>>>> origin

  constructor(private service: ProblemService) {
  }

  ngOnInit() {
    this.subscriptionProblems = this.service.getAllProblems()
<<<<<<< HEAD
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
=======
      .subscribe(problems => {
        this.problems = problems;
        this.initializeTable(problems);
      });
  }

  // factorizing the data table initialization process
  private initializeTable(problems: Problem[]) {
    this.tableResource = new DataTableResource(problems);
    this.tableResource.query({ offset: 0 })
      .then(items => this.items = items);
    this.tableResource.count()
      .then(count => this.itemCount = count);
  }

  reloadItems(params) {
    if (!this.tableResource)
      return;
    
    this.tableResource.query(params)
      .then(items => this.items = items);
  }

  filter(query: string) {
    if (!this.tableResource)
      return;

    let filteredProblems = (query) ?
      this.problems.filter(p => p.name.toLowerCase().includes(query.toLowerCase()))
      : this.problems;

    this.initializeTable(filteredProblems);
  }

  ngOnDestroy() {
    this.subscriptionProblems.unsubscribe();
  }
}
>>>>>>> origin
