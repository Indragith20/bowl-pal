import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IPlayer } from 'src/app/shared/interfaces/player.interface';
import { Subscription } from 'rxjs';
import { AutoUnsubscribe } from 'src/app/shared/utils/autounsubscribe';
import { TeamService } from '../services/team.service';

@Component({
  selector: 'app-player-list',
  templateUrl: './player-list.component.html',
  styleUrls: ['./player-list.component.scss'],
})
@AutoUnsubscribe()
export class PlayerListComponent implements OnInit, OnDestroy {
  playerList: IPlayer[];
  originalPlayerList: IPlayer[];
  selectedTeamId: string;
  teamSubscription: Subscription;
  constructor(private route: ActivatedRoute, private router: Router, private teamService: TeamService) {
  }

  ngOnInit() {
    this.playerList = this.route.snapshot.data.playerList;
    this.originalPlayerList = [...this.playerList];
    this.teamSubscription = this.route.params.subscribe((params) => {
      this.selectedTeamId = params['teamId'];
    });
  }

  doRefresh(event) {
    this.teamService.getPlayers(this.selectedTeamId).then((data) => {
        this.playerList = [...data];
        this.originalPlayerList = [...data];
        event.target.complete();
    }).catch((err) => {
        console.log(err);
        event.target.complete();
    });
  }

  addNewPlayer() {
    this.router.navigate(['../../add-player/' + this.selectedTeamId], { relativeTo: this.route });
  }

  goToPlayerProfile(playerId: string) {
    this.router.navigate(['../../team/' + this.selectedTeamId + '/player-profile/' + playerId],
                          { relativeTo: this.route });
  }

  backToTeams() {
    this.router.navigate(['../../home'], { relativeTo: this.route });
  }

  searchPlayer(event) {
    console.log(event.target.value);
    const searchValue = event.target.value;
    this.playerList = this.originalPlayerList.filter((player) => player.firstName.includes(searchValue));
  }

  ngOnDestroy() {}
}
