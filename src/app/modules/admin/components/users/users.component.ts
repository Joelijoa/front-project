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
import { DialogModule } from 'primeng/dialog';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [
    ButtonModule,
    CardModule,
    TableModule,
    InputTextModule,
    FormsModule,
    InputGroupModule,
    InputGroupAddonModule,
    CommonModule,
    DialogModule
  ]
})
export class UsersComponent implements OnInit {
  users = [
    new Users(1, 'jojo', 'jojo@gmail.com', 'Rabat', '+212 656 789 012', 'Développeur Frontend'),
    new Users(2, 'Alice', 'alice@example.com', 'Casablanca', '+212 661 234 567', 'Designer UX/UI'),
    new Users(3, 'Bob', 'bob@example.com', 'Fès', '+212 662 345 678', 'Chef de Projet'),
    new Users(4, 'Charlie', 'charlie@example.com', 'Marrakech', '+212 663 456 789', 'DevOps Engineer'),
    new Users(5, 'Diana', 'diana@example.com', 'Tanger', '+212 664 567 890', 'Data Scientist'),
  ];

  // Propriétés pour le popup
  displayUserDetails: boolean = false;
  selectedUser: Users | null = null;

  constructor() {}

  ngOnInit() {}

  // Méthode pour afficher le détail d'un utilisateur
  showUserDetails(user: Users): void {
    this.selectedUser = user;
    this.displayUserDetails = true;
  }
}
