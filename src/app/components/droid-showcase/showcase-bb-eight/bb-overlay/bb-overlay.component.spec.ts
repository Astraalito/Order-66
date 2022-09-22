import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BbOverlayComponent } from './bb-overlay.component';

describe('BbOverlayComponent', () => {
  let component: BbOverlayComponent;
  let fixture: ComponentFixture<BbOverlayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BbOverlayComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BbOverlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
