import { Component, OnInit } from '@angular/core';
import { ProblemService } from '../services/problem.service';
import { Problem } from '../problems/problem.model';
import {Subscription} from "rxjs";
import { DataTableResource } from 'angular7-data-table';

@Component({
  selector: 'app-problems',
  templateUrl: './problems.component.html',
  styleUrls: ['./problems.component.css']
})
export class ProblemsComponent implements OnInit {
  problems: Problem[];
  subscriptionProblems: Subscription;
  tableResource: DataTableResource<Problem>;
  items: Problem[] = [];
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
}
