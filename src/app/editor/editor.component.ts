import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../services/auth.service';
import {Subscription} from "rxjs";
import { HttpClientModule } from '@angular/common/http'; 
import { ProblemService } from '../services/problem.service';
import { ProblemDetail } from '../problems/problem.detail.model';


@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit {

  problemID: String;
  subscriptionProblems: Subscription;
  problem: ProblemDetail;
  constructor(
    private route: ActivatedRoute, 
    private authService: AuthService,
    private service: ProblemService
    ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.problemID = params.get('id');
      console.log(this.problemID);

    });
    // console.log(this.authService.currentUser.userid)
    this.subscriptionProblems = this.service.getProblemDetail()
      .subscribe(problem => {
        this.problem = problem;
        console.log(this.problem);
      });

  }

}
