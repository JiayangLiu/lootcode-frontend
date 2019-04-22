import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { ProblemService } from 'src/app/services/problem.service';
import { Router } from "@angular/router";

@Component({
  selector: 'app-admin-deleteproblem',
  templateUrl: './admin-deleteproblem.component.html',
  styleUrls: ['./admin-deleteproblem.component.css']
})
export class AdminDeleteproblemComponent implements OnInit {

  problemID: string;
  subscriptionProblems: Subscription;
  
  constructor(
    private route: ActivatedRoute,
    private problemService: ProblemService,
    private appRouter: Router
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.problemID = params.get('id');
    });

    this.subscriptionProblems = this.problemService.deleteProblem(this.problemID)
      .subscribe(problem => {
        this.appRouter.navigate(['/admin/problems/']);
      });
  }
}
