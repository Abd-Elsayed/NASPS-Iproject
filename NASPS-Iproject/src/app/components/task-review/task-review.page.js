import { Component, computed, effect, inject, signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { DataService } from '../../services/data.service';
import { ToastService } from '../../services/toast.service';
import { AttachmentComponent } from '../attachment/attachment.component';
import * as i0 from "@angular/core";
import * as i1 from "@angular/forms";
function TaskReviewPage_Conditional_10_Conditional_38_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p")(1, "a", 16);
    i0.ɵɵtext(2, "Open submitted link \u2197");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const task_r3 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵproperty("href", task_r3.submission, i0.ɵɵsanitizeUrl);
} }
function TaskReviewPage_Conditional_10_Template(rf, ctx) { if (rf & 1) {
    const _r1 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "section", 3)(1, "article", 5)(2, "h2");
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "span", 6);
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "dl")(7, "div")(8, "dt");
    i0.ɵɵtext(9, "Trainee");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(10, "dd");
    i0.ɵɵtext(11);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(12, "div")(13, "dt");
    i0.ɵɵtext(14, "Due Date");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(15, "dd");
    i0.ɵɵtext(16);
    i0.ɵɵpipe(17, "date");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(18, "div")(19, "dt");
    i0.ɵɵtext(20, "Priority");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(21, "dd")(22, "span", 7);
    i0.ɵɵtext(23);
    i0.ɵɵelementEnd()()()()();
    i0.ɵɵelementStart(24, "article", 8)(25, "div")(26, "span", 9);
    i0.ɵɵtext(27, "Description");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(28, "p");
    i0.ɵɵtext(29);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(30, "div")(31, "span", 9);
    i0.ɵɵtext(32, "Assignment Attachment");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(33, "app-attachment", 10);
    i0.ɵɵlistener("download", function TaskReviewPage_Conditional_10_Template_app_attachment_download_33_listener() { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.downloadAssignment()); })("remove", function TaskReviewPage_Conditional_10_Template_app_attachment_remove_33_listener() { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.removeAssignmentAttachment()); });
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(34, "div")(35, "span", 9);
    i0.ɵɵtext(36, "Trainee Submission");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(37, "app-attachment", 11);
    i0.ɵɵlistener("download", function TaskReviewPage_Conditional_10_Template_app_attachment_download_37_listener() { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.downloadSubmission()); })("remove", function TaskReviewPage_Conditional_10_Template_app_attachment_remove_37_listener() { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.removeSubmission()); });
    i0.ɵɵelementEnd();
    i0.ɵɵconditionalCreate(38, TaskReviewPage_Conditional_10_Conditional_38_Template, 3, 1, "p");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(39, "label");
    i0.ɵɵtext(40, "Admin Review");
    i0.ɵɵelementStart(41, "textarea", 12);
    i0.ɵɵlistener("ngModelChange", function TaskReviewPage_Conditional_10_Template_textarea_ngModelChange_41_listener($event) { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.review.set($event)); });
    i0.ɵɵelementEnd();
    i0.ɵɵcontrolCreate();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(42, "div", 13)(43, "button", 14);
    i0.ɵɵlistener("click", function TaskReviewPage_Conditional_10_Template_button_click_43_listener() { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.decide(false)); });
    i0.ɵɵtext(44, "Request Changes");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(45, "button", 15);
    i0.ɵɵlistener("click", function TaskReviewPage_Conditional_10_Template_button_click_45_listener() { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.decide(true)); });
    i0.ɵɵtext(46, "Approve Task");
    i0.ɵɵelementEnd()()()();
} if (rf & 2) {
    const task_r3 = ctx;
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(task_r3.title);
    i0.ɵɵadvance();
    i0.ɵɵattribute("data-status", task_r3.status);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(task_r3.status);
    i0.ɵɵadvance(6);
    i0.ɵɵtextInterpolate(ctx_r1.traineeName());
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(17, 18, task_r3.dueDate, "longDate"));
    i0.ɵɵadvance(6);
    i0.ɵɵattribute("data-priority", task_r3.priority);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(task_r3.priority);
    i0.ɵɵadvance(6);
    i0.ɵɵtextInterpolate(task_r3.description);
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("name", task_r3.attachment)("size", task_r3.attachmentSize)("downloadable", true)("removable", true);
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("name", task_r3.submissionName || task_r3.submission)("size", task_r3.submissionSize)("downloadable", !!task_r3.submissionName)("removable", true);
    i0.ɵɵadvance();
    i0.ɵɵconditional(task_r3.submission?.startsWith("http") ? 38 : -1);
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("ngModel", ctx_r1.review());
    i0.ɵɵcontrol();
} }
function TaskReviewPage_Conditional_11_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "section", 4);
    i0.ɵɵtext(1, "Task not found.");
    i0.ɵɵelementEnd();
} }
export class TaskReviewPage {
    route = inject(ActivatedRoute);
    router = inject(Router);
    toast = inject(ToastService);
    data = inject(DataService);
    id = Number(this.route.snapshot.paramMap.get('id'));
    task = computed(() => this.data.tasks().find(item => item.id === this.id), /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "task" }] : /* istanbul ignore next */ []));
    review = signal('', /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "review" }] : /* istanbul ignore next */ []));
    reviewLoaded = false;
    constructor() {
        void this.data.refreshTasksFromServer();
        void this.data.refreshTraineesFromServer();
        effect(() => {
            const task = this.task();
            if (task && !this.reviewLoaded) {
                this.review.set(task.adminReview ?? '');
                this.reviewLoaded = true;
            }
        });
    }
    traineeName() {
        return this.data.trainees().find(item => item.id === this.task()?.traineeId)?.name ?? 'Unassigned';
    }
    async removeAssignmentAttachment() {
        const task = this.task();
        if (!task)
            return;
        const ok = await this.data.updateTask(task.id, { clearAttachment: true });
        this.toast.show(ok ? 'Assignment attachment removed.' : 'The attachment could not be removed from the server.', ok ? 'info' : 'error');
    }
    async removeSubmission() {
        const task = this.task();
        if (!task)
            return;
        const ok = await this.data.updateTask(task.id, { clearSubmission: true });
        this.toast.show(ok ? 'Submission cleared.' : 'The submission could not be cleared from the server.', ok ? 'warning' : 'error');
    }
    async downloadAssignment() {
        const task = this.task();
        if (!task?.attachment)
            return;
        if (!await this.data.downloadTaskAttachment(task.id, task.attachment))
            this.toast.show('The assignment file is not stored on the server. Re-upload it from the task form.', 'error');
    }
    async downloadSubmission() {
        const task = this.task();
        const name = task?.submissionName;
        if (!task || !name)
            return;
        if (!await this.data.downloadTaskSubmission(task.id, name))
            this.toast.show('The trainee submission could not be downloaded from the server.', 'error');
    }
    async decide(approved) {
        const task = this.task();
        if (!task) {
            this.toast.show('Task not found.', 'error');
            return;
        }
        if (!approved && this.review().trim().length < 5) {
            this.toast.show('Add clear feedback before requesting changes.', 'error');
            return;
        }
        const ok = await this.data.updateTask(task.id, {
            status: approved ? 'Completed' : 'Needs Changes',
            adminReview: this.review().trim() || 'Approved.',
        });
        if (!ok) {
            this.toast.show('The review and note could not be saved on the server.', 'error');
            return;
        }
        this.toast.show(approved ? 'Task approved successfully.' : 'Changes requested and feedback saved.', approved ? 'success' : 'warning');
        this.router.navigate(['/admin/tasks']);
    }
    static ɵfac = function TaskReviewPage_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || TaskReviewPage)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: TaskReviewPage, selectors: [["app-task-review-page"]], decls: 12, vars: 1, consts: [[1, "page-heading"], [1, "eyebrow"], ["routerLink", "/admin/tasks", 1, "secondary-button"], [1, "detail-grid"], [1, "panel", "empty"], [1, "panel", "detail-summary"], [1, "status"], [1, "priority"], [1, "panel", "detail-body"], [1, "field-label"], ["placeholder", "No assignment attachment", 3, "download", "remove", "name", "size", "downloadable", "removable"], ["placeholder", "No submission yet", 3, "download", "remove", "name", "size", "downloadable", "removable"], ["rows", "5", "placeholder", "Write your review...", 3, "ngModelChange", "ngModel"], [1, "form-actions"], [1, "secondary-button", "warning", 3, "click"], [1, "success-button", 3, "click"], ["target", "_blank", "rel", "noopener noreferrer", 3, "href"]], template: function TaskReviewPage_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0)(1, "div")(2, "span", 1);
            i0.ɵɵtext(3, "QUALITY CHECK");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(4, "h1");
            i0.ɵɵtext(5, "Review Task");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(6, "p");
            i0.ɵɵtext(7, "Inspect the assignment and record your decision.");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(8, "a", 2);
            i0.ɵɵtext(9, "\u2190 All Tasks");
            i0.ɵɵelementEnd()();
            i0.ɵɵconditionalCreate(10, TaskReviewPage_Conditional_10_Template, 47, 21, "section", 3)(11, TaskReviewPage_Conditional_11_Template, 2, 0, "section", 4);
        } if (rf & 2) {
            let tmp_0_0;
            i0.ɵɵadvance(10);
            i0.ɵɵconditional((tmp_0_0 = ctx.task()) ? 10 : 11, tmp_0_0);
        } }, dependencies: [FormsModule, i1.DefaultValueAccessor, i1.NgControlStatus, i1.NgModel, RouterLink, AttachmentComponent, DatePipe], styles: ["[_nghost-%COMP%] { display: block; }"] });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(TaskReviewPage, [{
        type: Component,
        args: [{ selector: 'app-task-review-page', imports: [DatePipe, FormsModule, RouterLink, AttachmentComponent], template: "<div class=\"page-heading\"><div><span class=\"eyebrow\">QUALITY CHECK</span><h1>Review Task</h1><p>Inspect the assignment and record your decision.</p></div><a class=\"secondary-button\" routerLink=\"/admin/tasks\">\u2190 All Tasks</a></div>\n@if (task(); as task) {\n  <section class=\"detail-grid\">\n    <article class=\"panel detail-summary\">\n      <h2>{{ task.title }}</h2><span class=\"status\" [attr.data-status]=\"task.status\">{{ task.status }}</span>\n      <dl><div><dt>Trainee</dt><dd>{{ traineeName() }}</dd></div><div><dt>Due Date</dt><dd>{{ task.dueDate | date:'longDate' }}</dd></div><div><dt>Priority</dt><dd><span class=\"priority\" [attr.data-priority]=\"task.priority\">{{ task.priority }}</span></dd></div></dl>\n    </article>\n    <article class=\"panel detail-body\">\n      <div><span class=\"field-label\">Description</span><p>{{ task.description }}</p></div>\n      <div><span class=\"field-label\">Assignment Attachment</span>\n        <app-attachment [name]=\"task.attachment\" [size]=\"task.attachmentSize\" placeholder=\"No assignment attachment\" [downloadable]=\"true\" (download)=\"downloadAssignment()\" [removable]=\"true\" (remove)=\"removeAssignmentAttachment()\" />\n      </div>\n      <div><span class=\"field-label\">Trainee Submission</span>\n        <app-attachment [name]=\"task.submissionName || task.submission\" [size]=\"task.submissionSize\" placeholder=\"No submission yet\" [downloadable]=\"!!task.submissionName\" (download)=\"downloadSubmission()\" [removable]=\"true\" (remove)=\"removeSubmission()\" />\n        @if (task.submission?.startsWith('http')) { <p><a [href]=\"task.submission\" target=\"_blank\" rel=\"noopener noreferrer\">Open submitted link \u2197</a></p> }\n      </div>\n      <label>Admin Review<textarea [ngModel]=\"review()\" (ngModelChange)=\"review.set($event)\" rows=\"5\" placeholder=\"Write your review...\"></textarea></label>\n      <div class=\"form-actions\"><button class=\"secondary-button warning\" (click)=\"decide(false)\">Request Changes</button><button class=\"success-button\" (click)=\"decide(true)\">Approve Task</button></div>\n    </article>\n  </section>\n} @else { <section class=\"panel empty\">Task not found.</section> }\n", styles: [":host { display: block; }\n"] }]
    }], () => [], null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(TaskReviewPage, { className: "TaskReviewPage", filePath: "src/app/components/task-review/task-review.page.ts", lineNumber: 15 }); })();
