import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable()
export class TokenStorage {
    /**
     * Get access token
     * @returns {Observable<string>}
     */
    public getAccessToken(): Observable<string> {
        const token: string = <string>localStorage.getItem('accessToken');
        return of(token);
    }

    /**
     * Set access token
     * @returns {TokenStorage}
     */
    public setAccessToken(token: string): TokenStorage {
        localStorage.setItem('accessToken', token);
        return this;
    }

    /**
     * Remove token
     */
    public clear() {
        localStorage.removeItem('accessToken');
    }
}