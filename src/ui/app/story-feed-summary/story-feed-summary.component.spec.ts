import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoryFeedSummaryComponent } from './story-feed-summary.component';

describe('StoryFeedSummaryComponent', () => {
  let component: StoryFeedSummaryComponent;
  let fixture: ComponentFixture<StoryFeedSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoryFeedSummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoryFeedSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
