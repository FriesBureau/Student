import { Component, HostBinding, Input, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { Opgave } from '../../../../../model/opgave.model';
import { OpgaveService } from '../../../../../services/opgave.service';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'opgave-liste-item',
  templateUrl: './opgave-liste-item.component.html',
  styleUrls: ['./opgave-liste-item.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class OpgaveListeItemComponent implements OnInit, OnDestroy
{
    tags: any[];
    

    @Input()
    opgave: Opgave;

    @HostBinding('class.selected')
    selected: boolean;

    @HostBinding('class.completed')
    completed: boolean;

    @HostBinding('class.move-disabled')
    moveDisabled: boolean;

    // Private
    private _unsubscribeAll: Subject<any>;


    constructor(
        private opgaveservice: OpgaveService,
        private _activatedRoute: ActivatedRoute
    )
    {
        // Disable move if path is not /all
        if ( _activatedRoute.snapshot.url[0].path !== 'all' )
        {
            this.moveDisabled = true;
        }

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
        // Set the initial values
        this.opgave = new Opgave(this.opgave);
        this.completed = this.opgave.completed;

        // Subscribe to update on selected todo change
        this.opgaveservice.onSelectedOpgaverChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(selectedOpgaver => {
                this.selected = false;

                if ( selectedOpgaver.length > 0 )
                {
                    for ( const opgave of selectedOpgaver )
                    {
                        if ( opgave.id === this.opgave.id )
                        {
                            this.selected = true;
                            break;
                        }
                    }
                }
            });

        // Subscribe to update on tag change
        this.opgaveservice.onTagsChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(tags => {
                this.tags = tags;
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

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * On selected change
     */
    onSelectedChange(): void
    {
        this.opgaveservice.toggleSelectedOpgave(this.opgave.id);
    } 
}
