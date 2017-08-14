import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { EventService } from './shared/event.service';
import { IEvent } from './index';
import { Observable } from 'rxjs/RX';

@Injectable()
export class EventResolver implements Resolve<any> {
  constructor(private eventService: EventService) {
  }

  resolve(route: ActivatedRouteSnapshot): Observable<IEvent> {
    return this.eventService.getEvent(route.params['id']);
  }
}
