import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { EventService } from './shared/event.service';
import { IEvent } from './index';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class EventListResolver implements Resolve<any> {
  constructor(private eventService: EventService) {
  }

  resolve(): Observable<Array<IEvent>> {
    return this.eventService.getEvents();
  }
}
