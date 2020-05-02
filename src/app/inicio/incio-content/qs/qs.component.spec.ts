import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QSComponent } from './qs.component';

describe('QSComponent', () => {
  let component: QSComponent;
  let fixture: ComponentFixture<QSComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QSComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QSComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
