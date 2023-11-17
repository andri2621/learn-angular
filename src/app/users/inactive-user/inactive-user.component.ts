import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-inactive-user',
  templateUrl: './inactive-user.component.html',
  styleUrls: ['./inactive-user.component.scss'],
})
export class InactiveUserComponent implements OnInit {
  users: string[];

  constructor(private userService: UsersService) {}

  ngOnInit(): void {
    this.users = this.userService.inactiveUsers;
  }

  onSetToActive(id: number) {
    this.userService.setToActive(id);
  }
}
