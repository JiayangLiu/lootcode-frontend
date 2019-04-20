import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Problem } from '../problems/problem.model';
import { ProblemDetail } from '../problems/problem.detail.model';
import { UserProblem} from '../problems/problem.detail.model';


@Injectable({
  providedIn: 'root'
})
export class ProblemService {
  private url = 'https://my-json-server.typicode.com/JiayangLiu/lootcode-mockdb/problems';

  private url4detailproblem = 'https://my-json-server.typicode.com/JiayangLiu/lootcode-mockdb/problem';
  constructor(private http: HttpClient) { }

  problemsObservable : Observable<Problem[]>;
  problemDetailObservable: Observable<ProblemDetail>;
  userProblem: UserProblem;

  getAllProblems() {
    this.problemsObservable = this.http.get<Problem[]>(this.url);
    return this.problemsObservable;
  }

  getProblemDetail(username:string, problemID:number) {
    this.problemDetailObservable = this.http.get<ProblemDetail>(this.url4detailproblem);
    return this.problemDetailObservable;
  }

  getProblemDetailPost(username:string, problemID:number) {
    this.userProblem.problem_id = problemID;
    this.userProblem.user_id = username;
    this.problemDetailObservable = this.http.post<ProblemDetail>(this.url4detailproblem, this.userProblem);
    return this.problemDetailObservable;
  }

  // createProblem(resource) {
  //   return this.http.post(this.url, JSON.stringify(resource))
  //     .map(response => response);
  // }

  // updateProblem(resource) {
  //   return this.http.patch(this.url + '/' + resource.id, JSON.stringify({ isRead: true }))
  //     .map(response => response);     
  // }

  // deleteProblem(id) {
  //   return this.http.delete(this.url + '/' + id)
  //     .map(response => response);
  // }
}