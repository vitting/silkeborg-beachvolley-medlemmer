import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberDetailDialogComponent } from './member-detail-dialog.component';

describe('MemberDetailDialogComponent', () => {
  let component: MemberDetailDialogComponent;
  let fixture: ComponentFixture<MemberDetailDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MemberDetailDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberDetailDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
