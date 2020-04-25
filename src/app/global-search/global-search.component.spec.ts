import {async, ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';
import {GlobalSearchComponent} from './global-search.component';
import {RouterTestingModule} from '@angular/router/testing';
import {SearchDataService} from '../services/search-data.serivce';
import {Subject} from 'rxjs';
import {Injectable} from '@angular/core';


@Injectable({
  providedIn: 'root'
})

export class SearchDataServiceMock {

  private applicableLocationsSubject = new Subject<any>();

  getApplicableLocations(radius, position) {
    this.applicableLocationsSubject.next({location: [{}], position: {}});
  }

  getApplicableLocationsSubs() {
    return this.applicableLocationsSubject.asObservable();
  }

  setUserSearchData() {

  }

  createLocationObject(location) {

    return JSON.parse(JSON.stringify({
      'name': 'Noida',
      'formatted_address': 'Noida, Uttar Pradesh, India',
      'photos': ['https://maps.googleapis.com/maps/api/place/js/PhotoService.GetPhoto?1sCmRaAAAArtTHx9srDB3v9ILSWKnr0VeraBRrNAfKHl2oHvIQcRX_HG0Re_gs3NdwjQ1rikJot1yNbidygA9pPRr1VLi-apOhI4fmoImyK-iWzoc4SYg9YvE9cXOWbUTxrGd3RexmEhAweLKp8n8svHsiVmMNbtYnGhSXo4g1nkuVHESxN9A2npEUUFoLhA&3u1024&5m1&2e1&callback=none&key=AIzaSyCoyLacmAqoMKFecnjIHN6rOguWXmZfruo&token=122917', 'https://maps.googleapis.com/maps/api/place/js/PhotoService.GetPhoto?1sCmRaAAAAxRwgaawpFqaAQuepJpJlkxjDEXHFSaLkmeR45aD-ueZ4PyZW8eQ515ZaGYyKZgS57Ykqto9CayYHWjKl7QqZCQhO4-McFo3Nl9fmk9yIRHVCrx4oHeeL4VF09kJnNY9QEhAnkbymq3HqvuKFo0hcZZBRGhTrcFT2XtLNyxSrJmLDKc40MAtXxA&3u735&5m1&2e1&callback=none&key=AIzaSyCoyLacmAqoMKFecnjIHN6rOguWXmZfruo&token=119907', 'https://maps.googleapis.com/maps/api/place/js/PhotoService.GetPhoto?1sCmRaAAAA8qkSejiWU9BkST77AMD_1OjWxcU8BgNPOWPFjRxQvQFtuOvyOYrYICdScuC_bfsQKY5ZGOIV5eNqzqdWWCx6LcJY5-9D63sHpgXnEB3HZFZoC6VMY7Mrg-L6q1YAvnrrEhArNk9VrXW-suu2ydwSMvzuGhR3RCXcXCpeEq1fjS2OFEDb1lPQpA&3u4032&5m1&2e1&callback=none&key=AIzaSyCoyLacmAqoMKFecnjIHN6rOguWXmZfruo&token=33299', 'https://maps.googleapis.com/maps/api/place/js/PhotoService.GetPhoto?1sCmRaAAAAXhxxxKIXQ3FOvuZJ_nXIDQAIQYTRuUGQXwORKrwnJVgTjXCvLigTo40qDE8brEhBVISwjLQD5fMhgp7ZAqhWe0kubj9yjQ7vRgO11P8-mkwnc6UERmUPzdqyaIXyPfHWEhDGpb-Ebtkcnj-4pl_JD4AsGhTWYFLDcxVx40iMmCPxqAh4Ug9EzQ&3u4160&5m1&2e1&callback=none&key=AIzaSyCoyLacmAqoMKFecnjIHN6rOguWXmZfruo&token=125752', 'https://maps.googleapis.com/maps/api/place/js/PhotoService.GetPhoto?1sCmRaAAAAxFuGEOrQMHCnb-iiks01o0J3e-o8C5QMxOjieE-vluO_535eZXKER7e3M-P2jB1QTLrg7cGqt6Ijq2E0hhcQ0mdUA1st-l-axtCqwONh-cUvIsen6KcRNQ48VlvdLesQEhBWxp5YPHRP0XjFnHZLe8cfGhQszHuLonQiy4iS9Wm-xxf2mMz1HQ&3u778&5m1&2e1&callback=none&key=AIzaSyCoyLacmAqoMKFecnjIHN6rOguWXmZfruo&token=31474', 'https://maps.googleapis.com/maps/api/place/js/PhotoService.GetPhoto?1sCmRaAAAALw_Zllpl5vBfXFOJu0tVYX3bkKjIElZA5Binp1l1_4WdlI6edulMYslLkuhKv4hmb2sxKPROfKB9k8Va69XxP7vPNiq4oWaVGuXcFtYpQYK0GFplTZ6bSJlnDPAPHg7kEhBNw0XbEoVoE38HktKgHgYlGhSMLgZPajsryY8ap32eeKrKxtQp0Q&3u3648&5m1&2e1&callback=none&key=AIzaSyCoyLacmAqoMKFecnjIHN6rOguWXmZfruo&token=67137', 'https://maps.googleapis.com/maps/api/place/js/PhotoService.GetPhoto?1sCmRaAAAAQjTdn3a2Mm88PW6AGQx4PdRfzvYogQVldQDJN4y4vHgZ9MHJDe9oqipv_-g115of-jWH_ygIZvf4CERda2PgL57GPojZRVklrWAop3i57DmXBhz3N6wgYh9PhiwzVbMDEhDrMUEjWzlXFO0_OZw9zzhPGhR8QeEBz_BOGrzsxgm8rxUl716knQ&3u4032&5m1&2e1&callback=none&key=AIzaSyCoyLacmAqoMKFecnjIHN6rOguWXmZfruo&token=43868', 'https://maps.googleapis.com/maps/api/place/js/PhotoService.GetPhoto?1sCmRaAAAAxCU7mWo_du2jl6JRfG9cEw5g2yWtsUbLCVlBVtt77R4kIPMR__fgs3aUVt6hFdBASB0QRLSFaINKQ0J0ay6uuOll9_LuvJgdTsb4xaZEUdbyszWj8MRonSq6AqVJAoXBEhAtOq_ORW0aPTJd3evAkCfSGhRsVJ6e7jjean21_VpijX39ATCokw&3u835&5m1&2e1&callback=none&key=AIzaSyCoyLacmAqoMKFecnjIHN6rOguWXmZfruo&token=53331', 'https://maps.googleapis.com/maps/api/place/js/PhotoService.GetPhoto?1sCmRaAAAANzb_CadGoTsrxJJIvvWorgIPrgGrbClKoX6x7gYG_3_6vzh8G0-r_73ynqaE05NEEYaZWUzBBL2IHGm1_lbis0ROgqjttJ7nTdWBo8tMc7nbQ1F3-IWOX-XjRg8-5_WQEhB1ePuJ9w_tCPbv-oukRxr4GhSHnnJvP5xoPyAigY8cICPzaBe0TA&3u1404&5m1&2e1&callback=none&key=AIzaSyCoyLacmAqoMKFecnjIHN6rOguWXmZfruo&token=6455', 'https://maps.googleapis.com/maps/api/place/js/PhotoService.GetPhoto?1sCmRaAAAAVXeevSe2rHzMpmoGG6gYDdecCP2RXD48Utqjy_cOpOSpdPe4TKjSFkN23VcFP3bl8sGsEzDm_Gx3fPFKbLf-WL7xzjTvLjCII9lybztBokXjsxmb3w3HLAAhdZci8sN4EhAGLzNpD9kjs9g7QdRkKRbfGhT62u6JiXxpaK213ku4aIpt10adYQ&3u3264&5m1&2e1&callback=none&key=AIzaSyCoyLacmAqoMKFecnjIHN6rOguWXmZfruo&token=111955'],
      'id': '4838d8e111df81c1f66479871208c0afc03e657d',
      'place_id': 'ChIJezVzMaTlDDkRP8B8yDDO_zc',
      'reference': 'ChIJezVzMaTlDDkRP8B8yDDO_zc',
      'geometry': [28.5355161, 77.3910265]
    }));
  }

  initSearch() {

  }
}

describe('GlobalSearchComponent', () => {
  let component: GlobalSearchComponent;
  let fixture: ComponentFixture<GlobalSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GlobalSearchComponent],
      imports: [RouterTestingModule.withRoutes([{
        path: 'location',
        component: GlobalSearchComponent
      }])],
      providers: [{provide: SearchDataService, useClass: SearchDataServiceMock}]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GlobalSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fire autoComplete Google', fakeAsync(() => {
    expect(component.locationInputViewChild.nativeElement).toBeTruthy();
    component.initAutoComplete();
    tick(300);
  }));
});
