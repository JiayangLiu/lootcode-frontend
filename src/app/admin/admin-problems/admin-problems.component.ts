import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProblemService } from '../../services/problem.service';

import { Problem } from '../../problems/problem.model';
import { Subscription } from "rxjs";
import { DataTableResource } from 'angular7-data-table';

@Component({
  selector: 'app-admin-problems',
  templateUrl: './admin-problems.component.html',
  styleUrls: ['./admin-problems.component.css']
})
export class AdminProblemsComponent implements OnInit, OnDestroy {
  problems: Problem[];  // problems array from Server(Backend)
  subscriptionProblems: Subscription;
  tableResource: DataTableResource<Problem>;
  items: Problem[] = [];  // problems array to be rendered in the current page
  itemCount: number;

  constructor(private service: ProblemService) {
  }

  ngOnInit() {
    this.subscriptionProblems = this.service.getAllProblems()
      .subscribe(problems => {
        this.problems = problems;
        this.initializeTable(problems);
      });
  }

  // factorizing the data table initialization process
  private initializeTable(problems: Problem[]) {
    for (let p of problems) {
      if (p.difficulty == 1)
        p.difficulty = "Easy";
      if (p.difficulty == 2)
        p.difficulty = "Medium";
      if (p.difficulty == 3)
        p.difficulty = "Hard";
    }

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

  deleteItem(params) {
    this.subscriptionProblems = this.service.deleteProblem(params)
      .subscribe(problems => {
        this.problems = problems;
        this.initializeTable(problems);
      });
  }

  ngOnDestroy() {
    this.subscriptionProblems.unsubscribe();
  }
}
