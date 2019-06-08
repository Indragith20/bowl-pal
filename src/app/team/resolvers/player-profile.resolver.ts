import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { TeamService } from '../services/team.service';
import { IPlayer } from 'src/app/shared/interfaces/player.interface';
import { LoadingController } from '@ionic/angular';

@Injectable()
export class PlayerProfileResolver implements Resolve<IPlayer> {

    constructor(private teamService: TeamService, private loadingController: LoadingController) {}

    resolve(route: ActivatedRouteSnapshot): Promise<IPlayer> {
        const teamId = route.params['teamId'];
        const playerId = route.params['playerId'];
        return new Promise((resolve, reject) => {
            // TODO: Need to find out whether we need teamId here
            this.loadingController.create({ message: 'Getting Profile'}).then((loader) => {
                loader.present();
                this.teamService.getPlayerDetailsById(teamId, playerId).then((data) => {
                    console.log(data);
                    if(Array.isArray(data)) {
                        resolve(data[0]);
                    } else {
                        resolve(data);
                    }
                }).catch((err) => {
                    reject(err);
                }).finally(() => {
                    loader.dismiss();
                });
            });
        });
    }
}