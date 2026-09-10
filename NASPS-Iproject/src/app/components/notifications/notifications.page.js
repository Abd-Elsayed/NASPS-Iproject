import { Component, computed, inject, signal } from '@angular/core';
import { DataService } from '../../services/data.service';
import { ToastService } from '../../services/toast.service';
import { PaginationComponent } from '../pagination/pagination.component';
import * as i0 from "@angular/core";
const _c0 = () => ["All", "Unread", "Tasks", "System"];
const _forTrack0 = ($index, $item) => $item.id;
function NotificationsPage_For_13_Template(rf, ctx) { if (rf & 1) {
    const _r1 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 10);
    i0.ɵɵlistener("click", function NotificationsPage_For_13_Template_button_click_0_listener() { const item_r2 = i0.ɵɵrestoreView(_r1).$implicit; const ctx_r2 = i0.ɵɵnextContext(); ctx_r2.tab.set(item_r2); return i0.ɵɵresetView(ctx_r2.page.set(1)); });
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const item_r2 = ctx.$implicit;
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵclassProp("active", ctx_r2.tab() === item_r2);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(item_r2);
} }
function NotificationsPage_For_16_Conditional_8_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "i");
} }
function NotificationsPage_For_16_Template(rf, ctx) { if (rf & 1) {
    const _r4 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "article", 10);
    i0.ɵɵlistener("click", function NotificationsPage_For_16_Template_article_click_0_listener() { const item_r5 = i0.ɵɵrestoreView(_r4).$implicit; const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.open(item_r5.id, item_r5.read)); });
    i0.ɵɵelementStart(1, "span", 11);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "div")(4, "strong");
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "span");
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd()();
    i0.ɵɵconditionalCreate(8, NotificationsPage_For_16_Conditional_8_Template, 1, 0, "i");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const item_r5 = ctx.$implicit;
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵclassProp("unread", !item_r5.read);
    i0.ɵɵadvance();
    i0.ɵɵclassProp("system", item_r5.category === "System");
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(item_r5.category === "Tasks" ? "\u25A3" : "\u2699");
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(item_r5.message);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r2.timeAgo(item_r5.time));
    i0.ɵɵadvance();
    i0.ɵɵconditional(!item_r5.read ? 8 : -1);
} }
function NotificationsPage_ForEmpty_17_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 8);
    i0.ɵɵtext(1, "Nothing to show in this tab.");
    i0.ɵɵelementEnd();
} }
export class NotificationsPage {
    toast = inject(ToastService);
    data = inject(DataService);
    tab = signal('All', /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "tab" }] : /* istanbul ignore next */ []));
    page = signal(1, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "page" }] : /* istanbul ignore next */ []));
    pageSize = 5;
    filtered = computed(() => this.data.notifications().filter(item => this.tab() === 'All' || (this.tab() === 'Unread' ? !item.read : item.category === this.tab())), /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "filtered" }] : /* istanbul ignore next */ []));
    paginated = computed(() => {
        const start = (this.page() - 1) * this.pageSize;
        return this.filtered().slice(start, start + this.pageSize);
    }, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "paginated" }] : /* istanbul ignore next */ []));
    constructor() {
        void this.data.refreshNotificationsFromServer();
    }
    markAllRead() {
        void this.data.markAllRead();
        this.toast.show('All notifications marked as read.', 'info');
    }
    open(id, read) {
        if (!read)
            void this.data.markRead(id);
    }
    /** Accepts an ISO date (from the API) or a pre-formatted string (demo data). */
    timeAgo(value) {
        const date = new Date(value);
        if (isNaN(date.getTime()))
            return value;
        const seconds = Math.round((Date.now() - date.getTime()) / 1000);
        if (seconds < 60)
            return 'just now';
        const minutes = Math.round(seconds / 60);
        if (minutes < 60)
            return `${minutes} min ago`;
        const hours = Math.round(minutes / 60);
        if (hours < 24)
            return `${hours} hour${hours > 1 ? 's' : ''} ago`;
        const days = Math.round(hours / 24);
        if (days < 7)
            return `${days} day${days > 1 ? 's' : ''} ago`;
        return date.toLocaleDateString();
    }
    static ɵfac = function NotificationsPage_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || NotificationsPage)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: NotificationsPage, selectors: [["app-notifications-page"]], decls: 19, vars: 5, consts: [[1, "page-heading"], [1, "eyebrow"], [1, "text-button", 3, "click"], [1, "panel", "notification-panel"], [1, "tabs"], [3, "active"], [1, "notification-list"], [3, "unread"], [1, "empty"], [3, "pageChange", "totalItems", "pageSize", "page"], [3, "click"], [1, "notification-icon"]], template: function NotificationsPage_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0)(1, "div")(2, "span", 1);
            i0.ɵɵtext(3, "INBOX");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(4, "h1");
            i0.ɵɵtext(5, "Notifications");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(6, "p");
            i0.ɵɵtext(7, "Follow task updates and system announcements.");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(8, "button", 2);
            i0.ɵɵlistener("click", function NotificationsPage_Template_button_click_8_listener() { return ctx.markAllRead(); });
            i0.ɵɵtext(9, "Mark all as read");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(10, "section", 3)(11, "div", 4);
            i0.ɵɵrepeaterCreate(12, NotificationsPage_For_13_Template, 2, 3, "button", 5, i0.ɵɵrepeaterTrackByIdentity);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(14, "div", 6);
            i0.ɵɵrepeaterCreate(15, NotificationsPage_For_16_Template, 9, 8, "article", 7, _forTrack0, false, NotificationsPage_ForEmpty_17_Template, 2, 0, "div", 8);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(18, "app-pagination", 9);
            i0.ɵɵlistener("pageChange", function NotificationsPage_Template_app_pagination_pageChange_18_listener($event) { return ctx.page.set($event); });
            i0.ɵɵelementEnd()();
        } if (rf & 2) {
            i0.ɵɵadvance(12);
            i0.ɵɵrepeater(i0.ɵɵpureFunction0(4, _c0));
            i0.ɵɵadvance(3);
            i0.ɵɵrepeater(ctx.paginated());
            i0.ɵɵadvance(3);
            i0.ɵɵproperty("totalItems", ctx.filtered().length)("pageSize", ctx.pageSize)("page", ctx.page());
        } }, dependencies: [PaginationComponent], styles: ["[_nghost-%COMP%] { display: block; }\napp-pagination[_ngcontent-%COMP%] { display: block; margin: 12px -24px -24px; }\n@media (max-width: 720px) { app-pagination[_ngcontent-%COMP%] { margin: 12px -18px -18px; } }"] });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(NotificationsPage, [{
        type: Component,
        args: [{ selector: 'app-notifications-page', imports: [PaginationComponent], template: "<div class=\"page-heading\"><div><span class=\"eyebrow\">INBOX</span><h1>Notifications</h1><p>Follow task updates and system announcements.</p></div><button class=\"text-button\" (click)=\"markAllRead()\">Mark all as read</button></div>\n<section class=\"panel notification-panel\">\n  <div class=\"tabs\">@for (item of ['All','Unread','Tasks','System']; track item) { <button [class.active]=\"tab() === item\" (click)=\"tab.set($any(item)); page.set(1)\">{{ item }}</button> }</div>\n  <div class=\"notification-list\">\n    @for (item of paginated(); track item.id) {\n      <article [class.unread]=\"!item.read\" (click)=\"open(item.id, item.read)\"><span class=\"notification-icon\" [class.system]=\"item.category === 'System'\">{{ item.category === 'Tasks' ? '\u25A3' : '\u2699' }}</span><div><strong>{{ item.message }}</strong><span>{{ timeAgo(item.time) }}</span></div>@if (!item.read) { <i></i> }</article>\n    } @empty { <div class=\"empty\">Nothing to show in this tab.</div> }\n  </div>\n  <app-pagination [totalItems]=\"filtered().length\" [pageSize]=\"pageSize\" [page]=\"page()\" (pageChange)=\"page.set($event)\" />\n</section>\n", styles: [":host { display: block; }\napp-pagination { display: block; margin: 12px -24px -24px; }\n@media (max-width: 720px) { app-pagination { margin: 12px -18px -18px; } }\n"] }]
    }], () => [], null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(NotificationsPage, { className: "NotificationsPage", filePath: "src/app/components/notifications/notifications.page.ts", lineNumber: 7 }); })();
