import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewEditNavigationComponent } from './new-edit-navigation.component';

describe('NewEditNavigationComponent', () => {
  let component: NewEditNavigationComponent;
  let fixture: ComponentFixture<NewEditNavigationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewEditNavigationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewEditNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
