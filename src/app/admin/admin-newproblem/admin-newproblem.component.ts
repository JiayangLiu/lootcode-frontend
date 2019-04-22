import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from "@angular/router";
import { Subscription } from "rxjs";
import { ProblemService } from 'src/app/services/problem.service';
import { Status } from 'src/app/services/status.model';

@Component({
  selector: 'app-admin-newproblem',
  templateUrl: './admin-newproblem.component.html',
  styleUrls: ['./admin-newproblem.component.css']
})
export class AdminNewproblemComponent implements OnInit, OnDestroy {
  selectedCompany: string;
  selectedDifficulty: string;
  selectedTag: string;
  invalidCreate: boolean;
  subscriptionProblem: Subscription;
  status: Status;

  companies: string[] = [ 'Amazon', 'Optimal Satcom', 'Walmart Labs', 'Google', 'Facebook',
                          'Microsoft', 'Uber', 'Apple', 'Linkedin', 'Twitter'];
  
  tags: string[] = [ 'Two Pointer', 'Binary Search', 'Dynamic Programming', 'Backtracking', 'Gready',
                          'Depth-first Search', 'Breadth-first Search', 'Union Find', 'Stack', 'Queue'];
  
  difficulites: string[] = ['Easy', 'Medium', 'Hard'];

  constructor(
    private router: Router, 
    private problemService: ProblemService) {
  }

  ngOnInit() {
  }

  createProblem(inputValues) {
    this.subscriptionProblem = this.problemService.createProblem(inputValues)
    .subscribe(response => {
      if (response.status == 200) {
        this.router.navigate(['/admin/problems']);
      } else {
        this.invalidCreate = true;
      }
    });
}


  ngOnDestroy() {
  }
}