import {Injectable} from '@angular/core';
import {UserParameters} from '../model/search-criteria';
import {Observable, of} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class SearchDataService {
    private userSearchObject: UserParameters;

    /** Sets userSearchObject with the object passed in */
    setUserSearchData = (searchParans: UserParameters) => {
        this.userSearchObject = searchParans;
    };

    /**Returns userSearchObject  */
    getUserSearchData = (): Observable<UserParameters> => {
        return of(this.userSearchObject);
    }
}