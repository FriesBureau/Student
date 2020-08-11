import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class KursusService implements Resolve<any>
{
    onKursusChanged: BehaviorSubject<any>;

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
        this.onKursusChanged = new BehaviorSubject({});
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
                this.getKursus(route.params.kursusId, route.params.kursusSlug)
            ]).then(
                () => {
                    resolve();
                },
                reject
            );
        });
    }

    /**
     * Get course
     *
     * @param kursusId
     * @param kursusSlug
     * @returns {Promise<any>}
     */
    getKursus(kursusId, kursusSlug): Promise<any>
    {
        return new Promise((resolve, reject) => {
            this._httpClient.get('api/academy-course/' + kursusId + '/' + kursusSlug)
                .subscribe((response: any) => {
                    this.onKursusChanged.next(response);
                    resolve(response);
                }, reject);
        });
    }

}
 