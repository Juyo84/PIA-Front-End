import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MenuNoticiasNoticiaComponent } from './menu-noticias-noticia.component';

describe('MenuNoticiasNoticiaComponent', () => {
  let component: MenuNoticiasNoticiaComponent;
  let fixture: ComponentFixture<MenuNoticiasNoticiaComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuNoticiasNoticiaComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MenuNoticiasNoticiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
