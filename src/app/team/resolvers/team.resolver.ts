import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { TeamService } from '../services/team.service';
import { ICoachDetails, IManageTeamDetails } from 'src/app/shared/interfaces/coach.interface';
import { LoadingController } from '@ionic/angular';

@Injectable()
export class TeamResolver implements Resolve<IManageTeamDetails> {
    constructor(private teamService: TeamService, private loadingController: LoadingController) {
    }

    resolve(route: ActivatedRouteSnapshot): Promise<IManageTeamDetails> {
        // User data will come from the root team module resolver
        const userData: ICoachDetails = route.parent.data.user;
        return new Promise((resolve, reject) => {
            this.loadingController.create({ message: 'Getting Teams'}).then((loader) => {
                loader.present();
                this.teamService.getTeams(userData.coachId).then((data) => {
                    resolve({
                        userDetails: userData,
                        teamDetails: data
                    });
                }).catch((err) => {
                    console.log(err);
                }).finally(() => {
                    loader.dismiss();
                });
            });
        });
    }
}