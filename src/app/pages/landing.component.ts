import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent {

    id: any;

    activateUrl: any;

   constructor(private activatedRoute: ActivatedRoute) {
      this.id = this.activatedRoute.snapshot.paramMap.get('status');
      //console.log("LandingComponent: " + this.id);
   }

  activeUrl(value: any) {
    this.activateUrl = value;
    //console.log("landing activeUrl: ===> " + this.activateUrl);
  }


}
