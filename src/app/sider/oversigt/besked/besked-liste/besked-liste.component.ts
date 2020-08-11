import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Besked } from '../../../../model/besked.model';
import { BeskedService } from '../../../../services/besked.service';

@Component({
    selector       : 'besked-liste',
    templateUrl    : './besked-liste.component.html',
    styleUrls      : ['./besked-liste.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation  : ViewEncapsulation.None
})
export class BeskedListeComponent
{
    @Input()
    beskeder: Besked[];

    @Input()
    currentBesked: Besked[];

    /**
     * Constructor
     *
     * @param {ActivatedRoute} _activatedRoute
     * @param {BeskedService} _beskedService
     * @param {Router} _router
     */
    constructor(
        private _activatedRoute: ActivatedRoute,
        private _beskedService: BeskedService,
        private _router: Router
    )
    {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Read Besked
     *
     * @param beskedId
     */
    readBesked(beskedId): void
    {
        const labelHandle  = this._activatedRoute.snapshot.params.labelHandle,
              filterHandle = this._activatedRoute.snapshot.params.filterHandle,
              folderHandle = this._activatedRoute.snapshot.params.folderHandle;

        if ( labelHandle )
        {
            this._router.navigate(['beskeder/label/' + labelHandle + '/' + beskedId]);
        }
        else if ( filterHandle )
        {
            this._router.navigate(['beskeder/filter/' + filterHandle + '/' + beskedId]);
        }
        else
        {
            this._router.navigate(['beskeder/' + folderHandle + '/' + beskedId]);
        }
    }
}
