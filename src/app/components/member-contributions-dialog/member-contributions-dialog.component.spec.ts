import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberContributionsDialogComponent } from './member-contributions-dialog.component';

describe('MemberContributionsDialogComponent', () => {
  let component: MemberContributionsDialogComponent;
  let fixture: ComponentFixture<MemberContributionsDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MemberContributionsDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberContributionsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
