import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { User } from './users.model';

const API_URL = `${environment.apiBase}/users`;

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(
    private client: HttpClient
  ) { }

  getUsers(): Observable<object> {
    return this.client.get(API_URL);
  }

  createUser(body: User) {
    return this.client.post(API_URL, body);
  }

  updateUser(id: number, body: User) {
    return this.client.patch(`${API_URL}/${id}`, body);
  }

  deleteUser(id: number) {
    return this.client.delete(`${API_URL}/${id}`, {
      params: new HttpParams(),
      observe: 'response',
    })
    .pipe(
      map( (res: HttpResponse<{}>) => res.status ),
    );
  }
}
