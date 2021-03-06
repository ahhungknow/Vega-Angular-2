import { Component, OnInit } from '@angular/core';
import * as _ from 'underscore';
import { VehicleService } from '../services/vehicle.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SaveVehicle, Vehicle } from '../models/vehicle';
import { ToastyService } from 'ng2-toasty';

@Component({
  selector: 'app-vehicle-form',
  templateUrl: './vehicle-form.component.html',
  styleUrls: ['./vehicle-form.component.css']
})
export class VehicleFormComponent implements OnInit {
  makes: any[];
  models: any[];
  features: any[];
  vehicle: SaveVehicle = {
    id: 0,
    makeId: 0,
    modelId: 0,
    isRegistered: false,
    features: [],
    contact: {
      name: '',
      email: '',
      phone: '',
    }
  };
  constructor(
    private toastyService:ToastyService,
    private route: ActivatedRoute,
    private router: Router,
    private vehicleService: VehicleService) {
    route.params.subscribe(p => {
      this.vehicle.id = +p['id'];
    })
  }

  ngOnInit() {
    this.vehicleService.getMakes().subscribe(makes => {
      this.makes = makes;
      this.populateModels();
    });
    this.vehicleService.getFeatures().subscribe(features => this.features = features);
    if (this.vehicle.id) {
      this.vehicleService.getVehicle(this.vehicle.id).subscribe(
        vehicle => {
          this.setVehicle(vehicle);
          this.populateModels();
        },
        error => {
          if (error.status == 404)
            this.toastyService.error({
              title: 'Error',
              msg: 'Not Found',
              showClose: true,
              timeout: 5000
            });
          this.router.navigate(["/"]);
        });
    }
  }
  private setVehicle(v: Vehicle) {
    this.vehicle.id = v.id;
    this.vehicle.makeId = v.make.id;
    this.vehicle.modelId = v.model.id;
    this.vehicle.isRegistered = v.isRegistered;
    this.vehicle.contact = v.contact;
    this.vehicle.features = _.pluck(v.features, 'id');
  }

  private populateModels() {
    var selectedMake = this.makes.find(m => m.id == this.vehicle.makeId);
    console.log(selectedMake);
    this.models = selectedMake ? selectedMake.models : [];
  }
  onMakeChange() {
    this.populateModels();

    delete this.vehicle.modelId;
  }
  onFeatureToggle(featureId, $event) {
    if ($event.target.checked) {
      this.vehicle.features.push(featureId);
    }
    else {
      var index=this.vehicle.features.indexOf(featureId);
      this.vehicle.features.splice(index, 1);//remove one object from index
    }
  }
  submit() {
    if (this.vehicle.id) {
      this.vehicleService.updateVehicle(this.vehicle).subscribe(v => {
        this.toastyService.success({
          title: 'Success',
          msg: 'The vehicle was successfully updated',
          showClose: true,
          timeout: 5000
        });
      });
    }
    else {
      this.vehicle.id = 0;
      this.vehicleService.createVehicle(this.vehicle).subscribe(x => {
        this.toastyService.success({
          title: 'Success',
          msg: 'The vehicle inserted',
          showClose: true,
          timeout: 5000
        });
        this.router.navigate(['/'])
      });
    }
  }
  delete() {
    if (confirm("Are you sure?")) {
      this.vehicleService.deleteVehicle(this.vehicle.id).subscribe(x => {
        this.toastyService.success({
          title: 'Success',
          msg: 'The vehicle was deleted',
          showClose: true,
          timeout: 5000
        });
        this.router.navigate(['/']);
      })
    }
  }
}
