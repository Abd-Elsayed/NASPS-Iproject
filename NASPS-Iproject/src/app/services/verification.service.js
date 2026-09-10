import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
export class VerificationService {
    requests = new Map();
    requestCode(channel, destination) {
        const code = String(Math.floor(100000 + Math.random() * 900000));
        this.requests.set(this.key(channel, destination), { code, expiresAt: Date.now() + 5 * 60 * 1000 });
        return code;
    }
    verifyCode(channel, destination, code) {
        const key = this.key(channel, destination);
        const request = this.requests.get(key);
        if (!request)
            return 'invalid';
        if (Date.now() > request.expiresAt) {
            this.requests.delete(key);
            return 'expired';
        }
        if (request.code !== code.trim())
            return 'invalid';
        this.requests.delete(key);
        return 'verified';
    }
    clear(destination) {
        for (const channel of ['email', 'sms', 'whatsapp'])
            this.requests.delete(this.key(channel, destination));
    }
    key(channel, destination) {
        return `${channel}:${destination.trim().toLowerCase()}`;
    }
    static ɵfac = function VerificationService_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || VerificationService)(); };
    static ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: VerificationService, factory: VerificationService.ɵfac, providedIn: 'root' });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(VerificationService, [{
        type: Injectable,
        args: [{ providedIn: 'root' }]
    }], null, null); })();
