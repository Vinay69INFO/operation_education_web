import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ApiCallerService } from '../../services/api-caller.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  appName = 'InWinYOU'

  @Output() public activeUrl = new EventEmitter<string>();

  menuItems = [
        {linkId: 1, linkName: 'Contents', linkUrl: '/contents/overview', routerLink: 'contents' },
        {linkId: 2, linkName: 'Projects', linkUrl: '/projects/overview', routerLink: 'projects'},
        {linkId: 3, linkName: 'Learn', linkUrl: '/learn/overview', routerLink: 'learn'},
        {linkId: 4, linkName: 'Support', linkUrl: '/support', routerLink: 'support' },
        {linkId: 5, linkName: 'Community', linkUrl: '/community', routerLink: 'community' }
  ];

  menuNav = [];

  constructor(private apiCallerService: ApiCallerService) {  this.getAllMenuItems();}

  ngOnInit(): void {
  }

  showActive(value: any) {
  //alert("header value: " + value);
    this.activeUrl.emit(value);
  }

  getAllMenuItems() {
    this.apiCallerService.apiGetCaller('/nav/link/P')
      .subscribe(data => {
        let sessionsVO = data.payload;
      // console.log("getAllMenuItems ======>  " + JSON.stringify(sessionsVO));
       this.menuNav = sessionsVO;
      // console.log("MenuItem:===============> " + JSON.stringify(this.menuNav));

      });
  }

}
