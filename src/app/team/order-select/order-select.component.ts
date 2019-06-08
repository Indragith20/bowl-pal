import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ITeam } from 'src/app/shared/interfaces/teams.interface';
import { TeamService } from '../services/team.service';
import { IPlayer, IPlayerSelection } from 'src/app/shared/interfaces/player.interface';
import { ICoachDetails } from 'src/app/shared/interfaces/coach.interface';
import { ISession } from 'src/app/shared/interfaces/session.interface';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-order-select',
  templateUrl: './order-select.component.html',
  styleUrls: ['./order-select.component.scss'],
})
export class OrderSelectComponent implements OnInit {
  userDetails: ICoachDetails;
  teams: ITeam[];
  playerList: IPlayerSelection[] = [];
  originalPlayerList: IPlayerSelection[] = [];
  selectedPlayerList: IPlayerSelection[] = [];
  selectedTeamId: string;
  lastSelectedIndex: number = 0;
  loader: any;
  constructor(private route: ActivatedRoute, private teamService: TeamService,
              private router: Router, private loadingController: LoadingController) { }

  ngOnInit() {
    console.log(this.route.snapshot.parent.data.teams);
    const parentData = this.route.snapshot.parent.data.teams;
    this.userDetails = parentData.userDetails;
    this.teams = parentData.teamDetails;
  }

  async getPlayerList(event) {
    const loader = await this.loadingController.create({ message: 'Getting Players'});
    this.selectedTeamId = event.target.value;
    this.teamService.getPlayers(this.selectedTeamId).then((data) => {
      console.log(data);
      if(data && data.length) {
        this.playerList = data.map((player) => ({...player, selected: false}));
        this.originalPlayerList = [...this.playerList];
      }
      this.playerList = [...data];
    }).catch((err) => {
      console.log(err);
    }).finally(() => {
      loader.dismiss();
    });
  }

  togglePlayer(selectedPlayer: IPlayerSelection, index: number) {
    this.playerList = this.playerList.map((player, arrayIndex) => {
      if(index === arrayIndex) {
        return { ...player, selected: !player.selected };
      }
      return player;
    });
    this.selectedPlayerList = this.playerList.filter((player) => player.selected === true);
    if(!selectedPlayer.selected) {
      const event = {
        detail: {
          complete: () => null,
          from: index,
          to: this.selectedPlayerList.length - 1
        }
      };
      this.doReorder(event);
    }
  }

  searchPlayer(event) {
    console.log(event.target.value);
    const searchValue = event.target.value;
    this.playerList = this.originalPlayerList.filter((player) => player.firstName.includes(searchValue));
  }

  doReorder(ev) {
    ev.detail.complete();
    this.playerList.splice(ev.detail.to, 0, this.playerList.splice(ev.detail.from, 1)[0]);
  }

  async startSession() {
    const loader = await this.loadingController.create({ message: 'Intiating Session'});
    const intialSession: ISession = {
      playerIds: [...this.selectedPlayerList.map(selectedPlayer => selectedPlayer.playerId)],
      recordedBy: this.userDetails.coachId,
      action: [],
      teamId: this.selectedTeamId,
      time: new Date().toString()
    }
    const selectedPlayerListWithoutSelection = this.selectedPlayerList.map((player) => {
      const { selected, ...playerWithoutSelection} = player;
      return playerWithoutSelection;
    });
    loader.present();
    this.teamService.addSessionData(intialSession, selectedPlayerListWithoutSelection).then((data) => {
      if(data) {
        this.router.navigate(['../main-session/' + data.sessionId], { relativeTo: this.route });
      }
    }).catch((err) => {
      console.log(err);
    }).finally(() => {
      loader.dismiss();
    });
  }

}
