import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IArticle } from '../../interfaces/article.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { ArticleService } from '../../shared/services/article/article.service';

@Component({
  selector: 'app-view-article',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './view-article.component.html',
  styleUrl: './view-article.component.css',
})
export class ViewArticleComponent {
  @Input() article!: IArticle;
  @Output() closeViewEvent = new EventEmitter();
  @Output() editArticleEvent = new EventEmitter();
  constructor(
    private route: ActivatedRoute,
    private articleService: ArticleService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) this.loadArticle(id);
  }

  loadArticle(id: string) {
    this.articleService.getArticle<IArticle>(id).subscribe((res) => {
      if (res.success && res.data) {
        console.log('article', res);
        this.article = res.data;
      }
    });
  }

  closeView() {
    this.closeViewEvent.emit();
  }

  editArticle() {
    this.closeViewEvent.emit()
    this.editArticleEvent.emit(this.article);
  }
}
