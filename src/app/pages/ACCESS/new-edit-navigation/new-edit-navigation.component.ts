import { Component } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, FormBuilder, Validators, NgForm } from '@angular/forms';

import { ApiCallerService } from '../../../services/api-caller.service';
import { DataStorageService } from '../../../services/data-storage.service';
import { NavigationVO } from '../../../vo/Navigation.vo';

@Component({
  selector: 'app-new-edit-navigation',
  templateUrl: './new-edit-navigation.component.html',
  styleUrls: ['./new-edit-navigation.component.scss']
})
export class NewEditNavigationComponent {

  closeResult = '';
  newEditNavigationForm: FormGroup;

  navigationVOs = [];
  editItem = new NavigationVO();

    constructor(private modalService: NgbModal,
                private formBuilder: FormBuilder,
                  private apiCallerService: ApiCallerService,
                  private dataStorageService: DataStorageService) {

             this.newEditNavigationForm = formBuilder.group({
                  titleField: ['', [ Validators.required ] ],
                 linkToNavigateField: ['', Validators.required ]
             });

             this.getAllMenuItems();
    }

  showEditButton = false;

open(content: any, nav: any) {
    alert("===========content:========" + nav);
    if (nav != '' ) {
    this.editItem = nav;
      this.setNewEditNavigationForm(nav);
    }
    this.modalService.open(content,
   {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult =
         `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  getAllMenuItems() {
    this.navigationVOs = [];
    this.apiCallerService.apiGetCaller('/nav/links')
      .subscribe(data => {
        this.navigationVOs = data.payload;
      });
  }

  createNewNav() {
      if(this.newEditNavigationForm.valid) {
        let navigationVO = new NavigationVO();
        navigationVO.navTitle = this.newEditNavigationForm.value.titleField;
        navigationVO.navUrl = this.newEditNavigationForm.value.linkToNavigateField;

        console.log("navigationVO =====>  " + JSON.stringify(navigationVO));
        this.apiCallerService.apiPostCaller('/add/nav', navigationVO)
          .subscribe(data => {
              alert("Token required! with APIS ============>  " + data.payload);
              this.getAllMenuItems();
          });
      } else {
        alert("Invalidation Form  for newEditNavigationForm")
      }
  }



  editExitingNav() {
  if(this.newEditNavigationForm.valid) {
          let navigationVO = new NavigationVO();
          navigationVO.navId= this.editItem.navId;
          navigationVO.navTitle = this.newEditNavigationForm.value.titleField;
          navigationVO.navUrl = this.newEditNavigationForm.value.linkToNavigateField;



    //this.newEditNavigationForm.patchValue(this.setNewEditNavigationForm(value));
   // this.open(content);
    alert(JSON.stringify(navigationVO) + "Nav Data updated successfully!" );
    this.apiCallerService.apiPutCaller('/update/nav', navigationVO)
      .subscribe(data => {
        this.navigationVOs = data.payload;
        this.getAllMenuItems();
      });
      } else {
                alert("Invalidation Form  for newEditNavigationForm")
              }
  }

  setNewEditNavigationForm(value: any) {
        this.showEditButton = true;

    let newLoanObj = {
        'titleField' :  value.navTitle,
        'linkToNavigateField' : value.navUrl
      }

  this.newEditNavigationForm.patchValue(newLoanObj);



  }

  deleteExistingNav(value: any) {
        alert("Data deleted successfully!" + value);
    this.apiCallerService.apiDeleteCaller('/delete/nav/' + value)
      .subscribe(data => {
        let message = data.mes;
        alert("" + message);
        this.getAllMenuItems();
      });
  }

}
