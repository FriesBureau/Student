import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Subject, Observable } from 'rxjs';
import { startOfDay, isSameDay, endOfDay, isSameMonth } from 'date-fns';
import { CalendarEvent, CalendarEventAction, CalendarEventTimesChangedEvent, CalendarMonthViewDay } from 'angular-calendar';

import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { fuseAnimations } from '../../../animations/animations';
import { AuthService } from '../../../services/auth.service';
import { KalenderService } from '../../../services/kalender.service';
import { Event } from '../../../model/event.model';
import { EventFormComponent } from './event-form/event-form.component';
import { map, filter, switchMap} from 'rxjs/operators';

import { combineLatest, BehaviorSubject, of } from 'rxjs';
import { Router } from '@angular/router';
import { firestore } from 'firebase/app';
import { tap } from 'rxjs/operators';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument,
  QueryDocumentSnapshot
 } from '@angular/fire/firestore';

 import { AngularFireAuth } from '@angular/fire/auth';


//  import {createEvent, download} from '../../../utils/createicsevent'


@Component({
  selector: 'app-kalender', 
  templateUrl: './kalender.component.html',
  styleUrls: ['./kalender.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class KalenderComponent implements OnInit
{
    actions: CalendarEventAction[];
    activeDayIsOpen: boolean;
    confirmDialogRef: MatDialogRef<ConfirmDialogComponent>;
    dialogRef: any;
    events$;
    events: CalendarEvent[];
    refresh: Subject<any> = new Subject();
    selectedDay: any;
    view: string;
    viewDate: Date;

    

    constructor(
        private auth: AuthService,
        private kalenderservice: KalenderService,
        private _matDialog: MatDialog,
        private _calendarService: KalenderService,
        private afs: AngularFirestore
    )
    {
        // Set the defaults

    

        this.view = 'month';
        this.viewDate = new Date();
        this.activeDayIsOpen = true;
        this.selectedDay = {date: startOfDay(new Date())};

        this.actions = [
            {
                label  : '<i class="material-icons s-16">edit</i>',
                onClick: ({event}: { event: CalendarEvent }): void => {
                    this.editEvent('edit', event);
                }
            },
            {
                label  : '<i class="material-icons s-16">delete</i>',
                onClick: ({event}: { event: CalendarEvent }): void => {
                    this.deleteEvent(event);
                }
            }
        ];

        /**
         * Get events from service/server
         */
        this.setEvents();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
        /**
         * Watch re-render-refresh for updating db
         */

      //    this.events$ = this.kalenderservice.getData();

      this.events$ = this.kalenderservice.getUserCalendarData();

        this.refresh.subscribe(updateDB => {
            if ( updateDB )
            {
                this._calendarService.updateEvents(this.events);
            }
        });

        this._calendarService.onEventsUpdated.subscribe(events => {
            this.setEvents();
            this.refresh.next();
        });
    }


    // Original

     setEvents(): void
    {
      
    }
 
  

    /**
     * Before View Renderer
     *
     * @param {any} header
     * @param {any} body
     */
    beforeMonthViewRender({header, body}): void
    {
        /**
         * Get the selected day
         */
        const _selectedDay = body.find((_day) => {
            return _day.date.getTime() === this.selectedDay.date.getTime();
        });

        if ( _selectedDay )
        {
            /**
             * Set selected day style
             * @type {string}
             */
            _selectedDay.cssClass = 'cal-selected';
        }

    }

    /**
     * Day clicked
     *
     * @param {MonthViewDay} day
     */
    dayClicked(day: CalendarMonthViewDay): void
    {
        const date: Date = day.date;
        const events: CalendarEvent[] = day.events;

        if ( isSameMonth(date, this.viewDate) )
        {
            if ( (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) || events.length === 0 )
            {
                this.activeDayIsOpen = false;
            }
            else
            {
                this.activeDayIsOpen = true;
                this.viewDate = date;
            }
        }
        this.selectedDay = day;
        this.refresh.next();
    }

    /**
     * Event times changed
     * Event dropped or resized
     *
     * @param {CalendarEvent} event
     * @param {Date} newStart
     * @param {Date} newEnd
     */
    eventTimesChanged({event, newStart, newEnd}: CalendarEventTimesChangedEvent): void
    {
        event.start = newStart;
        event.end = newEnd;
        this.refresh.next(true);
    }

    /**
     * Delete Event
     *
     * @param event
     */



 
    deleteEvent(data): void
    {
        this.confirmDialogRef = this._matDialog.open(ConfirmDialogComponent, {
            disableClose: false
        });

        this.confirmDialogRef.componentInstance.confirmMessage = 'Are you sure you want to delete?';

        this.confirmDialogRef.afterClosed().subscribe(result => {
            if ( result )
            {
                  const kalenderId = "8FUKwa5fARjZlWo0eIlt";
                  alert(kalenderId);
                this.kalenderservice.deleteUserCalenderData(kalenderId);
        
               

               // const eventIndex = this.events.indexOf(event);
               // this.events.splice(eventIndex, 1);
              //  this.refresh.next(true);
            }
            this.confirmDialogRef = null;
        });
    }
   

    /**
     * Edit Event
     *
     * @param {string} action
     * @param {CalendarEvent} event
     */
    editEvent(action: string, event: CalendarEvent): void
    {
    //    const eventIndex = this.events.indexOf(this.events);

        this.dialogRef = this._matDialog.open(EventFormComponent, {
            panelClass: 'event-form-dialog',
            data      : {
                event : event,
                action: action
            }
        });

        this.dialogRef.afterClosed()
            .subscribe(response => {
                if ( !response )
                {
                    return;
                }
                const actionType: string = response[0];
                const formData: FormGroup = response[1];
                switch ( actionType )
                {
                    /**
                     * Save
                     */

                     
                    case 'save':

                        const savekalenderId = event.id;

// this.events[eventIndex] = Object.assign(this.events[eventIndex], formData.getRawValue());
// this.events = Object.assign(this.events, formData.getRawValue());

const updateEvent = formData.getRawValue();
// alert(updateEvent.end);

this.kalenderservice.update(savekalenderId, updateEvent);

 
                     //   this.refresh.next(true);

                        break;
                    /**
                     * Delete
                     */
                    case 'delete':

                        const deletekalenderId = event.id;
                  // this.deleteEvent(event);

              
                this.kalenderservice.deleteUserCalenderData(deletekalenderId);



                        break;

                           /**
                     * Delete
                     */
                    case 'download':

                        const downloadEvent = event.id;
                  // this.deleteEvent(event);
alert(event.start);


this.createEvent = (events: {
    start: Date,
    end?: Date,
    summary: string,
    description?: string,
    location?: string, 
    url?: string
  }[]) => {
    const formatDate = (date: Date): string => {
      if (!date) {
        return ''
      }
      // don't use date.toISOString() here, it will be always one day off (cause of the timezone)
      const day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
      const month = date.getMonth() < 9 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1)
      const year = date.getFullYear()
      const hour = date.getHours() < 10 ? '0' + date.getHours() : date.getHours()
      const minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
      const seconds = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()
      return `${year}${month}${day}T${hour}${minutes}${seconds}`
    }
    let VCALENDAR = `BEGIN:VCALENDAR
PRODID:-//Events Calendar//HSHSOFT 1.0//DE
VERSION:2.0
`
  
    for (const event of events) {
      const timeStamp = formatDate(new Date())
      const uuid = `${timeStamp}FB-Student`
      /**
       * Don't ever format this string template!!!
       */
const EVENT=`BEGIN:VEVENT
DTSTAMP:${timeStamp}Z
DTSTART:${formatDate(event.start)}
DTEND:${formatDate(event.end)}
SUMMARY:${event.summary}
DESCRIPTION:${event.description}
LOCATION:${event.location}
URL:${event.url}
UID:${uuid}
END:VEVENT`
VCALENDAR += `${EVENT}
`
    }
VCALENDAR += `END:VCALENDAR`
  
return VCALENDAR
  }


  this.download = (filename, text) => {
    const element = document.createElement('a')
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text))
    element.setAttribute('download', filename)
    element.setAttribute('target', '_blank')
    element.style.display = 'none'
    element.click()
      }
      
    
     
      this.createicsevents = [{
        start: event.start,
        end: event.end,
        summary: event.title,
        description: event.meta.notes,
        location: event.meta.location,
        url: 'https://student.friesbureau.dk'
      }
      /*
      {
        start: new Date(),
        end: new Date('2020-01-01'),
        summary: '2ter Termin vorhanden',
        description: 'Beskrivelse...',
        location: 'Copenhagen',
        url: 'https://student.friesbureau.dk'
      } */
    ]
      this.icscontent = this.createEvent(this.createicsevents);
    
     
        this.download('task.ics', this.icscontent);
    
    
              
             //   this.kalenderservice.deleteUserCalenderData(deletekalenderId);

                break;

                }
            });
    }

//    deleteEvent = data => this.kalenderservice.deleteUserCalenderData(data);

createEvent = (events: {
    start: Date,
    end?: Date,
    summary: string,
    description?: string,
    location?: string, 
    url?: string
  }[]) => {
    const formatDate = (date: Date): string => {
      if (!date) {
        return ''
      }
      // don't use date.toISOString() here, it will be always one day off (cause of the timezone)
      const day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
      const month = date.getMonth() < 9 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1)
      const year = date.getFullYear()
      const hour = date.getHours() < 10 ? '0' + date.getHours() : date.getHours()
      const minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
      const seconds = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()
      return `${year}${month}${day}T${hour}${minutes}${seconds}`
    }
    let VCALENDAR = `BEGIN:VCALENDAR
PRODID:-//Events Calendar//HSHSOFT 1.0//DE
VERSION:2.0
`
  
    for (const event of events) {
      const timeStamp = formatDate(new Date())
      const uuid = `${timeStamp}FB-Student`
      /**
       * Don't ever format this string template!!!
       */
const EVENT=`BEGIN:VEVENT
DTSTAMP:${timeStamp}Z
DTSTART:${formatDate(event.start)}
DTEND:${formatDate(event.end)}
SUMMARY:${event.summary}
DESCRIPTION:${event.description}
LOCATION:${event.location}
URL:${event.url}
UID:${uuid}
END:VEVENT`
VCALENDAR += `${EVENT}
`
    }
VCALENDAR += `END:VCALENDAR`
  
return VCALENDAR
  }
  
download = (filename, text) => {
const element = document.createElement('a')
element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text))
element.setAttribute('download', filename)
element.setAttribute('target', '_blank')
element.style.display = 'none'
element.click()
  }
  

 
  createicsevents = [{
    start: new Date(),
    end: new Date(),
    summary: 'Ein Termin vorhanden',
    description: 'Da geht es um diesen Sachverhalt\n und auch um diesen hier...',
    location: 'Berlin Mitte',
    url: 'https://www.mydomain.de'
  },
  {
    start: new Date(),
    end: new Date('2020-01-01'),
    summary: '2ter Termin vorhanden',
    description: 'Der ist länger... und es geht es um diesen Sachverhalt\n und auch um diesen hier...',
    location: 'Berlin Prenzlauer Berg',
    url: 'https://www.yourdomain.de'
  }]
  icscontent = this.createEvent(this.createicsevents)

  downloadicsevent() {
    this.download('test.ics', this.icscontent)
  }

    

    /**
     * Add Event
     */
    addEvent(): void
    {
        this.dialogRef = this._matDialog.open(EventFormComponent, {
            panelClass: 'event-form-dialog',
            data      : {
                action: 'new',
                date  : this.selectedDay.date
            }
        });
        this.dialogRef.afterClosed()
            .subscribe((response: FormGroup) => {
                if ( !response )
                {
                    return;
                }
                const newEvent = response.getRawValue();

           
            //    newEvent.actions = this.actions;

                this.kalenderservice.create(newEvent);

                //   this.kalenderservice.createUserCalendarEvent();

             //   this.events$.push(newEvent);
              //  this.refresh.next(true);
            });
    }


}


