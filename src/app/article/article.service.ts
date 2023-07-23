import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Article } from '../article';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  #http = inject(HttpClient);

  getArticle = async (): Promise<Article[]> => {
    const get$ = this.#http.get<Article[]>(`http://localhost:3000/articles`);
    return await lastValueFrom(get$);
  }

  doRemove = async (id: number) => {
    const result$ = this.#http.delete(`http://localhost:3000/articles/${id}`);
    return await lastValueFrom(result$);
  }

  doModify = async (id: number, article: Article) => {
    const modifyResult$ = this.#http.put(`http://localhost:3000/articles/${id}`, article);
    return await lastValueFrom(modifyResult$);
  }

  addArticle = async (id: number, article: Article) => {
    const addResult$ = this.#http.put(`http://localhost:3000/articles/${id}`, article);
    return await lastValueFrom(addResult$);
  }
}


