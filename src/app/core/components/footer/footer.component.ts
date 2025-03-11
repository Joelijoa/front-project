import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent implements OnInit{
imgLogo!: string;
tel !: string;
mail!: string;
adress !: string;

  ngOnInit(): void {
    this.imgLogo = 'picture/logo.png';
    this.tel = "+212 (0) 6 94 82 69 89";
    this.mail = "yobbercontact@gmail.com";
    this.adress = "Prestigia ISMAGI Hay Riad, 12000 Rabat"
}
}
