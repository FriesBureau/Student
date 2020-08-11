import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CalendarEvent } from 'angular-calendar';
import { KalenderService } from '../../../../services/kalender.service';

import { MatColors } from '../../../../mat-colors';

import { Event } from '../../../../model/event.model';

@Component({
    selector     : 'calendar-event-form-dialog',
    templateUrl  : './event-form.component.html',
    styleUrls    : ['./event-form.component.scss'],
    encapsulation: ViewEncapsulation.None
})

export class EventFormComponent
{
    action: string;
    event: CalendarEvent;
    eventForm: FormGroup;
    dialogTitle: string;
    presetColors = MatColors.presets;

    /**
     * Constructor
     *
     * @param {MatDialogRef<EventFormComponent>} matDialogRef
     * @param _data
     * @param {FormBuilder} _formBuilder
     */
    constructor(
        public matDialogRef: MatDialogRef<EventFormComponent>,
        @Inject(MAT_DIALOG_DATA) private _data: any,
        private _formBuilder: FormBuilder,
        private kalenderservice: KalenderService
    )
    {
        this.event = _data.event;
        this.action = _data.action;

        if ( this.action === 'edit' )
        {
            this.dialogTitle = this.event.title;
        }
        else
        {
            this.dialogTitle = 'New Event';
            this.event = new Event({
                start: _data.date,
                end  : _data.date
            });
        }

        this.eventForm = this.createEventForm();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Create the event form
     *
     * @returns {FormGroup}
     */
    createEventForm(): FormGroup
    {
        return new FormGroup({
            title : new FormControl(this.event.title),
            start : new FormControl(this.event.start),
            end   : new FormControl(this.event.end),
            allDay: new FormControl(this.event.allDay),
            color : this._formBuilder.group({
                primary  : new FormControl(this.event.color.primary),
                secondary: new FormControl(this.event.color.secondary)
            }),
            meta  :
                this._formBuilder.group({
                    location: new FormControl(this.event.meta.location),
                    notes   : new FormControl(this.event.meta.notes)
                })
        });
    }

//    deleteUserEvent = data => this.kalenderservice.deleteUserCalenderData(data);

}
