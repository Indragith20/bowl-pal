import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { TeamService } from '../services/team.service';
import { ISessionResolverData } from 'src/app/shared/interfaces/session.interface';
import { IPlayer } from 'src/app/shared/interfaces/player.interface';

@Injectable()
export class SessionResolver implements Resolve<ISessionResolverData> {
    constructor(private teamService: TeamService) {}

    resolve(route: ActivatedRouteSnapshot): ISessionResolverData {
        const sessionId: string = route.params['sessionId'];
        const playersList: IPlayer[] = this.teamService.selectedPlayersList;
        if(sessionId && playersList && playersList.length > 0) {
                return { sessionId, playersList };
        } else {
            return { sessionId: null, playersList: []};
        }
    }
}