import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class KurserService implements Resolve<any>
{
    onCategoriesChanged: BehaviorSubject<any>;
    onKurserChanged: BehaviorSubject<any>;

    /**
     * Constructor
     *
     * @param {HttpClient} _httpClient
     */
    constructor(
        private _httpClient: HttpClient
    )
    {
        // Set the defaults
        this.onCategoriesChanged = new BehaviorSubject({});
        this.onKurserChanged = new BehaviorSubject({});
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Resolver
     *
     * @param {ActivatedRouteSnapshot} route
     * @param {RouterStateSnapshot} state
     * @returns {Observable<any> | Promise<any> | any}
     */
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any
    {
        return new Promise((resolve, reject) => {

            Promise.all([
                this.getCategories(),
                this.getKurser()
            ]).then(
                () => {
                    resolve();
                },
                reject
            );
        });
    }

    /**
     * Get categories
     *
     * @returns {Promise<any>}
     */
    getCategories(): Promise<any>
    {
        return new Promise((resolve, reject) => {
            this._httpClient.get('api/academy-categories')
                .subscribe((response: any) => {
                    this.onCategoriesChanged.next(response);
                    resolve(response);
                }, reject);
        });
    }

    /**
     * Get courses
     *
     * @returns {Promise<any>}
     */
    getKurser(): Promise<any>
    {
        return new Promise((resolve, reject) => {
            this._httpClient.get('api/academy-courses')
                .subscribe((response: any) => {
                    this.onKurserChanged.next(response);
                    resolve(response);
                }, reject);
        });
    }

}
