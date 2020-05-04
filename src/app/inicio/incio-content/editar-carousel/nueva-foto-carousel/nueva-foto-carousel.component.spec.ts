import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevaFotoCarouselComponent } from './nueva-foto-carousel.component';

describe('NuevaFotoCarouselComponent', () => {
  let component: NuevaFotoCarouselComponent;
  let fixture: ComponentFixture<NuevaFotoCarouselComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NuevaFotoCarouselComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NuevaFotoCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
