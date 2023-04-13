import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameNetworkErrorComponent } from './game-network-error.component';

describe('GameNetworkErrorComponent', () => {
  let component: GameNetworkErrorComponent;
  let fixture: ComponentFixture<GameNetworkErrorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GameNetworkErrorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GameNetworkErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
