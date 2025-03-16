import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HeaderComponent } from "../../../../core/components/header/header.component";
import { FooterComponent } from "../../../../core/components/footer/footer.component";

@Component({
  selector: 'app-register',
  imports: [HeaderComponent,FooterComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  constructor(private router: Router) {}

  goToRegisterUser() {
    this.router.navigate(['/account/register-user']);
  }

  goToRegisterCompany() {
    this.router.navigate(['/account/register-company']);
  }
}
