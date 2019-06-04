import { Component, OnInit, OnDestroy } from '@angular/core';
import { ICoachDetails, IManageTeamDetails } from 'src/app/shared/interfaces/coach.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { TeamService } from '../services/team.service';
import { AutoUnsubscribe } from 'src/app/shared/utils/autounsubscribe';
import { Subscription } from 'rxjs';
import { ITeam } from 'src/app/shared/interfaces/teams.interface';
import { LoaderService } from 'src/app/shared/services/loader.service';

@Component({
  selector: 'app-manage-team',
  templateUrl: './manage-team.component.html',
  styleUrls: ['./manage-team.component.scss'],
})
@AutoUnsubscribe()
export class ManageTeamComponent implements OnInit, OnDestroy {
  userData: ICoachDetails;
  teamDetails: ITeam[] = [];
  loader: any;

  constructor(private route: ActivatedRoute, private teamService: TeamService,
    private loaderService: LoaderService, private router: Router) { }

  ngOnInit() {
    console.log(this.route.snapshot.parent.data);
    const teamDetails: IManageTeamDetails = this.route.snapshot.parent.data.teams;
    this.userData = teamDetails.userDetails;
    this.teamDetails = teamDetails.teamDetails;
  }

  viewPlayerList(teamId: string) {
    this.router.navigate(['../player-list/' + teamId], { relativeTo: this.route });
  }

  addTeam() {
    this.router.navigate(['../add-team/'], { relativeTo: this.route });
  }

  ngOnDestroy() {}

}
