import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import Scrollbar  from 'smooth-scrollbar';
import { ApiCallerService } from '../../services/api-caller.service';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {
  @Input() indexUrl: any;

  indexItem = [];

  id: any;
  data: any;
  sendValue: any;
  dataShow = 'all-operation';
  currentRoute: any;

   constructor(private router: Router,
                private activatedRoute: ActivatedRoute,
                private apiCallerService: ApiCallerService) {
                  this.data=this.router.routerState.snapshot.url;
   }

    ngOnInit(): void {
      this.id = this.activatedRoute.snapshot.paramMap.get('status');
      Scrollbar.init(<HTMLElement>document.querySelector('#myId'));
      Scrollbar.init(<HTMLElement>document.querySelector('#myIds'));
      this.getOverviewByStatus(this.indexUrl);
    }

    ngOnChanges() {
        this.getOverviewByStatus(this.indexUrl);
        this.data=this.router.routerState.snapshot.url;
    }

    appName = 'InWinYOU'
      menuItems1 = [
            {linkId: 1, linkName: 'Contents', linkUrl: '/contents' },
            {linkId: 2, linkName: 'Projects', linkUrl: '/projects' },
            {linkId: 3, linkName: 'Learn', linkUrl: '/learn' },
            {linkId: 4, linkName: 'Support', linkUrl: '/support' },
            {linkId: 5, linkName: 'Community', linkUrl: '/community' }
      ];

      menuItems = [
                    { linkId: 1, linkName: 'New/Edit Navigation', linkUrl: '/new-edit-navigation', show: false, data:  'navigation'},
                    { linkId: 2, linkName: 'New/Edit Topic', linkUrl: '/new-edit-topic', show: false, data: 'java-1.8' },
                    { linkId: 3, linkName: 'New/Edit SubTopic', linkUrl: '/new-edit-subtopic', show: false, data: 'micro-service' },
                    { linkId: 4, linkName: 'New/Edit Blog', linkUrl: '/new-edit-blog', show: false, data: 'new-edit-blog' },
                    //TODO --> Need to add approval features for above new Items
                     /* { linkId: 5, linkName: 'All Operation Approval', linkUrl: '/all-operation', show: true,  data: '/all-operation',
                        contentItems: [
                          { linkId: 1, linkName: 'Navigation Approval', linkUrl: '/contents/overview' },
                          { linkId: 2, linkName: 'Topic Approval', linkUrl: '/contents/java-1.8' },
                          { linkId: 3, linkName: 'SubTopic Approval', linkUrl: '/contents/micro-service' },
                          { linkId: 3, linkName: 'Blog Approval', linkUrl: '/contents/micro-service' }

                        ]

                    }*/
            ];

    getOverviewByStatus(status: any) {
        this.apiCallerService.apiGetCaller('/all/topics/'+status)
          .subscribe(data => {
            let sessionsVO = data.payload;
           this.indexItem = sessionsVO.topicVO;
          });
      }

      sendData(value: any) {
        this.sendValue =  value.activatedRoute.snapshot.params.status;
      }

      sendDataItema(value: any){
        this.dataShow = this.router.routerState.snapshot.url;
        console.log(" value ==hellow ji=> " + this.dataShow);
       // this.sendValue =  value.activatedRoute.snapshot.params.status;
      }
      showUrl() {
        console.log("Hello Ji, How are you vinay!");
      }

}
