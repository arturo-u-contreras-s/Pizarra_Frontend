/*
A PLAYER THAT CAN BE ADDED TO THE CLUB
*/
import { Team } from '../model/team';
export class Player{
  playerId: number;
  firstName: string;
  lastName: string;
  preferredName: string;
  kitNumber: number;

  active: boolean;
  legend: boolean;

  position: string;
  team: Team;
  image: string;
  
  birthDate: string;
  joinDate: string;
  releaseDate: string;
}