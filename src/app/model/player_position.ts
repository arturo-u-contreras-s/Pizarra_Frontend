/*
NECESSARY FOR SQUAD BUILDER.
WHEN A SQUAD IS SAVED, PLAYER POSITIONS KEEP TRACK OF THE PLAYERS ADDED TO THE SQUAD AND WHERE THEY WERE POSITIONED.
*/
import { Squad } from './squad';
export class PlayerPosition{
  playerPositionId: number;
  playerId: number;
  squadPosition: number;
  squad: Squad;
}