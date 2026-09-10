import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ToastContainer } from './components/toast-container/toast-container';
import * as i0 from "@angular/core";
export class App {
    static ɵfac = function App_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || App)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: App, selectors: [["app-root"]], decls: 2, vars: 0, template: function App_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelement(0, "router-outlet")(1, "app-toast-container");
        } }, dependencies: [RouterOutlet, ToastContainer], encapsulation: 2 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(App, [{
        type: Component,
        args: [{ imports: [RouterOutlet, ToastContainer], selector: 'app-root', template: "<router-outlet />\n<app-toast-container />\n" }]
    }], null, null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(App, { className: "App", filePath: "src/app/app.ts", lineNumber: 11 }); })();
