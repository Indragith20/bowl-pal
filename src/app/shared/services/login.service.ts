import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { ICoachDetails } from '../interfaces/coach.interface';
import { AngularFirestore } from 'angularfire2/firestore';
import { take } from 'rxjs/operators';

@Injectable()
export class LoginService {
    constructor(public afAuth: AngularFireAuth, private af: AngularFirestore) { }

    async login(email: string, password: string) {
        return await this.afAuth.auth.signInWithEmailAndPassword(email, password);
    }

    async register(userdetails: any) {
        return await this.afAuth.auth.createUserWithEmailAndPassword(userdetails.emailId, userdetails.password)
            .then((data) => {
                console.log(data);
                const dataToBeStored: ICoachDetails = {
                    activeYears: 0,
                    coachId: data.user.uid,
                    displayName: userdetails.firstName,
                    emailId: userdetails.emailId,
                    fullName: `${userdetails.firstName} ${userdetails.lastName}`,
                    phoneNumber: userdetails.phoneNumber,
                    teamId: null,
                    teamsManaged: [],
                    currentManagingPlayers: [],
                };
                return this.af.collection('coaches').add(dataToBeStored);
        });
    }

    getUserDetails(userId: string): Promise<any[]> {
        const userData = this.af.collection('coaches', (ref) => ref.where('coachId', '==', userId).limit(1))
                                .valueChanges().pipe(take(1));
        return userData.toPromise();
    }
}
