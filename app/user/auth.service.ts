import { Injectable } from '@angular/core';
import { IUser } from './user.model';
import { Headers, Http, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/RX';
import { Subscription } from 'rxjs/Subscription';

@Injectable()
export class AuthService {
  currentUser: IUser;

  constructor(private http: Http) {
  }

  loginUser(userName: string, password: string): Observable<any> {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers });
    const loginInfo = { username: userName, password };

    return this.http.post('/api/login', JSON.stringify(loginInfo), options).do(resp => {
      if (resp)
        this.currentUser = resp.json().user as IUser;
    }).catch(error => {
      return Observable.of(false);
    });
  }

  isAuthenticated(): boolean {
    return !!this.currentUser;
  }

  checkAuthenticationStatus(): Subscription {
    return this.http.get('/api/currentIdentity').map((response: any) => {
      return response._body ? response.json() : {};
    }).do(currentUser => {
      if (!!currentUser.userName)
        this.currentUser = currentUser;
    }).subscribe();
  }

  updateCurrentUser(firstName: string, lastName: string): Observable<Response> {
    this.currentUser.firstName = firstName;
    this.currentUser.lastName = lastName;

    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers });

    return this.http.put(`/api/users/${this.currentUser.id}`, JSON.stringify(this.currentUser), options);
  }

  logout(): Observable<Response> {
    this.currentUser = undefined;
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers });

    return this.http.post('/api/logout', JSON.stringify({}), options);
  }
}
