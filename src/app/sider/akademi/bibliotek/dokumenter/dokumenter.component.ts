import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { fuseAnimations } from '../../../../animations/animations';

import { DokumenterService } from '../../../../services/dokumenter.service';

@Component({
  selector: 'app-dokumenter',
  templateUrl: './dokumenter.component.html',
  styleUrls: ['./dokumenter.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class DokumenterComponent implements OnInit, OnDestroy
{
    selected: any;
    pathArr: string[];
    isSliderShown: boolean = true ; 

    // Private
    private _unsubscribeAll: Subject<any>;

   
    constructor(
        private dokumenterservice: DokumenterService,
    )
    {
        // Set the private defaults
        this._unsubscribeAll = new Subject();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
        this.dokumenterservice.onFileSelected
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(selected => {
            this.selected = selected;
            this.pathArr = selected.path.split('>');
        });
    }


    toggleSliderShow() {

        this.isSliderShown = ! this.isSliderShown;
        
        }
        toggleSliderHide() {
  
          this.isSliderShown = false;
          
          }

    /**
     * On destroy
     */
    ngOnDestroy(): void
    {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

}

