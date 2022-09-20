import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BbEightSectionOneComponent } from './bb-eight-section-one.component';

describe('BbEightSectionOneComponent', () => {
  let component: BbEightSectionOneComponent;
  let fixture: ComponentFixture<BbEightSectionOneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BbEightSectionOneComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BbEightSectionOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
