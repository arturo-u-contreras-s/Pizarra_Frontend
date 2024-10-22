import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { HomeScreenComponent } from './home-screen/home-screen.component';


import { TeamManagerComponent } from './team-manager/team-manager.component';
import { ModifyTeamComponent } from './modify-team/modify-team.component';

import { SquadManagerComponent } from './squad-manager/squad-manager.component';

import { SquadBuilderComponent } from './squad-builder/squad-builder.component';
import { SquadNavComponent } from './squad-nav/squad-nav.component';
import { SquadFormationComponent } from './squad-formation/squad-formation.component';
import { DynamicComponentLoaderComponent } from './dynamic-component-loader/dynamic-component-loader.component';
import { FourThreeThreeComponent } from './formations/four-three-three/four-three-three.component';
import { FourFourTwoComponent } from './formations/four-four-two/four-four-two.component';
import { FiveThreeTwoComponent } from './formations/five-three-two/five-three-two.component';
import { SubsReservesComponent } from './subs-reserves/subs-reserves.component';
import { SquadCardComponent } from './squad-card/squad-card.component';
import { PositionSwapComponent } from './position-swap/position-swap.component';
import { AvailablePlayersComponent } from './available-players/available-players.component';
import { PlayerLibraryCardComponent } from './player-library-card/player-library-card.component';

import { PlayersComponent } from './players/players.component';
import { PlayerEntryComponent } from './player-entry/player-entry.component';
import { PlayerCardComponent } from './player-card/player-card.component';
import { ModifyPlayerComponent } from './modify-player/modify-player.component';
import { PositionSelectorComponent } from './position-selector/position-selector.component';

import { TeamSelectorComponent } from './team-selector/team-selector.component';
import { FilterPlayersNavComponent } from './filter-players-nav/filter-players-nav.component';


import {HttpClientModule} from '@angular/common/http';

import { TeamCrudService } from './Services/team-crud.service';
import { PlayerCrudService } from './Services/player-crud.service';
import { FormationSelectorService } from './Services/formation-selector.service';
import { SquadCrudService } from './Services/squad-crud.service';
import { SbLibrarySwapService } from './Services/sb-library-swap.service';
import { PlayerPositionCrudService } from './Services/player-position-crud.service';


const appRoutes: Routes = [
  {path: 'teams', component: TeamManagerComponent},
  {path: 'players', component: PlayersComponent },
  {path: 'squads', component: SquadManagerComponent},
  {path: 'squad-builder', component: SquadBuilderComponent},
  {path: '**', component: HomeScreenComponent} // '**' WILDCARD ROUTE: SHOULD ALWAYS BE LAST!
]

@NgModule({
  declarations: [
    AppComponent,

    NavComponent,

    HomeScreenComponent,

    TeamManagerComponent,
    ModifyTeamComponent,

    SquadManagerComponent,

    SquadBuilderComponent,
    SquadNavComponent,
    SquadFormationComponent,
    DynamicComponentLoaderComponent,
    FourThreeThreeComponent,
    FourFourTwoComponent,
    FiveThreeTwoComponent,
    SubsReservesComponent,
    SquadCardComponent,
    PositionSwapComponent,
    AvailablePlayersComponent,
    PlayerLibraryCardComponent,

    PlayersComponent,
    PlayerEntryComponent,
    PlayerCardComponent,
    ModifyPlayerComponent,
    PositionSelectorComponent,

    TeamSelectorComponent,
    FilterPlayersNavComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    TeamCrudService,
    PlayerCrudService,
    SquadCrudService,
    PlayerPositionCrudService,

    FormationSelectorService,
    SbLibrarySwapService,
  ],
  bootstrap: [AppComponent] /* 2. Goes to app.component.ts */
})
export class AppModule {
}