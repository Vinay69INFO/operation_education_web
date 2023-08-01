import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewEditSubTopicComponent } from './new-edit-sub-topic.component';

describe('NewEditSubTopicComponent', () => {
  let component: NewEditSubTopicComponent;
  let fixture: ComponentFixture<NewEditSubTopicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewEditSubTopicComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewEditSubTopicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
