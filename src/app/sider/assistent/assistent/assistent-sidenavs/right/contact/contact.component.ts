import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { ChattestService } from '../../../../../../services/chattest.service';

@Component({
    selector     : 'assistent-contact-sidenav',
    templateUrl  : './contact.component.html',
    styleUrls    : ['./contact.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class AssistentContactSidenavComponent implements OnInit, OnDestroy
{
    contact: any;

    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {ChatService} _chatService
     */
    constructor(
        private _chatService: ChattestService
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
        this._chatService.onContactSelected
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(contact => {
                this.contact = contact;
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
