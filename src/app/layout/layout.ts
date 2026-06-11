import {Component, inject} from '@angular/core';
import { Footer } from './footer/footer';
import { Sidebar } from './sidebar/sidebar';
import { Main } from './main/main';
import { Header } from './header/header';
import {Tokenservice} from '../core/services/tokenservice/tokenservice';

@Component({
  selector: 'app-layout',
  imports: [Footer, Sidebar, Main, Header],
  templateUrl: './layout.html',
  styleUrl: './layout.scss',
})
export class Layout {
  private tokenServics=inject(Tokenservice)
  ngOnInit() {
    this.tokenServics.getPaylod()
    console.log(111)
  }
}
