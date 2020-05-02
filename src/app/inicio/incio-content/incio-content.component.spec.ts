import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IncioContentComponent } from './incio-content.component';

describe('IncioContentComponent', () => {
  let component: IncioContentComponent;
  let fixture: ComponentFixture<IncioContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IncioContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IncioContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
