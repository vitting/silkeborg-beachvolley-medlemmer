import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberSelectDialogComponent } from './member-select-dialog.component';

describe('MemberSelectDialogComponent', () => {
  let component: MemberSelectDialogComponent;
  let fixture: ComponentFixture<MemberSelectDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MemberSelectDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberSelectDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
