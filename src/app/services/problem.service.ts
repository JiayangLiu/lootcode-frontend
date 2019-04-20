import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Problem } from '../problems/problem.model';
import { ProblemDetail } from '../problems/problem.detail.model';



@Injectable({
  providedIn: 'root'
})
export class ProblemService {
  private url = 'http://power3.cs.virginia.edu:18888/api/problems';

  private url4detailproblem = 'https://my-json-server.typicode.com/JiayangLiu/lootcode-mockdb/problem';
  constructor(private http: HttpClient) { }

  problemsObservable : Observable<Problem[]>;
  problemDetailObservable: Observable<ProblemDetail>;


  getAllProblems() {
    this.problemsObservable = this.http.get<Problem[]>(this.url);
    return this.problemsObservable;
  }

  getProblemCompany(company_name) {
    this.problemsObservable = this.http.get<Problem[]>('http://power3.cs.virginia.edu:18888/api/companies/'+company_name);
    return this.problemsObservable;
 }

  getProblemTag(tag_name) {
  this.problemsObservable = this.http.get<Problem[]>('http://power3.cs.virginia.edu:18888/api/tags/'+tag_name);
  return this.problemsObservable;
  }

  getProblemDetail() {
    this.problemDetailObservable = this.http.get<ProblemDetail>(this.url4detailproblem);
    return this.problemDetailObservable;
  }

  deleteProblem(problem_id) {
    this.problemsObservable = this.http.get<Problem[]>('http://power3.cs.virginia.edu:18888/api/admin/delete/'+problem_id);
    return this.problemsObservable;
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