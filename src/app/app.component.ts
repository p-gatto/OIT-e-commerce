import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { NavBarComponent } from "./core/frame/nav-bar/nav-bar.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavBarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'OIT-e-commerce';


}