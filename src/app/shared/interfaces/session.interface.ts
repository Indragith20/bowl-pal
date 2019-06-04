import { IPlayer } from './player.interface';

export interface ISession {
    sessionId?: string;
    playerIds?: string[];
    recordedBy?: string;
    action?: ISessionAction[];
    time?: string;
    teamId?: string;
}

export interface ISessionAction {
    actionType?: string;
    playerId?: string;
    batsmenType?: string;
    recordedTime?: string;
    ballLine?: string;
}

export interface IAddSessionResponse {
    action?: string;
    sessionId?: string;
}

export interface ISessionResolverData {
    sessionId: string;
    playersList?: IPlayer[];
}