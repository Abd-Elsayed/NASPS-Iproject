import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
export class ValidationService {
    phone = (control) => {
        const value = String(control.value ?? '').trim();
        if (!value)
            return null;
        const compact = value.replace(/[\s()-]/g, '');
        const egyptianMobile = /^(?:01[0125]\d{8}|\+?201[0125]\d{8}|00201[0125]\d{8})$/;
        return egyptianMobile.test(compact) ? null : { phone: true };
    };
    normalizePhone(value) {
        const compact = value.replace(/[\s()-]/g, '');
        if (compact.startsWith('0020'))
            return `+20${compact.slice(4)}`;
        if (compact.startsWith('20'))
            return `+${compact}`;
        if (compact.startsWith('0'))
            return `+20${compact.slice(1)}`;
        return compact;
    }
    httpUrl = (control) => {
        const value = String(control.value ?? '').trim();
        if (!value)
            return null;
        try {
            const url = new URL(value);
            return url.protocol === 'http:' || url.protocol === 'https:' ? null : { url: true };
        }
        catch {
            return { url: true };
        }
    };
    static ɵfac = function ValidationService_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || ValidationService)(); };
    static ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: ValidationService, factory: ValidationService.ɵfac, providedIn: 'root' });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ValidationService, [{
        type: Injectable,
        args: [{ providedIn: 'root' }]
    }], null, null); })();
