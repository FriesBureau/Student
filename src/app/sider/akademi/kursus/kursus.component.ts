import { AfterViewInit, ChangeDetectorRef, Component, OnDestroy, OnInit, QueryList, ViewChildren, ViewEncapsulation } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { fuseAnimations } from '../../../animations/animations';
import { AuthService } from '../../../services/auth.service';
import { KursusService } from '../../../services/kursus.service';

@Component({
  selector: 'app-kursus',
  templateUrl: './kursus.component.html',
  styleUrls: ['./kursus.component.scss'],
 // encapsulation: ViewEncapsulation.None,
  animations   : fuseAnimations
})

export class KursusComponent implements OnInit, OnDestroy, AfterViewInit
{
    animationDirection: 'left' | 'right' | 'none';
    kursus: any;
    kursusStepContent: any;
    currentStep: number;


    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {KursusService} _academyCourseService
     * @param {ChangeDetectorRef} _changeDetectorRef
     * @param {FuseSidebarService} _fuseSidebarService
     */
    constructor(
        private _academyCourseService: KursusService,
        public auth: AuthService,
        private _changeDetectorRef: ChangeDetectorRef    )
    {
        // Set the defaults
        this.animationDirection = 'none';
        this.currentStep = 0;

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
        // Subscribe to courses
        this._academyCourseService.onKursusChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(kursus => {
                this.kursus = kursus;
            });
    }

    /**
     * After view init
     */
    ngAfterViewInit(): void
    {

 /*
        this.courseStepContent = this.fuseScrollbarDirectives.find((fuseScrollbarDirective) => {
            return fuseScrollbarDirective.elementRef.nativeElement.id === 'course-step-content';
        }); */
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
     * Go to step
     *
     * @param step
     */
    gotoStep(step): void
    {
        // Decide the animation direction
        this.animationDirection = this.currentStep < step ? 'left' : 'right';

        // Run change detection so the change
        // in the animation direction registered
        this._changeDetectorRef.detectChanges();

        // Set the current step
        this.currentStep = step;
    }

    /**
     * Go to next step
     */
    gotoNextStep(): void
    {
        if ( this.currentStep === this.kursus.totalSteps - 1 )
        {
            return;
        }

        // Set the animation direction
        this.animationDirection = 'left';

        // Run change detection so the change
        // in the animation direction registered
        this._changeDetectorRef.detectChanges();

        // Increase the current step
        this.currentStep++;
    }

    /**
     * Go to previous step
     */
    gotoPreviousStep(): void
    {
        if ( this.currentStep === 0 )
        {
            return;
        }

        // Set the animation direction
        this.animationDirection = 'right';

        // Run change detection so the change
        // in the animation direction registered
        this._changeDetectorRef.detectChanges();

        // Decrease the current step
        this.currentStep--;
    }

}
