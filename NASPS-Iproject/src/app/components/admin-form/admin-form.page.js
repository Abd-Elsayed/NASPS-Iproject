import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ToastService } from '../../services/toast.service';
import * as i0 from "@angular/core";
import * as i1 from "@angular/forms";
function AdminFormPage_Conditional_21_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "small", 6);
    i0.ɵɵtext(1, "Enter at least 2 characters.");
    i0.ɵɵelementEnd();
} }
function AdminFormPage_Conditional_25_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "small", 6);
    i0.ɵɵtext(1, "Enter a valid NASPS email address.");
    i0.ɵɵelementEnd();
} }
function AdminFormPage_For_32_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 10);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const department_r1 = ctx.$implicit;
    i0.ɵɵproperty("value", department_r1);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(department_r1);
} }
function AdminFormPage_Conditional_33_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "small", 6);
    i0.ɵɵtext(1, "Select a department.");
    i0.ɵɵelementEnd();
} }
function AdminFormPage_Conditional_52_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "small", 6);
    i0.ɵɵtext(1, "Passwords do not match yet.");
    i0.ɵɵelementEnd();
} }
function AdminFormPage_Conditional_53_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 16);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx_r1.serverError());
} }
function AdminFormPage_Conditional_54_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 17);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1("Administrator created. A verification code was sent to ", ctx_r1.createdEmail(), ".");
} }
export class AdminFormPage {
    fb = inject(FormBuilder);
    auth = inject(AuthService);
    toast = inject(ToastService);
    submitted = signal(false, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "submitted" }] : /* istanbul ignore next */ []));
    saving = signal(false, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "saving" }] : /* istanbul ignore next */ []));
    serverError = signal('', /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "serverError" }] : /* istanbul ignore next */ []));
    createdEmail = signal('', /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "createdEmail" }] : /* istanbul ignore next */ []));
    showPassword = false;
    departments = [
        'Engineering', 'Design', 'Data & AI', 'Cyber Security', 'Operations',
        'Training', 'Human Resources', 'Marketing', 'Finance', 'Product',
    ];
    form = this.fb.nonNullable.group({
        name: ['', [Validators.required, Validators.minLength(2)]],
        email: ['', [Validators.required, Validators.email, Validators.pattern(/@nasps/i)]],
        department: ['', Validators.required],
        password: ['', [
                Validators.required,
                Validators.minLength(8),
                Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^A-Za-z0-9]).+$/),
            ]],
        confirm: ['', Validators.required],
    });
    passwordHasMinimumLength() { return this.form.controls.password.value.length >= 8; }
    passwordHasUpperAndLower() {
        const password = this.form.controls.password.value;
        return /[A-Z]/.test(password) && /[a-z]/.test(password);
    }
    passwordHasNumber() { return /\d/.test(this.form.controls.password.value); }
    passwordHasSpecialCharacter() { return /[^A-Za-z0-9]/.test(this.form.controls.password.value); }
    passwordsMatch() { return this.form.controls.password.value === this.form.controls.confirm.value; }
    async save() {
        this.submitted.set(true);
        this.serverError.set('');
        this.createdEmail.set('');
        if (this.form.invalid || !this.passwordsMatch()) {
            this.form.markAllAsTouched();
            this.toast.show('Check the administrator information and password rules.', 'error');
            return;
        }
        this.saving.set(true);
        const value = this.form.getRawValue();
        const result = await this.auth.registerAdmin({
            name: value.name.trim(),
            email: value.email.trim().toLowerCase(),
            department: value.department,
            password: value.password,
        });
        this.saving.set(false);
        if (!result.success) {
            this.serverError.set(result.message);
            this.toast.show(result.message, 'error');
            return;
        }
        this.createdEmail.set(result.email ?? value.email.trim().toLowerCase());
        this.form.reset();
        this.submitted.set(false);
        this.toast.show(result.message, 'success', 10000);
    }
    static ɵfac = function AdminFormPage_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || AdminFormPage)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: AdminFormPage, selectors: [["app-admin-form-page"]], decls: 60, vars: 19, consts: [[1, "page-heading"], [1, "eyebrow"], ["novalidate", "", 1, "panel", "form-panel", 3, "ngSubmit", "formGroup"], [1, "permission-note"], [1, "form-grid"], ["formControlName", "name", "placeholder", "Enter full name", "autocomplete", "name"], [1, "field-error"], ["type", "email", "formControlName", "email", "placeholder", "name@nasps.org.eg", "autocomplete", "email"], ["formControlName", "department"], ["value", ""], [3, "value"], [1, "password-field"], ["formControlName", "password", "placeholder", "Create a strong password", "autocomplete", "new-password", 3, "type"], ["type", "button", 3, "click"], [1, "password-rules"], ["type", "password", "formControlName", "confirm", "placeholder", "Repeat the password", "autocomplete", "new-password"], ["role", "alert", 1, "form-error"], ["role", "status", 1, "success-message"], [1, "form-actions"], ["routerLink", "/admin/dashboard", 1, "secondary-button"], ["type", "submit", 1, "primary-button", 3, "disabled"]], template: function AdminFormPage_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0)(1, "div")(2, "span", 1);
            i0.ɵɵtext(3, "SUPER ADMIN");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(4, "h1");
            i0.ɵɵtext(5, "Add Administrator");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(6, "p");
            i0.ɵɵtext(7, "Create a department administrator. The server sends the verification code to that administrator's email.");
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(8, "form", 2);
            i0.ɵɵlistener("ngSubmit", function AdminFormPage_Template_form_ngSubmit_8_listener() { return ctx.save(); });
            i0.ɵɵelementStart(9, "div", 3)(10, "span");
            i0.ɵɵtext(11, "\u25C6");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(12, "div")(13, "strong");
            i0.ɵɵtext(14, "Super Admin permission");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(15, "p");
            i0.ɵɵtext(16, "Only a Super Admin can create another administrator. Department admins create trainee accounts instead.");
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(17, "div", 4)(18, "label");
            i0.ɵɵtext(19, "Full Name ");
            i0.ɵɵelement(20, "input", 5);
            i0.ɵɵcontrolCreate();
            i0.ɵɵconditionalCreate(21, AdminFormPage_Conditional_21_Template, 2, 0, "small", 6);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(22, "label");
            i0.ɵɵtext(23, "NASPS Email ");
            i0.ɵɵelement(24, "input", 7);
            i0.ɵɵcontrolCreate();
            i0.ɵɵconditionalCreate(25, AdminFormPage_Conditional_25_Template, 2, 0, "small", 6);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(26, "label");
            i0.ɵɵtext(27, "Department ");
            i0.ɵɵelementStart(28, "select", 8)(29, "option", 9);
            i0.ɵɵtext(30, "Select department");
            i0.ɵɵelementEnd();
            i0.ɵɵrepeaterCreate(31, AdminFormPage_For_32_Template, 2, 2, "option", 10, i0.ɵɵrepeaterTrackByIdentity);
            i0.ɵɵelementEnd();
            i0.ɵɵcontrolCreate();
            i0.ɵɵconditionalCreate(33, AdminFormPage_Conditional_33_Template, 2, 0, "small", 6);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(34, "label");
            i0.ɵɵtext(35, "Temporary Password ");
            i0.ɵɵelementStart(36, "span", 11);
            i0.ɵɵelement(37, "input", 12);
            i0.ɵɵcontrolCreate();
            i0.ɵɵelementStart(38, "button", 13);
            i0.ɵɵlistener("click", function AdminFormPage_Template_button_click_38_listener() { return ctx.showPassword = !ctx.showPassword; });
            i0.ɵɵtext(39);
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(40, "div", 14)(41, "span");
            i0.ɵɵtext(42, "At least 8 characters");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(43, "span");
            i0.ɵɵtext(44, "Uppercase and lowercase");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(45, "span");
            i0.ɵɵtext(46, "One number");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(47, "span");
            i0.ɵɵtext(48, "One special character");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(49, "label");
            i0.ɵɵtext(50, "Confirm Password ");
            i0.ɵɵelement(51, "input", 15);
            i0.ɵɵcontrolCreate();
            i0.ɵɵconditionalCreate(52, AdminFormPage_Conditional_52_Template, 2, 0, "small", 6);
            i0.ɵɵelementEnd()();
            i0.ɵɵconditionalCreate(53, AdminFormPage_Conditional_53_Template, 2, 1, "p", 16);
            i0.ɵɵconditionalCreate(54, AdminFormPage_Conditional_54_Template, 2, 1, "p", 17);
            i0.ɵɵelementStart(55, "div", 18)(56, "a", 19);
            i0.ɵɵtext(57, "Cancel");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(58, "button", 20);
            i0.ɵɵtext(59);
            i0.ɵɵelementEnd()()();
        } if (rf & 2) {
            i0.ɵɵadvance(8);
            i0.ɵɵproperty("formGroup", ctx.form);
            i0.ɵɵadvance(12);
            i0.ɵɵcontrol();
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.form.controls.name.touched && ctx.form.controls.name.invalid ? 21 : -1);
            i0.ɵɵadvance(3);
            i0.ɵɵcontrol();
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.form.controls.email.touched && ctx.form.controls.email.invalid ? 25 : -1);
            i0.ɵɵadvance(3);
            i0.ɵɵcontrol();
            i0.ɵɵadvance(3);
            i0.ɵɵrepeater(ctx.departments);
            i0.ɵɵadvance(2);
            i0.ɵɵconditional(ctx.form.controls.department.touched && ctx.form.controls.department.invalid ? 33 : -1);
            i0.ɵɵadvance(4);
            i0.ɵɵproperty("type", ctx.showPassword ? "text" : "password");
            i0.ɵɵcontrol();
            i0.ɵɵadvance(2);
            i0.ɵɵtextInterpolate(ctx.showPassword ? "Hide" : "Show");
            i0.ɵɵadvance(2);
            i0.ɵɵclassProp("valid", ctx.passwordHasMinimumLength());
            i0.ɵɵadvance(2);
            i0.ɵɵclassProp("valid", ctx.passwordHasUpperAndLower());
            i0.ɵɵadvance(2);
            i0.ɵɵclassProp("valid", ctx.passwordHasNumber());
            i0.ɵɵadvance(2);
            i0.ɵɵclassProp("valid", ctx.passwordHasSpecialCharacter());
            i0.ɵɵadvance(4);
            i0.ɵɵcontrol();
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.form.controls.confirm.dirty && !ctx.passwordsMatch() ? 52 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.serverError() ? 53 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.createdEmail() ? 54 : -1);
            i0.ɵɵadvance(4);
            i0.ɵɵproperty("disabled", ctx.saving());
            i0.ɵɵadvance();
            i0.ɵɵtextInterpolate(ctx.saving() ? "Creating\u2026" : "Create Administrator");
        } }, dependencies: [ReactiveFormsModule, i1.ɵNgNoValidate, i1.NgSelectOption, i1.ɵNgSelectMultipleOption, i1.DefaultValueAccessor, i1.SelectControlValueAccessor, i1.NgControlStatus, i1.NgControlStatusGroup, i1.FormGroupDirective, i1.FormControlName, RouterLink], styles: [".permission-note[_ngcontent-%COMP%] { display: flex; align-items: flex-start; gap: 12px; margin-bottom: 22px; padding: 14px 16px; border: 1px solid #cfe1ec; border-radius: 10px; background: var(--%NS%light-blue); color: var(--%NS%blue-dark); }\n.permission-note[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%] { display: grid; place-items: center; flex: 0 0 32px; height: 32px; border-radius: 8px; color: #fff; background: var(--%NS%blue); }\n.permission-note[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] { font-size: 12px; }\n.permission-note[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] { margin: 4px 0 0; color: var(--%NS%muted); font-size: 11px; line-height: 1.5; }\n.password-field[_ngcontent-%COMP%] { display: flex; overflow: hidden; border: 1px solid var(--%NS%border); border-radius: 8px; background: #fff; }\n.password-field[_ngcontent-%COMP%]:focus-within { border-color: var(--%NS%blue); box-shadow: 0 0 0 3px rgba(32, 96, 144, .1); }\n.password-field[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] { flex: 1; border: 0; box-shadow: none; }\n.password-field[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] { padding: 0 13px; border: 0; color: var(--%NS%blue); background: transparent; font-size: 11px; font-weight: 800; cursor: pointer; }\n.password-rules[_ngcontent-%COMP%] { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 7px 12px; align-content: center; padding: 12px 14px; border-radius: 8px; background: #f7f9fb; color: var(--%NS%muted); font-size: 10px; }\n.password-rules[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]::before { content: '\u25CB'; margin-right: 6px; }\n.password-rules[_ngcontent-%COMP%]   span.valid[_ngcontent-%COMP%] { color: var(--%NS%green); font-weight: 700; }\n.password-rules[_ngcontent-%COMP%]   span.valid[_ngcontent-%COMP%]::before { content: '\u2713'; }\n@media (max-width: 650px) { .password-rules[_ngcontent-%COMP%] { grid-template-columns: 1fr; } }"] });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AdminFormPage, [{
        type: Component,
        args: [{ selector: 'app-admin-form-page', imports: [ReactiveFormsModule, RouterLink], template: "<div class=\"page-heading\">\n  <div>\n    <span class=\"eyebrow\">SUPER ADMIN</span>\n    <h1>Add Administrator</h1>\n    <p>Create a department administrator. The server sends the verification code to that administrator's email.</p>\n  </div>\n</div>\n\n<form class=\"panel form-panel\" [formGroup]=\"form\" (ngSubmit)=\"save()\" novalidate>\n  <div class=\"permission-note\">\n    <span>\u25C6</span>\n    <div><strong>Super Admin permission</strong><p>Only a Super Admin can create another administrator. Department admins create trainee accounts instead.</p></div>\n  </div>\n\n  <div class=\"form-grid\">\n    <label>Full Name\n      <input formControlName=\"name\" placeholder=\"Enter full name\" autocomplete=\"name\">\n      @if (form.controls.name.touched && form.controls.name.invalid) { <small class=\"field-error\">Enter at least 2 characters.</small> }\n    </label>\n    <label>NASPS Email\n      <input type=\"email\" formControlName=\"email\" placeholder=\"name@nasps.org.eg\" autocomplete=\"email\">\n      @if (form.controls.email.touched && form.controls.email.invalid) { <small class=\"field-error\">Enter a valid NASPS email address.</small> }\n    </label>\n    <label>Department\n      <select formControlName=\"department\">\n        <option value=\"\">Select department</option>\n        @for (department of departments; track department) { <option [value]=\"department\">{{ department }}</option> }\n      </select>\n      @if (form.controls.department.touched && form.controls.department.invalid) { <small class=\"field-error\">Select a department.</small> }\n    </label>\n    <label>Temporary Password\n      <span class=\"password-field\">\n        <input [type]=\"showPassword ? 'text' : 'password'\" formControlName=\"password\" placeholder=\"Create a strong password\" autocomplete=\"new-password\">\n        <button type=\"button\" (click)=\"showPassword = !showPassword\">{{ showPassword ? 'Hide' : 'Show' }}</button>\n      </span>\n    </label>\n    <div class=\"password-rules\">\n      <span [class.valid]=\"passwordHasMinimumLength()\">At least 8 characters</span>\n      <span [class.valid]=\"passwordHasUpperAndLower()\">Uppercase and lowercase</span>\n      <span [class.valid]=\"passwordHasNumber()\">One number</span>\n      <span [class.valid]=\"passwordHasSpecialCharacter()\">One special character</span>\n    </div>\n    <label>Confirm Password\n      <input type=\"password\" formControlName=\"confirm\" placeholder=\"Repeat the password\" autocomplete=\"new-password\">\n      @if (form.controls.confirm.dirty && !passwordsMatch()) { <small class=\"field-error\">Passwords do not match yet.</small> }\n    </label>\n  </div>\n\n  @if (serverError()) { <p class=\"form-error\" role=\"alert\">{{ serverError() }}</p> }\n  @if (createdEmail()) { <p class=\"success-message\" role=\"status\">Administrator created. A verification code was sent to {{ createdEmail() }}.</p> }\n  <div class=\"form-actions\">\n    <a class=\"secondary-button\" routerLink=\"/admin/dashboard\">Cancel</a>\n    <button class=\"primary-button\" type=\"submit\" [disabled]=\"saving()\">{{ saving() ? 'Creating\u2026' : 'Create Administrator' }}</button>\n  </div>\n</form>\n", styles: [".permission-note { display: flex; align-items: flex-start; gap: 12px; margin-bottom: 22px; padding: 14px 16px; border: 1px solid #cfe1ec; border-radius: 10px; background: var(--light-blue); color: var(--blue-dark); }\n.permission-note > span { display: grid; place-items: center; flex: 0 0 32px; height: 32px; border-radius: 8px; color: #fff; background: var(--blue); }\n.permission-note strong { font-size: 12px; }\n.permission-note p { margin: 4px 0 0; color: var(--muted); font-size: 11px; line-height: 1.5; }\n.password-field { display: flex; overflow: hidden; border: 1px solid var(--border); border-radius: 8px; background: #fff; }\n.password-field:focus-within { border-color: var(--blue); box-shadow: 0 0 0 3px rgba(32, 96, 144, .1); }\n.password-field input { flex: 1; border: 0; box-shadow: none; }\n.password-field button { padding: 0 13px; border: 0; color: var(--blue); background: transparent; font-size: 11px; font-weight: 800; cursor: pointer; }\n.password-rules { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 7px 12px; align-content: center; padding: 12px 14px; border-radius: 8px; background: #f7f9fb; color: var(--muted); font-size: 10px; }\n.password-rules span::before { content: '\u25CB'; margin-right: 6px; }\n.password-rules span.valid { color: var(--green); font-weight: 700; }\n.password-rules span.valid::before { content: '\u2713'; }\n@media (max-width: 650px) { .password-rules { grid-template-columns: 1fr; } }\n"] }]
    }], null, null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(AdminFormPage, { className: "AdminFormPage", filePath: "src/app/components/admin-form/admin-form.page.ts", lineNumber: 13 }); })();
