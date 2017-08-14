import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EventService } from './shared/event.service';

@Component({
  templateUrl: 'app/events/create-event.component.html',
  styles: [`
    em { float: right; color: #E05C65; padding-left: 10px; }
    .error input { background-color: #E3C3C5 }
    .error ::-webkit-input-placeholder { color: #999 }
  `]
})

export class CreateEventComponent {
  isDirty = true;

  constructor(private router: Router, private eventService: EventService) {

  }

  cancel(): void {
    this.router.navigate(['/events']);
  }

  saveEvent(formValues): void {
    this.eventService.saveEvent(formValues).subscribe(event => {
      this.isDirty = false;
      this.router.navigate(['/events']);
    });
  }
}
