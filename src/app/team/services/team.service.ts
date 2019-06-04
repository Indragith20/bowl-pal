import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { ITeam } from 'src/app/shared/interfaces/teams.interface';
import { v4 as uuid } from 'uuid';
import { LoaderService } from 'src/app/shared/services/loader.service';
import { first } from 'rxjs/operators';
import { IPlayer } from 'src/app/shared/interfaces/player.interface';
import { ISession, IAddSessionResponse, ISessionAction } from 'src/app/shared/interfaces/session.interface';
import * as firebase from 'firebase/app';

/* Careful with set and update methods
    set with merge: true => update fields in the document or create it if it doesn't exists
    update => will update fields but will fail if the document doesn't exist
*/
@Injectable()
export class TeamService {
    selectedPlayersList: IPlayer[];
    constructor(private af: AngularFirestore, private loaderService: LoaderService) { }

    async createTeam(teamDetails: ITeam): Promise<any> {
        const teamId = uuid();
        const modifiedTeam = { ...teamDetails, teamId };
        return await this.af.collection('teams').add(modifiedTeam);
    }

    getTeams(coachId: string): Promise<any[]> {
        console.log(coachId);
        return this.af.collection('teams', (ref) => ref.where('coachId', '==', coachId))
            .valueChanges()
            .pipe(
                first()
            ).toPromise();
    }

    async getPlayers(teamId: string): Promise<any[]> {
        return await this.af.collection('users', (ref) => ref.where('teamId', '==', teamId))
            .valueChanges()
            .pipe(
                first()
            ).toPromise();
    }

    addPlayer(playerDetails: IPlayer): Promise<any> {
        return new Promise((resolve, reject) => {
            const playerId = uuid();
            const modifiedPlayer = { ...playerDetails, playerId };
            this.af.collection('users').add(modifiedPlayer).then((data) => {
                resolve(data);
            }).catch((err) => {
                reject(err);
            });
        });
    }

    async getPlayerDetailsById(teamId: string, playerId: string): Promise<any> {
        return await this.af.collection('users', (ref) => ref.where('teamId', '==', teamId).where('playerId', '==', playerId))
            .valueChanges()
            .pipe(
                first()
            ).toPromise();
    }

    addSessionData(sessionDetails: ISession, playerList: IPlayer[]): Promise<IAddSessionResponse> {
        const promises = [];
        this.selectedPlayersList = [...playerList];
        return new Promise((resolve, reject) => {
            this.startNewSession(sessionDetails).then((sessionId) => {
                console.log(sessionId);
                promises.push(this.addSessionIdsToCollection('teams', 'teamId', sessionDetails.teamId, sessionId));
                sessionDetails.playerIds.forEach(playerId => {
                    promises.push(this.addSessionIdsToCollection('users', 'playerId', playerId, sessionId));
                });
                Promise.all(promises).then(() => {
                    resolve({
                        action: 'success',
                        sessionId
                    });
                }).catch((err) => {
                    reject({
                        action: 'failure'
                    });
                });
            });
        });
    }

    async startNewSession(sessionDetails: ISession) {
        const sessionId = uuid();
        const modifiedSession = { ...sessionDetails, sessionId };
        const newData = await this.af.collection('sessions').add(modifiedSession);
        const updatedData = await newData.set({sessionId: newData.id}, { merge: true });
        return newData.id;
    }

    addSessionIdsToCollection(collectionName: string, queryString: string, queryStringValue: string, sessionId: string) {
        const data = firebase.firestore().collection(collectionName).where(queryString, '==', queryStringValue).get();
        data.then((snapshot) => {
            snapshot.forEach((document) => {
                document.ref.set({
                    sessionIds: firebase.firestore.FieldValue.arrayUnion(sessionId)
                }, { merge: true });
            });
        });
    }

    addActionToSession(sessionId: string, action: ISessionAction): Promise<any> {
        return new Promise((resolve, reject) => {
            const currentDoc = firebase.firestore().collection('sessions').doc(sessionId);
            const updatedDoc = currentDoc.set({
                action: firebase.firestore.FieldValue.arrayUnion(action),
            }, { merge: true });
            updatedDoc.then((data) => {
                resolve('success');
            }).catch((err) => {
                reject(err);
            });
        });
    }

}
