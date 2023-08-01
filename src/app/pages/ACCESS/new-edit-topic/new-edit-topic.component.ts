import { Component } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, FormBuilder, Validators, NgForm } from '@angular/forms';

import { ApiCallerService } from '../../../services/api-caller.service';
import { DataStorageService } from '../../../services/data-storage.service';
import { TopicVO } from '../../../vo/Topic.vo';

import { NavigationVO } from '../../../vo/Navigation.vo';

@Component({
  selector: 'app-new-edit-topic',
  templateUrl: './new-edit-topic.component.html',
  styleUrls: ['./new-edit-topic.component.scss']
})
export class NewEditTopicComponent {

  closeResult = '';
  newEditNavigationForm: FormGroup;

  topicVOs = [];
  editItem = new NavigationVO();

    approvedNavItems = [];


    constructor(private modalService: NgbModal,
                private formBuilder: FormBuilder,
                  private apiCallerService: ApiCallerService,
                  private dataStorageService: DataStorageService) {

             this.newEditNavigationForm = formBuilder.group({
                  titleField: ['', [ Validators.required ] ],
                 linkToNavigateField: ['', Validators.required ],
                 selectedValue: ['', Validators.required ],
                 subTopicStatusField: ['Y', [Validators.required]]
             });

              this.getAllTopicItems();
              this.getAllNavItems();
            // this.getAllMenuItems();
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

  getAllTopicItems() {
    this.topicVOs = [];
    this.apiCallerService.apiGetCaller('/topic/P')
      .subscribe(data => {
        this.topicVOs = data.payload;
      });
  }

  createNewNav() {
      if(this.newEditNavigationForm.valid) {
        let topicVO = new TopicVO();
        topicVO.topicTitle = this.newEditNavigationForm.value.titleField;
        topicVO.topicNavigationUrl = this.newEditNavigationForm.value.linkToNavigateField;
        topicVO.navId = this.newEditNavigationForm.value.selectedValue;
        topicVO.subTopicStatus = this.newEditNavigationForm.value.subTopicStatusField;

        console.log("topicVO =====>  " + JSON.stringify(topicVO));
        this.apiCallerService.apiPostCaller('/add/topic', topicVO)
          .subscribe(data => {
              alert("Token required! with APIS ============>  " + data.payload);
              this.getAllNavItems();
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
        this.topicVOs = data.payload;
        this.getAllNavItems();
      });
      } else {
                alert("Invalidation Form  for newEditNavigationForm")
              }
  }

  setNewEditNavigationForm(value: any) {
        this.showEditButton = true;

    let newLoanObj = {
        'titleField' :  value.topicTitle,
        'linkToNavigateField' : value.topicNavigationUrl,
        'selectedValue' : value.navTitle
      }

  this.newEditNavigationForm.patchValue(newLoanObj);



  }

  deleteExistingNav(value: any) {
    this.apiCallerService.apiDeleteCaller('/delete/nav/' + value)
      .subscribe(data => {
        let message = data.mes;
        alert("" + message);
        this.getAllNavItems();
      });
  }

  getAllNavItems() {
      this.apiCallerService.apiGetCaller('/nav/link/P')
        .subscribe(data => {
         this.approvedNavItems = data.payload;
      });
    }

}
