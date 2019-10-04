import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectYourStoryComponent } from './select-your-story.component';

describe('SelectYourStoryComponent', () => {
  let component: SelectYourStoryComponent;
  let fixture: ComponentFixture<SelectYourStoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectYourStoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectYourStoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
