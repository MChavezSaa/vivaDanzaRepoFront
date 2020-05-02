import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FuncionarioTableComponent } from './funcionario-table.component';

describe('FuncionarioTableComponent', () => {
  let component: FuncionarioTableComponent;
  let fixture: ComponentFixture<FuncionarioTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FuncionarioTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FuncionarioTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
