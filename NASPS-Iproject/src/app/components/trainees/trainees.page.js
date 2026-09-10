import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { DataService } from '../../services/data.service';
import { ToastService } from '../../services/toast.service';
import { PaginationComponent } from '../pagination/pagination.component';
import * as i0 from "@angular/core";
import * as i1 from "@angular/forms";
const _c0 = a0 => ["/admin/trainees", a0, "edit"];
const _forTrack0 = ($index, $item) => $item.id;
function TraineesPage_Conditional_8_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "a", 2);
    i0.ɵɵtext(1, "\uFF0B Add Trainee");
    i0.ɵɵelementEnd();
} }
function TraineesPage_For_48_Template(rf, ctx) { if (rf & 1) {
    const _r1 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "tr")(1, "td");
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "td")(4, "div", 11)(5, "span", 12);
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "strong");
    i0.ɵɵtext(8);
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(9, "td")(10, "strong");
    i0.ɵɵtext(11);
    i0.ɵɵelementEnd();
    i0.ɵɵelement(12, "br");
    i0.ɵɵelementStart(13, "small");
    i0.ɵɵtext(14);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(15, "td");
    i0.ɵɵtext(16);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(17, "td");
    i0.ɵɵtext(18);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(19, "td");
    i0.ɵɵtext(20);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(21, "td");
    i0.ɵɵtext(22);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(23, "td")(24, "button", 13);
    i0.ɵɵlistener("click", function TraineesPage_For_48_Template_button_click_24_listener() { const trainee_r2 = i0.ɵɵrestoreView(_r1).$implicit; const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.toggle(trainee_r2.id, trainee_r2.status)); });
    i0.ɵɵtext(25);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(26, "td")(27, "div", 14)(28, "a", 15);
    i0.ɵɵtext(29, "\u270E");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(30, "button", 16);
    i0.ɵɵlistener("click", function TraineesPage_For_48_Template_button_click_30_listener() { const trainee_r2 = i0.ɵɵrestoreView(_r1).$implicit; const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.remove(trainee_r2.id, trainee_r2.email)); });
    i0.ɵɵtext(31, "\u232B");
    i0.ɵɵelementEnd()()()();
} if (rf & 2) {
    const trainee_r2 = ctx.$implicit;
    const ɵ$index_80_r4 = ctx.$index;
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate((ctx_r2.page() - 1) * ctx_r2.pageSize + ɵ$index_80_r4 + 1);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(trainee_r2.name.slice(0, 2).toUpperCase());
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(trainee_r2.name);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(ctx_r2.auth.usernameFor(trainee_r2.id));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate1("ID: ", trainee_r2.id);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(trainee_r2.email);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(trainee_r2.internshipProgram || "Not assigned");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(trainee_r2.department);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(trainee_r2.university || "Not specified");
    i0.ɵɵadvance(2);
    i0.ɵɵattribute("data-status", trainee_r2.status);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(trainee_r2.status);
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("routerLink", i0.ɵɵpureFunction1(12, _c0, trainee_r2.id));
} }
function TraineesPage_ForEmpty_49_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "tr")(1, "td", 17);
    i0.ɵɵtext(2, "No trainees match your search.");
    i0.ɵɵelementEnd()();
} }
export class TraineesPage {
    auth = inject(AuthService);
    toast = inject(ToastService);
    data = inject(DataService);
    search = signal('', /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "search" }] : /* istanbul ignore next */ []));
    status = signal('All', /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "status" }] : /* istanbul ignore next */ []));
    page = signal(1, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "page" }] : /* istanbul ignore next */ []));
    pageSize = 5;
    filtered = computed(() => {
        const query = this.search().toLowerCase();
        return this.data.trainees().filter(trainee => (this.status() === 'All' || trainee.status === this.status()) &&
            [trainee.name, trainee.email, this.auth.usernameFor(trainee.id), String(trainee.id), trainee.internshipProgram, trainee.department, trainee.university ?? ''].some(value => value.toLowerCase().includes(query)));
    }, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "filtered" }] : /* istanbul ignore next */ []));
    paginated = computed(() => {
        const start = (this.page() - 1) * this.pageSize;
        return this.filtered().slice(start, start + this.pageSize);
    }, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "paginated" }] : /* istanbul ignore next */ []));
    constructor() {
        void this.data.refreshTraineesFromServer();
    }
    async toggle(id, status) {
        const ok = await this.data.updateTrainee(id, { status: status === 'Active' ? 'Inactive' : 'Active' });
        this.toast.show(ok ? 'Trainee status updated.' : 'Status was not changed. Unverified trainees must remain inactive.', ok ? 'info' : 'error');
    }
    async remove(id, email) {
        if (!await this.data.deleteTrainee(id)) {
            this.toast.show('The trainee could not be removed from the server.', 'error');
            return;
        }
        this.auth.removeTrainee(email);
        if ((this.page() - 1) * this.pageSize >= this.filtered().length && this.page() > 1)
            this.page.update(page => page - 1);
        this.toast.show('Trainee removed.', 'warning');
    }
    static ɵfac = function TraineesPage_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || TraineesPage)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: TraineesPage, selectors: [["app-trainees-page"]], decls: 51, vars: 8, consts: [[1, "page-heading"], [1, "eyebrow"], ["routerLink", "/admin/trainees/new", 1, "primary-button"], [1, "panel", "table-panel"], [1, "toolbar"], [1, "search-box"], ["placeholder", "Search trainees...", 3, "ngModelChange", "ngModel"], ["aria-label", "Filter by status", 3, "ngModelChange", "ngModel"], [1, "record-count"], [1, "table-wrap"], [3, "pageChange", "totalItems", "pageSize", "page"], [1, "name-cell"], [1, "mini-avatar"], [1, "status", 3, "click"], [1, "actions"], ["title", "Edit trainee", 3, "routerLink"], ["type", "button", "title", "Remove trainee", 3, "click"], ["colspan", "9", 1, "empty"]], template: function TraineesPage_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0)(1, "div")(2, "span", 1);
            i0.ɵɵtext(3, "TEAM");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(4, "h1");
            i0.ɵɵtext(5, "Trainees");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(6, "p");
            i0.ɵɵtext(7, "Manage trainee profiles, internship programs and departments.");
            i0.ɵɵelementEnd()();
            i0.ɵɵconditionalCreate(8, TraineesPage_Conditional_8_Template, 2, 0, "a", 2);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(9, "section", 3)(10, "div", 4)(11, "label", 5)(12, "span");
            i0.ɵɵtext(13, "\u2315");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(14, "input", 6);
            i0.ɵɵlistener("ngModelChange", function TraineesPage_Template_input_ngModelChange_14_listener($event) { ctx.search.set($event); return ctx.page.set(1); });
            i0.ɵɵelementEnd();
            i0.ɵɵcontrolCreate();
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(15, "select", 7);
            i0.ɵɵlistener("ngModelChange", function TraineesPage_Template_select_ngModelChange_15_listener($event) { ctx.status.set($event); return ctx.page.set(1); });
            i0.ɵɵelementStart(16, "option");
            i0.ɵɵtext(17, "All");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(18, "option");
            i0.ɵɵtext(19, "Active");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(20, "option");
            i0.ɵɵtext(21, "Inactive");
            i0.ɵɵelementEnd()();
            i0.ɵɵcontrolCreate();
            i0.ɵɵelementStart(22, "span", 8);
            i0.ɵɵtext(23);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(24, "div", 9)(25, "table")(26, "thead")(27, "tr")(28, "th");
            i0.ɵɵtext(29, "#");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(30, "th");
            i0.ɵɵtext(31, "Name");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(32, "th");
            i0.ɵɵtext(33, "Login ID");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(34, "th");
            i0.ɵɵtext(35, "Email");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(36, "th");
            i0.ɵɵtext(37, "Internship Program");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(38, "th");
            i0.ɵɵtext(39, "Department");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(40, "th");
            i0.ɵɵtext(41, "University");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(42, "th");
            i0.ɵɵtext(43, "Status");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(44, "th");
            i0.ɵɵtext(45, "Actions");
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(46, "tbody");
            i0.ɵɵrepeaterCreate(47, TraineesPage_For_48_Template, 32, 14, "tr", null, _forTrack0, false, TraineesPage_ForEmpty_49_Template, 3, 0, "tr");
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(50, "app-pagination", 10);
            i0.ɵɵlistener("pageChange", function TraineesPage_Template_app_pagination_pageChange_50_listener($event) { return ctx.page.set($event); });
            i0.ɵɵelementEnd()();
        } if (rf & 2) {
            i0.ɵɵadvance(8);
            i0.ɵɵconditional(!ctx.auth.identity().isSuperAdmin ? 8 : -1);
            i0.ɵɵadvance(6);
            i0.ɵɵproperty("ngModel", ctx.search());
            i0.ɵɵcontrol();
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngModel", ctx.status());
            i0.ɵɵcontrol();
            i0.ɵɵadvance(8);
            i0.ɵɵtextInterpolate1("", ctx.filtered().length, " trainees");
            i0.ɵɵadvance(24);
            i0.ɵɵrepeater(ctx.paginated());
            i0.ɵɵadvance(3);
            i0.ɵɵproperty("totalItems", ctx.filtered().length)("pageSize", ctx.pageSize)("page", ctx.page());
        } }, dependencies: [FormsModule, i1.NgSelectOption, i1.ɵNgSelectMultipleOption, i1.DefaultValueAccessor, i1.SelectControlValueAccessor, i1.NgControlStatus, i1.NgModel, RouterLink, PaginationComponent], styles: ["[_nghost-%COMP%] { display: block; }"] });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(TraineesPage, [{
        type: Component,
        args: [{ selector: 'app-trainees-page', imports: [FormsModule, RouterLink, PaginationComponent], template: "<div class=\"page-heading\">\n  <div><span class=\"eyebrow\">TEAM</span><h1>Trainees</h1><p>Manage trainee profiles, internship programs and departments.</p></div>\n  @if (!auth.identity().isSuperAdmin) { <a class=\"primary-button\" routerLink=\"/admin/trainees/new\">\uFF0B Add Trainee</a> }\n</div>\n<section class=\"panel table-panel\">\n  <div class=\"toolbar\">\n    <label class=\"search-box\"><span>\u2315</span><input [ngModel]=\"search()\" (ngModelChange)=\"search.set($event); page.set(1)\" placeholder=\"Search trainees...\"></label>\n    <select aria-label=\"Filter by status\" [ngModel]=\"status()\" (ngModelChange)=\"status.set($event); page.set(1)\"><option>All</option><option>Active</option><option>Inactive</option></select>\n    <span class=\"record-count\">{{ filtered().length }} trainees</span>\n  </div>\n  <div class=\"table-wrap\"><table>\n    <thead><tr><th>#</th><th>Name</th><th>Login ID</th><th>Email</th><th>Internship Program</th><th>Department</th><th>University</th><th>Status</th><th>Actions</th></tr></thead>\n    <tbody>\n      @for (trainee of paginated(); track trainee.id; let i = $index) {\n        <tr>\n          <td>{{ (page() - 1) * pageSize + i + 1 }}</td>\n          <td><div class=\"name-cell\"><span class=\"mini-avatar\">{{ trainee.name.slice(0, 2).toUpperCase() }}</span><strong>{{ trainee.name }}</strong></div></td>\n          <td><strong>{{ auth.usernameFor(trainee.id) }}</strong><br><small>ID: {{ trainee.id }}</small></td>\n          <td>{{ trainee.email }}</td><td>{{ trainee.internshipProgram || 'Not assigned' }}</td><td>{{ trainee.department }}</td><td>{{ trainee.university || 'Not specified' }}</td>\n          <td><button class=\"status\" [attr.data-status]=\"trainee.status\" (click)=\"toggle(trainee.id, trainee.status)\">{{ trainee.status }}</button></td>\n          <td><div class=\"actions\"><a [routerLink]=\"['/admin/trainees', trainee.id, 'edit']\" title=\"Edit trainee\">\u270E</a><button type=\"button\" (click)=\"remove(trainee.id, trainee.email)\" title=\"Remove trainee\">\u232B</button></div></td>\n        </tr>\n      } @empty { <tr><td colspan=\"9\" class=\"empty\">No trainees match your search.</td></tr> }\n    </tbody>\n  </table></div>\n  <app-pagination [totalItems]=\"filtered().length\" [pageSize]=\"pageSize\" [page]=\"page()\" (pageChange)=\"page.set($event)\" />\n</section>\n", styles: [":host { display: block; }\n"] }]
    }], () => [], null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(TraineesPage, { className: "TraineesPage", filePath: "src/app/components/trainees/trainees.page.ts", lineNumber: 16 }); })();
