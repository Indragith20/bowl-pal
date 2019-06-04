import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { IPlayer } from 'src/app/shared/interfaces/player.interface';
import { TeamService } from '../services/team.service';

@Injectable()
export class PlayerListResolver implements Resolve<IPlayer[]> {
    constructor(private teamService: TeamService) {}

    resolve(route: ActivatedRouteSnapshot): Promise<IPlayer[]> {
        const teamId = route.paramMap.get('teamId');
        return new Promise((resolve, reject) => {
            this.teamService.getPlayers(teamId).then((data) => {
                resolve(data);
            }).catch((err) => {
                console.log(err);
            });
        });
    }
}
