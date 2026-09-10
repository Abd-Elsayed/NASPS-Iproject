import { Component, inject } from '@angular/core';
import { ToastService } from '../../services/toast.service';
import * as i0 from "@angular/core";
const _forTrack0 = ($index, $item) => $item.id;
function ToastContainer_For_2_Template(rf, ctx) { if (rf & 1) {
    const _r1 = i0.ɵɵgetCurrentView();
    i0.ɵɵdomElementStart(0, "article", 1)(1, "span", 2);
    i0.ɵɵtext(2);
    i0.ɵɵdomElementEnd();
    i0.ɵɵdomElementStart(3, "p");
    i0.ɵɵtext(4);
    i0.ɵɵdomElementEnd();
    i0.ɵɵdomElementStart(5, "button", 3);
    i0.ɵɵdomListener("click", function ToastContainer_For_2_Template_button_click_5_listener() { const item_r2 = i0.ɵɵrestoreView(_r1).$implicit; const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.toast.dismiss(item_r2.id)); });
    i0.ɵɵtext(6, "\u00D7");
    i0.ɵɵdomElementEnd()();
} if (rf & 2) {
    const item_r2 = ctx.$implicit;
    i0.ɵɵattribute("data-type", item_r2.type);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(item_r2.type === "success" ? "\u2713" : item_r2.type === "error" ? "!" : item_r2.type === "warning" ? "\u26A0" : "i");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(item_r2.message);
} }
export class ToastContainer {
    toast = inject(ToastService);
    static ɵfac = function ToastContainer_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || ToastContainer)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: ToastContainer, selectors: [["app-toast-container"]], decls: 3, vars: 0, consts: [["aria-live", "polite", "aria-label", "Notifications", 1, "toast-stack"], ["role", "status", 1, "toast"], [1, "toast-icon"], ["type", "button", "aria-label", "Dismiss message", 3, "click"]], template: function ToastContainer_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵdomElementStart(0, "section", 0);
            i0.ɵɵrepeaterCreate(1, ToastContainer_For_2_Template, 7, 3, "article", 1, _forTrack0);
            i0.ɵɵdomElementEnd();
        } if (rf & 2) {
            i0.ɵɵadvance();
            i0.ɵɵrepeater(ctx.toast.toasts());
        } }, styles: [".toast-stack[_ngcontent-%COMP%] { position: fixed; z-index: 1000; top: 20px; right: 20px; display: grid; gap: 10px; width: min(390px, calc(100vw - 32px)); pointer-events: none; }\n.toast[_ngcontent-%COMP%] { display: grid; grid-template-columns: 32px 1fr 28px; align-items: center; gap: 10px; padding: 13px 14px; border: 1px solid #cfe0eb; border-left: 4px solid var(--%NS%blue); border-radius: 11px; background: rgba(255, 255, 255, .98); box-shadow: 0 18px 45px rgba(34, 62, 88, .18); pointer-events: auto; animation: _ngcontent-%COMP%_toast-in .2s ease-out; }\n.toast[data-type=\"success\"][_ngcontent-%COMP%] { border-left-color: var(--%NS%green); }.toast[data-type=\"error\"][_ngcontent-%COMP%] { border-left-color: var(--%NS%red); }.toast[data-type=\"warning\"][_ngcontent-%COMP%] { border-left-color: var(--%NS%orange); }\n.toast-icon[_ngcontent-%COMP%] { display: grid; place-items: center; width: 30px; height: 30px; border-radius: 9px; color: var(--%NS%blue); background: var(--%NS%light-blue); font-weight: 900; }\n.toast[data-type=\"success\"][_ngcontent-%COMP%]   .toast-icon[_ngcontent-%COMP%] { color: var(--%NS%green); background: #e8f7f1; }.toast[data-type=\"error\"][_ngcontent-%COMP%]   .toast-icon[_ngcontent-%COMP%] { color: var(--%NS%red); background: #fff0f1; }.toast[data-type=\"warning\"][_ngcontent-%COMP%]   .toast-icon[_ngcontent-%COMP%] { color: var(--%NS%orange); background: #fff5df; }\n.toast[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] { margin: 0; color: #334255; font-size: 12px; font-weight: 700; line-height: 1.45; }.toast[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] { width: 28px; height: 28px; border: 0; border-radius: 7px; color: #748296; background: transparent; cursor: pointer; font-size: 19px; }\n@keyframes _ngcontent-%COMP%_toast-in { from { opacity: 0; transform: translateY(-8px) scale(.98); } to { opacity: 1; transform: none; } }\n@media (max-width: 600px) { .toast-stack[_ngcontent-%COMP%] { top: 12px; right: 16px; } }"] });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ToastContainer, [{
        type: Component,
        args: [{ selector: 'app-toast-container', template: "<section class=\"toast-stack\" aria-live=\"polite\" aria-label=\"Notifications\">\n  @for (item of toast.toasts(); track item.id) {\n    <article class=\"toast\" [attr.data-type]=\"item.type\" role=\"status\">\n      <span class=\"toast-icon\">{{ item.type === 'success' ? '\u2713' : item.type === 'error' ? '!' : item.type === 'warning' ? '\u26A0' : 'i' }}</span>\n      <p>{{ item.message }}</p>\n      <button type=\"button\" (click)=\"toast.dismiss(item.id)\" aria-label=\"Dismiss message\">\u00D7</button>\n    </article>\n  }\n</section>\n", styles: [".toast-stack { position: fixed; z-index: 1000; top: 20px; right: 20px; display: grid; gap: 10px; width: min(390px, calc(100vw - 32px)); pointer-events: none; }\n.toast { display: grid; grid-template-columns: 32px 1fr 28px; align-items: center; gap: 10px; padding: 13px 14px; border: 1px solid #cfe0eb; border-left: 4px solid var(--blue); border-radius: 11px; background: rgba(255, 255, 255, .98); box-shadow: 0 18px 45px rgba(34, 62, 88, .18); pointer-events: auto; animation: toast-in .2s ease-out; }\n.toast[data-type=\"success\"] { border-left-color: var(--green); }.toast[data-type=\"error\"] { border-left-color: var(--red); }.toast[data-type=\"warning\"] { border-left-color: var(--orange); }\n.toast-icon { display: grid; place-items: center; width: 30px; height: 30px; border-radius: 9px; color: var(--blue); background: var(--light-blue); font-weight: 900; }\n.toast[data-type=\"success\"] .toast-icon { color: var(--green); background: #e8f7f1; }.toast[data-type=\"error\"] .toast-icon { color: var(--red); background: #fff0f1; }.toast[data-type=\"warning\"] .toast-icon { color: var(--orange); background: #fff5df; }\n.toast p { margin: 0; color: #334255; font-size: 12px; font-weight: 700; line-height: 1.45; }.toast button { width: 28px; height: 28px; border: 0; border-radius: 7px; color: #748296; background: transparent; cursor: pointer; font-size: 19px; }\n@keyframes toast-in { from { opacity: 0; transform: translateY(-8px) scale(.98); } to { opacity: 1; transform: none; } }\n@media (max-width: 600px) { .toast-stack { top: 12px; right: 16px; } }\n"] }]
    }], null, null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(ToastContainer, { className: "ToastContainer", filePath: "src/app/components/toast-container/toast-container.ts", lineNumber: 9 }); })();
