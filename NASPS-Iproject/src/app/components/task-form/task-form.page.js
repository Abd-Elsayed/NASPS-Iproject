import { Component, computed, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { DataService } from '../../services/data.service';
import { ToastService } from '../../services/toast.service';
import { AttachmentComponent } from '../attachment/attachment.component';
import { AiService } from '../../services/ai.service';
import { finalize } from 'rxjs';
import * as i0 from "@angular/core";
import * as i1 from "@angular/forms";
const _forTrack0 = ($index, $item) => $item.id;
function TaskFormPage_Conditional_22_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "small", 8);
    i0.ɵɵtext(1, "Write a clear brief containing 15 to 1000 characters.");
    i0.ɵɵelementEnd();
} }
function TaskFormPage_Conditional_23_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 9)(1, "strong");
    i0.ɵɵtext(2, "Could not generate the draft.");
    i0.ɵɵelementEnd();
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate1(" ", ctx_r0.aiError());
} }
function TaskFormPage_Conditional_26_For_16_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "li");
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const item_r2 = ctx.$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(item_r2);
} }
function TaskFormPage_Conditional_26_For_22_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "li");
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const item_r3 = ctx.$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(item_r3);
} }
function TaskFormPage_Conditional_26_For_28_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "li");
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const item_r4 = ctx.$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(item_r4);
} }
function TaskFormPage_Conditional_26_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 11)(1, "div")(2, "span");
    i0.ɵɵtext(3, "Difficulty");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "strong");
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(6, "div")(7, "span");
    i0.ɵɵtext(8, "Estimated duration");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "strong");
    i0.ɵɵtext(10);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(11, "article")(12, "h3");
    i0.ɵɵtext(13, "Learning objectives");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(14, "ul");
    i0.ɵɵrepeaterCreate(15, TaskFormPage_Conditional_26_For_16_Template, 2, 1, "li", null, i0.ɵɵrepeaterTrackByIdentity);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(17, "article")(18, "h3");
    i0.ɵɵtext(19, "Expected skills");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(20, "ul");
    i0.ɵɵrepeaterCreate(21, TaskFormPage_Conditional_26_For_22_Template, 2, 1, "li", null, i0.ɵɵrepeaterTrackByIdentity);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(23, "article", 14)(24, "h3");
    i0.ɵɵtext(25, "Acceptance criteria");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(26, "ul");
    i0.ɵɵrepeaterCreate(27, TaskFormPage_Conditional_26_For_28_Template, 2, 1, "li", null, i0.ɵɵrepeaterTrackByIdentity);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(29, "p", 14);
    i0.ɵɵtext(30, "Review and edit the generated fields, choose the trainees and due date, then use Create Task.");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const draft_r5 = ctx;
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(draft_r5.difficulty);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(draft_r5.estimatedDuration);
    i0.ɵɵadvance(5);
    i0.ɵɵrepeater(draft_r5.learningObjectives);
    i0.ɵɵadvance(6);
    i0.ɵɵrepeater(draft_r5.expectedSkills);
    i0.ɵɵadvance(6);
    i0.ɵɵrepeater(draft_r5.acceptanceCriteria);
} }
function TaskFormPage_Conditional_32_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "small", 8);
    i0.ɵɵtext(1, "Enter a title containing at least 3 characters.");
    i0.ɵɵelementEnd();
} }
function TaskFormPage_Conditional_36_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "small", 8);
    i0.ɵɵtext(1, "Description must contain at least 10 characters.");
    i0.ɵɵelementEnd();
} }
function TaskFormPage_For_48_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 21);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const trainee_r6 = ctx.$implicit;
    i0.ɵɵproperty("ngValue", trainee_r6.id);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate3("", trainee_r6.name, " \u2014 ", trainee_r6.internshipProgram, " \u2014 ", trainee_r6.status);
} }
function TaskFormPage_Conditional_51_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "small", 8);
    i0.ɵɵtext(1, "Select at least one trainee.");
    i0.ɵɵelementEnd();
} }
function TaskFormPage_Conditional_64_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "small", 8);
    i0.ɵɵtext(1, "Due date is required.");
    i0.ɵɵelementEnd();
} }
function TaskFormPage_Conditional_69_Template(rf, ctx) { if (rf & 1) {
    const _r7 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "app-attachment", 33);
    i0.ɵɵlistener("remove", function TaskFormPage_Conditional_69_Template_app_attachment_remove_0_listener() { i0.ɵɵrestoreView(_r7); const ctx_r0 = i0.ɵɵnextContext(); const attachmentInput_r8 = i0.ɵɵreference(68); return i0.ɵɵresetView(ctx_r0.clearAttachment(attachmentInput_r8)); });
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵproperty("name", ctx_r0.selectedAttachment.name)("size", ctx_r0.selectedAttachment.size)("removable", true);
} }
function TaskFormPage_Conditional_70_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "small", 8);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx_r0.attachmentError);
} }
function TaskFormPage_Conditional_76_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 29);
    i0.ɵɵtext(1, "The task could not be created. Check the highlighted fields.");
    i0.ɵɵelementEnd();
} }
export class TaskFormPage {
    fb = inject(FormBuilder);
    router = inject(Router);
    toast = inject(ToastService);
    ai = inject(AiService);
    data = inject(DataService);
    trainees = computed(() => [...this.data.trainees()].sort((a, b) => a.name.localeCompare(b.name)), /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "trainees" }] : /* istanbul ignore next */ []));
    submitted = false;
    selectedAttachment = null;
    attachmentError = '';
    maxAttachmentSize = 20 * 1024 * 1024;
    assigneeValidator = (control) => Array.isArray(control.value) && control.value.length > 0 ? null : { assignee: true };
    form = this.fb.nonNullable.group({
        title: ['', [Validators.required, Validators.minLength(3)]],
        description: ['', [Validators.required, Validators.minLength(10)]],
        traineeIds: [[], [this.assigneeValidator]],
        priority: ['Medium', Validators.required],
        dueDate: ['', Validators.required],
        instructions: [''],
    });
    aiPrompt = this.fb.nonNullable.control('', [Validators.required, Validators.minLength(15), Validators.maxLength(1000)]);
    aiLoading = signal(false, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "aiLoading" }] : /* istanbul ignore next */ []));
    aiError = signal('', /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "aiError" }] : /* istanbul ignore next */ []));
    aiDraft = signal(null, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "aiDraft" }] : /* istanbul ignore next */ []));
    generateWithAi() {
        this.aiPrompt.markAsTouched();
        if (this.aiPrompt.invalid || this.aiLoading())
            return;
        this.aiLoading.set(true);
        this.aiError.set('');
        this.ai.generateTask(this.aiPrompt.value.trim()).pipe(finalize(() => this.aiLoading.set(false))).subscribe({
            next: draft => {
                this.aiDraft.set(draft);
                this.form.patchValue({
                    title: draft.title,
                    description: draft.description,
                    instructions: draft.instructions.join('\n'),
                    priority: draft.priority,
                });
                this.toast.show('AI draft added to the form. Review it before creating the task.', 'success');
            },
            error: error => { this.aiError.set(error.message); this.toast.show(error.message, 'error'); },
        });
    }
    onAttachmentSelected(event) {
        const input = event.target;
        const file = input.files?.[0] ?? null;
        this.attachmentError = '';
        if (!file) {
            this.selectedAttachment = null;
            return;
        }
        if (file.size > this.maxAttachmentSize) {
            input.value = '';
            this.selectedAttachment = null;
            this.attachmentError = 'The attachment must be 20 MB or smaller.';
            this.toast.show(this.attachmentError, 'error');
            return;
        }
        this.selectedAttachment = file;
        this.toast.show(`${file.name} is ready to attach.`, 'info');
    }
    clearAttachment(fileInput) {
        this.selectedAttachment = null;
        this.attachmentError = '';
        fileInput.value = '';
        this.toast.show('Attachment removed.', 'info');
    }
    formatFileSize(size) {
        return size < 1024 * 1024 ? `${Math.ceil(size / 1024)} KB` : `${(size / 1024 / 1024).toFixed(1)} MB`;
    }
    selectAllTrainees() {
        this.form.controls.traineeIds.setValue(this.trainees().map(item => item.id));
        this.form.controls.traineeIds.markAsTouched();
    }
    clearTrainees() {
        this.form.controls.traineeIds.setValue([]);
        this.form.controls.traineeIds.markAsTouched();
    }
    async save() {
        this.submitted = true;
        if (this.form.invalid) {
            this.form.markAllAsTouched();
            this.toast.show('Please fix the highlighted task information.', 'error');
            return;
        }
        const { traineeIds, ...task } = this.form.getRawValue();
        const assignees = [...new Set(traineeIds.map(Number).filter(id => id > 0))];
        if (!assignees.length) {
            this.toast.show('There are no trainees available for assignment.', 'error');
            return;
        }
        const attachment = this.selectedAttachment;
        let attachmentFailures = 0;
        try {
            for (const id of assignees) {
                const created = await this.data.addTask({
                    ...task,
                    traineeId: id,
                    status: 'Pending',
                    attachment: attachment?.name,
                    attachmentType: attachment?.type || undefined,
                    attachmentSize: attachment?.size,
                });
                if (attachment && !await this.data.uploadTaskAttachment(created.id, attachment))
                    attachmentFailures++;
            }
        }
        catch {
            this.toast.show('The task could not be created on the server. Check the API and database.', 'error');
            return;
        }
        const assignmentMessage = assignees.length === 1
            ? 'Task created and assigned successfully.'
            : `Task assigned to ${assignees.length} selected trainees.`;
        this.toast.show(attachmentFailures
            ? `${assignmentMessage} ${attachmentFailures} attachment upload(s) need the API connection. Metadata was kept.`
            : assignmentMessage, attachmentFailures ? 'warning' : 'success');
        this.router.navigate(['/admin/tasks']);
    }
    static ɵfac = function TaskFormPage_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || TaskFormPage)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: TaskFormPage, selectors: [["app-task-form-page"]], decls: 82, vars: 15, consts: [["attachmentInput", ""], [1, "page-heading"], [1, "eyebrow"], ["aria-labelledby", "ai-task-heading", 1, "panel", "ai-task-panel"], [1, "ai-task-heading"], ["id", "ai-task-heading"], [1, "draft-only"], ["rows", "3", "maxlength", "1000", "placeholder", "Example: Create an intermediate Angular task about reactive forms, validation, and unit testing.", 3, "formControl"], [1, "field-error"], ["role", "alert", 1, "ai-error"], ["type", "button", 1, "primary-button", 3, "click", "disabled"], [1, "draft-review"], ["novalidate", "", 1, "panel", "form-panel", 3, "ngSubmit", "formGroup"], [1, "form-grid"], [1, "span-2"], ["formControlName", "title", "placeholder", "Enter task title"], ["formControlName", "description", "rows", "5", "placeholder", "Enter task description"], [1, "span-2", "assignee-field"], [1, "selection-actions"], ["type", "button", 3, "click"], ["formControlName", "traineeIds", "multiple", "", "size", "6", "aria-label", "Select one or more trainees"], [3, "ngValue"], [1, "file-help"], ["formControlName", "priority"], ["type", "date", "formControlName", "dueDate"], [1, "attachment-field"], ["type", "file", 3, "change"], [3, "name", "size", "removable"], ["formControlName", "instructions", "rows", "3", "placeholder", "Add useful instructions"], [1, "form-error"], [1, "form-actions"], ["routerLink", "/admin/tasks", 1, "secondary-button"], ["type", "submit", 1, "primary-button"], [3, "remove", "name", "size", "removable"]], template: function TaskFormPage_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 1)(1, "div")(2, "span", 2);
            i0.ɵɵtext(3, "WORKFLOW");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(4, "h1");
            i0.ɵɵtext(5, "Add New Task");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(6, "p");
            i0.ɵɵtext(7, "Create one task for one or more selected trainees.");
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(8, "section", 3)(9, "div", 4)(10, "div")(11, "span", 2);
            i0.ɵɵtext(12, "AI TASK ASSISTANT");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(13, "h2", 5);
            i0.ɵɵtext(14, "Generate an editable task draft");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(15, "p");
            i0.ɵɵtext(16, "Describe the assignment you need. AI fills selected fields below but never saves or assigns the task.");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(17, "span", 6);
            i0.ɵɵtext(18, "Draft only");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(19, "label");
            i0.ɵɵtext(20, "Task brief");
            i0.ɵɵelement(21, "textarea", 7);
            i0.ɵɵcontrolCreate();
            i0.ɵɵelementEnd();
            i0.ɵɵconditionalCreate(22, TaskFormPage_Conditional_22_Template, 2, 0, "small", 8);
            i0.ɵɵconditionalCreate(23, TaskFormPage_Conditional_23_Template, 4, 1, "p", 9);
            i0.ɵɵelementStart(24, "button", 10);
            i0.ɵɵlistener("click", function TaskFormPage_Template_button_click_24_listener() { return ctx.generateWithAi(); });
            i0.ɵɵtext(25);
            i0.ɵɵelementEnd();
            i0.ɵɵconditionalCreate(26, TaskFormPage_Conditional_26_Template, 31, 2, "div", 11);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(27, "form", 12);
            i0.ɵɵlistener("ngSubmit", function TaskFormPage_Template_form_ngSubmit_27_listener() { return ctx.save(); });
            i0.ɵɵelementStart(28, "div", 13)(29, "label", 14);
            i0.ɵɵtext(30, "Title");
            i0.ɵɵelement(31, "input", 15);
            i0.ɵɵcontrolCreate();
            i0.ɵɵconditionalCreate(32, TaskFormPage_Conditional_32_Template, 2, 0, "small", 8);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(33, "label", 14);
            i0.ɵɵtext(34, "Description");
            i0.ɵɵelement(35, "textarea", 16);
            i0.ɵɵcontrolCreate();
            i0.ɵɵconditionalCreate(36, TaskFormPage_Conditional_36_Template, 2, 0, "small", 8);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(37, "label", 17);
            i0.ɵɵtext(38, "Assign Trainees ");
            i0.ɵɵelementStart(39, "span", 18)(40, "button", 19);
            i0.ɵɵlistener("click", function TaskFormPage_Template_button_click_40_listener() { return ctx.selectAllTrainees(); });
            i0.ɵɵtext(41, "Select all");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(42, "button", 19);
            i0.ɵɵlistener("click", function TaskFormPage_Template_button_click_42_listener() { return ctx.clearTrainees(); });
            i0.ɵɵtext(43, "Clear");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(44, "small");
            i0.ɵɵtext(45);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(46, "select", 20);
            i0.ɵɵrepeaterCreate(47, TaskFormPage_For_48_Template, 2, 4, "option", 21, _forTrack0);
            i0.ɵɵelementEnd();
            i0.ɵɵcontrolCreate();
            i0.ɵɵelementStart(49, "small", 22);
            i0.ɵɵtext(50, "Choose one or several trainees. Hold Ctrl (Windows) or Command (Mac) while clicking.");
            i0.ɵɵelementEnd();
            i0.ɵɵconditionalCreate(51, TaskFormPage_Conditional_51_Template, 2, 0, "small", 8);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(52, "label");
            i0.ɵɵtext(53, "Priority");
            i0.ɵɵelementStart(54, "select", 23)(55, "option");
            i0.ɵɵtext(56, "High");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(57, "option");
            i0.ɵɵtext(58, "Medium");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(59, "option");
            i0.ɵɵtext(60, "Low");
            i0.ɵɵelementEnd()();
            i0.ɵɵcontrolCreate();
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(61, "label");
            i0.ɵɵtext(62, "Due Date");
            i0.ɵɵelement(63, "input", 24);
            i0.ɵɵcontrolCreate();
            i0.ɵɵconditionalCreate(64, TaskFormPage_Conditional_64_Template, 2, 0, "small", 8);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(65, "label", 25);
            i0.ɵɵtext(66, "Task Attachment (any file or image) ");
            i0.ɵɵelementStart(67, "input", 26, 0);
            i0.ɵɵlistener("change", function TaskFormPage_Template_input_change_67_listener($event) { return ctx.onAttachmentSelected($event); });
            i0.ɵɵelementEnd();
            i0.ɵɵconditionalCreate(69, TaskFormPage_Conditional_69_Template, 1, 3, "app-attachment", 27);
            i0.ɵɵconditionalCreate(70, TaskFormPage_Conditional_70_Template, 2, 1, "small", 8);
            i0.ɵɵelementStart(71, "small", 22);
            i0.ɵɵtext(72, "Any file type is accepted. Maximum size: 20 MB.");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(73, "label", 14);
            i0.ɵɵtext(74, "Instructions");
            i0.ɵɵelement(75, "textarea", 28);
            i0.ɵɵcontrolCreate();
            i0.ɵɵelementEnd()();
            i0.ɵɵconditionalCreate(76, TaskFormPage_Conditional_76_Template, 2, 0, "p", 29);
            i0.ɵɵelementStart(77, "div", 30)(78, "a", 31);
            i0.ɵɵtext(79, "Cancel");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(80, "button", 32);
            i0.ɵɵtext(81, "Create Task");
            i0.ɵɵelementEnd()()();
        } if (rf & 2) {
            let tmp_7_0;
            i0.ɵɵadvance(21);
            i0.ɵɵproperty("formControl", ctx.aiPrompt);
            i0.ɵɵcontrol();
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.aiPrompt.touched && ctx.aiPrompt.invalid ? 22 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.aiError() ? 23 : -1);
            i0.ɵɵadvance();
            i0.ɵɵproperty("disabled", ctx.aiLoading() || ctx.aiPrompt.invalid);
            i0.ɵɵadvance();
            i0.ɵɵtextInterpolate(ctx.aiLoading() ? "Generating draft\u2026" : "Generate draft");
            i0.ɵɵadvance();
            i0.ɵɵconditional((tmp_7_0 = ctx.aiDraft()) ? 26 : -1, tmp_7_0);
            i0.ɵɵadvance();
            i0.ɵɵproperty("formGroup", ctx.form);
            i0.ɵɵadvance(4);
            i0.ɵɵcontrol();
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.form.controls.title.touched && ctx.form.controls.title.invalid ? 32 : -1);
            i0.ɵɵadvance(3);
            i0.ɵɵcontrol();
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.form.controls.description.touched && ctx.form.controls.description.invalid ? 36 : -1);
            i0.ɵɵadvance(9);
            i0.ɵɵtextInterpolate1("", ctx.form.controls.traineeIds.value.length, " selected");
            i0.ɵɵadvance();
            i0.ɵɵcontrol();
            i0.ɵɵadvance();
            i0.ɵɵrepeater(ctx.trainees());
            i0.ɵɵadvance(4);
            i0.ɵɵconditional(ctx.form.controls.traineeIds.touched && ctx.form.controls.traineeIds.invalid ? 51 : -1);
            i0.ɵɵadvance(3);
            i0.ɵɵcontrol();
            i0.ɵɵadvance(9);
            i0.ɵɵcontrol();
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.form.controls.dueDate.touched && ctx.form.controls.dueDate.invalid ? 64 : -1);
            i0.ɵɵadvance(5);
            i0.ɵɵconditional(ctx.selectedAttachment ? 69 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.attachmentError ? 70 : -1);
            i0.ɵɵadvance(5);
            i0.ɵɵcontrol();
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.submitted && ctx.form.invalid ? 76 : -1);
        } }, dependencies: [ReactiveFormsModule, i1.ɵNgNoValidate, i1.NgSelectOption, i1.ɵNgSelectMultipleOption, i1.DefaultValueAccessor, i1.SelectControlValueAccessor, i1.SelectMultipleControlValueAccessor, i1.NgControlStatus, i1.NgControlStatusGroup, i1.MaxLengthValidator, i1.FormControlDirective, i1.FormGroupDirective, i1.FormControlName, RouterLink, AttachmentComponent], styles: ["[_nghost-%COMP%] { display: block; }\n.attachment-field[_ngcontent-%COMP%]   input[type=\"file\"][_ngcontent-%COMP%] { padding: 8px; cursor: pointer; }\n.selected-file[_ngcontent-%COMP%] { padding: 8px 10px; border-radius: 7px; color: var(--%NS%blue-dark); background: var(--%NS%light-blue); font-size: 10px; font-weight: 700; word-break: break-all; }\n.file-help[_ngcontent-%COMP%] { color: var(--%NS%muted); font-size: 9px; font-weight: 500; }\n.selected-file[_ngcontent-%COMP%] { display: inline-flex; align-items: center; gap: 10px; }\n.remove-file[_ngcontent-%COMP%] { border: none; background: var(--%NS%blue-dark); color: #fff; border-radius: 5px; padding: 3px 8px; font-size: 9px; font-weight: 700; cursor: pointer; }\n.remove-file[_ngcontent-%COMP%]:hover { opacity: 0.85; }\n.assignee-field[_ngcontent-%COMP%]   select[multiple][_ngcontent-%COMP%] { min-height: 148px; padding: 7px; }\n.assignee-field[_ngcontent-%COMP%]   option[_ngcontent-%COMP%] { padding: 8px 10px; border-radius: 6px; }\n.assignee-field[_ngcontent-%COMP%]   option[_ngcontent-%COMP%]:checked { color: #fff; background: var(--%NS%blue); }\n.selection-actions[_ngcontent-%COMP%] { display: flex; align-items: center; gap: 8px; margin-bottom: 7px; }\n.selection-actions[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] { border: 1px solid var(--%NS%border); border-radius: 6px; padding: 5px 9px; color: var(--%NS%blue-dark); background: #fff; cursor: pointer; font: inherit; font-size: 10px; font-weight: 700; }\n.selection-actions[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] { margin-left: auto; color: var(--%NS%muted); }\n.ai-task-panel[_ngcontent-%COMP%] { margin-bottom: 16px; }\n.ai-task-heading[_ngcontent-%COMP%] { display: flex; justify-content: space-between; gap: 16px; margin-bottom: 12px; }\n.ai-task-heading[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] { margin: 4px 0; font-size: 17px; }\n.ai-task-heading[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] { margin: 0; color: var(--%NS%muted); font-size: 10px; }\n.draft-only[_ngcontent-%COMP%] { height: fit-content; padding: 6px 9px; border-radius: 999px; color: var(--%NS%blue); background: var(--%NS%light-blue); font-size: 8px; font-weight: 800; }\n.ai-task-panel[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] { display: grid; gap: 6px; color: var(--%NS%ink); font-size: 10px; font-weight: 700; }\n.ai-task-panel[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%] { width: 100%; resize: vertical; }\n.ai-task-panel[_ngcontent-%COMP%]    > button[_ngcontent-%COMP%] { margin-top: 10px; border: 0; cursor: pointer; }\n.ai-task-panel[_ngcontent-%COMP%]    > button[_ngcontent-%COMP%]:disabled { cursor: not-allowed; opacity: .6; }\n.ai-error[_ngcontent-%COMP%] { padding: 10px; border: 1px solid #efbcbc; border-radius: 8px; color: #8d2c2c; background: #fff5f5; font-size: 9px; }\n.draft-review[_ngcontent-%COMP%] { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 9px; margin-top: 14px; padding: 13px; border: 1px solid #bad8ed; border-radius: 9px; background: #f7fbff; }\n.draft-review[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%], .draft-review[_ngcontent-%COMP%]   article[_ngcontent-%COMP%] { padding: 10px; border-radius: 7px; background: #fff; }\n.draft-review[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] { display: block; color: var(--%NS%muted); font-size: 8px; }\n.draft-review[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%], .draft-review[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] { margin: 3px 0; font-size: 10px; }\n.draft-review[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%] { margin: 5px 0 0; padding-left: 16px; color: var(--%NS%muted); font-size: 9px; line-height: 1.55; }\n.draft-review[_ngcontent-%COMP%]    > p[_ngcontent-%COMP%] { margin: 0; color: var(--%NS%muted); font-size: 8px; }\n@media (max-width: 650px) { .draft-review[_ngcontent-%COMP%] { grid-template-columns: 1fr; }.draft-review[_ngcontent-%COMP%]   .span-2[_ngcontent-%COMP%] { grid-column: auto; } }"] });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(TaskFormPage, [{
        type: Component,
        args: [{ selector: 'app-task-form-page', imports: [ReactiveFormsModule, RouterLink, AttachmentComponent], template: "<div class=\"page-heading\"><div><span class=\"eyebrow\">WORKFLOW</span><h1>Add New Task</h1><p>Create one task for one or more selected trainees.</p></div></div>\n<section class=\"panel ai-task-panel\" aria-labelledby=\"ai-task-heading\">\n  <div class=\"ai-task-heading\"><div><span class=\"eyebrow\">AI TASK ASSISTANT</span><h2 id=\"ai-task-heading\">Generate an editable task draft</h2><p>Describe the assignment you need. AI fills selected fields below but never saves or assigns the task.</p></div><span class=\"draft-only\">Draft only</span></div>\n  <label>Task brief<textarea [formControl]=\"aiPrompt\" rows=\"3\" maxlength=\"1000\" placeholder=\"Example: Create an intermediate Angular task about reactive forms, validation, and unit testing.\"></textarea></label>\n  @if (aiPrompt.touched && aiPrompt.invalid) { <small class=\"field-error\">Write a clear brief containing 15 to 1000 characters.</small> }\n  @if (aiError()) { <p class=\"ai-error\" role=\"alert\"><strong>Could not generate the draft.</strong> {{ aiError() }}</p> }\n  <button class=\"primary-button\" type=\"button\" (click)=\"generateWithAi()\" [disabled]=\"aiLoading() || aiPrompt.invalid\">{{ aiLoading() ? 'Generating draft\u2026' : 'Generate draft' }}</button>\n  @if (aiDraft(); as draft) {\n    <div class=\"draft-review\"><div><span>Difficulty</span><strong>{{ draft.difficulty }}</strong></div><div><span>Estimated duration</span><strong>{{ draft.estimatedDuration }}</strong></div><article><h3>Learning objectives</h3><ul>@for (item of draft.learningObjectives; track item) { <li>{{ item }}</li> }</ul></article><article><h3>Expected skills</h3><ul>@for (item of draft.expectedSkills; track item) { <li>{{ item }}</li> }</ul></article><article class=\"span-2\"><h3>Acceptance criteria</h3><ul>@for (item of draft.acceptanceCriteria; track item) { <li>{{ item }}</li> }</ul></article><p class=\"span-2\">Review and edit the generated fields, choose the trainees and due date, then use Create Task.</p></div>\n  }\n</section>\n<form class=\"panel form-panel\" [formGroup]=\"form\" (ngSubmit)=\"save()\" novalidate>\n  <div class=\"form-grid\">\n    <label class=\"span-2\">Title<input formControlName=\"title\" placeholder=\"Enter task title\">@if (form.controls.title.touched && form.controls.title.invalid) { <small class=\"field-error\">Enter a title containing at least 3 characters.</small> }</label>\n    <label class=\"span-2\">Description<textarea formControlName=\"description\" rows=\"5\" placeholder=\"Enter task description\"></textarea>@if (form.controls.description.touched && form.controls.description.invalid) { <small class=\"field-error\">Description must contain at least 10 characters.</small> }</label>\n    <label class=\"span-2 assignee-field\">Assign Trainees\n      <span class=\"selection-actions\"><button type=\"button\" (click)=\"selectAllTrainees()\">Select all</button><button type=\"button\" (click)=\"clearTrainees()\">Clear</button><small>{{ form.controls.traineeIds.value.length }} selected</small></span>\n      <select formControlName=\"traineeIds\" multiple size=\"6\" aria-label=\"Select one or more trainees\">\n        @for (trainee of trainees(); track trainee.id) { <option [ngValue]=\"trainee.id\">{{ trainee.name }} \u2014 {{ trainee.internshipProgram }} \u2014 {{ trainee.status }}</option> }\n      </select>\n      <small class=\"file-help\">Choose one or several trainees. Hold Ctrl (Windows) or Command (Mac) while clicking.</small>\n      @if (form.controls.traineeIds.touched && form.controls.traineeIds.invalid) { <small class=\"field-error\">Select at least one trainee.</small> }\n    </label>\n    <label>Priority<select formControlName=\"priority\"><option>High</option><option>Medium</option><option>Low</option></select></label>\n    <label>Due Date<input type=\"date\" formControlName=\"dueDate\">@if (form.controls.dueDate.touched && form.controls.dueDate.invalid) { <small class=\"field-error\">Due date is required.</small> }</label>\n    <label class=\"attachment-field\">Task Attachment (any file or image)\n      <input #attachmentInput type=\"file\" (change)=\"onAttachmentSelected($event)\">\n      @if (selectedAttachment) {\n        <app-attachment [name]=\"selectedAttachment.name\" [size]=\"selectedAttachment.size\" [removable]=\"true\" (remove)=\"clearAttachment(attachmentInput)\" />\n      }\n      @if (attachmentError) { <small class=\"field-error\">{{ attachmentError }}</small> }\n      <small class=\"file-help\">Any file type is accepted. Maximum size: 20 MB.</small>\n    </label>\n    <label class=\"span-2\">Instructions<textarea formControlName=\"instructions\" rows=\"3\" placeholder=\"Add useful instructions\"></textarea></label>\n  </div>\n  @if (submitted && form.invalid) { <p class=\"form-error\">The task could not be created. Check the highlighted fields.</p> }\n  <div class=\"form-actions\"><a class=\"secondary-button\" routerLink=\"/admin/tasks\">Cancel</a><button class=\"primary-button\" type=\"submit\">Create Task</button></div>\n</form>\n", styles: [":host { display: block; }\n.attachment-field input[type=\"file\"] { padding: 8px; cursor: pointer; }\n.selected-file { padding: 8px 10px; border-radius: 7px; color: var(--blue-dark); background: var(--light-blue); font-size: 10px; font-weight: 700; word-break: break-all; }\n.file-help { color: var(--muted); font-size: 9px; font-weight: 500; }\n.selected-file { display: inline-flex; align-items: center; gap: 10px; }\n.remove-file { border: none; background: var(--blue-dark); color: #fff; border-radius: 5px; padding: 3px 8px; font-size: 9px; font-weight: 700; cursor: pointer; }\n.remove-file:hover { opacity: 0.85; }\n.assignee-field select[multiple] { min-height: 148px; padding: 7px; }\n.assignee-field option { padding: 8px 10px; border-radius: 6px; }\n.assignee-field option:checked { color: #fff; background: var(--blue); }\n.selection-actions { display: flex; align-items: center; gap: 8px; margin-bottom: 7px; }\n.selection-actions button { border: 1px solid var(--border); border-radius: 6px; padding: 5px 9px; color: var(--blue-dark); background: #fff; cursor: pointer; font: inherit; font-size: 10px; font-weight: 700; }\n.selection-actions small { margin-left: auto; color: var(--muted); }\n.ai-task-panel { margin-bottom: 16px; }\n.ai-task-heading { display: flex; justify-content: space-between; gap: 16px; margin-bottom: 12px; }\n.ai-task-heading h2 { margin: 4px 0; font-size: 17px; }\n.ai-task-heading p { margin: 0; color: var(--muted); font-size: 10px; }\n.draft-only { height: fit-content; padding: 6px 9px; border-radius: 999px; color: var(--blue); background: var(--light-blue); font-size: 8px; font-weight: 800; }\n.ai-task-panel label { display: grid; gap: 6px; color: var(--ink); font-size: 10px; font-weight: 700; }\n.ai-task-panel textarea { width: 100%; resize: vertical; }\n.ai-task-panel > button { margin-top: 10px; border: 0; cursor: pointer; }\n.ai-task-panel > button:disabled { cursor: not-allowed; opacity: .6; }\n.ai-error { padding: 10px; border: 1px solid #efbcbc; border-radius: 8px; color: #8d2c2c; background: #fff5f5; font-size: 9px; }\n.draft-review { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 9px; margin-top: 14px; padding: 13px; border: 1px solid #bad8ed; border-radius: 9px; background: #f7fbff; }\n.draft-review > div, .draft-review article { padding: 10px; border-radius: 7px; background: #fff; }\n.draft-review span { display: block; color: var(--muted); font-size: 8px; }\n.draft-review strong, .draft-review h3 { margin: 3px 0; font-size: 10px; }\n.draft-review ul { margin: 5px 0 0; padding-left: 16px; color: var(--muted); font-size: 9px; line-height: 1.55; }\n.draft-review > p { margin: 0; color: var(--muted); font-size: 8px; }\n@media (max-width: 650px) { .draft-review { grid-template-columns: 1fr; }.draft-review .span-2 { grid-column: auto; } }\n"] }]
    }], null, null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(TaskFormPage, { className: "TaskFormPage", filePath: "src/app/components/task-form/task-form.page.ts", lineNumber: 18 }); })();
