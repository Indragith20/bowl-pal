export interface IPlayer {
    firstName?: string;
    lastName?: string;
    displayName?: string;
    age?: number;
    addedBy?: string;
    competencyLevel?: string;
    emailId: string;
    hand: string;
    height?: string;
    playerId: string;
    phoneNumber?: string;
    representationalLevel?: string;
    role?: string;
    bowlerType?: string;
    weight?: string;
    coachId?: string;
    teamId?: string;
    spinnerType?: string;
    sessionIds?: string[];
}

export interface IPlayerSelection extends IPlayer {
    selected: boolean;
}
