import { Component, EventEmitter, Input, OnChanges, Output, SimpleChange, SimpleChanges, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ArticleService } from '../article.service';
import { Article } from 'src/app/article';

@Component({
  selector: 'app-article-header',
  standalone: true,
  imports: [CommonModule,
            FormsModule
  ],
  templateUrl: './article-header.component.html',
  styleUrls: ['./article-header.component.css']
})
export class ArticleHeaderComponent implements OnChanges {

  @Input() total!: number;

  @Input() article!: Article;

  @Output() delete = new EventEmitter<any>();

  @Output() titleChange = new EventEmitter<any>();

  isEdit: boolean = false;
  newTitle = ''
  origItem!: Article;

  doRemove() {
    this.delete.emit(this.article)
  }

  doModify() {
    this.titleChange.emit(this.article);
    this.isEdit = false;
  }

  cancelModify() {
    this.article = Object.assign({}, this.origItem);
    this.isEdit = false;
  }

  ngOnChanges({ article }: SimpleChanges): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
    if(article){
      console.log(article.currentValue)
      this.origItem = article.currentValue;
      this.article = Object.assign({}, article.currentValue)
    }
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
  }

}
