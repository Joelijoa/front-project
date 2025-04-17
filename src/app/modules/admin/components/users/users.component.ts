import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Users } from './models/users';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  encapsulation: ViewEncapsulation.None,
  imports: [
    ButtonModule,
    CardModule,
    TableModule,
    InputTextModule,
    FormsModule,
    InputGroupModule,
    InputGroupAddonModule,CommonModule
  ]

})
export class UsersComponent implements OnInit {
  users = [
    new Users(1, 'jojo', 'jojo@gamil.com', 'Rabat'),
    new Users(2, 'Alice', 'alice@example.com', 'Casablanca'),
    new Users(3, 'Bob', 'bob@example.com', 'Fès'),
    new Users(4, 'Charlie', 'charlie@example.com', 'Marrakech'),
    new Users(5, 'Diana', 'diana@example.com', 'Tanger'),
  ];
  constructor() {}

  ngOnInit() {}
}
