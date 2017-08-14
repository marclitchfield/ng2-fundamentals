import { Injectable } from '@angular/core';
import { ISession } from '../shared/index';
import { Headers, Http, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/RX';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';

@Injectable()
export class VoterService {
  constructor(private http: Http) {
  }

  deleteVoter(eventId: number, session: ISession, voterName: string): void {
    session.voters = session.voters.filter(voter => voter !== voterName);
    const url = `/api/events/${eventId}/sessions/${session.id}/voters/${voterName}`;
    this.http.delete(url).catch(handleError).subscribe();
  }

  addVoter(eventId: number, session: ISession, voterName: string): void {
    session.voters.push(voterName);

    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers });
    const url = `/api/events/${eventId}/sessions/${session.id}/voters/${voterName}`;
    this.http.post(url, JSON.stringify({}), options).catch(handleError).subscribe();
  }

  userHasVoted(session: ISession​​ , voterName: string): any {
    return session.voters.some(voter => voter === voterName);
  }
}

function handleError(error: Response): ErrorObservable {
  return Observable.throw(error.statusText);
}
