import { Component, computed, inject } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { DataService } from '../../services/data.service';
import { ToastService } from '../../services/toast.service';
import { AttachmentComponent } from '../attachment/attachment.component';
import * as i0 from "@angular/core";
import * as i1 from "@angular/forms";
function TraineeTaskDetailsPage_Conditional_10_Conditional_52_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "small");
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate2("", ctx_r1.selectedFile.type || "File", " \u00B7 ", ctx_r1.formatFileSize(ctx_r1.selectedFile.size));
} }
function TraineeTaskDetailsPage_Conditional_10_Conditional_56_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 16);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx_r1.submissionError);
} }
function TraineeTaskDetailsPage_Conditional_10_Conditional_57_Conditional_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "a", 22);
    i0.ɵɵtext(1, "Open submitted link \u2197");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const task_r4 = i0.ɵɵnextContext(2);
    i0.ɵɵproperty("href", task_r4.submission, i0.ɵɵsanitizeUrl);
} }
function TraineeTaskDetailsPage_Conditional_10_Conditional_57_Template(rf, ctx) { if (rf & 1) {
    const _r3 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 17)(1, "strong");
    i0.ɵɵtext(2, "Current submission:");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "app-attachment", 21);
    i0.ɵɵlistener("download", function TraineeTaskDetailsPage_Conditional_10_Conditional_57_Template_app_attachment_download_3_listener() { i0.ɵɵrestoreView(_r3); const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.downloadSubmission()); })("remove", function TraineeTaskDetailsPage_Conditional_10_Conditional_57_Template_app_attachment_remove_3_listener() { i0.ɵɵrestoreView(_r3); const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.removeSubmission()); });
    i0.ɵɵelementEnd();
    i0.ɵɵconditionalCreate(4, TraineeTaskDetailsPage_Conditional_10_Conditional_57_Conditional_4_Template, 2, 1, "a", 22);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const task_r4 = i0.ɵɵnextContext();
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("name", task_r4.submissionName || task_r4.submission)("size", task_r4.submissionSize)("downloadable", !!task_r4.submissionName)("removable", true);
    i0.ɵɵadvance();
    i0.ɵɵconditional(task_r4.submission?.startsWith("http") ? 4 : -1);
} }
function TraineeTaskDetailsPage_Conditional_10_Conditional_61_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "section", 20)(1, "div")(2, "span", 10);
    i0.ɵɵtext(3, "Admin Feedback");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "p");
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const task_r4 = i0.ɵɵnextContext();
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(task_r4.adminReview);
} }
function TraineeTaskDetailsPage_Conditional_10_Template(rf, ctx) { if (rf & 1) {
    const _r1 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "section", 3)(1, "article", 5)(2, "h2");
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "span", 6);
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "dl")(7, "div")(8, "dt");
    i0.ɵɵtext(9, "Assigned By");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(10, "dd");
    i0.ɵɵtext(11, "Admin User");
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
    i0.ɵɵelementEnd()()()();
    i0.ɵɵelementStart(24, "button", 8);
    i0.ɵɵlistener("click", function TraineeTaskDetailsPage_Conditional_10_Template_button_click_24_listener() { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.start()); });
    i0.ɵɵtext(25, "Mark In Progress");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(26, "article", 9)(27, "div")(28, "span", 10);
    i0.ɵɵtext(29, "Description");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(30, "p");
    i0.ɵɵtext(31);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(32, "div")(33, "span", 10);
    i0.ɵɵtext(34, "Task Attachment");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(35, "app-attachment", 11);
    i0.ɵɵlistener("download", function TraineeTaskDetailsPage_Conditional_10_Template_app_attachment_download_35_listener() { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.downloadAssignment()); });
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(36, "div")(37, "span", 10);
    i0.ɵɵtext(38, "Instructions");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(39, "p");
    i0.ɵɵtext(40);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(41, "section", 12)(42, "div")(43, "span", 10);
    i0.ɵɵtext(44, "Submit your work");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(45, "p");
    i0.ɵɵtext(46, "Upload one supported file, add a link, or use both.");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(47, "label", 13);
    i0.ɵɵtext(48, "Attachment ");
    i0.ɵɵelementStart(49, "input", 14);
    i0.ɵɵlistener("change", function TraineeTaskDetailsPage_Conditional_10_Template_input_change_49_listener($event) { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.onFileSelected($event)); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(50, "span");
    i0.ɵɵtext(51);
    i0.ɵɵelementEnd();
    i0.ɵɵconditionalCreate(52, TraineeTaskDetailsPage_Conditional_10_Conditional_52_Template, 2, 2, "small");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(53, "label");
    i0.ɵɵtext(54, "Submission Link (optional)");
    i0.ɵɵelementStart(55, "input", 15);
    i0.ɵɵtwoWayListener("ngModelChange", function TraineeTaskDetailsPage_Conditional_10_Template_input_ngModelChange_55_listener($event) { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); i0.ɵɵtwoWayBindingSet(ctx_r1.submissionLink, $event) || (ctx_r1.submissionLink = $event); return i0.ɵɵresetView($event); });
    i0.ɵɵelementEnd();
    i0.ɵɵcontrolCreate();
    i0.ɵɵelementEnd();
    i0.ɵɵconditionalCreate(56, TraineeTaskDetailsPage_Conditional_10_Conditional_56_Template, 2, 1, "p", 16);
    i0.ɵɵconditionalCreate(57, TraineeTaskDetailsPage_Conditional_10_Conditional_57_Template, 5, 5, "div", 17);
    i0.ɵɵelementStart(58, "div", 18)(59, "button", 19);
    i0.ɵɵlistener("click", function TraineeTaskDetailsPage_Conditional_10_Template_button_click_59_listener() { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.submit()); });
    i0.ɵɵtext(60, "Submit Attachment");
    i0.ɵɵelementEnd()()();
    i0.ɵɵconditionalCreate(61, TraineeTaskDetailsPage_Conditional_10_Conditional_61_Template, 6, 1, "section", 20);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const task_r4 = ctx;
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(task_r4.title);
    i0.ɵɵadvance();
    i0.ɵɵattribute("data-status", task_r4.status);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(task_r4.status);
    i0.ɵɵadvance(11);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(17, 18, task_r4.dueDate, "longDate"));
    i0.ɵɵadvance(6);
    i0.ɵɵattribute("data-priority", task_r4.priority);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(task_r4.priority);
    i0.ɵɵadvance(8);
    i0.ɵɵtextInterpolate(task_r4.description);
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("name", task_r4.attachment)("size", task_r4.attachmentSize)("downloadable", true);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(task_r4.instructions || "Complete the task and submit your findings.");
    i0.ɵɵadvance(9);
    i0.ɵɵproperty("accept", ctx_r1.accept);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r1.selectedFile?.name || task_r4.submissionName || "Choose PDF, image, document, archive, text or code file");
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r1.selectedFile ? 52 : -1);
    i0.ɵɵadvance(3);
    i0.ɵɵtwoWayProperty("ngModel", ctx_r1.submissionLink);
    i0.ɵɵcontrol();
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r1.submissionError ? 56 : -1);
    i0.ɵɵadvance();
    i0.ɵɵconditional(task_r4.submissionName || task_r4.submission ? 57 : -1);
    i0.ɵɵadvance(4);
    i0.ɵɵconditional(task_r4.adminReview ? 61 : -1);
} }
function TraineeTaskDetailsPage_Conditional_11_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "section", 4);
    i0.ɵɵtext(1, "Task not found or it is not assigned to your trainee account.");
    i0.ɵɵelementEnd();
} }
export class TraineeTaskDetailsPage {
    route = inject(ActivatedRoute);
    auth = inject(AuthService);
    toast = inject(ToastService);
    data = inject(DataService);
    id = Number(this.route.snapshot.paramMap.get('id'));
    task = computed(() => this.data.tasks().find(item => item.id === this.id && item.traineeId === this.auth.currentTraineeId()), /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "task" }] : /* istanbul ignore next */ []));
    submissionLink = this.task()?.submission?.startsWith('http') ? this.task()?.submission ?? '' : '';
    selectedFile = null;
    submissionError = '';
    accept = '.pdf,.png,.jpg,.jpeg,.gif,.webp,.txt,.md,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.zip,.rar,.html,.css,.js,.ts,.tsx,.jsx,.json,.xml,.csv,.py,.java,.c,.cpp,.cs,.sql';
    allowedExtensions = new Set(this.accept.split(','));
    maxSize = 10 * 1024 * 1024;
    async start() {
        const task = this.task();
        if (!task)
            return;
        if (task.status === 'Completed') {
            this.toast.show('Completed tasks cannot be restarted.', 'warning');
            return;
        }
        const ok = await this.data.updateTask(task.id, { status: 'In Progress' });
        this.toast.show(ok ? 'Task marked as In Progress.' : 'The task could not be updated on the server.', ok ? 'info' : 'error');
    }
    async removeSubmission() {
        const task = this.task();
        if (!task)
            return;
        if (!await this.data.updateTask(task.id, { clearSubmission: true })) {
            this.toast.show('The submission could not be removed from the server.', 'error');
            return;
        }
        this.submissionLink = '';
        this.selectedFile = null;
        this.toast.show('Submission removed.', 'info');
    }
    async downloadAssignment() {
        const task = this.task();
        if (!task?.attachment)
            return;
        if (!await this.data.downloadTaskAttachment(task.id, task.attachment))
            this.toast.show('The assignment file is not available on the server. Ask the admin to upload it again.', 'error');
    }
    async downloadSubmission() {
        const task = this.task();
        const name = task?.submissionName;
        if (!task || !name)
            return;
        if (!await this.data.downloadTaskSubmission(task.id, name))
            this.toast.show('Your submitted file could not be downloaded from the server.', 'error');
    }
    onFileSelected(event) {
        this.submissionError = '';
        const input = event.target;
        const file = input.files?.[0] ?? null;
        if (!file) {
            this.selectedFile = null;
            return;
        }
        const extension = `.${file.name.split('.').pop()?.toLowerCase() ?? ''}`;
        if (!this.allowedExtensions.has(extension)) {
            this.selectedFile = null;
            input.value = '';
            this.submissionError = 'Unsupported file. Upload a document, image, archive, text, or source-code file.';
            this.toast.show(this.submissionError, 'error');
            return;
        }
        if (file.size > this.maxSize) {
            this.selectedFile = null;
            input.value = '';
            this.submissionError = 'The selected file is larger than 10 MB.';
            this.toast.show(this.submissionError, 'error');
            return;
        }
        this.selectedFile = file;
        this.toast.show(`${file.name} is ready to submit.`, 'info');
    }
    async submit() {
        const task = this.task();
        if (!task) {
            this.toast.show('This task is not available for your account.', 'error');
            return;
        }
        const link = this.submissionLink.trim();
        if (link && !this.isValidLink(link)) {
            this.submissionError = 'Enter a complete http:// or https:// submission link.';
            this.toast.show(this.submissionError, 'error');
            return;
        }
        if (!link && !this.selectedFile) {
            this.submissionError = 'Choose a file or enter a valid submission link.';
            this.toast.show(this.submissionError, 'error');
            return;
        }
        const file = this.selectedFile;
        if (file && !await this.data.uploadTaskSubmission(task.id, file)) {
            this.submissionError = 'The file could not be uploaded. Check that the API and database are running, then try again.';
            this.toast.show(this.submissionError, 'error');
            return;
        }
        const saved = await this.data.updateTask(task.id, {
            submission: link || undefined,
            status: 'In Progress',
        });
        if (!saved) {
            this.submissionError = 'The submission details could not be saved on the server.';
            this.toast.show(this.submissionError, 'error');
            return;
        }
        await this.data.refreshTasksFromServer(this.auth.currentTraineeId());
        void this.data.refreshNotificationsFromServer();
        this.submissionError = '';
        this.toast.show('Submission saved. The admin can now review it.');
    }
    formatFileSize(size) {
        if (!size)
            return '';
        return size < 1024 * 1024 ? `${Math.ceil(size / 1024)} KB` : `${(size / 1024 / 1024).toFixed(1)} MB`;
    }
    isValidLink(value) {
        try {
            const url = new URL(value);
            return url.protocol === 'http:' || url.protocol === 'https:';
        }
        catch {
            return false;
        }
    }
    static ɵfac = function TraineeTaskDetailsPage_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || TraineeTaskDetailsPage)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: TraineeTaskDetailsPage, selectors: [["app-trainee-task-details-page"]], decls: 12, vars: 1, consts: [[1, "page-heading"], [1, "eyebrow"], ["routerLink", "/trainee/tasks", 1, "secondary-button"], [1, "detail-grid"], [1, "panel", "empty"], [1, "panel", "detail-summary"], [1, "status"], [1, "priority"], ["type", "button", 1, "secondary-button", 3, "click"], [1, "panel", "detail-body"], [1, "field-label"], ["placeholder", "No attachment", 3, "download", "name", "size", "downloadable"], [1, "submission-box"], [1, "upload-zone"], ["type", "file", 3, "change", "accept"], ["type", "url", "placeholder", "https://github.com/... or https://drive.google.com/...", 3, "ngModelChange", "ngModel"], ["role", "alert", 1, "form-error"], [1, "saved-submission"], [1, "form-actions"], ["type", "button", 1, "primary-button", 3, "click"], [1, "submission-box", "admin-feedback"], [3, "download", "remove", "name", "size", "downloadable", "removable"], ["target", "_blank", "rel", "noopener noreferrer", 3, "href"]], template: function TraineeTaskDetailsPage_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0)(1, "div")(2, "span", 1);
            i0.ɵɵtext(3, "ASSIGNMENT");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(4, "h1");
            i0.ɵɵtext(5, "Task Details");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(6, "p");
            i0.ɵɵtext(7, "Review the brief and submit your work.");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(8, "a", 2);
            i0.ɵɵtext(9, "\u2190 My Tasks");
            i0.ɵɵelementEnd()();
            i0.ɵɵconditionalCreate(10, TraineeTaskDetailsPage_Conditional_10_Template, 62, 21, "section", 3)(11, TraineeTaskDetailsPage_Conditional_11_Template, 2, 0, "section", 4);
        } if (rf & 2) {
            let tmp_0_0;
            i0.ɵɵadvance(10);
            i0.ɵɵconditional((tmp_0_0 = ctx.task()) ? 10 : 11, tmp_0_0);
        } }, dependencies: [FormsModule, i1.DefaultValueAccessor, i1.NgControlStatus, i1.NgModel, RouterLink, AttachmentComponent, DatePipe], styles: [".submission-box[_ngcontent-%COMP%] { display: grid; gap: 15px; padding: 18px; border: 1px solid #d7e5ee; border-radius: 12px; background: #f9fcfe; }.submission-box[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] { margin-bottom: 0; }.upload-zone[_ngcontent-%COMP%] { padding: 14px; border: 1px dashed #9ebfd3; border-radius: 10px; background: #fff; cursor: pointer; }.upload-zone[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] { min-height: auto; padding: 0; border: 0; box-shadow: none; }.upload-zone[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] { color: var(--%NS%blue-dark); font-size: 11px; }.upload-zone[_ngcontent-%COMP%]   small[_ngcontent-%COMP%], .frontend-note[_ngcontent-%COMP%] { color: var(--%NS%muted); font-size: 9px; line-height: 1.5; }.saved-submission[_ngcontent-%COMP%] { padding: 10px 12px; border-radius: 8px; color: #365d4e !important; background: #eaf7f1; word-break: break-all; }.submission-box[_ngcontent-%COMP%]   .form-actions[_ngcontent-%COMP%] { margin-top: 0; }"] });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(TraineeTaskDetailsPage, [{
        type: Component,
        args: [{ selector: 'app-trainee-task-details-page', imports: [DatePipe, FormsModule, RouterLink, AttachmentComponent], template: "<div class=\"page-heading\"><div><span class=\"eyebrow\">ASSIGNMENT</span><h1>Task Details</h1><p>Review the brief and submit your work.</p></div><a class=\"secondary-button\" routerLink=\"/trainee/tasks\">\u2190 My Tasks</a></div>\n@if (task(); as task) {\n  <section class=\"detail-grid\">\n    <article class=\"panel detail-summary\"><h2>{{ task.title }}</h2><span class=\"status\" [attr.data-status]=\"task.status\">{{ task.status }}</span><dl><div><dt>Assigned By</dt><dd>Admin User</dd></div><div><dt>Due Date</dt><dd>{{ task.dueDate | date:'longDate' }}</dd></div><div><dt>Priority</dt><dd><span class=\"priority\" [attr.data-priority]=\"task.priority\">{{ task.priority }}</span></dd></div></dl><button class=\"secondary-button\" type=\"button\" (click)=\"start()\">Mark In Progress</button></article>\n    <article class=\"panel detail-body\">\n      <div><span class=\"field-label\">Description</span><p>{{ task.description }}</p></div>\n      <div><span class=\"field-label\">Task Attachment</span>\n        <app-attachment [name]=\"task.attachment\" [size]=\"task.attachmentSize\" placeholder=\"No attachment\" [downloadable]=\"true\" (download)=\"downloadAssignment()\" />\n      </div>\n      <div><span class=\"field-label\">Instructions</span><p>{{ task.instructions || 'Complete the task and submit your findings.' }}</p></div>\n      <section class=\"submission-box\">\n        <div><span class=\"field-label\">Submit your work</span><p>Upload one supported file, add a link, or use both.</p></div>\n        <label class=\"upload-zone\">Attachment\n          <input type=\"file\" [accept]=\"accept\" (change)=\"onFileSelected($event)\">\n          <span>{{ selectedFile?.name || task.submissionName || 'Choose PDF, image, document, archive, text or code file' }}</span>\n          @if (selectedFile) { <small>{{ selectedFile.type || 'File' }} \u00B7 {{ formatFileSize(selectedFile.size) }}</small> }\n        </label>\n        <label>Submission Link (optional)<input type=\"url\" [(ngModel)]=\"submissionLink\" placeholder=\"https://github.com/... or https://drive.google.com/...\"></label>\n        @if (submissionError) { <p class=\"form-error\" role=\"alert\">{{ submissionError }}</p> }\n        @if (task.submissionName || task.submission) {\n          <div class=\"saved-submission\"><strong>Current submission:</strong>\n            <app-attachment [name]=\"task.submissionName || task.submission\" [size]=\"task.submissionSize\" [downloadable]=\"!!task.submissionName\" (download)=\"downloadSubmission()\" [removable]=\"true\" (remove)=\"removeSubmission()\" />\n            @if (task.submission?.startsWith('http')) { <a [href]=\"task.submission\" target=\"_blank\" rel=\"noopener noreferrer\">Open submitted link \u2197</a> }\n          </div>\n        }\n        <div class=\"form-actions\"><button class=\"primary-button\" type=\"button\" (click)=\"submit()\">Submit Attachment</button></div>\n      </section>\n      @if (task.adminReview) {\n        <section class=\"submission-box admin-feedback\"><div><span class=\"field-label\">Admin Feedback</span><p>{{ task.adminReview }}</p></div></section>\n      }\n    </article>\n  </section>\n} @else { <section class=\"panel empty\">Task not found or it is not assigned to your trainee account.</section> }\n", styles: [".submission-box { display: grid; gap: 15px; padding: 18px; border: 1px solid #d7e5ee; border-radius: 12px; background: #f9fcfe; }.submission-box > div p { margin-bottom: 0; }.upload-zone { padding: 14px; border: 1px dashed #9ebfd3; border-radius: 10px; background: #fff; cursor: pointer; }.upload-zone input { min-height: auto; padding: 0; border: 0; box-shadow: none; }.upload-zone span { color: var(--blue-dark); font-size: 11px; }.upload-zone small, .frontend-note { color: var(--muted); font-size: 9px; line-height: 1.5; }.saved-submission { padding: 10px 12px; border-radius: 8px; color: #365d4e !important; background: #eaf7f1; word-break: break-all; }.submission-box .form-actions { margin-top: 0; }\n"] }]
    }], null, null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(TraineeTaskDetailsPage, { className: "TraineeTaskDetailsPage", filePath: "src/app/components/trainee-task-details/trainee-task-details.page.ts", lineNumber: 16 }); })();
