import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleFotosComponent } from './detalle-fotos.component';

describe('DetalleFotosComponent', () => {
  let component: DetalleFotosComponent;
  let fixture: ComponentFixture<DetalleFotosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetalleFotosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleFotosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
