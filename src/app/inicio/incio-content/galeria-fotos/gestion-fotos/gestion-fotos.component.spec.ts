import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionFotosComponent } from './gestion-fotos.component';

describe('GestionFotosComponent', () => {
  let component: GestionFotosComponent;
  let fixture: ComponentFixture<GestionFotosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GestionFotosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionFotosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
