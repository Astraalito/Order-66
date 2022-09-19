import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThreeWidgetComponent } from './three-widget.component';

describe('ThreeWidgetComponent', () => {
  let component: ThreeWidgetComponent;
  let fixture: ComponentFixture<ThreeWidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ThreeWidgetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ThreeWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
