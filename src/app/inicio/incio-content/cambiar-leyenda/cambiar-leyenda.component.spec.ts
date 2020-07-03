import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CambiarLeyendaComponent } from './cambiar-leyenda.component';

describe('CambiarLeyendaComponent', () => {
  let component: CambiarLeyendaComponent;
  let fixture: ComponentFixture<CambiarLeyendaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CambiarLeyendaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CambiarLeyendaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
