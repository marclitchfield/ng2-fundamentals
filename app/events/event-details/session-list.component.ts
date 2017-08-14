import { Component, Input, OnChanges } from '@angular/core';
import { ISession } from '../shared/index';
import { AuthService } from '../../user/auth.service';
import { VoterService } from './voter.service';

@Component({
  selector: 'session-list',
  templateUrl: 'app/events/event-details/session-list.component.html'
})
export class SessionListComponent implements OnChanges {
  @Input() eventId: number;
  @Input() sessions: Array<ISession>;
  @Input() filterBy: string;
  @Input() sortBy: string;
  visibleSessions: Array<ISession> = [];

  constructor(private auth: AuthService, private voterService: VoterService) {

  }

  ngOnChanges(): void {
    if (this.sessions) {
      this.filterSessions(this.filterBy);
      this.sortBy === 'name' ? this.visibleSessions.sort(sortByNameAsc) : this.visibleSessions.sort(sortByVotesDesc);
    }
  }

  toggleVote(session: ISession): void {
    if (this.userHasVoted(session))
      this.voterService.deleteVoter(this.eventId, session, this.auth.currentUser.userName);
    else
      this.voterService.addVoter(this.eventId, session, this.auth.currentUser.userName);

    if (this.sortBy === 'votes')
      this.visibleSessions.sort(sortByVotesDesc);
  }

  userHasVoted(session: ISession): boolean {
    return this.voterService.userHasVoted(session, this.auth.currentUser.userName);
  }

  filterSessions(filter): void {
    if (filter === 'all')
      this.visibleSessions = filter === 'all' ?
        this.sessions.slice(0) :
        this.sessions.filter(session => session.level.toLocaleLowerCase() === filter);
  }
}

function sortByNameAsc(s1: ISession, s2: ISession): number {
  if (s1.name > s2.name) return 1;
  if (s2.name < s2.name) return -1;

  return 0;
}

function sortByVotesDesc(s1: ISession, s2: ISession): number {
  return s2.voters.length - s1.voters.length;
}
