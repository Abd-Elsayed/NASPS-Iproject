import { Component, computed, inject, signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ToastService } from '../../services/toast.service';
import { PaginationComponent } from '../pagination/pagination.component';
import * as i0 from "@angular/core";
import * as i1 from "../../services/data.service";
import * as i2 from "@angular/forms";
const _c0 = a0 => ["/admin/tasks", a0, "review"];
const _forTrack0 = ($index, $item) => $item.id;
function TasksPage_For_58_Template(rf, ctx) { if (rf & 1) {
    const _r1 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "tr")(1, "td");
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "td")(4, "strong");
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(6, "td");
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "td")(9, "span", 11);
    i0.ɵɵtext(10);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(11, "td");
    i0.ɵɵtext(12);
    i0.ɵɵpipe(13, "date");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(14, "td")(15, "span", 12);
    i0.ɵɵtext(16);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(17, "td")(18, "a", 13);
    i0.ɵɵtext(19, "\u2197");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(20, "td")(21, "button", 14);
    i0.ɵɵlistener("click", function TasksPage_For_58_Template_button_click_21_listener() { const task_r2 = i0.ɵɵrestoreView(_r1).$implicit; const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.remove(task_r2.id, task_r2.title)); });
    i0.ɵɵtext(22, "\u232B");
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const task_r2 = ctx.$implicit;
    const ɵ$index_93_r4 = ctx.$index;
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate((ctx_r2.page() - 1) * ctx_r2.pageSize + ɵ$index_93_r4 + 1);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(task_r2.title);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r2.traineeName(task_r2.traineeId));
    i0.ɵɵadvance(2);
    i0.ɵɵattribute("data-priority", task_r2.priority);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(task_r2.priority);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(13, 9, task_r2.dueDate, "MMM d, y"));
    i0.ɵɵadvance(3);
    i0.ɵɵattribute("data-status", task_r2.status);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(task_r2.status);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("routerLink", i0.ɵɵpureFunction1(12, _c0, task_r2.id));
} }
function TasksPage_ForEmpty_59_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "tr")(1, "td", 15);
    i0.ɵɵtext(2, "No tasks match your filters.");
    i0.ɵɵelementEnd()();
} }
export class TasksPage {
    data;
    toast = inject(ToastService);
    search = signal('', /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "search" }] : /* istanbul ignore next */ []));
    status = signal('All', /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "status" }] : /* istanbul ignore next */ []));
    priority = signal('All', /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "priority" }] : /* istanbul ignore next */ []));
    page = signal(1, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "page" }] : /* istanbul ignore next */ []));
    pageSize = 5;
    filtered = computed(() => {
        const query = this.search().toLowerCase();
        return this.data.tasks().filter(task => task.title.toLowerCase().includes(query) &&
            (this.status() === 'All' || task.status === this.status()) &&
            (this.priority() === 'All' || task.priority === this.priority()));
    }, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "filtered" }] : /* istanbul ignore next */ []));
    paginated = computed(() => {
        const start = (this.page() - 1) * this.pageSize;
        return this.filtered().slice(start, start + this.pageSize);
    }, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "paginated" }] : /* istanbul ignore next */ []));
    constructor(data) {
        this.data = data;
        void this.data.refreshTasksFromServer();
        void this.data.refreshTraineesFromServer();
    }
    traineeName(id) { return this.data.trainees().find(item => item.id === id)?.name ?? 'Unassigned'; }
    async remove(id, title) {
        if (!await this.data.deleteTask(id)) {
            this.toast.show('The task could not be deleted from the server.', 'error');
            return;
        }
        if ((this.page() - 1) * this.pageSize >= this.filtered().length && this.page() > 1)
            this.page.update(page => page - 1);
        this.toast.show(`Task “${title}” deleted.`, 'warning');
    }
    static ɵfac = function TasksPage_Factory(__ngFactoryType__) { /* @ts-ignore */
    return new (__ngFactoryType__ || TasksPage)(i0.ɵɵdirectiveInject(i1.DataService)); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: TasksPage, selectors: [["app-tasks-page"]], decls: 61, vars: 7, consts: [[1, "page-heading"], [1, "eyebrow"], ["routerLink", "/admin/tasks/new", 1, "primary-button"], [1, "panel", "table-panel"], [1, "toolbar"], ["aria-label", "Filter by status", 3, "ngModelChange", "ngModel"], ["aria-label", "Filter by priority", 3, "ngModelChange", "ngModel"], [1, "search-box"], ["placeholder", "Search tasks...", 3, "ngModelChange", "ngModel"], [1, "table-wrap"], [3, "pageChange", "totalItems", "pageSize", "page"], [1, "priority"], [1, "status"], [1, "icon-link", 3, "routerLink"], ["type", "button", "aria-label", "Delete task", 1, "icon-link", "danger", 3, "click"], ["colspan", "8", 1, "empty"]], template: function TasksPage_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0)(1, "div")(2, "span", 1);
            i0.ɵɵtext(3, "WORKFLOW");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(4, "h1");
            i0.ɵɵtext(5, "All Tasks");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(6, "p");
            i0.ɵɵtext(7, "Assign, filter and review every training task.");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(8, "a", 2);
            i0.ɵɵtext(9, "\uFF0B Add Task");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(10, "section", 3)(11, "div", 4)(12, "select", 5);
            i0.ɵɵlistener("ngModelChange", function TasksPage_Template_select_ngModelChange_12_listener($event) { ctx.status.set($event); return ctx.page.set(1); });
            i0.ɵɵelementStart(13, "option");
            i0.ɵɵtext(14, "All");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(15, "option");
            i0.ɵɵtext(16, "Pending");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(17, "option");
            i0.ɵɵtext(18, "In Progress");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(19, "option");
            i0.ɵɵtext(20, "Completed");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(21, "option");
            i0.ɵɵtext(22, "Needs Changes");
            i0.ɵɵelementEnd()();
            i0.ɵɵcontrolCreate();
            i0.ɵɵelementStart(23, "select", 6);
            i0.ɵɵlistener("ngModelChange", function TasksPage_Template_select_ngModelChange_23_listener($event) { ctx.priority.set($event); return ctx.page.set(1); });
            i0.ɵɵelementStart(24, "option");
            i0.ɵɵtext(25, "All");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(26, "option");
            i0.ɵɵtext(27, "High");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(28, "option");
            i0.ɵɵtext(29, "Medium");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(30, "option");
            i0.ɵɵtext(31, "Low");
            i0.ɵɵelementEnd()();
            i0.ɵɵcontrolCreate();
            i0.ɵɵelementStart(32, "label", 7)(33, "span");
            i0.ɵɵtext(34, "\u2315");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(35, "input", 8);
            i0.ɵɵlistener("ngModelChange", function TasksPage_Template_input_ngModelChange_35_listener($event) { ctx.search.set($event); return ctx.page.set(1); });
            i0.ɵɵelementEnd();
            i0.ɵɵcontrolCreate();
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(36, "div", 9)(37, "table")(38, "thead")(39, "tr")(40, "th");
            i0.ɵɵtext(41, "#");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(42, "th");
            i0.ɵɵtext(43, "Title");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(44, "th");
            i0.ɵɵtext(45, "Trainee");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(46, "th");
            i0.ɵɵtext(47, "Priority");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(48, "th");
            i0.ɵɵtext(49, "Due Date");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(50, "th");
            i0.ɵɵtext(51, "Status");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(52, "th");
            i0.ɵɵtext(53, "Review");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(54, "th");
            i0.ɵɵtext(55, "Delete");
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(56, "tbody");
            i0.ɵɵrepeaterCreate(57, TasksPage_For_58_Template, 23, 14, "tr", null, _forTrack0, false, TasksPage_ForEmpty_59_Template, 3, 0, "tr");
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(60, "app-pagination", 10);
            i0.ɵɵlistener("pageChange", function TasksPage_Template_app_pagination_pageChange_60_listener($event) { return ctx.page.set($event); });
            i0.ɵɵelementEnd()();
        } if (rf & 2) {
            i0.ɵɵadvance(12);
            i0.ɵɵproperty("ngModel", ctx.status());
            i0.ɵɵcontrol();
            i0.ɵɵadvance(11);
            i0.ɵɵproperty("ngModel", ctx.priority());
            i0.ɵɵcontrol();
            i0.ɵɵadvance(12);
            i0.ɵɵproperty("ngModel", ctx.search());
            i0.ɵɵcontrol();
            i0.ɵɵadvance(22);
            i0.ɵɵrepeater(ctx.paginated());
            i0.ɵɵadvance(3);
            i0.ɵɵproperty("totalItems", ctx.filtered().length)("pageSize", ctx.pageSize)("page", ctx.page());
        } }, dependencies: [FormsModule, i2.NgSelectOption, i2.ɵNgSelectMultipleOption, i2.DefaultValueAccessor, i2.SelectControlValueAccessor, i2.NgControlStatus, i2.NgModel, RouterLink, PaginationComponent, DatePipe], styles: ["[_nghost-%COMP%] { display: block; }\n\n.icon-link.danger[_ngcontent-%COMP%]:hover { color: #c0392b; border-color: #e6a99f; }"] });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(TasksPage, [{
        type: Component,
        args: [{ selector: 'app-tasks-page', imports: [DatePipe, FormsModule, RouterLink, PaginationComponent], template: "<div class=\"page-heading\"><div><span class=\"eyebrow\">WORKFLOW</span><h1>All Tasks</h1><p>Assign, filter and review every training task.</p></div><a class=\"primary-button\" routerLink=\"/admin/tasks/new\">\uFF0B Add Task</a></div>\n<section class=\"panel table-panel\">\n  <div class=\"toolbar\">\n    <select aria-label=\"Filter by status\" [ngModel]=\"status()\" (ngModelChange)=\"status.set($event); page.set(1)\"><option>All</option><option>Pending</option><option>In Progress</option><option>Completed</option><option>Needs Changes</option></select>\n    <select aria-label=\"Filter by priority\" [ngModel]=\"priority()\" (ngModelChange)=\"priority.set($event); page.set(1)\"><option>All</option><option>High</option><option>Medium</option><option>Low</option></select>\n    <label class=\"search-box\"><span>\u2315</span><input [ngModel]=\"search()\" (ngModelChange)=\"search.set($event); page.set(1)\" placeholder=\"Search tasks...\"></label>\n  </div>\n  <div class=\"table-wrap\"><table>\n    <thead><tr><th>#</th><th>Title</th><th>Trainee</th><th>Priority</th><th>Due Date</th><th>Status</th><th>Review</th><th>Delete</th></tr></thead>\n    <tbody>\n      @for (task of paginated(); track task.id; let i = $index) {\n        <tr><td>{{ (page() - 1) * pageSize + i + 1 }}</td><td><strong>{{ task.title }}</strong></td><td>{{ traineeName(task.traineeId) }}</td>\n          <td><span class=\"priority\" [attr.data-priority]=\"task.priority\">{{ task.priority }}</span></td><td>{{ task.dueDate | date:'MMM d, y' }}</td>\n          <td><span class=\"status\" [attr.data-status]=\"task.status\">{{ task.status }}</span></td>\n          <td><a class=\"icon-link\" [routerLink]=\"['/admin/tasks', task.id, 'review']\">\u2197</a></td>\n          <td><button type=\"button\" class=\"icon-link danger\" (click)=\"remove(task.id, task.title)\" aria-label=\"Delete task\">\u232B</button></td></tr>\n      } @empty { <tr><td colspan=\"8\" class=\"empty\">No tasks match your filters.</td></tr> }\n    </tbody>\n  </table></div>\n  <app-pagination [totalItems]=\"filtered().length\" [pageSize]=\"pageSize\" [page]=\"page()\" (pageChange)=\"page.set($event)\" />\n</section>\n", styles: [":host { display: block; }\n\n.icon-link.danger:hover { color: #c0392b; border-color: #e6a99f; }\n"] }]
    }], () => [{ type: i1.DataService }], null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(TasksPage, { className: "TasksPage", filePath: "src/app/components/tasks/tasks.page.ts", lineNumber: 11 }); })();
