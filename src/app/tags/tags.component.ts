import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProblemService } from '../services/problem.service';

import { Problem } from '../problems/problem.model';
import { Subscription } from "rxjs";
import { DataTableResource } from 'angular7-data-table';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.css']
})
export class TagsComponent implements OnInit, OnDestroy {
  selectedValue: string;

  tags: string[] = [ 'Two Pointer', 'Binary Search', 'Dynamic Programming', 'Backtracking', 'Gready',
                      'Depth-first Search', 'Breadth-first Search', 'Union Find', 'Stack', 'Queue'];

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

  reloadTag() {
    console.log(this.selectedValue);
    this.subscriptionProblems = this.service.getProblemTag(this.selectedValue)
      .subscribe(problems => {
        this.problems = problems;
        this.initializeTable(problems);
      });
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
      this.problems.filter(p => p.title.toLowerCase().includes(query.toLowerCase()))
      : this.problems;

    this.initializeTable(filteredProblems);
  }

  ngOnDestroy() {
    this.subscriptionProblems.unsubscribe();
  }
}