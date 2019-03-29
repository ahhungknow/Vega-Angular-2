import { Component, OnInit } from '@angular/core';
import { Vehicle, KeyValuePair } from '../models/vehicle';
import { VehicleService } from '../services/vehicle.service';
import { ToastyService } from 'ng2-toasty';
import { element } from 'protractor';

@Component({
  selector: 'app-vehicle-list',
  templateUrl: './vehicle-list.component.html',
  styleUrls: ['./vehicle-list.component.css']
})
export class VehicleListComponent implements OnInit {
  private readonly PAGE_SIZE=3;
  queryResult :any={ };
  //allVehicles: Vehicle[]; filter on client
  columns: any = [
    { title: 'Id'},
    { title: 'Make', key: 'make', isSortable: true },
    { title: 'Model', key: 'model', isSortable: true },
    { title: 'Contact Name', key: 'contactName', isSortable: false },
    { }
  ];
  makes: KeyValuePair[];
  query: any = {
    pageSize: this.PAGE_SIZE,
  };
  constructor(
    private vehicleService: VehicleService,
    private toastyService:ToastyService) { }

  ngOnInit() {
    console.log(this.columns);
    this.vehicleService.getMakes().subscribe(makes => {
      this.makes = makes;
    });
    this.populateVehicles();
  }

  private populateVehicles() {
    this.vehicleService.getVehicles(this.query).subscribe(result => {

      this.queryResult = result;

      this.toastyService.success({
        title: 'Complete',
        timeout: 3000,
        msg: 'Loaded Vehicle List',
        showClose: true,
      });
    });
  }
  onMakeFilterChange() {
    //var vehicles = this.allVehicles;
    //if (this.filter.makeId) {
    //  vehicles = vehicles.filter(v => v.make.id == this.filter.makeId);
    //}
    //if (this.filter.modelId) {
    //  vehicles = vehicles.filter(v => v.model.id == this.filter.modelId);
    //}
    //this.vehicles = vehicles; filter on client
    this.query.page = 1;
    this.populateVehicles();
  }

  resetFilter() {
    this.query = {
      page: 1,
      pageSize: this.PAGE_SIZE,
    };
    this.populateVehicles();
    this.onMakeFilterChange();
  }

  sortBy(columnName) {
    if (this.query.sortBy === columnName) {
      this.query.isSortAscending = !this.query.isSortAscending;
    }
    else {
      this.query.sortBy = columnName;
      this.query.isSortAscending = true;
    }
    this.populateVehicles();
  }

  onPageChange(page) {
    this.query.page = page;
    this.populateVehicles();
  }
}
