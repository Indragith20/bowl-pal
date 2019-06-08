import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IPlayer } from '../../interfaces/player.interface';
import { AutoUnsubscribe } from '../../utils/autounsubscribe';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
@AutoUnsubscribe()
export class ProfileComponent implements OnInit, OnDestroy {
  playerDetails: IPlayer;
  teamId: string;
  playerId: string;
  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe((data) => {
      console.log(data);
      this.teamId = data.teamId;
      this.playerId = data.playerId;
    })
    this.playerDetails = this.route.snapshot.data.playerDetails;
  }

  goToPlayerList() {
    console.log(this.route);
    this.router.navigate(['../../../../player-list/' + this.teamId], { relativeTo:  this.route });
  }

  ngOnDestroy() {}

}
