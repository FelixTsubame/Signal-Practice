import { FormsModule } from '@angular/forms';
import { ArticleService } from './../article.service';
import { Article } from './../../article';
import { Component, Input, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticleHeaderComponent } from "../article-header/article-header.component";
import { ArticleBodyComponent } from "../article-body/article-body.component";
import { HttpClientModule } from '@angular/common/http';

@Component({
    selector: 'app-article-list',
    standalone: true,
    templateUrl: './article-list.component.html',
    styleUrls: ['./article-list.component.css'],
    imports: [CommonModule,
              ArticleHeaderComponent,
              ArticleBodyComponent,
              HttpClientModule,
              FormsModule
            ],
    providers: [ArticleService]
})
export class ArticleListComponent {
  [x: string]: any;

  articleService = inject(ArticleService);
  //items = toSignal<Article[], Article[]>(this.articlesvc.getArticle(), { initialValue: [] as Article[] });
  articles = signal([] as Article[]);
  isEdit: boolean = false;
  article: Article = {
    id: 0,
    href: '',
    title: '',
    date: '',
    author: '',
    category: '',
    categoryLink: '',
    summary: ''
  };



  ngOnInit(): void {
  //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
  //Add 'implements OnInit' to the class.≈
    this.getArticle();
  }

  onDelete(article: Article){
    this.articleService
      .doRemove(article.id)
      .then(() => {
        this.getArticle();
      })
      .catch((error) => console.log(error));
  }

  onModify(article: Article){
    this.articleService
      .doModify(article.id, article)
      .then(() => {
        this.getArticle();
      })
      .catch((error) => console.log(error));
  }

  addArticle(article: Article) {
    this.articleService
      .addArticle(this.articles().length, article)
      .then(() => {
        this.getArticle();
      })
      .catch((error) => console.log(error));
    this.isEdit = false;
  }

  cancelAdd(){
    this.article.title = '';
    this.article.summary = '';
    this.isEdit = false;
  }

  async getArticle() {
    this.articles.set(await this.articleService.getArticle());
  }

}
