import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/observable/of';
import{Observable} from 'rxjs/Observable'
import 'rxjs/add/operator/map';
import { SaveVehicle, Vehicle } from '../models/vehicle';
import { prepareProfile } from 'selenium-webdriver/firefox';

@Injectable()
export class VehicleService {
  urlMakes = '/api/makes/';
  constructor(private http: HttpClient) { }

  getMakes(): Observable<any[]> {
    return this.http.get<any[]>(this.urlMakes);
  }

  urlFeature = '/api/features/';

  getFeatures(): Observable<any[]> {
    return this.http.get<any[]>(this.urlFeature);
  }

  urlVehicle = '/api/vehicles/';

  createVehicle(vehicle) {
    return this.http.post(this.urlVehicle, vehicle);
  }

  updateVehicle(vehicle: SaveVehicle) {
    return this.http.put(this.urlVehicle + vehicle.id, vehicle);
  }

  deleteVehicle(id) {
    return this.http.delete(this.urlVehicle + id);
  }

  getVehicle(id): any {
    return this.http.get<any>(this.urlVehicle + id);
  }

  toQueryString(obj) {
    var parts = [];
    for (var property in obj) {
      var value = obj[property];
      if (value != null && value != undefined)
        parts.push(encodeURIComponent(property) + '=' + encodeURIComponent(value));
    }
    return parts.join('&');
  }

  getVehicles(filter): Observable<Vehicle[]> {
    return this.http.get<Vehicle[]>(this.urlVehicle+'?'+this.toQueryString(filter));
  }
}
