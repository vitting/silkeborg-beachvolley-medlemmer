import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberAdminCommentDialogComponent } from './member-admin-comment-dialog.component';

describe('MemberAdminCommentDialogComponent', () => {
  let component: MemberAdminCommentDialogComponent;
  let fixture: ComponentFixture<MemberAdminCommentDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MemberAdminCommentDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberAdminCommentDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
