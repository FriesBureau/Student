import { Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

import { Subject, Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { startOfDay, isSameDay, endOfDay, isSameMonth } from 'date-fns';
import { FuseUtils } from '../../../../utils';
import { fuseAnimations } from '../../../../animations/animations';
import { SharedModule } from '../../../../shared/shared.module';

import {DatePipe} from '@angular/common';
import { Opgave } from '../../../../model/opgave.model';
import { AuthService } from '../../../../services/auth.service';
import { OpgaveService } from '../../../../services/opgave.service';
import {formatDate} from '@angular/common';
import {Inject, LOCALE_ID, Pipe, PipeTransform} from '@angular/core';
import {firestore} from 'firebase/app';
import Timestamp = firestore.Timestamp;


@Component({
  selector: 'opgave-detaljer',
  templateUrl: './opgave-detaljer.component.html',
  styleUrls: ['./opgave-detaljer.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class OpgaveDetaljerComponent implements OnInit, OnDestroy, PipeTransform 
{
    opgave: Opgave;
    opgave$;
    tags: any[];
    formType: string;
    opgaveForm: FormGroup;
    placeholderStartdate : string;
   placeholderEnddate : string;
    minStartDate : Date;
   minEndDate : Date;
   nystart: Timestamp;
   nyend: Timestamp;
 

    @ViewChild('titleInput', {static: false})
    titleInputField;
 

    // Private
    private _unsubscribeAll: Subject<any>;

  
    constructor(
        private opgaveservice: OpgaveService,
        private _formBuilder: FormBuilder,
        public auth: AuthService,
        private datePipe: DatePipe
       
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
        // Subscribe to update the current todo

   
      

        this.opgaveservice.onCurrentOpgaveChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(([opgave, formType]) => {

                if ( opgave && formType === 'edit' )
                {

                 
                    this.formType = 'edit';
                   this.opgave = opgave;
                   
                    this.opgaveForm = this.createOpgaveForm();

           

                  this.opgaveForm.valueChanges
                        .pipe(
                            takeUntil(this._unsubscribeAll),
                            debounceTime(500),
                            distinctUntilChanged()
                        )
                        .subscribe(data => {
                        
            
           
                   // this.minStartDate = new Date();
                   //  this.minEndDate = new Date();
                     
                            this.opgaveservice.updateOpgave(data);
 
                         
              
                        });  
                }
            });

        // Subscribe to update on tag change
        this.opgaveservice.onTagsChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(labels => {
                this.tags = labels;
            });

        // Subscribe to update on tag change
        this.opgaveservice.onNewOpgaveClicked
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(() => {
                this.opgave = new Opgave({});
           //     this.opgave.id = FuseUtils.generateGUID();
                this.formType = 'new';
                this.opgaveForm = this.createOpgaveForm();
               // this.focusTitleField();
                this.opgaveservice.onCurrentOpgaveChanged.next([this.opgave, 'new']);
            });





    }

    transform(timestamp: Timestamp, format?: string): string {
        if (!timestamp || !timestamp.toDate) {
            return;
        }
        return formatDate(timestamp.toDate(), format || 'medium', 'da-DK');
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
     * Focus title field
     */
    focusTitleField(): void
    {
        setTimeout(() => {
            this.titleInputField.nativeElement.focus();
        });
    }

 
  

    /**
     * Create todo form
     *
     * @returns {FormGroup}
     */
    createOpgaveForm(): FormGroup
    {
        return this._formBuilder.group({
            formType :  [this.opgave.formType],
             id       : [this.opgave.id],
            title    : [this.opgave.title],
            notes    : [this.opgave.notes],
            start    : [this.opgave.start],
            end      : [this.opgave.end],
            completed: [this.opgave.completed],
            starred  : [this.opgave.starred],
            important: [this.opgave.important],
            deleted  : [this.opgave.deleted],
            tags     : [this.opgave.tags],
            allDay   : [this.opgave.allDay],
            meta   : [this.opgave.meta],
            color   : [this.opgave.color],

        });
    }

    getICS()  {

    // this.deleteEvent(event);


// const datePipe = new DatePipe('en-US');
// Virker ikke uden toDate() inden da const myFormattedDate = datePipe.transform(this.opgave.start);

// Virker heller ikke let date = this.datePipe.transform(test.toDate(),"medium");

 
// alert(typeof date);

 

 

 

 


const createEvent = (events: {
start: Timestamp,
end?: Timestamp,
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
DTSTART:${formatDate(this.opgave.start.toDate())}
DTEND:${formatDate(this.opgave.end.toDate())}
SUMMARY:${event.summary}
DESCRIPTION:${event.description})
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


const download = (filename, text) => {
const element = document.createElement('a')
element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text))
element.setAttribute('download', filename)
element.setAttribute('target', '_blank')
element.style.display = 'none'
element.click()
}

 

const createicsevents = [{
start: this.opgave.start,
end: this.opgave.start,
summary: this.opgave.title,
description: this.opgave.notes,
location: this.opgave.meta.location,
url: 'https://student.friesbureau.dk'
}

]
const icscontent = createEvent(createicsevents);

    
download('task.ics', icscontent);

}




      /**
     * Get the Booleans
     */

    toggleStarred(asyncopgave)
    {
        const opgaveid = this.opgave.id;
        const starred  =  !asyncopgave.starred;
        this.opgaveservice.toggleupdateOpgaveStarred(opgaveid, starred);
    }

    toggleImportant(asyncopgave)
    {
        const opgaveid = this.opgave.id;
        const important  =  !asyncopgave.important;
        this.opgaveservice.toggleupdateOpgaveImportant(opgaveid, important);
    }

    toggleCompleted(asyncopgave)
    {
        const opgaveid = this.opgave.id;
        const completed  =  !asyncopgave.completed;
        this.opgaveservice.toggleupdateOpgaveCompleted(opgaveid, completed);
    }



    /**
     * Opret Opgave
     */
 
    createOpgave(): void
    {
        const data = this.opgaveForm.getRawValue();
    
//        this.opgaveservice.create(opgaveid, data);
this.opgaveservice.createsyncopgave(data);
this.opgaveservice.onCurrentOpgaveChanged.next([null, null]);
 this.opgaveservice._location.go('opgave/all');
    }
 

    /**
     *  Delete
     */

    toggleDeleted(event): void
    {
        event.stopPropagation();
 
this.opgaveservice.deleteOpgave(this.opgave.id);
this.opgaveservice.onCurrentOpgaveChanged.next([null, null]);
    }

    /**
     * Toggle tag on todo
     *
     * @param tagId
     */
    toggleTagOnOpgave(tagId): void
    {
        this.opgaveservice.toggleTagOnOpgave(tagId, this.opgave);
    }

    /**
     * Has tag?
     *
     * @param tagId
     * @returns {any}
     */
    hasTag(tagId): any
    {
        return this.opgaveservice.hasTag(tagId, this.opgave);
    }


    


}
