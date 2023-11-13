import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MenuConstelacionesConstelacionComponent } from './menu-constelaciones-constelacion.component';

describe('MenuConstelacionesConstelacionComponent', () => {
  let component: MenuConstelacionesConstelacionComponent;
  let fixture: ComponentFixture<MenuConstelacionesConstelacionComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuConstelacionesConstelacionComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MenuConstelacionesConstelacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
