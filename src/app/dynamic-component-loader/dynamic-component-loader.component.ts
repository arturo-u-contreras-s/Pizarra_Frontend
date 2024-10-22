/*
WORKS WITH FormationSelectorService TO LOAD THE FORMATION SKELETON SELECTED BY THE USER
*/
import { Component, AfterViewInit, OnDestroy, ViewChild, ViewContainerRef, ComponentFactoryResolver, ComponentRef } from '@angular/core';
import { Subscription } from 'rxjs';

import { FourThreeThreeComponent } from '../formations/four-three-three/four-three-three.component';
import { FourFourTwoComponent } from '../formations/four-four-two/four-four-two.component';
import { FiveThreeTwoComponent } from '../formations/five-three-two/five-three-two.component';

import { FormationSelectorService } from '../Services/formation-selector.service';

@Component({
  selector: 'dynamic-component-loader',
  templateUrl: './dynamic-component-loader.component.html',
  styleUrls: ['./dynamic-component-loader.component.css']
})
export class DynamicComponentLoaderComponent implements AfterViewInit, OnDestroy {
  @ViewChild('dynamicComponentContainer', { read: ViewContainerRef }) dynamicComponentContainer: ViewContainerRef;

  private componentRef: ComponentRef<any>;

  constructor (private componentFactoryResolver: ComponentFactoryResolver, private formationSelectorService: FormationSelectorService) {}

  private subscription: Subscription = new Subscription();

  ngAfterViewInit(): void {
    this.subscription = this.formationSelectorService.selectedFormationGetter.subscribe(
      (selectedFormation: string) => {
        this.loadFormation(selectedFormation);
        console.log("SELECTED FORMATION SERVICE: " + selectedFormation);
      }
    );
  }

  private formationMapper = {
    'four-three-three-comp': FourThreeThreeComponent,
    'four-four-two-comp': FourFourTwoComponent,
    'five-three-two': FiveThreeTwoComponent
  };

  private loadFormation(formationName: string) {
    const formationComponent = this.formationMapper[formationName];
    if (!formationComponent) {
      throw new Error(`Component ${formationName} not found in componentMapping`);
    }
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(formationComponent);
    this.dynamicComponentContainer.clear();
    this.componentRef = this.dynamicComponentContainer.createComponent(componentFactory);
  }

  ngOnDestroy(): void {
    if (this.componentRef) {
      this.componentRef.destroy();
    }
    this.subscription.unsubscribe();
  }
}
