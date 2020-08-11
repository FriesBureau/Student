import { AfterContentInit, Component, ContentChildren, ElementRef, HostBinding, QueryList, Renderer2, ViewEncapsulation } from '@angular/core';
import { FuseWidgetToggleDirective } from './widget-toggle.directive';

import { fuseAnimations } from '../../../animations/animations';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { UdviklingService } from '../../../services/udvikling.service';

import { SharedModule } from '../../../shared/shared.module';
import { DataSource } from '@angular/cdk/collections';
import { BehaviorSubject, Observable } from 'rxjs';
import * as shape from 'd3-shape';
import { OversigtService } from '../../../services/oversigt.service';

@Component({
    selector     : 'fuse-widget',
  templateUrl: './widgets.component.html',
  styleUrls: ['./widgets.component.scss'],
    encapsulation: ViewEncapsulation.None
})

export class WidgetsComponent implements AfterContentInit
{
    @HostBinding('class.flipped')
    flipped = false;

    @ContentChildren(FuseWidgetToggleDirective, {descendants: true})
    toggleButtons: QueryList<FuseWidgetToggleDirective>;

    /**
     * Constructor
     *
     * @param {ElementRef} _elementRef
     * @param {Renderer2} _renderer
     */
    constructor(
        private _elementRef: ElementRef,
        private _renderer: Renderer2
    )
    {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * After content init
     */
    ngAfterContentInit(): void
    {
        // Listen for the flip button click
        setTimeout(() => {
            this.toggleButtons.forEach(flipButton => {
                this._renderer.listen(flipButton.elementRef.nativeElement, 'click', (event) => {
                    event.preventDefault();
                    event.stopPropagation();
                    this.toggle();
                });
            });
        });
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Toggle the flipped status
     */
    toggle(): void
    {
        this.flipped = !this.flipped;
    }

}
