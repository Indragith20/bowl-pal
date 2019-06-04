import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IPlayer } from '../../interfaces/player.interface';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  playerDetails: IPlayer;
  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.playerDetails = this.route.snapshot.data.playerDetails;
  }

}
