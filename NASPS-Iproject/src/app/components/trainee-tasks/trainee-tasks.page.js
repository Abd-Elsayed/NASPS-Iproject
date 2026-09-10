import { Component, computed, signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { PaginationComponent } from '../pagination/pagination.component';
import * as i0 from "@angular/core";
import * as i1 from "../../services/data.service";
import * as i2 from "../../services/auth.service";
import * as i3 from "@angular/forms";
const _c0 = a0 => ["/trainee/tasks", a0];
const _forTrack0 = ($index, $item) => $item.id;
function TraineeTasksPage_For_50_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "tr")(1, "td");
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "td")(4, "a", 10);
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "small");
    i0.ɵɵtext(7, "Open the title to submit your work");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(8, "td")(9, "span", 11);
    i0.ɵɵtext(10);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(11, "td");
    i0.ɵɵtext(12);
    i0.ɵɵpipe(13, "date");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(14, "td")(15, "span", 12);
    i0.ɵɵtext(16);
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const task_r1 = ctx.$implicit;
    const ɵ$index_81_r2 = ctx.$index;
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate((ctx_r2.page() - 1) * ctx_r2.pageSize + ɵ$index_81_r2 + 1);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("routerLink", i0.ɵɵpureFunction1(11, _c0, task_r1.id));
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(task_r1.title);
    i0.ɵɵadvance(4);
    i0.ɵɵattribute("data-priority", task_r1.priority);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(task_r1.priority);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(13, 8, task_r1.dueDate, "MMM d, y"));
    i0.ɵɵadvance(3);
    i0.ɵɵattribute("data-status", task_r1.status);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(task_r1.status);
} }
function TraineeTasksPage_ForEmpty_51_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "tr")(1, "td", 13);
    i0.ɵɵtext(2, "You have no tasks in this view.");
    i0.ɵɵelementEnd()();
} }
export class TraineeTasksPage {
    data;
    auth;
    search = signal('', /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "search" }] : /* istanbul ignore next */ []));
    status = signal('All', /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "status" }] : /* istanbul ignore next */ []));
    priority = signal('All', /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "priority" }] : /* istanbul ignore next */ []));
    page = signal(1, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "page" }] : /* istanbul ignore next */ []));
    pageSize = 5;
    filtered = computed(() => this.data.tasks().filter(task => task.traineeId === this.auth.currentTraineeId() &&
        task.title.toLowerCase().includes(this.search().toLowerCase()) &&
        (this.status() === 'All' || task.status === this.status()) &&
        (this.priority() === 'All' || task.priority === this.priority())), /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "filtered" }] : /* istanbul ignore next */ []));
    paginated = computed(() => {
        const start = (this.page() - 1) * this.pageSize;
        return this.filtered().slice(start, start + this.pageSize);
    }, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "paginated" }] : /* istanbul ignore next */ []));
    constructor(data, auth) {
        this.data = data;
        this.auth = auth;
        void this.data.refreshTasksFromServer(this.auth.currentTraineeId());
    }
    static ɵfac = function TraineeTasksPage_Factory(__ngFactoryType__) { /* @ts-ignore */
    return new (__ngFactoryType__ || TraineeTasksPage)(i0.ɵɵdirectiveInject(i1.DataService), i0.ɵɵdirectiveInject(i2.AuthService)); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: TraineeTasksPage, selectors: [["app-trainee-tasks-page"]], decls: 53, vars: 7, consts: [[1, "page-heading"], [1, "eyebrow"], [1, "panel", "table-panel"], [1, "toolbar"], ["aria-label", "Filter task status", 3, "ngModelChange", "ngModel"], ["aria-label", "Filter task priority", 3, "ngModelChange", "ngModel"], [1, "search-box"], ["placeholder", "Search tasks...", 3, "ngModelChange", "ngModel"], [1, "table-wrap"], [3, "pageChange", "totalItems", "pageSize", "page"], [1, "task-title-link", 3, "routerLink"], [1, "priority"], [1, "status"], ["colspan", "5", 1, "empty"]], template: function TraineeTasksPage_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0)(1, "div")(2, "span", 1);
            i0.ɵɵtext(3, "YOUR WORK");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(4, "h1");
            i0.ɵɵtext(5, "My Tasks");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(6, "p");
            i0.ɵɵtext(7, "Track assignments, deadlines and submissions.");
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(8, "section", 2)(9, "div", 3)(10, "select", 4);
            i0.ɵɵlistener("ngModelChange", function TraineeTasksPage_Template_select_ngModelChange_10_listener($event) { ctx.status.set($event); return ctx.page.set(1); });
            i0.ɵɵelementStart(11, "option");
            i0.ɵɵtext(12, "All");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(13, "option");
            i0.ɵɵtext(14, "Pending");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(15, "option");
            i0.ɵɵtext(16, "In Progress");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(17, "option");
            i0.ɵɵtext(18, "Completed");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(19, "option");
            i0.ɵɵtext(20, "Needs Changes");
            i0.ɵɵelementEnd()();
            i0.ɵɵcontrolCreate();
            i0.ɵɵelementStart(21, "select", 5);
            i0.ɵɵlistener("ngModelChange", function TraineeTasksPage_Template_select_ngModelChange_21_listener($event) { ctx.priority.set($event); return ctx.page.set(1); });
            i0.ɵɵelementStart(22, "option");
            i0.ɵɵtext(23, "All");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(24, "option");
            i0.ɵɵtext(25, "High");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(26, "option");
            i0.ɵɵtext(27, "Medium");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(28, "option");
            i0.ɵɵtext(29, "Low");
            i0.ɵɵelementEnd()();
            i0.ɵɵcontrolCreate();
            i0.ɵɵelementStart(30, "label", 6)(31, "span");
            i0.ɵɵtext(32, "\u2315");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(33, "input", 7);
            i0.ɵɵlistener("ngModelChange", function TraineeTasksPage_Template_input_ngModelChange_33_listener($event) { ctx.search.set($event); return ctx.page.set(1); });
            i0.ɵɵelementEnd();
            i0.ɵɵcontrolCreate();
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(34, "div", 8)(35, "table")(36, "thead")(37, "tr")(38, "th");
            i0.ɵɵtext(39, "#");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(40, "th");
            i0.ɵɵtext(41, "Task");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(42, "th");
            i0.ɵɵtext(43, "Priority");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(44, "th");
            i0.ɵɵtext(45, "Due Date");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(46, "th");
            i0.ɵɵtext(47, "Status");
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(48, "tbody");
            i0.ɵɵrepeaterCreate(49, TraineeTasksPage_For_50_Template, 17, 13, "tr", null, _forTrack0, false, TraineeTasksPage_ForEmpty_51_Template, 3, 0, "tr");
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(52, "app-pagination", 9);
            i0.ɵɵlistener("pageChange", function TraineeTasksPage_Template_app_pagination_pageChange_52_listener($event) { return ctx.page.set($event); });
            i0.ɵɵelementEnd()();
        } if (rf & 2) {
            i0.ɵɵadvance(10);
            i0.ɵɵproperty("ngModel", ctx.status());
            i0.ɵɵcontrol();
            i0.ɵɵadvance(11);
            i0.ɵɵproperty("ngModel", ctx.priority());
            i0.ɵɵcontrol();
            i0.ɵɵadvance(12);
            i0.ɵɵproperty("ngModel", ctx.search());
            i0.ɵɵcontrol();
            i0.ɵɵadvance(16);
            i0.ɵɵrepeater(ctx.paginated());
            i0.ɵɵadvance(3);
            i0.ɵɵproperty("totalItems", ctx.filtered().length)("pageSize", ctx.pageSize)("page", ctx.page());
        } }, dependencies: [FormsModule, i3.NgSelectOption, i3.ɵNgSelectMultipleOption, i3.DefaultValueAccessor, i3.SelectControlValueAccessor, i3.NgControlStatus, i3.NgModel, RouterLink, PaginationComponent, DatePipe], styles: [".task-title-link[_ngcontent-%COMP%] { display: block; color: var(--%NS%ink); font-weight: 800; text-decoration: none; }.task-title-link[_ngcontent-%COMP%]:hover { color: var(--%NS%blue); }.task-title-link[_ngcontent-%COMP%]    + small[_ngcontent-%COMP%] { display: block; margin-top: 4px; color: var(--%NS%muted); font-size: 9px; }"] });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(TraineeTasksPage, [{
        type: Component,
        args: [{ selector: 'app-trainee-tasks-page', imports: [DatePipe, FormsModule, RouterLink, PaginationComponent], template: "<div class=\"page-heading\"><div><span class=\"eyebrow\">YOUR WORK</span><h1>My Tasks</h1><p>Track assignments, deadlines and submissions.</p></div></div>\n<section class=\"panel table-panel\">\n  <div class=\"toolbar\"><select aria-label=\"Filter task status\" [ngModel]=\"status()\" (ngModelChange)=\"status.set($event); page.set(1)\"><option>All</option><option>Pending</option><option>In Progress</option><option>Completed</option><option>Needs Changes</option></select><select aria-label=\"Filter task priority\" [ngModel]=\"priority()\" (ngModelChange)=\"priority.set($event); page.set(1)\"><option>All</option><option>High</option><option>Medium</option><option>Low</option></select><label class=\"search-box\"><span>\u2315</span><input [ngModel]=\"search()\" (ngModelChange)=\"search.set($event); page.set(1)\" placeholder=\"Search tasks...\"></label></div>\n  <div class=\"table-wrap\"><table><thead><tr><th>#</th><th>Task</th><th>Priority</th><th>Due Date</th><th>Status</th></tr></thead><tbody>\n    @for (task of paginated(); track task.id; let i = $index) { <tr><td>{{ (page() - 1) * pageSize + i + 1 }}</td><td><a class=\"task-title-link\" [routerLink]=\"['/trainee/tasks', task.id]\">{{ task.title }}</a><small>Open the title to submit your work</small></td><td><span class=\"priority\" [attr.data-priority]=\"task.priority\">{{ task.priority }}</span></td><td>{{ task.dueDate | date:'MMM d, y' }}</td><td><span class=\"status\" [attr.data-status]=\"task.status\">{{ task.status }}</span></td></tr> }\n    @empty { <tr><td colspan=\"5\" class=\"empty\">You have no tasks in this view.</td></tr> }\n  </tbody></table></div>\n  <app-pagination [totalItems]=\"filtered().length\" [pageSize]=\"pageSize\" [page]=\"page()\" (pageChange)=\"page.set($event)\" />\n</section>\n", styles: [".task-title-link { display: block; color: var(--ink); font-weight: 800; text-decoration: none; }.task-title-link:hover { color: var(--blue); }.task-title-link + small { display: block; margin-top: 4px; color: var(--muted); font-size: 9px; }\n"] }]
    }], () => [{ type: i1.DataService }, { type: i2.AuthService }], null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(TraineeTasksPage, { className: "TraineeTasksPage", filePath: "src/app/components/trainee-tasks/trainee-tasks.page.ts", lineNumber: 16 }); })();
