import { Injectable } from '@angular/core';

@Injectable()
export class UtilsService {
    prepareSocialNetworking(src: string) {
        try {
            const url = new URL(src);
            let result = url.pathname.replace('/', '');
            return result.replace('+', '%2B');
        } catch (e) {
            return src.replace(/\s+|@|#/, '');
        }
    }
}