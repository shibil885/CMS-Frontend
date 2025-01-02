import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IArticle } from '../../../interfaces/article.interface';
import { IApiResponse } from '../../../interfaces/response/apiReposne.interface';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  private _baseUrl = import.meta.env.NG_APP_BASE_URL;

  constructor(private http: HttpClient) {}

  getArticles(page: number = 1, limit: number = 10): Observable<any> {
    return this.http.get(
      `${this._baseUrl}/articles?page=${page}&limit=${limit}`
    );
  }

  getArticle<T>(id: string): Observable<IApiResponse<T>> {
    return this.http.get<IApiResponse<T>>(`${this._baseUrl}/articles/${id}`);
  }

  createArticle<T>(article: IArticle): Observable<IApiResponse<T>> {
    console.log('data -->', article);
    return this.http.post<IApiResponse<T>>(
      `${this._baseUrl}/articles`,
      article
    );
  }

  updateArticle<T>(id: string, article: IArticle): Observable<IApiResponse<T>> {
    return this.http.put<IApiResponse<T>>(
      `${this._baseUrl}/articles/${id}`,
      article
    );
  }

  deleteArticle(id: string): Observable<void> {
    return this.http.delete<void>(`${this._baseUrl}/articles/${id}`);
  }
}
