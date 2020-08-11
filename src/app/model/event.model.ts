 import { CalendarEventAction } from 'angular-calendar';
import { startOfDay, endOfDay } from 'date-fns';
import { Time } from '@angular/common';

export class Event 
{
    start: Date;
    end?: Date;
    endtime: Time;
    title: string;
    color: {
        primary: string;
        secondary: string;
    };
    actions?: CalendarEventAction[]; 
    allDay?: boolean;
    cssClass?: string;
    resizable?: {
        beforeStart?: boolean;
        afterEnd?: boolean;
    };
    draggable?: boolean;
    meta?: {
        location: string,
        notes: string
    };

    /**
     * Constructor
     *
     * @param data
     */
    constructor(data?)
    {
        data = data || {};
    //    this.start = new Date(data.start) || startOfDay(new Date());
    this.start = data.start;
        this.end = new Date(data.end) || endOfDay(new Date());
        this.title = data.title || '';
        this.color = {
            primary  : data.color && data.color.primary || '#1e90ff',
            secondary: data.color && data.color.secondary || '#D1E8FF'
        };
        this.draggable = data.draggable;
        this.resizable = {
            beforeStart: data.resizable && data.resizable.beforeStart || true,
            afterEnd   : data.resizable && data.resizable.afterEnd || true
        };
        this.actions = data.actions || [];
        this.allDay = data.allDay || false;
        this.cssClass = data.cssClass || '';
        this.meta = {
            location: data.meta && data.meta.location || '',
            notes   : data.meta && data.meta.notes || ''
        };
    }
}
