import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MenuGaleriaImagenProyectadaComponent } from './menu-galeria-imagen-proyectada.component';

describe('MenuGaleriaImagenProyectadaComponent', () => {
  let component: MenuGaleriaImagenProyectadaComponent;
  let fixture: ComponentFixture<MenuGaleriaImagenProyectadaComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuGaleriaImagenProyectadaComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MenuGaleriaImagenProyectadaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
