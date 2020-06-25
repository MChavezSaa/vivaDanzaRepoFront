import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubirImagenFunComponent } from './subir-imagen-fun.component';

describe('SubirImagenFunComponent', () => {
  let component: SubirImagenFunComponent;
  let fixture: ComponentFixture<SubirImagenFunComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubirImagenFunComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubirImagenFunComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
