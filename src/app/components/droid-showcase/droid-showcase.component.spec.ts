import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DroidShowcaseComponent } from './droid-showcase.component';

describe('DroidShowcaseComponent', () => {
  let component: DroidShowcaseComponent;
  let fixture: ComponentFixture<DroidShowcaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DroidShowcaseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DroidShowcaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
