import { Injectable, signal } from '@angular/core';
import * as i0 from "@angular/core";
export class ToastService {
    toasts = signal([], /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "toasts" }] : /* istanbul ignore next */ []));
    nextId = 1;
    show(message, type = 'success', duration = 3600) {
        const toast = { id: this.nextId++, message, type };
        this.toasts.update(items => [...items, toast]);
        window.setTimeout(() => this.dismiss(toast.id), duration);
    }
    dismiss(id) {
        this.toasts.update(items => items.filter(item => item.id !== id));
    }
    static ɵfac = function ToastService_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || ToastService)(); };
    static ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: ToastService, factory: ToastService.ɵfac, providedIn: 'root' });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ToastService, [{
        type: Injectable,
        args: [{ providedIn: 'root' }]
    }], null, null); })();
