import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { fuseAnimations } from '../../../animations/animations';
import { AuthService } from '../../../services/auth.service';
import { KurserService } from '../../../services/kurser.service';
 
interface Avatar {

    image: string;
  }

@Component({
    selector   : 'akademi-kurser',
    templateUrl: './kurser.component.html',
    styleUrls  : ['./kurser.component.scss']
})
export class KurserComponent implements OnInit, OnDestroy
{
    avatarControl = new FormControl('', Validators.required);
    name =  new FormControl('', [Validators.required,Validators.minLength(4)]);
    email = new FormControl('', [Validators.required, Validators.email]);
    passwordtjekopret = new FormControl('', [Validators.required,Validators.minLength(6)]);
    passwordtjeklogind = new FormControl('', [Validators.required,Validators.minLength(6)]);
    avatarer: Avatar[] = [
      {image: '../../../../assets/images/avatars/blackhaired_woman_withglasses.svg'},
      {image: '../../../../assets/images/avatars/blondhaired_guy.svg'},
      {image: '../../../../assets/images/avatars/blondhaired_woman.svg'},
      {image: '../../../../assets/images/avatars/brownbearded_man.svg'},
      {image: '../../../../assets/images/avatars/brownhaired_boy.svg'},
      {image: '../../../../assets/images/avatars/brownhaired_girl.svg'},
      {image: '../../../../assets/images/avatars/brownhaired_woman_withglasses.svg'},
      {image: '../../../../assets/images/avatars/brownhaired_woman.svg'},
      {image: '../../../../assets/images/avatars/cool_guy_with_glasses.svg'},
      {image: '../../../../assets/images/avatars/guy_with_glasses.svg'},
      {image: '../../../../assets/images/avatars/red-brownhaired_boy.svg'},
      {image: '../../../../assets/images/avatars/redhead_man.svg'},
      {image: '../../../../assets/images/avatars/redhead_woman.svg'},
      {image: '../../../../assets/images/avatars/short-redhaired_woman.svg'},
    ];
    hide = true;
    categories: any[];
    kurser: any[];
    kurserFilteredByCategory: any[];
    filteredKurser: any[];
    currentCategory: string;
    searchTerm: string;
    isShown: boolean = false ; // hidden by default
  


    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {KurserService} _KurserService
     */
    constructor(
        private _KurserService: KurserService,
        public auth: AuthService,
    )
    {
        // Set the defaults
        this.currentCategory = 'all';
        this.searchTerm = '';

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
   
  

        // Subscribe to categories
        this._KurserService.onCategoriesChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(categories => {
                this.categories = categories;
            });

        // Subscribe to courses
        this._KurserService.onKurserChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(kurser => {
                this.filteredKurser = this.kurserFilteredByCategory = this.kurser = kurser;
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

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Filter courses by category
     */
    filterKurserByCategory(): void
    {
        // Filter
        if ( this.currentCategory === 'all' )
        {
            this.kurserFilteredByCategory = this.kurser;
            this.filteredKurser = this.kurser;
        }
        else
        {
            this.kurserFilteredByCategory = this.kurser.filter((kursus) => {
                return kursus.category === this.currentCategory;
            });

            this.filteredKurser = [...this.kurserFilteredByCategory];

        }

        // Re-filter by search term
        this.filterKurserByTerm();
    }

    /**
     * Filter courses by term
     */
    filterKurserByTerm(): void
    {
        const searchTerm = this.searchTerm.toLowerCase();

        // Search
        if ( searchTerm === '' )
        {
            this.filteredKurser = this.kurserFilteredByCategory;
        }
        else
        {
            this.filteredKurser = this.kurserFilteredByCategory.filter((kursus) => {
                return kursus.title.toLowerCase().includes(searchTerm);
            });
        }
    }

    getErrorMessageName() {
        if (this.name.hasError('required')) {
          return 'You must enter a name';
        }
    
        return this.name.hasError('name') ? 'Ikke et gyldigt navn' : '';
      }

    getErrorMessagePassword() {
        if (this.passwordtjekopret.hasError('required')) {
          return 'You must enter a password';
        }
    
        return this.passwordtjekopret.hasError('passwordtjekopret') ? 'Password must be longer than 6 characters' : '';
      }

    getErrorMessageEmail() {
        if (this.email.hasError('required')) {
          return 'You must enter an email';
        }
    
        return this.email.hasError('email') ? 'Not a valid email' : '';
      }

      toggleShow() {

        this.isShown =  true;
        
        }
    
        toggleHide() {
    
          this.isShown =  false;
          
          }
}
