import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { IPlayer } from 'src/app/shared/interfaces/player.interface';
import { TeamService } from '../services/team.service';
import { LoadingController } from '@ionic/angular';

@Injectable()
export class PlayerListResolver implements Resolve<IPlayer[]> {
    constructor(private teamService: TeamService, private loadingController: LoadingController) {}

    resolve(route: ActivatedRouteSnapshot): Promise<IPlayer[]> {
        const teamId = route.paramMap.get('teamId');
        return new Promise((resolve, reject) => {
            this.loadingController.create({ message: 'Getting Players'}).then((loader) => {
                loader.present();
                this.teamService.getPlayers(teamId).then((data) => {
                    loader.dismiss();
                    resolve(data);
                }).catch((err) => {
                    loader.dismiss();
                    console.log(err);
                });
            });
        });
    }
}
