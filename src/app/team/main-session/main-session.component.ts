import { Component, OnInit } from '@angular/core';
import { IPlayer } from 'src/app/shared/interfaces/player.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { TeamService } from '../services/team.service';
import { ISessionAction } from 'src/app/shared/interfaces/session.interface';

@Component({
  selector: 'app-main-session',
  templateUrl: './main-session.component.html',
  styleUrls: ['./main-session.component.scss'],
})
export class MainSessionComponent implements OnInit {
  sessionId: string;
  playersList: IPlayer[];
  selectedPlayer: string;
  selectedBatsmenType: string;
  batsmenType: string[] = ['Left', 'Right'];
  ballLengths: string[] = ['Good', 'Over', 'Short', 'FullToss', 'Yorker', 'Wide'];
  ballLine: string[] = ['Off', 'OutsideOff', 'StumpLine'];
  ballLengthsWithSelection: any[] = [];
  ballLineWithSelection: any[] = [];
  isGoodLength: boolean = true;
  selectedBallLine: string;
  selectedBallLength: string;
  disableButton: boolean = true;
  startIndex: number = 0;

  constructor(private route: ActivatedRoute, private router: Router, private teamService: TeamService) { }

  ngOnInit() {
    const routeData = this.route.snapshot.data.sessionDetails;
    if(routeData && routeData.sessionId && routeData.playersList && routeData.playersList.length > 0) {
      this.sessionId = routeData.sessionId;
      this.playersList = routeData.playersList;
      this.selectedPlayer = this.playersList[0].playerId;
      this.intializeData();
    } else {
      this.router.navigate(['../../order-select'], { relativeTo: this.route });
    }
  }

  intializeData() {
    this.ballLengthsWithSelection = this.ballLengths.map((ball) => ({ ballType: ball, selected: false }));
    this.ballLineWithSelection = this.ballLine.map((ball) => ({ ballLine: ball, selected: false }));
  }

  changePlayer(event) {
    this.selectedPlayer = event.target.value;
  }

  changeType(event) {
    this.selectedBatsmenType = event.target.value;
  }

  selectBallType(selectedball) {
    this.selectedBallLength = !selectedball.selected ? selectedball.ballType : '';
    this.ballLengthsWithSelection = this.ballLengthsWithSelection.map((ball) => {
      if(ball.ballType === selectedball.ballType) {
        return { ...ball, selected: !selectedball.selected };
      }
      return { ...ball, selected: false };
    });
    if(selectedball.ballType !== 'Good') {
      this.isGoodLength = false;
    } else {
      this.isGoodLength = true;
    }
    this.toggleDisabledState();
  }

  changeBallLine(selectedball) {
    this.selectedBallLine = !selectedball.selected ? selectedball.ballLine : '';
    this.ballLineWithSelection = this.ballLineWithSelection.map((ball) => {
      if(ball.ballLine === selectedball.ballLine) {
        return { ...ball, selected: !selectedball.selected };
      }
      return { ...ball, selected: false };
    });
    this.toggleDisabledState();
  }

  toggleDisabledState() {
    if(this.selectedBallLength) {
      if(this.isGoodLength) {
        this.disableButton = false;
        this.selectedBallLine = '';
      } else {
        if(this.selectedBallLine) {
          this.disableButton = false;
        } else {
          this.disableButton = true;
        }
      }
    } else {
      this.disableButton = true;
    }
  }

  recordAction() {
    const action: ISessionAction = {
      actionType: this.selectedBallLength,
      batsmenType: this.selectedBatsmenType ? this.selectedBatsmenType : '',
      playerId: this.selectedPlayer,
      recordedTime: new Date().toString(),
    };
    const modifiedAction = this.isGoodLength ? action : { ...action, ballLine: this.selectedBallLine };
    this.teamService.addActionToSession(this.sessionId, modifiedAction).then((data) => {
      console.log(data);
      this.movePlayer();
    }).catch((err) => {
      console.log(err);
    });
  }

  movePlayer() {
    this.startIndex++;
    this.intializeData();
    if(this.playersList[this.startIndex]) {
      this.selectedPlayer = this.playersList[this.startIndex].playerId;
    } else {
      this.startIndex = 0;
      this.selectedPlayer = this.playersList[0].playerId;
    }
  }

}
