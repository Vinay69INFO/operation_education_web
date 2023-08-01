import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {ActivatedRoute, Router } from '@angular/router';
import { AngularEditorConfig } from "@kolkov/angular-editor";

@Component({
  selector: 'app-contents',
  templateUrl: './contents.component.html',
  styleUrls: ['./contents.component.scss']
})
export class ContentsComponent implements OnInit {

  //@Output() public sendData = new EventEmitter<string>();
  @Output('attach') public sendDataItem = new EventEmitter<string>();

   paramQuery = '';
   id: any;
   data:any;

    parentRouteId: any;
     private sub: any;
     contentStatus: any;

     constructor(private router: Router, private activatedRoute: ActivatedRoute) {
        this.activatedRoute.params.subscribe(data => {
        this.contentStatus = data['status']
            // alert("data: contents Component ====> " + data['status']);
             this.sendDataItema(data['status']);
            //this.sendData.emit(this.contentStatus);
           //console.log("Hello vinay: " + this.router.routerState);
        });
     }

      ngOnInit(): void {
         this.id = this.activatedRoute.snapshot.paramMap.get('status');
         this.data=this.router.routerState.snapshot.url;
       //  this.sendData.emit(this.id);
       }


sendDataItema(value: any){
      // console.log(value + "  <=========== this.id vinay ContentsComponent:============> " + this.id);
    this.sendDataItem.emit(value);
}
       /* ngOnChanges() {
          this.id = this.activatedRoute.snapshot.paramMap.get('status');
          this.sendData.emit(this.id);


           }*/


        java1_code =  `
          ResponseVO responseVO = new ResponseVO();
            try {
                validateAvailabilityAndPassword(responseVO, registerVO);
                StudentVO studentVO = studentConverter.getStudentVO(registerVO);
                StudentVO studentVO1 = iamTransactions.register(studentVO);
                System.out.println("Hi- Ji1 ");
                responseVO.setPayload(studentVO1);
              } catch (Exception e) {
                System.out.println("Hi- Ji " + e);
              }
          return responseVO;
        `;

        java2_code = `
          private void validateAvailabilityAndPassword(ResponseVO responseVO, RegisterVO registerVO) {
          		StudentVO studentVO = iamTransactions.getStudentByEmail(registerVO.getEmailAddress());
          		if(studentVO != null) {
          			//if (studentVO.get)
          			System.out.println("something went wrong!");
          		}
          	}

        `;
htmlContent: any;
}
