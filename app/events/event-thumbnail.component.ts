import { Component, Input } from '@angular/core';
import { IEvent } from './shared/event.model';

@Component({
  selector: 'event-thumbnail',
  template: `
   <div [routerLink]="['/events', event.id]" class="well hoverwell thumbnail">
    <h2>{{event.name | uppercase}}</h2>
    <div>Date: {{event.date | date:'shortDate'}}</div>
    <div [ngClass]="getStartTimeClass()" [ngSwitch]="event.time">
      Time: {{event.time}}
      <span *ngSwitchCase="'8:00 am'">Early Start</span>
      <span *ngSwitchCase="'10:00 am'">Late Start</span>
      <span *ngSwitchDefault>Normal Start</span>
    </div>
    <div>Price: {{event.price | currency:'USD':true}}</div>
    <div *ngIf="event.location">
      <span>Location:</span>
      <span>{{event.location?.address}}</span>
      <span class="pad-left">{{event.location?.city}}</span>,
      <span>{{event.location?.country}}</span>
    </div>
    <div *ngIf="event.onlineUrl">
      Online URL: {{event.onlineUrl}}
    </div>
  </div>`,
  styles: [`
    .well div { color: #bbb }
    .thumbnail { min-height: 210px; }
    .green { color: #229922 !important; }
    .bold { font-weight: bold; }
  `]
})
export class EventThumbnailComponent {
  @Input() event: IEvent;

  getStartTimeClass(): Array<string> {
    const isEarlyStart = this.event && this.event.time === '8:00 am';

    return isEarlyStart ? ['green', 'bold'] : [];
  }
}
