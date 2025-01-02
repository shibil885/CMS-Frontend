import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOrEditArticleComponent } from './add-or-edit-article.component';

describe('AddOrEditArticleComponent', () => {
  let component: AddOrEditArticleComponent;
  let fixture: ComponentFixture<AddOrEditArticleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddOrEditArticleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddOrEditArticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
