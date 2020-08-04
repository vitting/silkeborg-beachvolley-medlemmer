import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LogDetailDialogComponent } from './log-detail-dialog.component';

describe('LogDetailDialogComponent', () => {
  let component: LogDetailDialogComponent;
  let fixture: ComponentFixture<LogDetailDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LogDetailDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LogDetailDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
