import { Component } from '@angular/core';
import { IArticle } from '../../interfaces/article.interface';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ArticleService } from '../../shared/services/article/article.service';
import { AddOrEditArticleComponent } from '../../shared/components/add-or-edit-article/add-or-edit-article.component';
import { Router } from '@angular/router';
import { ViewArticleComponent } from '../view-article/view-article.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    AddOrEditArticleComponent,
    ViewArticleComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  articles: IArticle[] = [];
  currentPage = 1;
  totalPages = 1;
  pages: number[] = [];
  searchTerm = '';
  statusFilter = '';
  renderAddForm = false;
  renderSingle = false;
  selectedArticle!: IArticle;
  editMode = false;
  constructor(
    private _articleService: ArticleService,
    private _router: Router
  ) {}

  ngOnInit() {
    this.loadArticles();
  }

  onAddArticle() {
    this.renderAddForm = !this.renderAddForm;
    this.renderSingle = false;
  }

  onCloseAddForm() {
    this.renderAddForm = false;
  }

  loadArticles() {
    this._articleService.getArticles(this.currentPage).subscribe((response) => {
      this.articles = response.data.articles;
      this.totalPages = response.data.pages;
      this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);
    });
  }

  changePage(page: number) {
    this.currentPage = page;
    this.loadArticles();
  }

  onSearch() {
    this.loadArticles();
  }

  viewArticle(article: IArticle) {
    this.renderSingle = true;
    this.selectedArticle = article;
  }

  closeViewArticle() {
    this.renderSingle = false;
  }

  deleteArticle(id: string) {
    if (confirm('Are you sure you want to delete this article?')) {
      this._articleService.deleteArticle(id).subscribe(() => {
        this.loadArticles();
      });
    }
  }

  onEditArticle(article: IArticle) {
    console.log('selected article from home ts 1 ', article);
    this.renderAddForm = true;
    this.editMode = true;
    this.selectedArticle = article;
    console.log('selected article from home ts 2', this.selectedArticle);
  }
}
