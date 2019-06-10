import {Component, ElementRef, NgZone, OnInit, ViewChild} from '@angular/core';
import {ProvidersInfo} from '../core/model/providers-info';
import {LandingPageService} from '../landing-page/landing-page.service';
import {ProvidersCriteria} from '../core/model/providers-criteria';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Service} from '../core/model/service';
import {ActivatedRoute} from '@angular/router';
import {environment} from '../../environments/environment';

@Component({
  selector: 'app-sp-general',
  templateUrl: './sp-general.component.html',
  styleUrls: ['./sp-general.component.css']
})
export class SpGeneralComponent implements OnInit {
  private params: HttpParams;
  checkedServices: number[] = [];
  private page = 0;
  private i = 0;
  private providerPage: Array<ProvidersInfo> = [];
  private totalElements: number;
  private pages: Array<number>;
  pageSize = 4;
  private url = environment.baseURL + '/service-providers/image/';
  strService: string;
  private service: Service;
  private services: Service[];
  private providersCriteria = new ProvidersCriteria();
  public title = 'Places';
  public addrKeys: string[];
  public addr: object;
  private role: any;

  constructor(private serviceProvidersService: LandingPageService,
              private http: HttpClient,
              private rout: ActivatedRoute,
              private zone: NgZone) {
  }

  ngOnInit() {
    this.serviceProvidersService.getAllServices()
      .subscribe(data => this.services = data);
    this.providersCriteria.city = null;
    this.providersCriteria.region = null;
    this.providersCriteria.country = null;
    this.providersCriteria.minRating = 1;
    this.providersCriteria.sortByParam = 'registrationDate';
    this.params = new HttpParams()
      .set('minRating', this.providersCriteria.minRating.toString())
      .set('sortBy', this.providersCriteria.sortByParam.toString());
    this.getServiceProvidersByPage();
  }

  public isUser() {
    return window.sessionStorage.getItem('user') != null;
  }

  public isAdmin() {
    this.role = JSON.parse(window.sessionStorage.getItem('user')).roles;
    return this.role.toString() === 'ADMIN';
  }

  setPage(i, event: any) {
    event.preventDefault();
    this.page = i;
    this.getServiceProvidersByPage();
    window.scroll(0, 570);
  }

  getServiceProvidersByPage() {
    this.serviceProvidersService.getProviderInfoByPage(this.page, this.pageSize, this.params)
      .subscribe(
        data => {
          const d = data;
          this.providerPage = d.content;
          this.totalElements = d.totalElements;
          this.pages = new Array(d.totalPages);
        },
        (error) => {
          console.log(error);
        }
      );
  }

  setAddress(addrObj) {
    this.zone.run(() => {
      this.addr = addrObj;
      this.addrKeys = Object.keys(addrObj);
      this.providersCriteria.country = null;
      this.providersCriteria.region = null;
      this.providersCriteria.city = null;
      // @ts-ignore
      if (this.addr.country !== null) {
        // @ts-ignore
        this.providersCriteria.country = this.addr.country;
      } else {
        // @ts-ignore
        this.providersCriteria.country = null;
      }
      // @ts-ignore
      if (this.addr.locality !== null) {
        // @ts-ignore
        this.providersCriteria.city = this.addr.locality;
      } else {
        // @ts-ignore
        this.providersCriteria.city = null;
      }
      // @ts-ignore
      if (this.addr.admin_area_l1 !== null) {
        // @ts-ignore
        this.providersCriteria.region = this.addr.admin_area_l1;
      } else {
        // @ts-ignore
        this.providersCriteria.region = null;
      }
    });
    this.setProviderParam();
  }

  setCheckedServices() {
    this.checkedServices = [];
    this.i = 0;
    this.services
      .filter(x => x.choose === true)
      .forEach(x => {
        this.checkedServices[this.i] = x.id;
        this.i++;
      });
    this.setProviderParam();
  }

  setProviderParam() {
    this.params = new HttpParams()
      .set('minRating', this.providersCriteria.minRating.toString())
      .set('sortBy', this.providersCriteria.sortByParam.toString())
      .append('checkedServices', JSON.stringify(this.checkedServices));
    this.providersCriteria.services = this.services.filter(x => x.choose === true);
    this.strService += this.providersCriteria.services.forEach(value => value.id + ' ');
    if (!(this.providersCriteria.city === undefined)) {
      if (!(this.providersCriteria.city === null)) {
        this.params = new HttpParams()
          .set('minRating', this.providersCriteria.minRating.toString())
          .set('sortBy', this.providersCriteria.sortByParam.toString())
          .append('checkedServices', JSON.stringify(this.checkedServices))
          .set('city', this.providersCriteria.city.toString())
          .set('region', this.providersCriteria.region.toString())
          .set('country', this.providersCriteria.country.toString());
      }
    }
    if (!this.providersCriteria.city && !(this.providersCriteria.region === undefined)) {
      if (!(this.providersCriteria.region === null)) {
        this.params = new HttpParams()
          .set('minRating', this.providersCriteria.minRating.toString())
          .set('sortBy', this.providersCriteria.sortByParam.toString())
          .append('checkedServices', JSON.stringify(this.checkedServices))
          .set('region', this.providersCriteria.region.toString())
          .set('country', this.providersCriteria.country.toString());
      }
    }
    if (!this.providersCriteria.city && !this.providersCriteria.region && !(this.providersCriteria.country === undefined)) {
      if (!(this.providersCriteria.country === null)) {
        this.params = new HttpParams()
          .set('minRating', this.providersCriteria.minRating.toString())
          .set('sortBy', this.providersCriteria.sortByParam.toString())
          .append('checkedServices', JSON.stringify(this.checkedServices))
          .set('country', this.providersCriteria.country.toString());
      }
    }
    this.page = 0;
    this.getServiceProvidersByPage();
  }
}
