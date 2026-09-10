import { Component, input, output } from '@angular/core';
import * as i0 from "@angular/core";
function AttachmentComponent_Conditional_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵdomElementStart(0, "span", 3);
    i0.ɵɵtext(1);
    i0.ɵɵdomElementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx_r0.formatSize(ctx_r0.size()));
} }
function AttachmentComponent_Conditional_6_Template(rf, ctx) { if (rf & 1) {
    const _r2 = i0.ɵɵgetCurrentView();
    i0.ɵɵdomElementStart(0, "button", 6);
    i0.ɵɵdomListener("click", function AttachmentComponent_Conditional_6_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r2); const ctx_r0 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r0.download.emit()); });
    i0.ɵɵtext(1, "\u2193");
    i0.ɵɵdomElementEnd();
} }
function AttachmentComponent_Conditional_7_Template(rf, ctx) { if (rf & 1) {
    const _r3 = i0.ɵɵgetCurrentView();
    i0.ɵɵdomElementStart(0, "button", 7);
    i0.ɵɵdomListener("click", function AttachmentComponent_Conditional_7_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r3); const ctx_r0 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r0.remove.emit()); });
    i0.ɵɵtext(1, "\u2715");
    i0.ɵɵdomElementEnd();
} }
/**
 * One consistent chip for every attachment in the app (task brief, submission, …).
 * Shows a delete button when `removable` is set and there is something to remove.
 */
export class AttachmentComponent {
    name = input('', /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "name" }] : /* istanbul ignore next */ []));
    size = input(null, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "size" }] : /* istanbul ignore next */ []));
    placeholder = input('No attachment', /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "placeholder" }] : /* istanbul ignore next */ []));
    removable = input(false, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "removable" }] : /* istanbul ignore next */ []));
    downloadable = input(false, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "downloadable" }] : /* istanbul ignore next */ []));
    remove = output();
    download = output();
    formatSize(size) {
        return size < 1024 * 1024 ? `${Math.ceil(size / 1024)} KB` : `${(size / 1024 / 1024).toFixed(1)} MB`;
    }
    static ɵfac = function AttachmentComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || AttachmentComponent)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: AttachmentComponent, selectors: [["app-attachment"]], inputs: { name: [1, "name"], size: [1, "size"], placeholder: [1, "placeholder"], removable: [1, "removable"], downloadable: [1, "downloadable"] }, outputs: { remove: "remove", download: "download" }, decls: 8, vars: 6, consts: [[1, "attachment"], [1, "attachment-icon"], [1, "attachment-name"], [1, "attachment-size"], ["type", "button", "aria-label", "Download attachment", 1, "attachment-download"], ["type", "button", "aria-label", "Delete attachment", 1, "attachment-remove"], ["type", "button", "aria-label", "Download attachment", 1, "attachment-download", 3, "click"], ["type", "button", "aria-label", "Delete attachment", 1, "attachment-remove", 3, "click"]], template: function AttachmentComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵdomElementStart(0, "span", 0)(1, "span", 1);
            i0.ɵɵtext(2, "\u25A3");
            i0.ɵɵdomElementEnd();
            i0.ɵɵdomElementStart(3, "span", 2);
            i0.ɵɵtext(4);
            i0.ɵɵdomElementEnd();
            i0.ɵɵconditionalCreate(5, AttachmentComponent_Conditional_5_Template, 2, 1, "span", 3);
            i0.ɵɵconditionalCreate(6, AttachmentComponent_Conditional_6_Template, 2, 0, "button", 4);
            i0.ɵɵconditionalCreate(7, AttachmentComponent_Conditional_7_Template, 2, 0, "button", 5);
            i0.ɵɵdomElementEnd();
        } if (rf & 2) {
            i0.ɵɵclassProp("empty", !ctx.name());
            i0.ɵɵadvance(4);
            i0.ɵɵtextInterpolate(ctx.name() || ctx.placeholder());
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.size() ? 5 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.downloadable() && ctx.name() ? 6 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.removable() && ctx.name() ? 7 : -1);
        } }, styles: [".attachment[_ngcontent-%COMP%] { display: inline-flex; align-items: center; gap: 8px; padding: 7px 10px; border-radius: 8px;\n      background: var(--%NS%light-blue, #eaf2fd); color: var(--%NS%blue-dark, #1b4f8a); font-size: 11px; font-weight: 700;\n      max-width: 100%; word-break: break-all; }\n    .attachment.empty[_ngcontent-%COMP%] { background: #f1f3f5; color: var(--%NS%muted, #8a94a6); }\n    .attachment-icon[_ngcontent-%COMP%] { flex: none; }\n    .attachment-size[_ngcontent-%COMP%] { font-weight: 500; opacity: .8; }\n    .attachment-remove[_ngcontent-%COMP%], .attachment-download[_ngcontent-%COMP%] { flex: none; border: none; cursor: pointer; width: 20px; height: 20px; border-radius: 50%;\n      background: var(--%NS%blue-dark, #1b4f8a); color: #fff; font-size: 10px; line-height: 1; display: grid; place-items: center; }\n    .attachment-remove[_ngcontent-%COMP%]:hover { background: #c0392b; }\n    .attachment-download[_ngcontent-%COMP%]:hover { background: var(--%NS%blue, #206090); }"] });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AttachmentComponent, [{
        type: Component,
        args: [{ selector: 'app-attachment', template: `
    <span class="attachment" [class.empty]="!name()">
      <span class="attachment-icon">▣</span>
      <span class="attachment-name">{{ name() || placeholder() }}</span>
      @if (size()) { <span class="attachment-size">{{ formatSize(size()!) }}</span> }
      @if (downloadable() && name()) {
        <button type="button" class="attachment-download" (click)="download.emit()" aria-label="Download attachment">↓</button>
      }
      @if (removable() && name()) {
        <button type="button" class="attachment-remove" (click)="remove.emit()" aria-label="Delete attachment">✕</button>
      }
    </span>
  `, styles: ["\n    .attachment { display: inline-flex; align-items: center; gap: 8px; padding: 7px 10px; border-radius: 8px;\n      background: var(--light-blue, #eaf2fd); color: var(--blue-dark, #1b4f8a); font-size: 11px; font-weight: 700;\n      max-width: 100%; word-break: break-all; }\n    .attachment.empty { background: #f1f3f5; color: var(--muted, #8a94a6); }\n    .attachment-icon { flex: none; }\n    .attachment-size { font-weight: 500; opacity: .8; }\n    .attachment-remove, .attachment-download { flex: none; border: none; cursor: pointer; width: 20px; height: 20px; border-radius: 50%;\n      background: var(--blue-dark, #1b4f8a); color: #fff; font-size: 10px; line-height: 1; display: grid; place-items: center; }\n    .attachment-remove:hover { background: #c0392b; }\n    .attachment-download:hover { background: var(--blue, #206090); }\n  "] }]
    }], null, { name: [{ type: i0.Input, args: [{ isSignal: true, alias: "name", required: false }] }], size: [{ type: i0.Input, args: [{ isSignal: true, alias: "size", required: false }] }], placeholder: [{ type: i0.Input, args: [{ isSignal: true, alias: "placeholder", required: false }] }], removable: [{ type: i0.Input, args: [{ isSignal: true, alias: "removable", required: false }] }], downloadable: [{ type: i0.Input, args: [{ isSignal: true, alias: "downloadable", required: false }] }], remove: [{ type: i0.Output, args: ["remove"] }], download: [{ type: i0.Output, args: ["download"] }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(AttachmentComponent, { className: "AttachmentComponent", filePath: "src/app/components/attachment/attachment.component.ts", lineNumber: 35 }); })();
