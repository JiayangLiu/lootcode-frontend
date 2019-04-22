import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Problem } from '../problems/problem.model';
import { ProblemDetail } from '../problems/problem.detail.model';
import { UserProblem} from '../problems/problem.detail.model';
import { HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ProblemService {
  private url = 'https://my-json-server.typicode.com/JiayangLiu/lootcode-mockdb/problems';

  private url4detailproblem = 'https://my-json-server.typicode.com/JiayangLiu/lootcode-mockdb/problem';
  private url4detailproblem4realServer = 'http://power3.cs.virginia.edu:18888/api/problem'
  private urlLocal = 'http://localhost:18888/api/problem'
  private url4updateLocal = 'http://localhost:18888/api/problem/submission'
  constructor(private http: HttpClient) { }

  problemsObservable : Observable<Problem[]>;
  problemDetailObservable: Observable<ProblemDetail>;
  updateObservable: Observable<number>;

  getAllProblems() {
    this.problemsObservable = this.http.get<Problem[]>(this.url);
    return this.problemsObservable;
  }

  getProblemDetail() {
    this.problemDetailObservable = this.http.get<ProblemDetail>(this.url4detailproblem);
    return this.problemDetailObservable;
  }

  getProblemDetailPost(userID:string, problemID:string) {
    // this.userProblem.problem_id = problemID;
    // this.userProblem.user_id = username;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    this.problemDetailObservable = this.http.post<ProblemDetail>(this.urlLocal, JSON.stringify(
      {
        "problem_id": +problemID,
        "user_id": +userID
      }),httpOptions);
    return this.problemDetailObservable;
  }

  updateProblemDetailPost(userID:number, problemID:number, language:string, accepted: boolean, performance:number, 
    code:string, note:string, time_created:string, time_modified:string){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    this.updateObservable = this.http.post<number>(this.url4updateLocal, JSON.stringify(
      {
        "user_id": userID,
        "problem_id": problemID,
        "code":
            {
            "isAccepted":accepted,
            "performance":performance,
            "code_language":language,
            "time_created":time_created,
            "time_modified":time_modified,
            "content":code
            },
          "note":{
                  "content":note,
                  "time_created":time_created,
                  "time_modified":time_modified
          }
    }), httpOptions);
    console.log(JSON.stringify(
      {
        "user_id": userID,
        "problem_id": problemID,
        "code":
            {
            "isAccepted":accepted,
            "performance":performance,
            "code_language":language,
            "time_created":time_created,
            "time_modified":time_modified,
            "content":code
            },
          "note":{
                  "content":note,
                  "time_created":time_created,
                  "time_modified":time_modified
          }
    }));
    return this.updateObservable;
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