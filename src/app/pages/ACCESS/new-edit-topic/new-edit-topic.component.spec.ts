import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewEditTopicComponent } from './new-edit-topic.component';

describe('NewEditTopicComponent', () => {
  let component: NewEditTopicComponent;
  let fixture: ComponentFixture<NewEditTopicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewEditTopicComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewEditTopicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
