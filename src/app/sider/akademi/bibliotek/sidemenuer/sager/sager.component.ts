import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { fuseAnimations } from '../../../../../animations/animations';

import { DokumenterService } from '../../../../../services/dokumenter.service';
import { AudioService } from '../../../../../services/audio.service';


@Component({
  selector: 'app-sager',
  templateUrl: './sager.component.html',
  styleUrls: ['./sager.component.scss'],
    animations : fuseAnimations
})
export class SagerComponent implements OnInit, OnDestroy
{
    selected: any;
 

    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {FileManagerService} _fileManagerService
     */
    constructor(
        private dokumenterservice: DokumenterService,
        private audio: AudioService
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
            });
    }

    playStream(url) {
        this.audio.playStream(url)
        .subscribe(events => {
          // listening for fun here
        });
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
}
