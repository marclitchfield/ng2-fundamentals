import { EventEmitter, Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs/RX';
import { IEvent, ISession } from './event.model';
import { Headers, Http, RequestOptions, Response } from '@angular/http';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';

@Injectable()
export class EventService {
  constructor(private http: Http) {
  }

  getEvents(): Observable<Array<IEvent>> {
    return this.http.get('/api/events').map((response: Response) => {
      return response.json() as Array<IEvent>;
    }).catch(handleError);
  }

  getEvent(id: number): Observable<IEvent> {
    return this.http.get(`/api/events/${id}`).map((response: Response) => {
      return response.json() as IEvent;
    }).catch(handleError);
  }

  saveEvent(event): Observable<IEvent> {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({headers});

    return this.http.post('/api/events', JSON.stringify(event), options).map((response: Response) => {
      return response.json();
    }).catch(handleError);
  }

  searchSessions(searchTerm: string): Observable<any> {
    return this.http.get(`/api/sessions/search?search=${searchTerm}`).map((response: Response) => {
      return response.json();
    }).catch(handleError);
  }
}

function handleError(error: Response): ErrorObservable {
  return Observable.throw(error.statusText);
}
