import { Component } from '@angular/core';
import { Footer } from './footer/footer';
import { Sidebar } from './sidebar/sidebar';
import { Main } from './main/main';
import { Heder } from './heder/heder';

@Component({
  selector: 'app-layout',
  imports: [Footer, Sidebar, Main, Heder],
  templateUrl: './layout.html',
  styleUrl: './layout.scss',
})
export class Layout {}
