import { Component, computed, input, output } from '@angular/core';
import * as i0 from "@angular/core";
function PaginationComponent_For_7_Template(rf, ctx) { if (rf & 1) {
    const _r1 = i0.ɵɵgetCurrentView();
    i0.ɵɵdomElementStart(0, "button", 6);
    i0.ɵɵdomListener("click", function PaginationComponent_For_7_Template_button_click_0_listener() { const pageNumber_r2 = i0.ɵɵrestoreView(_r1).$implicit; const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.goTo(pageNumber_r2)); });
    i0.ɵɵtext(1);
    i0.ɵɵdomElementEnd();
} if (rf & 2) {
    const pageNumber_r2 = ctx.$implicit;
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵclassProp("active", pageNumber_r2 === ctx_r2.page());
    i0.ɵɵattribute("aria-current", pageNumber_r2 === ctx_r2.page() ? "page" : null);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(pageNumber_r2);
} }
export class PaginationComponent {
    totalItems = input(0, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "totalItems" }] : /* istanbul ignore next */ []));
    pageSize = input(5, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "pageSize" }] : /* istanbul ignore next */ []));
    page = input(1, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "page" }] : /* istanbul ignore next */ []));
    pageChange = output();
    totalPages = computed(() => Math.max(1, Math.ceil(this.totalItems() / this.pageSize())), /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "totalPages" }] : /* istanbul ignore next */ []));
    pages = computed(() => Array.from({ length: this.totalPages() }, (_, index) => index + 1), /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "pages" }] : /* istanbul ignore next */ []));
    firstItem = computed(() => this.totalItems() === 0 ? 0 : (this.page() - 1) * this.pageSize() + 1, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "firstItem" }] : /* istanbul ignore next */ []));
    lastItem = computed(() => Math.min(this.page() * this.pageSize(), this.totalItems()), /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "lastItem" }] : /* istanbul ignore next */ []));
    goTo(page) {
        const safePage = Math.min(Math.max(page, 1), this.totalPages());
        if (safePage !== this.page())
            this.pageChange.emit(safePage);
    }
    static ɵfac = function PaginationComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || PaginationComponent)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: PaginationComponent, selectors: [["app-pagination"]], inputs: { totalItems: [1, "totalItems"], pageSize: [1, "pageSize"], page: [1, "page"] }, outputs: { pageChange: "pageChange" }, decls: 10, vars: 5, consts: [["aria-label", "List pagination", 1, "pagination"], [1, "page-summary"], [1, "page-buttons"], ["type", "button", "aria-label", "Previous page", 3, "click", "disabled"], ["type", "button", 3, "active"], ["type", "button", "aria-label", "Next page", 3, "click", "disabled"], ["type", "button", 3, "click"]], template: function PaginationComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵdomElementStart(0, "nav", 0)(1, "span", 1);
            i0.ɵɵtext(2);
            i0.ɵɵdomElementEnd();
            i0.ɵɵdomElementStart(3, "div", 2)(4, "button", 3);
            i0.ɵɵdomListener("click", function PaginationComponent_Template_button_click_4_listener() { return ctx.goTo(ctx.page() - 1); });
            i0.ɵɵtext(5, "\u2039");
            i0.ɵɵdomElementEnd();
            i0.ɵɵrepeaterCreate(6, PaginationComponent_For_7_Template, 2, 4, "button", 4, i0.ɵɵrepeaterTrackByIdentity);
            i0.ɵɵdomElementStart(8, "button", 5);
            i0.ɵɵdomListener("click", function PaginationComponent_Template_button_click_8_listener() { return ctx.goTo(ctx.page() + 1); });
            i0.ɵɵtext(9, "\u203A");
            i0.ɵɵdomElementEnd()()();
        } if (rf & 2) {
            i0.ɵɵadvance(2);
            i0.ɵɵtextInterpolate3("Showing ", ctx.firstItem(), "\u2013", ctx.lastItem(), " of ", ctx.totalItems());
            i0.ɵɵadvance(2);
            i0.ɵɵdomProperty("disabled", ctx.page() <= 1);
            i0.ɵɵadvance(2);
            i0.ɵɵrepeater(ctx.pages());
            i0.ɵɵadvance(2);
            i0.ɵɵdomProperty("disabled", ctx.page() >= ctx.totalPages());
        } }, styles: ["[_nghost-%COMP%] { display: block; }\n.pagination[_ngcontent-%COMP%] { display: flex; align-items: center; justify-content: space-between; gap: 14px; padding: 14px 20px; border-top: 1px solid var(--%NS%border); background: #fff; }\n.page-summary[_ngcontent-%COMP%] { color: var(--%NS%muted); font-size: 10px; }\n.page-buttons[_ngcontent-%COMP%] { display: flex; align-items: center; gap: 5px; }\n.page-buttons[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] { display: grid; place-items: center; min-width: 32px; height: 32px; padding: 0 8px; border: 1px solid var(--%NS%border); border-radius: 7px; color: #526174; background: #fff; font-size: 11px; font-weight: 800; cursor: pointer; }\n.page-buttons[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:hover:not(:disabled), .page-buttons[_ngcontent-%COMP%]   button.active[_ngcontent-%COMP%] { color: #fff; border-color: var(--%NS%blue); background: var(--%NS%blue); }\n.page-buttons[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:disabled { cursor: not-allowed; opacity: .38; }\n@media (max-width: 560px) { .pagination[_ngcontent-%COMP%] { align-items: flex-start; flex-direction: column; }.page-buttons[_ngcontent-%COMP%] { width: 100%; overflow-x: auto; padding-bottom: 2px; } }"] });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(PaginationComponent, [{
        type: Component,
        args: [{ selector: 'app-pagination', template: "<nav class=\"pagination\" aria-label=\"List pagination\">\n  <span class=\"page-summary\">Showing {{ firstItem() }}\u2013{{ lastItem() }} of {{ totalItems() }}</span>\n  <div class=\"page-buttons\">\n    <button type=\"button\" aria-label=\"Previous page\" [disabled]=\"page() <= 1\" (click)=\"goTo(page() - 1)\">\u2039</button>\n    @for (pageNumber of pages(); track pageNumber) {\n      <button type=\"button\" [class.active]=\"pageNumber === page()\" [attr.aria-current]=\"pageNumber === page() ? 'page' : null\" (click)=\"goTo(pageNumber)\">{{ pageNumber }}</button>\n    }\n    <button type=\"button\" aria-label=\"Next page\" [disabled]=\"page() >= totalPages()\" (click)=\"goTo(page() + 1)\">\u203A</button>\n  </div>\n</nav>\n", styles: [":host { display: block; }\n.pagination { display: flex; align-items: center; justify-content: space-between; gap: 14px; padding: 14px 20px; border-top: 1px solid var(--border); background: #fff; }\n.page-summary { color: var(--muted); font-size: 10px; }\n.page-buttons { display: flex; align-items: center; gap: 5px; }\n.page-buttons button { display: grid; place-items: center; min-width: 32px; height: 32px; padding: 0 8px; border: 1px solid var(--border); border-radius: 7px; color: #526174; background: #fff; font-size: 11px; font-weight: 800; cursor: pointer; }\n.page-buttons button:hover:not(:disabled), .page-buttons button.active { color: #fff; border-color: var(--blue); background: var(--blue); }\n.page-buttons button:disabled { cursor: not-allowed; opacity: .38; }\n@media (max-width: 560px) { .pagination { align-items: flex-start; flex-direction: column; }.page-buttons { width: 100%; overflow-x: auto; padding-bottom: 2px; } }\n"] }]
    }], null, { totalItems: [{ type: i0.Input, args: [{ isSignal: true, alias: "totalItems", required: false }] }], pageSize: [{ type: i0.Input, args: [{ isSignal: true, alias: "pageSize", required: false }] }], page: [{ type: i0.Input, args: [{ isSignal: true, alias: "page", required: false }] }], pageChange: [{ type: i0.Output, args: ["pageChange"] }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(PaginationComponent, { className: "PaginationComponent", filePath: "src/app/components/pagination/pagination.component.ts", lineNumber: 8 }); })();
