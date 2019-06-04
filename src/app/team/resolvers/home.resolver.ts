import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { LoginService } from 'src/app/shared/services/login.service';
import { ICoachDetails } from 'src/app/shared/interfaces/coach.interface';

@Injectable()
export class HomeResolver implements Resolve<boolean | ICoachDetails> {
    constructor(private loginService: LoginService) {}

    async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        console.log(route.params['id']);
        const userId = route.params['id'];
        if(userId) {
            const userData = await this.loginService.getUserDetails(userId);
            return userData ? userData[0] : false;
        }
        return false;
    }
}
