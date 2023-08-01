import { Component, OnInit } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, FormBuilder, Validators, NgForm } from '@angular/forms';

import { ApiCallerService } from '../../../services/api-caller.service';
import { DataStorageService } from '../../../services/data-storage.service';
import { NavigationVO } from '../../../vo/Navigation.vo';

import { SubTopicVO } from '../../../vo/SubTopic.vo';


@Component({
  selector: 'app-new-edit-sub-topic',
  templateUrl: './new-edit-sub-topic.component.html',
  styleUrls: ['./new-edit-sub-topic.component.scss']
})
export class NewEditSubTopicComponent {

 closeResult = '';
   newEditNavigationForm: FormGroup;

   subTopicVOs = [];
   editItem = new NavigationVO();

   approvedTopicItems = [];

     constructor(private modalService: NgbModal,
                 private formBuilder: FormBuilder,
                   private apiCallerService: ApiCallerService,
                   private dataStorageService: DataStorageService) {

              this.newEditNavigationForm = formBuilder.group({
                   titleField: ['', [ Validators.required ] ],
                  linkToNavigateField: ['', Validators.required ],
                  selectedValue: ['', Validators.required ]
              });
              this.getAllTopicItems();
              this.getAllSubTopicItems();
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
         this.apiCallerService.apiGetCaller('/topic/P')
           .subscribe(data => {
            this.approvedTopicItems = data.payload;
         });
   }



   getAllSubTopicItems() {
     this.subTopicVOs = [];
     this.apiCallerService.apiGetCaller('/subtopic/P')
       .subscribe(data => {
         this.subTopicVOs = data.payload;
       });
   }

   createNewNav() {
       if(this.newEditNavigationForm.valid) {
         let subTopicVO = new SubTopicVO();
         subTopicVO.subTopicTitle = this.newEditNavigationForm.value.titleField;
         subTopicVO.subTopicNavigationUrl = this.newEditNavigationForm.value.linkToNavigateField;
         subTopicVO.topicId = this.newEditNavigationForm.value.selectedValue;

         console.log("navigationVO =====>  " + JSON.stringify(subTopicVO));
         this.apiCallerService.apiPostCaller('/add/subtopic', subTopicVO)
           .subscribe(data => {
               alert("Token required! with APIS ============>  " + data.payload);
               this.getAllSubTopicItems();
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
         this.subTopicVOs = data.payload;
         this.getAllSubTopicItems();
       });
       } else {
                 alert("Invalidation Form  for newEditNavigationForm")
               }
   }

   setNewEditNavigationForm(value: any) {
         this.showEditButton = true;

     let newLoanObj = {
         'titleField' :  value.title,
         'linkToNavigateField' : value.navigationLink
       }

   this.newEditNavigationForm.patchValue(newLoanObj);



   }

   deleteExistingNav(value: any) {
         alert("Data deleted successfully!" + value);
     this.apiCallerService.apiDeleteCaller('/delete/nav/' + value)
       .subscribe(data => {
         let message = data.mes;
         alert("" + message);
         this.getAllSubTopicItems();
       });
   }


}




















/*displayStyle = "none";

openPopup() {
this.displayStyle = "block";
}
closePopup() {
  this.displayStyle = "none";
}*/
