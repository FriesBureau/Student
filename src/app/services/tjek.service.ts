import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Tjek } from '../model/tjek.model';
import {shareReplay} from 'rxjs/operators'

@Injectable({providedIn: 'root'})

@Injectable({
  providedIn: 'root'
})
export class TjekService {

  private readonly apiBaseUrl = 'https://5c6716e624e2140014f9ee66.mockapi.io/todo';

  constructor(private http: HttpClient) { }

  // https://stackblitz.com/edit/angular-rxjs-store?file=src%2Fapp%2Ftodos.service.ts


  index() {
    return this.http.get<Tjek[]>(`${this.apiBaseUrl}/todos`);
  }


  create(todo: Tjek) {
    return this.http.post<Tjek>(`${this.apiBaseUrl}/todos`, todo);
  }


  remove(id) {
    return this.http.delete(`${this.apiBaseUrl}/todos/${id}`);
  }

  setCompleted(id: string, isCompleted: boolean) {
    return this.http.put<Tjek>(`${this.apiBaseUrl}/todos/${id}`, {isCompleted});

  }

}

