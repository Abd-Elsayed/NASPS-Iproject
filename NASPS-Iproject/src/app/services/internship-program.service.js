import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
/**
 * Internship intake cohorts a trainee can be assigned to. Kept as a simple list so the
 * Add Trainee form shows "Summer 2026", "Winter 2026", … instead of program names.
 */
export class InternshipProgramService {
    programs = [
        'Winter 2025',
        'Summer 2025',
        'Winter 2026',
        'Summer 2026',
        'Winter 2027',
        'Summer 2027',
    ];
    static ɵfac = function InternshipProgramService_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || InternshipProgramService)(); };
    static ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: InternshipProgramService, factory: InternshipProgramService.ɵfac, providedIn: 'root' });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(InternshipProgramService, [{
        type: Injectable,
        args: [{ providedIn: 'root' }]
    }], null, null); })();
