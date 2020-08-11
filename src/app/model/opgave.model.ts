import { CalendarEventAction } from 'angular-calendar';
import { startOfDay, endOfDay } from 'date-fns';
import { Time } from '@angular/common';
import {DatePipe} from '@angular/common';
import Timestamp = firestore.Timestamp;
import { firestore } from 'firebase/app';


export class Opgave {
    formType: number;
    id: string;
    title: string;
    notes: string;
    start: Timestamp; // Jeg har skiftet fra Date til Timestamp hvis der opstår problemer skift tilbage
    end?: Timestamp; // Jeg har skiftet fra Date til Timestamp hvis der opstår problemer skift tilbage
    completed: boolean;
    starred: boolean;
    important: boolean;
    deleted: boolean; 
    tags: [
        {
            'id': number,
            'name': string,
            'label': string,
            'color': string
        }
        ];

    endtime: Time;
 //   title: string;
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
     * @param opgave
     */

     // På event modellen hedder det "data" istedet for "opgave"
    constructor(opgave?)
    {
        {  
     opgave = opgave || {};
            this.formType = opgave.formType;
            this.id = opgave.id;
            this.title = opgave.title;
            this.notes = opgave.notes;
    
      // virker ikke       this.start =  new Date(opgave.start.toDate()); 
      this.start = opgave.start;
        this.end = opgave.end;
           
        //     this.start = new Date(opgave.start) || startOfDay(new Date());
        //   this.end = new Date(opgave.end) || endOfDay(new Date());
      
            this.completed = opgave.completed;
            this.starred = opgave.starred;
            this.important = opgave.important;
            this.deleted = opgave.deleted;
            this.tags = opgave.tags || [];
       
            this.color = {
                primary  : opgave.color && opgave.color.primary || '#1e90ff',
                secondary: opgave.color && opgave.color.secondary || '#D1E8FF'
            };
            this.draggable = opgave.draggable;
            this.resizable = {
                beforeStart: opgave.resizable && opgave.resizable.beforeStart || true,
                afterEnd   : opgave.resizable && opgave.resizable.afterEnd || true
            };
            this.actions = opgave.actions || [];
            this.allDay = opgave.allDay || false;
            this.cssClass = opgave.cssClass || '';
            this.meta = {
                location: opgave.meta && opgave.meta.location || '',
                notes   : opgave.meta && opgave.meta.notes || ''
            };
        }
    }

}
