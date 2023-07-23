import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
//import { BrowserModule } from '@angular/platform-browser';
import { HeaderComponent } from "./header/header.component";
import { ArticleListComponent } from "./article/article-list/article-list.component";
import { FooterComponent } from "./footer/footer.component";
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    imports: [CommonModule,
              RouterOutlet,
              HeaderComponent,
              ArticleListComponent,
              FooterComponent,
              FormsModule,
              HttpClientModule
    ]
})
export class AppComponent {
  keyword = '';

  constructor() {
  }
  keywordReset() {
    this.keyword = '';
  }

}
