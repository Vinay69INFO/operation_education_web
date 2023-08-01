import { Component } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, NgForm } from '@angular/forms';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

import { BlogVO } from '../../../vo/Blog.vo';


import { ApiCallerService } from '../../../services/api-caller.service';
import { DataStorageService } from '../../../services/data-storage.service';

@Component({
  selector: 'app-new-edit-blog',
  templateUrl: './new-edit-blog.component.html',
  styleUrls: ['./new-edit-blog.component.scss']
})
export class NewEditBlogComponent {

  title: any;
  htmlContent: any;

  approvedNavItems = [];
  topicVOs = [];
  subTopicVOs = [];
  blogVOs = [];
  selectedProduct: any;

     blogNewEditForm: FormGroup;

  showEditButton = false;

  editItem = new BlogVO();

    closeResult = '';



  constructor(private apiCallerService: ApiCallerService,
    private dataStorageService: DataStorageService,
    private formBuilder: FormBuilder, private modalService: NgbModal) {

    this.blogNewEditForm = formBuilder.group({
      titleField: ['', [ Validators.required ] ],
      bodyField: ['', [ Validators.required ]],
      navSelectedValue: ['', [ Validators.required ]],
      topicSelectedValue: ['', [ Validators.required ]],
      subTopicSelectedValue: ['', [ Validators.required ] ]
    });

      this.getAllNavItems();
      this.getAllBlogItems();
      // this.getAllTopicItems();
      //this.getAllSubTopicItems();
    }


/*createNewNav(blogForm: NgForm) {
    this.title = blogForm.value.titleField1;
    this.htmlContent = blogForm.value.bodyField;

     let blogVO = new BlogVO();
     blogVO.title = blogForm.value.titleField1;
     blogVO.body = blogForm.value.bodyField;

     this.apiCallerService.apiPostCaller('/add/blog', blogVO)
          .subscribe(data => {
              alert("Token required! with APIS ============>  " + data.payload);
          });
}

editExitingNav(blogForm: NgForm) {
  this.title = blogForm.value.titleField1;
  this.htmlContent = blogForm.value.bodyField;
}*/

  getAllNavItems() {
      this.apiCallerService.apiGetCaller('/nav/link/P')
        .subscribe(data => {
         this.approvedNavItems = data.payload;
      });
  }

  getAllTopicItems() {
    this.apiCallerService.apiGetCaller('/topic/P')
      .subscribe(data => {
        this.topicVOs = data.payload;
      });
  }

  getAllSubTopicItems() {
    this.apiCallerService.apiGetCaller('/subtopic/P')
      .subscribe(data => {
        this.subTopicVOs = data.payload;
     });
  }

  naveSelectValue(){
    let navId = this.blogNewEditForm.value.navSelectedValue;
     this.apiCallerService.apiGetCaller('/all/topics/'+ navId)
          .subscribe(data => {
            this.topicVOs = data.payload;
         });
  }

  topicSelectedValue(){
      let topicId = this.blogNewEditForm.value.topicSelectedValue;
       this.apiCallerService.apiGetCaller('/all/subtopic/'+ topicId)
            .subscribe(data => {
              this.subTopicVOs = data.payload;
           });
    }

  createNewNav() {
   // if(this.blogNewEditForm.valid) {
      let blogVO = new BlogVO();
           blogVO.blogTitle = this.blogNewEditForm.value.titleField;
           blogVO.blogBody = this.blogNewEditForm.value.bodyField;
           blogVO.topicId = this.blogNewEditForm.value.topicSelectedValue;
           blogVO.subTopicId = this.blogNewEditForm.value.subTopicSelectedValue;
           alert("subtopic: " + this.blogNewEditForm.value.subTopicSelectedValue);

           console.log("navigationVO =====>  " + JSON.stringify(blogVO));
           this.apiCallerService.apiPostCaller('/add/blog', blogVO)
             .subscribe(data => {
                 alert("Sub Topic created successfully!");
             });
       /*  } else {
           alert("Invalidation Form  for newEditNavigationForm")
         }*/
     }

  editExitingNav(){

  }

  getAllBlogItems() {
      this.apiCallerService.apiGetCaller('/get/all/blog/P')
        .subscribe(data => {
          this.blogVOs = data.payload;
       });
    }

    open(content: any, blogVO: any) {
        if (blogVO != '' ) {
          this.editItem = blogVO;
          this.setNewEditNavigationForm(blogVO);
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



      setNewEditNavigationForm(value: any) {
          this.showEditButton = true;
          let newLoanObj = {
              titleField: value.blogTitle,
              bodyField: value.blogBody,
              navSelectedValue: value.navName,
              topicSelectedValue: value.topicName,
              subTopicSelectedValue: value.subTopicName
            }

        this.blogNewEditForm.patchValue(newLoanObj);

      }

deleteExistingNav(value: any) {
   this.apiCallerService.apiDeleteCaller('/delete/blog/' + value)
      .subscribe(data => {
        alert("Data deleted successfully!" + value);
        this.getAllBlogItems();
      });
  }

}
