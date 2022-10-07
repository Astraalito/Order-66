import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DeviceService {

  isOnMobile : boolean = false
  deviceOrientation : number = 0

  constructor() { }
}
