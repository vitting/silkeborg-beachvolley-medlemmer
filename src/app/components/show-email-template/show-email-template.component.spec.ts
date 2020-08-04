import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowEmailTemplateComponent } from './show-email-template.component';

describe('ShowEmailTemplateComponent', () => {
  let component: ShowEmailTemplateComponent;
  let fixture: ComponentFixture<ShowEmailTemplateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowEmailTemplateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowEmailTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
