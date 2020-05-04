import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FotoExistenteComponent } from './foto-existente.component';

describe('FotoExistenteComponent', () => {
  let component: FotoExistenteComponent;
  let fixture: ComponentFixture<FotoExistenteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FotoExistenteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FotoExistenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
