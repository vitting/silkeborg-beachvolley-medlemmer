import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminUserEditDialogComponent } from './admin-user-edit-dialog.component';

describe('AdminUserEditDialogComponent', () => {
  let component: AdminUserEditDialogComponent;
  let fixture: ComponentFixture<AdminUserEditDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminUserEditDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminUserEditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
