import { Component, OnInit, OnDestroy } from '@angular/core';
import { ICoachDetails, IManageTeamDetails } from 'src/app/shared/interfaces/coach.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { TeamService } from '../services/team.service';
import { AutoUnsubscribe } from 'src/app/shared/utils/autounsubscribe';
import { Subscription } from 'rxjs';
import { ITeam } from 'src/app/shared/interfaces/teams.interface';
import { LoaderService } from 'src/app/shared/services/loader.service';
import { Loader } from 'src/app/shared/utils/loader';
import { LoadingController } from '@ionic/angular';
import { NativeTransitionOptions, NativePageTransitions } from '@ionic-native/native-page-transitions/ngx';

@Component({
  selector: 'app-manage-team',
  templateUrl: './manage-team.component.html',
  styleUrls: ['./manage-team.component.scss'],
})
@AutoUnsubscribe()
export class ManageTeamComponent implements OnInit, OnDestroy {
  userData: ICoachDetails;
  fullTeamDetails: ITeam[] = [];
  teamDetails: ITeam[] = [];

  constructor(private route: ActivatedRoute, private teamService: TeamService,
    private router: Router, private loadingController: LoadingController,
    private nativePageTransitions: NativePageTransitions) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    // TODO:  Try Modifying the Resolver to avoid the below check
    /** Check needs to be done whether new team has been added to load the new teams */
    console.log(this.route.snapshot.parent.data);
    const fullTeamDetails: IManageTeamDetails = this.route.snapshot.parent.data.teams;
    this.userData = fullTeamDetails.userDetails;
    if(this.teamService.isNewTeamAdded) {
      this.loadingController.create({ message: 'Getting Teams'}).then((loader) => {
        loader.present();
        this.teamService.getTeams(this.userData.coachId).then((data) => {
          this.fullTeamDetails = [...data];
          this.teamDetails = [...data];
          this.teamService.isNewTeamAdded = false;
        }).catch((err) => {
            console.log(err);
        }).finally(() => {
            loader.dismiss();
        });
      });
    } else {
      this.fullTeamDetails = fullTeamDetails.teamDetails;
      this.teamDetails = [...this.fullTeamDetails];
    }
  }

  doRefresh(event) {
    this.teamService.getTeams(this.userData.coachId).then((data) => {
      this.fullTeamDetails = [...data];
      this.teamDetails = [...data];
      event.target.complete();
    }).catch((err) => {
        event.target.complete();
        console.log(err);
    });
  }
  viewPlayerList(teamId: string) {
    this.router.navigate(['../player-list/' + teamId], { relativeTo: this.route });
  }

  addTeam() {
    this.router.navigate(['../add-team/'], { relativeTo: this.route });
  }

  searchTeam(event) {
    const searchTeam = event.target.value;
    this.teamDetails = this.fullTeamDetails.filter((team) => team.teamName.includes(searchTeam));
  }

  ionViewWillLeave() {

    let options: NativeTransitionOptions = {
       direction: 'left',
       duration: 500,
       slowdownfactor: 3,
       slidePixels: 20,
       iosdelay: 100,
       androiddelay: 150,
       fixedPixelsTop: 0,
       fixedPixelsBottom: 60
      };

    this.nativePageTransitions.slide(options);
   }

  ngOnDestroy() {}

}
