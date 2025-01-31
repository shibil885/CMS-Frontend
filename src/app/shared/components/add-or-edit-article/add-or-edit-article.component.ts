import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ArticleService } from '../../services/article/article.service';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IArticle } from '../../../interfaces/article.interface';
import { ToastService } from '../../services/toast/toast.service';

@Component({
  selector: 'app-add-or-edit-article',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './add-or-edit-article.component.html',
  styleUrl: './add-or-edit-article.component.css',
})
export class AddOrEditArticleComponent {
  articleForm!: FormGroup;
  editingArticle: IArticle | null = null;
  @Input() editMode!: boolean;
  @Input() article!: IArticle;
  @Output() closeFormEvent = new EventEmitter();
  constructor(
    private articleService: ArticleService,
    private fb: FormBuilder,
    private _toastService: ToastService
  ) {}
  ngOnInit(): void {
    this.createForm();
    if (this.editMode && this.article) {
      this.editArticle();
    }
  }
  createForm() {
    this.articleForm = this.fb.group({
      mainHeading: ['', Validators.required],
      intro: ['', Validators.required],
      sections: this.fb.array([]),
      tags: [''],
      status: ['draft', Validators.required],
    });
    this.addSection();
  }

  get sections() {
    return this.articleForm.get('sections') as FormArray;
  }

  addSection() {
    const section = this.fb.group({
      subHeading: ['', Validators.required],
      content: ['', Validators.required],
    });
    this.sections.push(section);
  }

  removeSection(index: number) {
    this.sections.removeAt(index);
  }

  editArticle() {
    this.editingArticle = this.article;
    this.articleForm.patchValue({
      mainHeading: this.article.mainHeading,
      intro: this.article.intro,
      tags: this.article.tags.join(', '),
      status: this.article.status,
    });

    while (this.sections.length) {
      this.sections.removeAt(0);
    }
    this.article.sections.forEach((section) => {
      this.sections.push(
        this.fb.group({
          subHeading: [section.subHeading, Validators.required],
          content: [section.content, Validators.required],
        })
      );
    });
  }

  saveArticle() {
    if (this.articleForm.invalid) return;
    const articleData = {
      ...this.articleForm.value,
      tags: this.articleForm.value.tags
        .split(',')
        .map((tag: string) => tag.trim()),
    };

    if (this.editingArticle) {
      this.articleService
        .updateArticle<IArticle>(this.editingArticle._id, articleData)
        .subscribe((res) => {
          this._toastService.showToast(res.message, 'success');
          this.closeFormEvent.emit();
        });
    } else {
      this.articleService
        .createArticle<IArticle>(articleData)
        .subscribe((res) => {
          this._toastService.showToast(res.message, 'success');
          this.closeFormEvent.emit();
        });
    }
  }

  closeForm() {
    this.closeFormEvent.emit();
  }
}
