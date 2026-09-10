import { Component, computed } from '@angular/core';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import * as i0 from "@angular/core";
import * as i1 from "../../services/data.service";
const _c0 = () => [34, 48, 42, 68, 75, 88];
const _c1 = () => ["Apr", "May", "Jun", "Jul", "Aug", "Sep"];
const _c2 = a0 => ["/admin/tasks", a0, "review"];
const _forTrack0 = ($index, $item) => $item.label;
const _forTrack1 = ($index, $item) => $item.id;
function DashboardPage_For_10_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "article", 3)(1, "span", 14);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "div")(4, "span");
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "strong");
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "small");
    i0.ɵɵtext(9);
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const stat_r1 = ctx.$implicit;
    i0.ɵɵadvance();
    i0.ɵɵclassMap(stat_r1.tone);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(stat_r1.label === "Trainees" ? "\u2659" : stat_r1.label === "Tasks" ? "\u2713" : stat_r1.label === "Pending Tasks" ? "\u25F7" : "\u25CF");
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(stat_r1.label);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(stat_r1.value);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(stat_r1.hint);
} }
function DashboardPage_For_26_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 9);
    i0.ɵɵelement(1, "span", 15)(2, "span", 16);
    i0.ɵɵelementStart(3, "small");
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const height_r2 = ctx.$implicit;
    const $index_r3 = ctx.$index;
    const ctx_r3 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵstyleProp("height", height_r2, "%");
    i0.ɵɵadvance();
    i0.ɵɵstyleProp("height", ctx_r3.Math.max(18, height_r2 - 22 + $index_r3 % 2 * 16), "%");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(i0.ɵɵpureFunction0(5, _c1)[$index_r3]);
} }
function DashboardPage_For_38_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "a", 13)(1, "span", 17);
    i0.ɵɵtext(2, "\u2713");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "span")(4, "strong");
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "small");
    i0.ɵɵtext(7);
    i0.ɵɵpipe(8, "date");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(9, "span", 18);
    i0.ɵɵtext(10);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const task_r5 = ctx.$implicit;
    i0.ɵɵproperty("routerLink", i0.ɵɵpureFunction1(8, _c2, task_r5.id));
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(task_r5.title);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1("Due ", i0.ɵɵpipeBind2(8, 5, task_r5.dueDate, "MMM d, y"));
    i0.ɵɵadvance(2);
    i0.ɵɵattribute("data-status", task_r5.status);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(task_r5.status);
} }
export class DashboardPage {
    data;
    Math = Math;
    stats = computed(() => [
        { label: 'Trainees', value: this.data.trainees().length, hint: 'Total trainees', tone: 'blue' },
        { label: 'Tasks', value: this.data.tasks().length, hint: 'Total tasks', tone: 'violet' },
        { label: 'Pending Tasks', value: this.data.pendingTasks(), hint: 'Needs attention', tone: 'orange' },
        { label: 'Completed Tasks', value: this.data.completedTasks(), hint: 'Successfully done', tone: 'green' },
    ], /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "stats" }] : /* istanbul ignore next */ []));
    recent = computed(() => this.data.tasks().slice(0, 4), /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "recent" }] : /* istanbul ignore next */ []));
    constructor(data) {
        this.data = data;
    }
    static ɵfac = function DashboardPage_Factory(__ngFactoryType__) { /* @ts-ignore */
    return new (__ngFactoryType__ || DashboardPage)(i0.ɵɵdirectiveInject(i1.DataService)); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: DashboardPage, selectors: [["app-dashboard-page"]], decls: 39, vars: 1, consts: [[1, "page-heading"], [1, "eyebrow"], [1, "stats-grid"], [1, "stat-card"], [1, "dashboard-grid"], [1, "panel", "chart-panel"], [1, "panel-title"], [1, "legend"], ["aria-label", "Illustrative monthly task chart", 1, "chart"], [1, "chart-column"], [1, "panel", "recent-panel"], ["routerLink", "/admin/tasks"], [1, "activity-list"], [3, "routerLink"], [1, "stat-icon"], [1, "bar", "completed"], [1, "bar", "pending"], [1, "activity-icon"], [1, "status"]], template: function DashboardPage_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0)(1, "div")(2, "span", 1);
            i0.ɵɵtext(3, "OVERVIEW");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(4, "h1");
            i0.ɵɵtext(5, "Dashboard");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(6, "p");
            i0.ɵɵtext(7, "Welcome back. Here is what is happening with your trainee team.");
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(8, "section", 2);
            i0.ɵɵrepeaterCreate(9, DashboardPage_For_10_Template, 10, 6, "article", 3, _forTrack0);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(11, "section", 4)(12, "article", 5)(13, "div", 6)(14, "div")(15, "h2");
            i0.ɵɵtext(16, "Tasks Overview");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(17, "p");
            i0.ɵɵtext(18, "Monthly activity for the current cycle");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(19, "span", 7);
            i0.ɵɵelement(20, "i");
            i0.ɵɵtext(21, " Completed ");
            i0.ɵɵelement(22, "i");
            i0.ɵɵtext(23, " Pending");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(24, "div", 8);
            i0.ɵɵrepeaterCreate(25, DashboardPage_For_26_Template, 5, 6, "div", 9, i0.ɵɵrepeaterTrackByIndex);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(27, "article", 10)(28, "div", 6)(29, "div")(30, "h2");
            i0.ɵɵtext(31, "Recent Tasks");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(32, "p");
            i0.ɵɵtext(33, "Latest activity and due dates");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(34, "a", 11);
            i0.ɵɵtext(35, "View all");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(36, "div", 12);
            i0.ɵɵrepeaterCreate(37, DashboardPage_For_38_Template, 11, 10, "a", 13, _forTrack1);
            i0.ɵɵelementEnd()()();
        } if (rf & 2) {
            i0.ɵɵadvance(9);
            i0.ɵɵrepeater(ctx.stats());
            i0.ɵɵadvance(16);
            i0.ɵɵrepeater(i0.ɵɵpureFunction0(0, _c0));
            i0.ɵɵadvance(12);
            i0.ɵɵrepeater(ctx.recent());
        } }, dependencies: [RouterLink, DatePipe], styles: ["[_nghost-%COMP%] { display: block; }"] });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(DashboardPage, [{
        type: Component,
        args: [{ selector: 'app-dashboard-page', imports: [DatePipe, RouterLink], template: "<div class=\"page-heading\">\n  <div><span class=\"eyebrow\">OVERVIEW</span><h1>Dashboard</h1><p>Welcome back. Here is what is happening with your trainee team.</p></div>\n</div>\n\n<section class=\"stats-grid\">\n  @for (stat of stats(); track stat.label) {\n    <article class=\"stat-card\">\n      <span class=\"stat-icon\" [class]=\"stat.tone\">{{ stat.label === 'Trainees' ? '\u2659' : stat.label === 'Tasks' ? '\u2713' : stat.label === 'Pending Tasks' ? '\u25F7' : '\u25CF' }}</span>\n      <div><span>{{ stat.label }}</span><strong>{{ stat.value }}</strong><small>{{ stat.hint }}</small></div>\n    </article>\n  }\n</section>\n\n<section class=\"dashboard-grid\">\n  <article class=\"panel chart-panel\">\n    <div class=\"panel-title\"><div><h2>Tasks Overview</h2><p>Monthly activity for the current cycle</p></div><span class=\"legend\"><i></i> Completed <i></i> Pending</span></div>\n    <div class=\"chart\" aria-label=\"Illustrative monthly task chart\">\n      @for (height of [34, 48, 42, 68, 75, 88]; track $index) {\n        <div class=\"chart-column\"><span class=\"bar completed\" [style.height.%]=\"height\"></span><span class=\"bar pending\" [style.height.%]=\"Math.max(18, height - 22 + ($index % 2) * 16)\"></span><small>{{ ['Apr','May','Jun','Jul','Aug','Sep'][$index] }}</small></div>\n      }\n    </div>\n  </article>\n  <article class=\"panel recent-panel\">\n    <div class=\"panel-title\"><div><h2>Recent Tasks</h2><p>Latest activity and due dates</p></div><a routerLink=\"/admin/tasks\">View all</a></div>\n    <div class=\"activity-list\">\n      @for (task of recent(); track task.id) {\n        <a [routerLink]=\"['/admin/tasks', task.id, 'review']\">\n          <span class=\"activity-icon\">\u2713</span>\n          <span><strong>{{ task.title }}</strong><small>Due {{ task.dueDate | date:'MMM d, y' }}</small></span>\n          <span class=\"status\" [attr.data-status]=\"task.status\">{{ task.status }}</span>\n        </a>\n      }\n    </div>\n  </article>\n</section>\n", styles: [":host { display: block; }\n"] }]
    }], () => [{ type: i1.DataService }], null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(DashboardPage, { className: "DashboardPage", filePath: "src/app/components/dashboard/dashboard.page.ts", lineNumber: 12 }); })();
