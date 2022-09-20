import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BbEightSectionThreeComponent } from './bb-eight-section-three.component';

describe('BbEightSectionThreeComponent', () => {
  let component: BbEightSectionThreeComponent;
  let fixture: ComponentFixture<BbEightSectionThreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BbEightSectionThreeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BbEightSectionThreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
