import { EventEmitter, Injectable } from '@angular/core';
import { LoggingService } from '../logging.service';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  activeUsers = ['Ronaldo', 'Messi'];
  inactiveUsers = ['Henry', 'Maradona'];

  constructor(private loggingService: LoggingService) {}

  setToActive(id: number) {
    this.activeUsers.push(this.inactiveUsers[id]);
    this.inactiveUsers.splice(id, 1);
    this.loggingService.logStatusChange(`set to active: ${id}`);
  }

  setToInactive(id: number) {
    this.inactiveUsers.push(this.activeUsers[id]);
    this.activeUsers.splice(id, 1);
    this.loggingService.logStatusChange(`set to inactive: ${id}`);
  }
}
