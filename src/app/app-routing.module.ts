import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LandingComponent } from './pages/landing.component';
import { OverviewComponent } from './pages/overview/overview.component';
import { ContentsComponent } from './pages/ACCESS/contents/contents.component';
import { ProjectsComponent } from './pages/ACCESS/projects/projects.component';
import { LearnComponent } from './pages/ACCESS/learn/learn.component';
import { SupportComponent } from './pages/ACCESS/support/support.component';
import { CommunityComponent } from './pages/ACCESS/community/community.component';
import { NewEditNavigationComponent } from './pages/ACCESS/new-edit-navigation/new-edit-navigation.component';
import { NewEditTopicComponent } from './pages/ACCESS/new-edit-topic/new-edit-topic.component';
import { NewEditSubTopicComponent } from './pages/ACCESS/new-edit-sub-topic/new-edit-sub-topic.component';
import { NewEditBlogComponent } from './pages/ACCESS/new-edit-blog/new-edit-blog.component';

import { PageNotFoundComponent } from './pages/ACCESS/page-not-found/page-not-found.component';

const routes: Routes = [

{ path: '', redirectTo: 'new-edit-navigation', pathMatch: 'full' },
{ path: '', component: LandingComponent,
  children: [
    { path: 'new-edit-navigation', component: NewEditNavigationComponent },
    { path: 'new-edit-topic', component: NewEditTopicComponent },
    { path: 'new-edit-subtopic', component: NewEditSubTopicComponent },
    { path: 'new-edit-blog', component: NewEditBlogComponent},
    { path: 'all-operation', component: NewEditSubTopicComponent }
  ]
    },
    { path: '**', component: PageNotFoundComponent},
    { path: 'community/:status', component: OverviewComponent },
    { path: 'community', component: OverviewComponent }

           //  { path: 'contents/:status', component: ContentsComponent },
         //{ path: 'projects/:status', component: ProjectsComponent },
         //{ path: 'learn/:status', component: LearnComponent }

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


