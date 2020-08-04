import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmaillogDetailDialogComponent } from './emaillog-detail-dialog.component';

describe('EmaillogDetailDialogComponent', () => {
  let component: EmaillogDetailDialogComponent;
  let fixture: ComponentFixture<EmaillogDetailDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmaillogDetailDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmaillogDetailDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
