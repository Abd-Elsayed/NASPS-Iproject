import { Component, computed, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { DataService } from '../../services/data.service';
import { InternshipProgramService } from '../../services/internship-program.service';
import { ToastService } from '../../services/toast.service';
import { UniversityService } from '../../services/university.service';
import { ValidationService } from '../../services/validation.service';
import { TraineeInsights } from '../trainee-insights/trainee-insights';
import * as i0 from "@angular/core";
import * as i1 from "@angular/forms";
function TraineeFormPage_Conditional_8_Template(rf, ctx) { if (rf & 1) {
    const _r1 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "section", 2)(1, "div", 5)(2, "span");
    i0.ɵɵtext(3, "\u2713");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "div")(5, "strong");
    i0.ɵɵtext(6, "Account created successfully");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "p");
    i0.ɵɵtext(8, "The trainee verifies their email with a one-time code, then changes the temporary password on first sign in.");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(9, "dl", 6)(10, "div")(11, "dt");
    i0.ɵɵtext(12, "Trainee ID");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(13, "dd");
    i0.ɵɵtext(14);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(15, "div")(16, "dt");
    i0.ɵɵtext(17, "Username");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(18, "dd");
    i0.ɵɵtext(19);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(20, "div")(21, "dt");
    i0.ɵɵtext(22, "Temporary Password");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(23, "dd");
    i0.ɵɵtext(24);
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(25, "div", 7)(26, "strong");
    i0.ɵɵtext(27, "Important:");
    i0.ɵɵelementEnd();
    i0.ɵɵtext(28, " copy these credentials now and send them securely to the trainee.");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(29, "div", 8)(30, "button", 9);
    i0.ɵɵlistener("click", function TraineeFormPage_Conditional_8_Template_button_click_30_listener() { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.copyCredentials()); });
    i0.ɵɵtext(31, "Copy Credentials");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(32, "button", 10);
    i0.ɵɵlistener("click", function TraineeFormPage_Conditional_8_Template_button_click_32_listener() { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.finishCreation()); });
    i0.ɵɵtext(33, "Done");
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const access_r3 = ctx;
    i0.ɵɵadvance(14);
    i0.ɵɵtextInterpolate(access_r3.traineeId);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(access_r3.username);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(access_r3.temporaryPassword);
} }
function TraineeFormPage_Conditional_9_Conditional_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 12)(1, "strong");
    i0.ɵɵtext(2, "Admin-created access");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "span");
    i0.ɵɵtext(4, "After saving, the system generates a Trainee ID, username, and one-time password for the admin.");
    i0.ɵɵelementEnd()();
} }
function TraineeFormPage_Conditional_9_Conditional_6_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "small", 15);
    i0.ɵɵtext(1, "Enter at least 2 characters.");
    i0.ɵɵelementEnd();
} }
function TraineeFormPage_Conditional_9_Conditional_10_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "small", 15);
    i0.ɵɵtext(1, "Email is required.");
    i0.ɵɵelementEnd();
} }
function TraineeFormPage_Conditional_9_Conditional_11_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "small", 15);
    i0.ɵɵtext(1, "Enter a valid email address.");
    i0.ɵɵelementEnd();
} }
function TraineeFormPage_Conditional_9_Conditional_12_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "small", 15);
    i0.ɵɵtext(1, "This email already belongs to another trainee.");
    i0.ɵɵelementEnd();
} }
function TraineeFormPage_Conditional_9_For_19_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 19);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const program_r5 = ctx.$implicit;
    i0.ɵɵproperty("value", program_r5);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(program_r5);
} }
function TraineeFormPage_Conditional_9_Conditional_20_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "small", 15);
    i0.ɵɵtext(1, "Select a cohort.");
    i0.ɵɵelementEnd();
} }
function TraineeFormPage_Conditional_9_Conditional_24_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "small", 15);
    i0.ɵɵtext(1, "Enter a complete Egyptian mobile number starting with 010, 011, 012, or 015.");
    i0.ɵɵelementEnd();
} }
function TraineeFormPage_Conditional_9_For_31_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 19);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const department_r6 = ctx.$implicit;
    i0.ɵɵproperty("value", department_r6);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(department_r6);
} }
function TraineeFormPage_Conditional_9_Conditional_32_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "small", 22);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1("You can only add trainees to your own department (", ctx_r1.lockedDepartment(), ").");
} }
function TraineeFormPage_Conditional_9_Conditional_33_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "small", 15);
    i0.ɵɵtext(1, "Select a department.");
    i0.ɵɵelementEnd();
} }
function TraineeFormPage_Conditional_9_Conditional_37_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "small", 15);
    i0.ɵɵtext(1, "Join date is required.");
    i0.ɵɵelementEnd();
} }
function TraineeFormPage_Conditional_9_Conditional_38_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "label");
    i0.ɵɵtext(1, "Status");
    i0.ɵɵelementStart(2, "select", 28)(3, "option");
    i0.ɵɵtext(4, "Active");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "option");
    i0.ɵɵtext(6, "Inactive");
    i0.ɵɵelementEnd()();
    i0.ɵɵcontrolCreate();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance(2);
    i0.ɵɵcontrol();
} }
function TraineeFormPage_Conditional_9_For_45_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 19);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const university_r7 = ctx.$implicit;
    i0.ɵɵproperty("value", university_r7);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(university_r7);
} }
function TraineeFormPage_Conditional_9_Conditional_46_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "small", 15);
    i0.ɵɵtext(1, "Select a university.");
    i0.ɵɵelementEnd();
} }
function TraineeFormPage_Conditional_9_Conditional_47_Conditional_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "small", 15);
    i0.ɵɵtext(1, "Write the university name.");
    i0.ɵɵelementEnd();
} }
function TraineeFormPage_Conditional_9_Conditional_47_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "label");
    i0.ɵɵtext(1, "Other University");
    i0.ɵɵelement(2, "input", 29);
    i0.ɵɵcontrolCreate();
    i0.ɵɵconditionalCreate(3, TraineeFormPage_Conditional_9_Conditional_47_Conditional_3_Template, 2, 0, "small", 15);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(2);
    i0.ɵɵcontrol();
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r1.form.controls.otherUniversity.touched && ctx_r1.form.controls.otherUniversity.invalid ? 3 : -1);
} }
function TraineeFormPage_Conditional_9_Conditional_48_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 25);
    i0.ɵɵtext(1, "The trainee could not be saved. Check the highlighted fields.");
    i0.ɵɵelementEnd();
} }
function TraineeFormPage_Conditional_9_Template(rf, ctx) { if (rf & 1) {
    const _r4 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "form", 11);
    i0.ɵɵlistener("ngSubmit", function TraineeFormPage_Conditional_9_Template_form_ngSubmit_0_listener() { i0.ɵɵrestoreView(_r4); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.save()); });
    i0.ɵɵconditionalCreate(1, TraineeFormPage_Conditional_9_Conditional_1_Template, 5, 0, "div", 12);
    i0.ɵɵelementStart(2, "div", 13)(3, "label");
    i0.ɵɵtext(4, "Full Name");
    i0.ɵɵelement(5, "input", 14);
    i0.ɵɵcontrolCreate();
    i0.ɵɵconditionalCreate(6, TraineeFormPage_Conditional_9_Conditional_6_Template, 2, 0, "small", 15);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "label");
    i0.ɵɵtext(8, "Email");
    i0.ɵɵelement(9, "input", 16);
    i0.ɵɵcontrolCreate();
    i0.ɵɵconditionalCreate(10, TraineeFormPage_Conditional_9_Conditional_10_Template, 2, 0, "small", 15)(11, TraineeFormPage_Conditional_9_Conditional_11_Template, 2, 0, "small", 15)(12, TraineeFormPage_Conditional_9_Conditional_12_Template, 2, 0, "small", 15);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(13, "label");
    i0.ɵɵtext(14, "Internship Cohort");
    i0.ɵɵelementStart(15, "select", 17)(16, "option", 18);
    i0.ɵɵtext(17, "Select cohort");
    i0.ɵɵelementEnd();
    i0.ɵɵrepeaterCreate(18, TraineeFormPage_Conditional_9_For_19_Template, 2, 2, "option", 19, i0.ɵɵrepeaterTrackByIdentity);
    i0.ɵɵelementEnd();
    i0.ɵɵcontrolCreate();
    i0.ɵɵconditionalCreate(20, TraineeFormPage_Conditional_9_Conditional_20_Template, 2, 0, "small", 15);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(21, "label");
    i0.ɵɵtext(22, "Egyptian Mobile Number");
    i0.ɵɵelement(23, "input", 20);
    i0.ɵɵcontrolCreate();
    i0.ɵɵconditionalCreate(24, TraineeFormPage_Conditional_9_Conditional_24_Template, 2, 0, "small", 15);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(25, "label");
    i0.ɵɵtext(26, "Department");
    i0.ɵɵelementStart(27, "select", 21)(28, "option", 18);
    i0.ɵɵtext(29, "Select department");
    i0.ɵɵelementEnd();
    i0.ɵɵrepeaterCreate(30, TraineeFormPage_Conditional_9_For_31_Template, 2, 2, "option", 19, i0.ɵɵrepeaterTrackByIdentity);
    i0.ɵɵelementEnd();
    i0.ɵɵcontrolCreate();
    i0.ɵɵconditionalCreate(32, TraineeFormPage_Conditional_9_Conditional_32_Template, 2, 1, "small", 22)(33, TraineeFormPage_Conditional_9_Conditional_33_Template, 2, 0, "small", 15);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(34, "label");
    i0.ɵɵtext(35, "Join Date");
    i0.ɵɵelement(36, "input", 23);
    i0.ɵɵcontrolCreate();
    i0.ɵɵconditionalCreate(37, TraineeFormPage_Conditional_9_Conditional_37_Template, 2, 0, "small", 15);
    i0.ɵɵelementEnd();
    i0.ɵɵconditionalCreate(38, TraineeFormPage_Conditional_9_Conditional_38_Template, 7, 0, "label");
    i0.ɵɵelementStart(39, "label");
    i0.ɵɵtext(40, "University");
    i0.ɵɵelementStart(41, "select", 24)(42, "option", 18);
    i0.ɵɵtext(43, "Select Egyptian university");
    i0.ɵɵelementEnd();
    i0.ɵɵrepeaterCreate(44, TraineeFormPage_Conditional_9_For_45_Template, 2, 2, "option", 19, i0.ɵɵrepeaterTrackByIdentity);
    i0.ɵɵelementEnd();
    i0.ɵɵcontrolCreate();
    i0.ɵɵconditionalCreate(46, TraineeFormPage_Conditional_9_Conditional_46_Template, 2, 0, "small", 15);
    i0.ɵɵelementEnd();
    i0.ɵɵconditionalCreate(47, TraineeFormPage_Conditional_9_Conditional_47_Template, 4, 1, "label");
    i0.ɵɵelementEnd();
    i0.ɵɵconditionalCreate(48, TraineeFormPage_Conditional_9_Conditional_48_Template, 2, 0, "p", 25);
    i0.ɵɵelementStart(49, "div", 8)(50, "a", 26);
    i0.ɵɵtext(51, "Cancel");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(52, "button", 27);
    i0.ɵɵtext(53);
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵproperty("formGroup", ctx_r1.form);
    i0.ɵɵadvance();
    i0.ɵɵconditional(!ctx_r1.id ? 1 : -1);
    i0.ɵɵadvance(4);
    i0.ɵɵcontrol();
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r1.form.controls.name.touched && ctx_r1.form.controls.name.invalid ? 6 : -1);
    i0.ɵɵadvance(3);
    i0.ɵɵcontrol();
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r1.form.controls.email.touched && ctx_r1.form.controls.email.hasError("required") ? 10 : ctx_r1.form.controls.email.touched && ctx_r1.form.controls.email.hasError("email") ? 11 : ctx_r1.form.controls.email.hasError("duplicate") ? 12 : -1);
    i0.ɵɵadvance(5);
    i0.ɵɵcontrol();
    i0.ɵɵadvance(3);
    i0.ɵɵrepeater(ctx_r1.internshipPrograms);
    i0.ɵɵadvance(2);
    i0.ɵɵconditional(ctx_r1.form.controls.internshipProgram.touched && ctx_r1.form.controls.internshipProgram.invalid ? 20 : -1);
    i0.ɵɵadvance(3);
    i0.ɵɵcontrol();
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r1.form.controls.phone.touched && ctx_r1.form.controls.phone.invalid ? 24 : -1);
    i0.ɵɵadvance(3);
    i0.ɵɵcontrol();
    i0.ɵɵadvance(3);
    i0.ɵɵrepeater(ctx_r1.departments());
    i0.ɵɵadvance(2);
    i0.ɵɵconditional(ctx_r1.lockedDepartment() ? 32 : ctx_r1.form.controls.department.touched && ctx_r1.form.controls.department.invalid ? 33 : -1);
    i0.ɵɵadvance(4);
    i0.ɵɵcontrol();
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r1.form.controls.joinDate.touched && ctx_r1.form.controls.joinDate.invalid ? 37 : -1);
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r1.id ? 38 : -1);
    i0.ɵɵadvance(3);
    i0.ɵɵcontrol();
    i0.ɵɵadvance(3);
    i0.ɵɵrepeater(ctx_r1.universities);
    i0.ɵɵadvance(2);
    i0.ɵɵconditional(ctx_r1.form.controls.university.touched && ctx_r1.form.controls.university.invalid ? 46 : -1);
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r1.form.controls.university.value === "Other" ? 47 : -1);
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r1.submitted && ctx_r1.form.invalid ? 48 : -1);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(ctx_r1.id ? "Update Trainee" : "Create Login");
} }
function TraineeFormPage_Conditional_10_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "app-trainee-insights", 4);
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵproperty("traineeId", ctx_r1.id);
} }
export class TraineeFormPage {
    fb = inject(FormBuilder);
    route = inject(ActivatedRoute);
    router = inject(Router);
    auth = inject(AuthService);
    toast = inject(ToastService);
    validation = inject(ValidationService);
    universityService = inject(UniversityService);
    internshipProgramService = inject(InternshipProgramService);
    data = inject(DataService);
    universities = this.universityService.egyptianUniversities;
    internshipPrograms = this.internshipProgramService.programs;
    id = Number(this.route.snapshot.paramMap.get('id')) || null;
    existing = this.id ? this.data.trainees().find(item => item.id === this.id) : undefined;
    existingUniversity = this.existing?.university ?? '';
    submitted = false;
    createdAccess = signal(null, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "createdAccess" }] : /* istanbul ignore next */ []));
    /** A non-super admin can only place trainees in their own department. */
    lockedDepartment = computed(() => {
        const identity = this.auth.identity();
        return !identity.isSuperAdmin && this.auth.role() === 'admin' && identity.department ? identity.department : null;
    }, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "lockedDepartment" }] : /* istanbul ignore next */ []));
    departments = computed(() => {
        const base = ['Engineering', 'Design', 'Data & AI', 'Cyber Security', 'Operations', 'Training', 'Human Resources', 'Marketing', 'Finance'];
        const locked = this.lockedDepartment();
        return locked && !base.includes(locked) ? [locked, ...base] : base;
    }, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "departments" }] : /* istanbul ignore next */ []));
    form = this.fb.nonNullable.group({
        name: [this.existing?.name ?? '', [Validators.required, Validators.minLength(2)]],
        email: [this.existing?.email ?? '', [Validators.required, Validators.email]],
        internshipProgram: [this.existing?.internshipProgram ?? '', Validators.required],
        phone: [this.existing?.phone ?? '', [Validators.required, this.validation.phone]],
        department: [{ value: this.existing?.department ?? this.lockedDepartment() ?? '', disabled: !!this.lockedDepartment() }, Validators.required],
        university: [this.universityService.isListed(this.existingUniversity) ? this.existingUniversity : this.existingUniversity ? 'Other' : '', Validators.required],
        otherUniversity: [this.universityService.isListed(this.existingUniversity) ? '' : this.existingUniversity],
        joinDate: [this.existing?.joinDate ?? new Date().toISOString().slice(0, 10), Validators.required],
        status: [this.existing?.status ?? 'Active', Validators.required],
    });
    async save() {
        this.submitted = true;
        const email = this.form.controls.email.value.trim().toLowerCase();
        const duplicate = this.data.trainees().some(item => item.id !== this.id && item.email.toLowerCase() === email);
        if (duplicate)
            this.form.controls.email.setErrors({ ...this.form.controls.email.errors, duplicate: true });
        const selectedUniversity = this.form.controls.university.value;
        const otherUniversity = this.form.controls.otherUniversity.value.trim();
        if (selectedUniversity === 'Other' && !otherUniversity)
            this.form.controls.otherUniversity.setErrors({ required: true });
        if (this.form.invalid) {
            this.form.markAllAsTouched();
            this.toast.show('Please fix the highlighted trainee information.', 'error');
            return;
        }
        const { otherUniversity: _otherUniversity, ...rawValue } = this.form.getRawValue();
        const value = {
            ...rawValue,
            email,
            department: this.lockedDepartment() ?? rawValue.department,
            university: selectedUniversity === 'Other' ? otherUniversity : selectedUniversity,
        };
        if (this.id) {
            if (!await this.data.updateTrainee(this.id, value)) {
                this.toast.show('The trainee could not be updated on the server.', 'error');
                return;
            }
            this.toast.show('Trainee profile updated successfully.');
            this.router.navigate(['/admin/trainees']);
        }
        else {
            const access = await this.data.createTrainee({ ...value, status: 'Inactive' });
            if (!access) {
                this.toast.show('The trainee could not be created. Check the API connection and try again.', 'error');
                return;
            }
            this.createdAccess.set(access);
            this.toast.show('Trainee account created. Give the login credentials to the trainee.', 'success', 6000);
        }
    }
    async copyCredentials() {
        const access = this.createdAccess();
        if (!access)
            return;
        const credentials = `Trainee ID: ${access.traineeId}\nUsername: ${access.username}\nTemporary Password: ${access.temporaryPassword}`;
        try {
            await navigator.clipboard.writeText(credentials);
            this.toast.show('Login credentials copied.');
        }
        catch {
            this.toast.show('Copy is unavailable. Select the credentials manually.', 'warning');
        }
    }
    finishCreation() {
        this.router.navigate(['/admin/trainees']);
    }
    static ɵfac = function TraineeFormPage_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || TraineeFormPage)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: TraineeFormPage, selectors: [["app-trainee-form-page"]], decls: 11, vars: 4, consts: [[1, "page-heading"], [1, "eyebrow"], [1, "panel", "credentials-panel"], ["novalidate", "", 1, "panel", "form-panel", 3, "formGroup"], [3, "traineeId"], [1, "credentials-success"], [1, "credentials-list"], [1, "credentials-warning"], [1, "form-actions"], ["type", "button", 1, "secondary-button", 3, "click"], ["type", "button", 1, "primary-button", 3, "click"], ["novalidate", "", 1, "panel", "form-panel", 3, "ngSubmit", "formGroup"], [1, "temporary-password-note"], [1, "form-grid"], ["formControlName", "name", "placeholder", "Enter full name"], [1, "field-error"], ["type", "email", "formControlName", "email", "placeholder", "name@example.com", "autocomplete", "email"], ["formControlName", "internshipProgram"], ["value", ""], [3, "value"], ["type", "tel", "formControlName", "phone", "placeholder", "010 1234 5678 or +20 10 1234 5678", "autocomplete", "tel"], ["formControlName", "department"], [1, "file-help"], ["type", "date", "formControlName", "joinDate"], ["formControlName", "university"], [1, "form-error"], ["routerLink", "/admin/trainees", 1, "secondary-button"], ["type", "submit", 1, "primary-button"], ["formControlName", "status"], ["formControlName", "otherUniversity", "placeholder", "Write university name"]], template: function TraineeFormPage_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0)(1, "div")(2, "span", 1);
            i0.ɵɵtext(3, "TEAM");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(4, "h1");
            i0.ɵɵtext(5);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(6, "p");
            i0.ɵɵtext(7);
            i0.ɵɵelementEnd()()();
            i0.ɵɵconditionalCreate(8, TraineeFormPage_Conditional_8_Template, 34, 3, "section", 2)(9, TraineeFormPage_Conditional_9_Template, 54, 13, "form", 3);
            i0.ɵɵconditionalCreate(10, TraineeFormPage_Conditional_10_Template, 1, 1, "app-trainee-insights", 4);
        } if (rf & 2) {
            let tmp_2_0;
            i0.ɵɵadvance(5);
            i0.ɵɵtextInterpolate(ctx.createdAccess() ? "Trainee Login Created" : ctx.id ? "Edit Trainee" : "Add New Trainee");
            i0.ɵɵadvance(2);
            i0.ɵɵtextInterpolate(ctx.createdAccess() ? "Give these one-time credentials to the trainee." : ctx.id ? "Update the trainee information below." : "The admin creates the trainee account and receives its first-login credentials.");
            i0.ɵɵadvance();
            i0.ɵɵconditional((tmp_2_0 = ctx.createdAccess()) ? 8 : 9, tmp_2_0);
            i0.ɵɵadvance(2);
            i0.ɵɵconditional(ctx.id ? 10 : -1);
        } }, dependencies: [ReactiveFormsModule, i1.ɵNgNoValidate, i1.NgSelectOption, i1.ɵNgSelectMultipleOption, i1.DefaultValueAccessor, i1.SelectControlValueAccessor, i1.NgControlStatus, i1.NgControlStatusGroup, i1.FormGroupDirective, i1.FormControlName, RouterLink, TraineeInsights], styles: [".temporary-password-note[_ngcontent-%COMP%] { display: flex; align-items: center; gap: 12px; margin-bottom: 20px; padding: 13px 15px; border: 1px solid #cfe1ec; border-radius: 9px; color: #405166; background: var(--%NS%light-blue); font-size: 11px; }\n.temporary-password-note[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] { color: var(--%NS%blue-dark); }.temporary-password-note[_ngcontent-%COMP%]   code[_ngcontent-%COMP%] { padding: 2px 6px; border-radius: 5px; color: var(--%NS%blue-dark); background: #fff; font-weight: 800; }\n.credentials-panel[_ngcontent-%COMP%] { max-width: 680px; margin-inline: auto; }\n.credentials-success[_ngcontent-%COMP%] { display: flex; align-items: center; gap: 14px; margin-bottom: 22px; }\n.credentials-success[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%] { display: grid; place-items: center; width: 42px; height: 42px; border-radius: 50%; color: #fff; background: var(--%NS%green); font-weight: 900; }\n.credentials-success[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] { color: var(--%NS%ink); font-size: 15px; }.credentials-success[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] { margin: 5px 0 0; color: var(--%NS%muted); font-size: 11px; }\n.credentials-list[_ngcontent-%COMP%] { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; margin: 0; }\n.credentials-list[_ngcontent-%COMP%]   div[_ngcontent-%COMP%] { padding: 16px; border: 1px solid #d4e4ee; border-radius: 10px; background: var(--%NS%light-blue); }\n.credentials-list[_ngcontent-%COMP%]   dt[_ngcontent-%COMP%] { margin-bottom: 7px; color: var(--%NS%muted); font-size: 9px; font-weight: 800; text-transform: uppercase; letter-spacing: .06em; }\n.credentials-list[_ngcontent-%COMP%]   dd[_ngcontent-%COMP%] { margin: 0; color: var(--%NS%blue-dark); font-size: 14px; font-weight: 900; word-break: break-all; }\n.credentials-warning[_ngcontent-%COMP%] { margin-top: 16px; padding: 12px 14px; border-radius: 9px; color: #795500; background: #fff6df; font-size: 11px; line-height: 1.5; }\n@media (max-width: 650px) { .credentials-list[_ngcontent-%COMP%] { grid-template-columns: 1fr; } }"] });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(TraineeFormPage, [{
        type: Component,
        args: [{ selector: 'app-trainee-form-page', imports: [ReactiveFormsModule, RouterLink, TraineeInsights], template: "<div class=\"page-heading\">\n  <div>\n    <span class=\"eyebrow\">TEAM</span>\n    <h1>{{ createdAccess() ? 'Trainee Login Created' : id ? 'Edit Trainee' : 'Add New Trainee' }}</h1>\n    <p>{{ createdAccess() ? 'Give these one-time credentials to the trainee.' : id ? 'Update the trainee information below.' : 'The admin creates the trainee account and receives its first-login credentials.' }}</p>\n  </div>\n</div>\n\n@if (createdAccess(); as access) {\n  <section class=\"panel credentials-panel\">\n    <div class=\"credentials-success\"><span>\u2713</span><div><strong>Account created successfully</strong><p>The trainee verifies their email with a one-time code, then changes the temporary password on first sign in.</p></div></div>\n    <dl class=\"credentials-list\">\n      <div><dt>Trainee ID</dt><dd>{{ access.traineeId }}</dd></div>\n      <div><dt>Username</dt><dd>{{ access.username }}</dd></div>\n      <div><dt>Temporary Password</dt><dd>{{ access.temporaryPassword }}</dd></div>\n    </dl>\n    <div class=\"credentials-warning\"><strong>Important:</strong> copy these credentials now and send them securely to the trainee.</div>\n    <div class=\"form-actions\"><button class=\"secondary-button\" type=\"button\" (click)=\"copyCredentials()\">Copy Credentials</button><button class=\"primary-button\" type=\"button\" (click)=\"finishCreation()\">Done</button></div>\n  </section>\n} @else {\n  <form class=\"panel form-panel\" [formGroup]=\"form\" (ngSubmit)=\"save()\" novalidate>\n    @if (!id) { <div class=\"temporary-password-note\"><strong>Admin-created access</strong><span>After saving, the system generates a Trainee ID, username, and one-time password for the admin.</span></div> }\n    <div class=\"form-grid\">\n      <label>Full Name<input formControlName=\"name\" placeholder=\"Enter full name\">@if (form.controls.name.touched && form.controls.name.invalid) { <small class=\"field-error\">Enter at least 2 characters.</small> }</label>\n      <label>Email<input type=\"email\" formControlName=\"email\" placeholder=\"name@example.com\" autocomplete=\"email\">@if (form.controls.email.touched && form.controls.email.hasError('required')) { <small class=\"field-error\">Email is required.</small> } @else if (form.controls.email.touched && form.controls.email.hasError('email')) { <small class=\"field-error\">Enter a valid email address.</small> } @else if (form.controls.email.hasError('duplicate')) { <small class=\"field-error\">This email already belongs to another trainee.</small> }</label>\n      <label>Internship Cohort<select formControlName=\"internshipProgram\"><option value=\"\">Select cohort</option>@for (program of internshipPrograms; track program) { <option [value]=\"program\">{{ program }}</option> }</select>@if (form.controls.internshipProgram.touched && form.controls.internshipProgram.invalid) { <small class=\"field-error\">Select a cohort.</small> }</label>\n      <label>Egyptian Mobile Number<input type=\"tel\" formControlName=\"phone\" placeholder=\"010 1234 5678 or +20 10 1234 5678\" autocomplete=\"tel\">@if (form.controls.phone.touched && form.controls.phone.invalid) { <small class=\"field-error\">Enter a complete Egyptian mobile number starting with 010, 011, 012, or 015.</small> }</label>\n      <label>Department<select formControlName=\"department\"><option value=\"\">Select department</option>@for (department of departments(); track department) { <option [value]=\"department\">{{ department }}</option> }</select>@if (lockedDepartment()) { <small class=\"file-help\">You can only add trainees to your own department ({{ lockedDepartment() }}).</small> } @else if (form.controls.department.touched && form.controls.department.invalid) { <small class=\"field-error\">Select a department.</small> }</label>\n      <label>Join Date<input type=\"date\" formControlName=\"joinDate\">@if (form.controls.joinDate.touched && form.controls.joinDate.invalid) { <small class=\"field-error\">Join date is required.</small> }</label>\n      @if (id) { <label>Status<select formControlName=\"status\"><option>Active</option><option>Inactive</option></select></label> }\n      <label>University<select formControlName=\"university\"><option value=\"\">Select Egyptian university</option>@for (university of universities; track university) { <option [value]=\"university\">{{ university }}</option> }</select>@if (form.controls.university.touched && form.controls.university.invalid) { <small class=\"field-error\">Select a university.</small> }</label>\n      @if (form.controls.university.value === 'Other') { <label>Other University<input formControlName=\"otherUniversity\" placeholder=\"Write university name\">@if (form.controls.otherUniversity.touched && form.controls.otherUniversity.invalid) { <small class=\"field-error\">Write the university name.</small> }</label> }\n    </div>\n    @if (submitted && form.invalid) { <p class=\"form-error\">The trainee could not be saved. Check the highlighted fields.</p> }\n    <div class=\"form-actions\"><a class=\"secondary-button\" routerLink=\"/admin/trainees\">Cancel</a><button class=\"primary-button\" type=\"submit\">{{ id ? 'Update Trainee' : 'Create Login' }}</button></div>\n  </form>\n}\n@if (id) { <app-trainee-insights [traineeId]=\"id\" /> }\n", styles: [".temporary-password-note { display: flex; align-items: center; gap: 12px; margin-bottom: 20px; padding: 13px 15px; border: 1px solid #cfe1ec; border-radius: 9px; color: #405166; background: var(--light-blue); font-size: 11px; }\n.temporary-password-note strong { color: var(--blue-dark); }.temporary-password-note code { padding: 2px 6px; border-radius: 5px; color: var(--blue-dark); background: #fff; font-weight: 800; }\n.credentials-panel { max-width: 680px; margin-inline: auto; }\n.credentials-success { display: flex; align-items: center; gap: 14px; margin-bottom: 22px; }\n.credentials-success > span { display: grid; place-items: center; width: 42px; height: 42px; border-radius: 50%; color: #fff; background: var(--green); font-weight: 900; }\n.credentials-success strong { color: var(--ink); font-size: 15px; }.credentials-success p { margin: 5px 0 0; color: var(--muted); font-size: 11px; }\n.credentials-list { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; margin: 0; }\n.credentials-list div { padding: 16px; border: 1px solid #d4e4ee; border-radius: 10px; background: var(--light-blue); }\n.credentials-list dt { margin-bottom: 7px; color: var(--muted); font-size: 9px; font-weight: 800; text-transform: uppercase; letter-spacing: .06em; }\n.credentials-list dd { margin: 0; color: var(--blue-dark); font-size: 14px; font-weight: 900; word-break: break-all; }\n.credentials-warning { margin-top: 16px; padding: 12px 14px; border-radius: 9px; color: #795500; background: #fff6df; font-size: 11px; line-height: 1.5; }\n@media (max-width: 650px) { .credentials-list { grid-template-columns: 1fr; } }\n"] }]
    }], null, null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(TraineeFormPage, { className: "TraineeFormPage", filePath: "src/app/components/trainee-form/trainee-form.page.ts", lineNumber: 19 }); })();
