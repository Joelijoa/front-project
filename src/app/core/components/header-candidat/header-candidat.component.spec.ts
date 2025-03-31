import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderCandidatComponent } from './header-candidat.component';

describe('HeaderCandidatComponent', () => {
  let component: HeaderCandidatComponent;
  let fixture: ComponentFixture<HeaderCandidatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderCandidatComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderCandidatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
