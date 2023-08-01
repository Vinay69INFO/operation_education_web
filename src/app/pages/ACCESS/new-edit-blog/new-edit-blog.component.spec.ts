import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewEditBlogComponent } from './new-edit-blog.component';

describe('NewEditBlogComponent', () => {
  let component: NewEditBlogComponent;
  let fixture: ComponentFixture<NewEditBlogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewEditBlogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewEditBlogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
