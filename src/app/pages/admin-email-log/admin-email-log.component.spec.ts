import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminEmailLogComponent } from './admin-email-log.component';

describe('AdminEmailLogComponent', () => {
  let component: AdminEmailLogComponent;
  let fixture: ComponentFixture<AdminEmailLogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminEmailLogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminEmailLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
