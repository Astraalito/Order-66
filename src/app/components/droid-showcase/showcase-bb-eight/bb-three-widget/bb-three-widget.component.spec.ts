import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BbThreeWidgetComponent } from './bb-three-widget.component';

describe('BbThreeWidgetComponent', () => {
  let component: BbThreeWidgetComponent;
  let fixture: ComponentFixture<BbThreeWidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BbThreeWidgetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BbThreeWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
