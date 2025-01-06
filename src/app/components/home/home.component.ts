import { Component } from '@angular/core';
import { IArticle } from '../../interfaces/article.interface';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ArticleService } from '../../shared/services/article/article.service';
import { AddOrEditArticleComponent } from '../../shared/components/add-or-edit-article/add-or-edit-article.component';
import { Router } from '@angular/router';
import { ViewArticleComponent } from '../view-article/view-article.component';
import { PaginationComponent } from '../../shared/components/pagination/pagination.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    AddOrEditArticleComponent,
    ViewArticleComponent,
    PaginationComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  articles: IArticle[] = [];
  currentPage = 1;
  total = 1;
  limit = 3;
  searchTerm = '';
  renderAddForm = false;
  renderSingle = false;
  selectedArticle!: IArticle;
  editMode = false;
  isMenuOpen = false;
  constructor(private _articleService: ArticleService) {}

  ngOnInit() {
    this.loadArticles();
  }

  onAddArticle() {
    this.renderAddForm = !this.renderAddForm;
    this.renderSingle = false;
  }

  onCloseAddForm() {
    this.renderAddForm = false;
    this.loadArticles();
  }

  loadArticles() {
    this._articleService
      .getArticles<IArticle[]>(this.currentPage, this.limit)
      .subscribe((response) => {
        if (response.data && response.meta) {
          this.articles = response.data;
          this.total = parseInt(response.meta['total'].toString());
        }
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
    this.renderAddForm = true;
    this.editMode = true;
    this.selectedArticle = article;
  }
  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
}
