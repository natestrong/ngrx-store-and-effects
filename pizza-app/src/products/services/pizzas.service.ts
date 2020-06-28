import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {catchError} from 'rxjs/operators';

import {Pizza} from '../models/pizza.model';
import {Observable, throwError} from 'rxjs';

@Injectable()
export class PizzasService {
  constructor(private http: HttpClient) {
  }

  getPizzas(): Observable<Pizza[]> {
    return this.http.get<Pizza[]>(`/api/pizzas`).pipe(
      catchError((error: any) => throwError(error))
    ) as Observable<Pizza[]>;
  }

  createPizza(payload: Pizza): Observable<Pizza> {
    return this.http
      .post<Pizza>(`/api/pizzas`, payload).pipe(
        catchError((error: any) => throwError(error.json()))
      ) as Observable<Pizza>;
  }

  updatePizza(payload: Pizza): Observable<Pizza | Observable<never>> {
    return this.http
      .put<Pizza>(`/api/pizzas/${payload.id}`, payload)
      .pipe(catchError((error: any) => throwError(error.json())));
  }

  removePizza(payload: Pizza): Observable<Pizza> {
    return this.http
      .delete<any>(`/api/pizzas/${payload.id}`)
      .pipe(catchError((error: any) => throwError(error.json())));
  }
}
