import { ITeam } from './teams.interface';

export interface ICoachDetails {
    activeYears?: number;
    coachId: string;
    displayName: string;
    emailId: string;
    fullName: string;
    phoneNumber?: string;
    teamId: string;
    teamsManaged?: string[];
    currentManagingPlayers?: string[];
    sessionIds?: string[];
}

export interface IManageTeamDetails {
    userDetails: ICoachDetails;
    teamDetails: ITeam[];
}
