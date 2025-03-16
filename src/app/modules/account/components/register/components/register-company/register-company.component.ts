import { Component } from '@angular/core';
import { HeaderComponent } from "../../../../../../core/components/header/header.component";
import { FooterComponent } from "../../../../../../core/components/footer/footer.component";

@Component({
  selector: 'app-register-company',
  imports: [HeaderComponent, FooterComponent],
  templateUrl: './register-company.component.html',
  styleUrl: './register-company.component.scss'
})
export class RegisterCompanyComponent {

}
