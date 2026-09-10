import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
export class UniversityService {
    egyptianUniversities = [
        'Cairo University',
        'Ain Shams University',
        'Alexandria University',
        'Al-Azhar University',
        'Assiut University',
        'Benha University',
        'Beni-Suef University',
        'Damietta University',
        'Fayoum University',
        'Helwan University',
        'Kafrelsheikh University',
        'Luxor University',
        'Mansoura University',
        'Menofia University',
        'Minia University',
        'New Valley University',
        'Port Said University',
        'Sohag University',
        'South Valley University',
        'Suez Canal University',
        'Suez University',
        'Tanta University',
        'Zagazig University',
        'The American University in Cairo (AUC)',
        'The German University in Cairo (GUC)',
        'The British University in Egypt (BUE)',
        'Egypt-Japan University of Science and Technology (E-JUST)',
        'Future University in Egypt (FUE)',
        'Misr International University (MIU)',
        'Misr University for Science and Technology (MUST)',
        'October 6 University',
        'Nile University',
        'Galala University',
        'King Salman International University',
        'New Mansoura University',
        'New Giza University (NGU)',
        'Other',
    ];
    isListed(value) {
        return this.egyptianUniversities.some(university => university === value && university !== 'Other');
    }
    static ɵfac = function UniversityService_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || UniversityService)(); };
    static ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: UniversityService, factory: UniversityService.ɵfac, providedIn: 'root' });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(UniversityService, [{
        type: Injectable,
        args: [{ providedIn: 'root' }]
    }], null, null); })();
