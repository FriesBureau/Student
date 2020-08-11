import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { fuseAnimations } from '../../../../animations/animations';

@Component({
    selector     : 'assistent-start',
    templateUrl  : './assistent-start.component.html',
    styleUrls    : ['./assistent-start.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class AssistentStartComponent
{
    constructor()
    {
    }
}
