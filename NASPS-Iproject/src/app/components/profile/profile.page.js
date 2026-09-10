import { Component, effect, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { DataService } from '../../services/data.service';
import { ToastService } from '../../services/toast.service';
import { ValidationService } from '../../services/validation.service';
import { UniversityService } from '../../services/university.service';
import * as i0 from "@angular/core";
import * as i1 from "@angular/forms";
function ProfilePage_Conditional_11_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "img", 6);
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵproperty("src", ctx_r1.photoPreview(), i0.ɵɵsanitizeUrl);
} }
function ProfilePage_Conditional_12_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtext(0);
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵtextInterpolate1(" ", (ctx_r1.me()?.name || "NA").slice(0, 2).toUpperCase(), " ");
} }
function ProfilePage_Conditional_21_Template(rf, ctx) { if (rf & 1) {
    const _r4 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 24);
    i0.ɵɵlistener("click", function ProfilePage_Conditional_21_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r4); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.removePhoto()); });
    i0.ɵɵtext(1, "Remove Photo");
    i0.ɵɵelementEnd();
} }
function ProfilePage_Conditional_24_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "small", 11);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx_r1.photoFileName());
} }
function ProfilePage_Conditional_35_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "small", 16);
    i0.ɵɵtext(1, "Enter at least 2 characters.");
    i0.ɵɵelementEnd();
} }
function ProfilePage_Conditional_42_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "small", 16);
    i0.ɵɵtext(1, "Enter a complete Egyptian mobile number starting with 010, 011, 012, or 015.");
    i0.ɵɵelementEnd();
} }
function ProfilePage_Conditional_52_For_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 26);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const university_r5 = ctx.$implicit;
    i0.ɵɵproperty("value", university_r5);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(university_r5);
} }
function ProfilePage_Conditional_52_Conditional_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "small", 16);
    i0.ɵɵtext(1, "Select a university.");
    i0.ɵɵelementEnd();
} }
function ProfilePage_Conditional_52_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "label");
    i0.ɵɵtext(1, "University");
    i0.ɵɵelementStart(2, "select", 25);
    i0.ɵɵrepeaterCreate(3, ProfilePage_Conditional_52_For_4_Template, 2, 2, "option", 26, i0.ɵɵrepeaterTrackByIdentity);
    i0.ɵɵelementEnd();
    i0.ɵɵcontrolCreate();
    i0.ɵɵconditionalCreate(5, ProfilePage_Conditional_52_Conditional_5_Template, 2, 0, "small", 16);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(2);
    i0.ɵɵcontrol();
    i0.ɵɵadvance();
    i0.ɵɵrepeater(ctx_r1.universities);
    i0.ɵɵadvance(2);
    i0.ɵɵconditional(ctx_r1.form.controls.university.touched && ctx_r1.form.controls.university.invalid ? 5 : -1);
} }
export class ProfilePage {
    fb = inject(FormBuilder);
    auth = inject(AuthService);
    data = inject(DataService);
    toast = inject(ToastService);
    validation = inject(ValidationService);
    universityService = inject(UniversityService);
    universities = this.universityService.egyptianUniversities;
    me = this.auth.currentUser;
    role = this.auth.role() ?? 'trainee';
    isTrainee = this.role === 'trainee';
    storedProfile = this.isTrainee ? this.data.traineeProfile() : this.data.adminProfile();
    photoPreview = signal(this.storedProfile.photoUrl ?? '', /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "photoPreview" }] : /* istanbul ignore next */ []));
    photoFileName = signal('', /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "photoFileName" }] : /* istanbul ignore next */ []));
    maxPhotoSize = 2 * 1024 * 1024;
    form = this.fb.nonNullable.group({
        name: ['', [Validators.required, Validators.minLength(2)]],
        email: [{ value: '', disabled: true }],
        phone: ['', [Validators.required, this.validation.phone]],
        roleLabel: [{ value: '', disabled: true }],
        department: [{ value: '', disabled: true }],
        university: [{ value: '', disabled: !this.isTrainee }, this.isTrainee ? [Validators.required] : []],
        joinDate: [{ value: '', disabled: true }],
    });
    constructor() {
        void this.auth.loadCurrentUser();
        // Fill the form whenever the signed-in user's record loads or changes.
        effect(() => {
            const m = this.me();
            if (!m)
                return;
            const listedUniversity = this.universityService.isListed(m.university) ? m.university : (m.university ? 'Other' : '');
            this.form.patchValue({
                name: m.name,
                email: m.email,
                phone: m.phone,
                roleLabel: this.auth.identity().roleLabel,
                department: m.department,
                university: listedUniversity,
                joinDate: (m.joinDate ?? '').startsWith('0001') ? '' : (m.joinDate ?? '').slice(0, 10),
            }, { emitEvent: false });
        });
        effect(() => {
            const serverPhoto = this.auth.profilePhotoUrl();
            if (serverPhoto)
                this.photoPreview.set(serverPhoto);
        });
    }
    async save() {
        if (this.form.invalid) {
            this.form.markAllAsTouched();
            this.toast.show('Please fix the highlighted profile information.', 'error');
            return;
        }
        const value = this.form.getRawValue();
        const ok = await this.auth.updateCurrentUser({
            name: value.name,
            phone: value.phone,
            university: this.isTrainee ? value.university : undefined,
        });
        if (!ok) {
            this.toast.show('Could not save your profile. Check the API connection.', 'error');
            return;
        }
        if (this.isTrainee)
            void this.data.refreshTraineesFromServer();
        this.toast.show('Profile updated successfully.');
    }
    async onPhotoSelected(event) {
        const input = event.target;
        const file = input.files?.[0];
        if (!file)
            return;
        const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
        if (!allowedTypes.includes(file.type)) {
            input.value = '';
            this.toast.show('Profile photo must be a JPG, PNG, WEBP, or GIF image. PDF files are not accepted.', 'error');
            return;
        }
        if (file.size > this.maxPhotoSize) {
            input.value = '';
            this.toast.show('Profile photo must be 2 MB or smaller.', 'error');
            return;
        }
        const uploaded = await this.auth.uploadProfilePhoto(file);
        if (uploaded) {
            this.photoPreview.set(this.auth.profilePhotoUrl());
            this.photoFileName.set(file.name);
            const currentProfile = this.isTrainee ? this.data.traineeProfile() : this.data.adminProfile();
            this.data.updateProfile(this.role, { ...currentProfile, photoUrl: this.auth.profilePhotoUrl() });
            this.toast.show('Profile photo updated everywhere successfully.');
            return;
        }
        input.value = '';
        this.toast.show('The profile photo was not saved. Check the API connection and try again.', 'error');
    }
    async removePhoto() {
        const removed = await this.auth.removeProfilePhoto();
        const currentProfile = this.isTrainee ? this.data.traineeProfile() : this.data.adminProfile();
        if (!removed) {
            this.toast.show('The profile photo was not removed. Check the API connection and try again.', 'error');
            return;
        }
        this.data.updateProfile(this.role, { ...currentProfile, photoUrl: undefined });
        this.photoPreview.set('');
        this.photoFileName.set('');
        this.toast.show('Profile photo removed.');
    }
    resetDemo() {
        this.data.resetDemo();
        this.toast.show('Demo data restored.', 'warning');
    }
    static ɵfac = function ProfilePage_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || ProfilePage)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: ProfilePage, selectors: [["app-profile-page"]], decls: 56, vars: 11, consts: [["photoInput", ""], [1, "page-heading"], [1, "eyebrow"], [1, "panel", "profile-panel"], [1, "profile-card"], [1, "profile-avatar"], ["alt", "Profile photo preview", 3, "src"], ["type", "file", "accept", "image/jpeg,image/png,image/webp,image/gif", 1, "photo-input", 3, "change"], ["type", "button", 1, "secondary-button", 3, "click"], ["type", "button", 1, "secondary-button", "warning"], [1, "photo-help"], [1, "photo-name"], ["novalidate", "", 3, "ngSubmit", "formGroup"], [1, "profile-section-title"], [1, "form-grid"], ["formControlName", "name"], [1, "field-error"], ["type", "email", "formControlName", "email"], ["formControlName", "phone"], ["formControlName", "roleLabel"], ["formControlName", "department"], ["type", "date", "formControlName", "joinDate"], [1, "form-actions"], ["type", "submit", 1, "primary-button"], ["type", "button", 1, "secondary-button", "warning", 3, "click"], ["formControlName", "university"], [3, "value"]], template: function ProfilePage_Template(rf, ctx) { if (rf & 1) {
            const _r1 = i0.ɵɵgetCurrentView();
            i0.ɵɵelementStart(0, "div", 1)(1, "div")(2, "span", 2);
            i0.ɵɵtext(3, "ACCOUNT");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(4, "h1");
            i0.ɵɵtext(5, "Profile");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(6, "p");
            i0.ɵɵtext(7, "Your account information.");
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(8, "section", 3)(9, "div", 4)(10, "span", 5);
            i0.ɵɵconditionalCreate(11, ProfilePage_Conditional_11_Template, 1, 1, "img", 6)(12, ProfilePage_Conditional_12_Template, 1, 1);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(13, "h2");
            i0.ɵɵtext(14);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(15, "p");
            i0.ɵɵtext(16);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(17, "input", 7, 0);
            i0.ɵɵlistener("change", function ProfilePage_Template_input_change_17_listener($event) { return ctx.onPhotoSelected($event); });
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(19, "button", 8);
            i0.ɵɵlistener("click", function ProfilePage_Template_button_click_19_listener() { i0.ɵɵrestoreView(_r1); const photoInput_r3 = i0.ɵɵreference(18); return i0.ɵɵresetView(photoInput_r3.click()); });
            i0.ɵɵtext(20);
            i0.ɵɵelementEnd();
            i0.ɵɵconditionalCreate(21, ProfilePage_Conditional_21_Template, 2, 0, "button", 9);
            i0.ɵɵelementStart(22, "small", 10);
            i0.ɵɵtext(23, "Images only \u00B7 JPG, PNG, WEBP or GIF \u00B7 Maximum 2 MB");
            i0.ɵɵelementEnd();
            i0.ɵɵconditionalCreate(24, ProfilePage_Conditional_24_Template, 2, 1, "small", 11);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(25, "form", 12);
            i0.ɵɵlistener("ngSubmit", function ProfilePage_Template_form_ngSubmit_25_listener() { return ctx.save(); });
            i0.ɵɵelementStart(26, "div", 13)(27, "span", 2);
            i0.ɵɵtext(28, "PERSONAL INFORMATION");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(29, "p");
            i0.ɵɵtext(30);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(31, "div", 14)(32, "label");
            i0.ɵɵtext(33, "Full Name");
            i0.ɵɵelement(34, "input", 15);
            i0.ɵɵcontrolCreate();
            i0.ɵɵconditionalCreate(35, ProfilePage_Conditional_35_Template, 2, 0, "small", 16);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(36, "label");
            i0.ɵɵtext(37, "Email");
            i0.ɵɵelement(38, "input", 17);
            i0.ɵɵcontrolCreate();
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(39, "label");
            i0.ɵɵtext(40, "Phone Number");
            i0.ɵɵelement(41, "input", 18);
            i0.ɵɵcontrolCreate();
            i0.ɵɵconditionalCreate(42, ProfilePage_Conditional_42_Template, 2, 0, "small", 16);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(43, "label");
            i0.ɵɵtext(44, "Role");
            i0.ɵɵelement(45, "input", 19);
            i0.ɵɵcontrolCreate();
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(46, "label");
            i0.ɵɵtext(47, "Department");
            i0.ɵɵelement(48, "input", 20);
            i0.ɵɵcontrolCreate();
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(49, "label");
            i0.ɵɵtext(50, "Join Date");
            i0.ɵɵelement(51, "input", 21);
            i0.ɵɵcontrolCreate();
            i0.ɵɵelementEnd();
            i0.ɵɵconditionalCreate(52, ProfilePage_Conditional_52_Template, 6, 1, "label");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(53, "div", 22)(54, "button", 23);
            i0.ɵɵtext(55, "Update Profile");
            i0.ɵɵelementEnd()()()();
        } if (rf & 2) {
            i0.ɵɵadvance(11);
            i0.ɵɵconditional(ctx.photoPreview() ? 11 : 12);
            i0.ɵɵadvance(3);
            i0.ɵɵtextInterpolate(ctx.me()?.name || ctx.auth.identity().name);
            i0.ɵɵadvance(2);
            i0.ɵɵtextInterpolate(ctx.auth.identity().roleLabel);
            i0.ɵɵadvance(4);
            i0.ɵɵtextInterpolate(ctx.photoPreview() ? "Change Photo" : "Upload Photo");
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.photoPreview() ? 21 : -1);
            i0.ɵɵadvance(3);
            i0.ɵɵconditional(ctx.photoFileName() ? 24 : -1);
            i0.ɵɵadvance();
            i0.ɵɵproperty("formGroup", ctx.form);
            i0.ɵɵadvance(5);
            i0.ɵɵtextInterpolate1("Update your name and phone", ctx.isTrainee ? " and university" : "", " below.");
            i0.ɵɵadvance(4);
            i0.ɵɵcontrol();
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.form.controls.name.touched && ctx.form.controls.name.invalid ? 35 : -1);
            i0.ɵɵadvance(3);
            i0.ɵɵcontrol();
            i0.ɵɵadvance(3);
            i0.ɵɵcontrol();
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.form.controls.phone.touched && ctx.form.controls.phone.invalid ? 42 : -1);
            i0.ɵɵadvance(3);
            i0.ɵɵcontrol();
            i0.ɵɵadvance(3);
            i0.ɵɵcontrol();
            i0.ɵɵadvance(3);
            i0.ɵɵcontrol();
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.isTrainee ? 52 : -1);
        } }, dependencies: [ReactiveFormsModule, i1.ɵNgNoValidate, i1.NgSelectOption, i1.ɵNgSelectMultipleOption, i1.DefaultValueAccessor, i1.SelectControlValueAccessor, i1.NgControlStatus, i1.NgControlStatusGroup, i1.FormGroupDirective, i1.FormControlName], styles: ["[_nghost-%COMP%] { display: block; }\n.profile-avatar[_ngcontent-%COMP%] { overflow: hidden; }\n.profile-avatar[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] { display: block; width: 100%; height: 100%; object-fit: cover; }\n.photo-input[_ngcontent-%COMP%] { position: absolute; width: 1px; height: 1px; opacity: 0; pointer-events: none; }\n.photo-help[_ngcontent-%COMP%], .photo-name[_ngcontent-%COMP%] { display: block; margin-top: 9px; color: var(--%NS%muted); font-size: 9px; line-height: 1.45; }\n.photo-name[_ngcontent-%COMP%] { overflow: hidden; color: var(--%NS%blue); text-overflow: ellipsis; white-space: nowrap; }\n.profile-section-title[_ngcontent-%COMP%] { margin-bottom: 20px; padding-bottom: 14px; border-bottom: 1px solid var(--%NS%border); }\n.profile-section-title[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] { margin: 5px 0 0; color: var(--%NS%muted); font-size: 10px; }"] });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ProfilePage, [{
        type: Component,
        args: [{ selector: 'app-profile-page', imports: [ReactiveFormsModule], template: "<div class=\"page-heading\"><div><span class=\"eyebrow\">ACCOUNT</span><h1>Profile</h1><p>Your account information.</p></div></div>\n<section class=\"panel profile-panel\">\n  <div class=\"profile-card\">\n    <span class=\"profile-avatar\">@if (photoPreview()) { <img [src]=\"photoPreview()\" alt=\"Profile photo preview\"> } @else { {{ (me()?.name || 'NA').slice(0,2).toUpperCase() }} }</span>\n    <h2>{{ me()?.name || auth.identity().name }}</h2><p>{{ auth.identity().roleLabel }}</p>\n    <input #photoInput class=\"photo-input\" type=\"file\" accept=\"image/jpeg,image/png,image/webp,image/gif\" (change)=\"onPhotoSelected($event)\">\n    <button class=\"secondary-button\" type=\"button\" (click)=\"photoInput.click()\">{{ photoPreview() ? 'Change Photo' : 'Upload Photo' }}</button>\n    @if (photoPreview()) { <button class=\"secondary-button warning\" type=\"button\" (click)=\"removePhoto()\">Remove Photo</button> }\n    <small class=\"photo-help\">Images only \u00B7 JPG, PNG, WEBP or GIF \u00B7 Maximum 2 MB</small>\n    @if (photoFileName()) { <small class=\"photo-name\">{{ photoFileName() }}</small> }\n  </div>\n  <form [formGroup]=\"form\" (ngSubmit)=\"save()\" novalidate>\n    <div class=\"profile-section-title\"><span class=\"eyebrow\">PERSONAL INFORMATION</span><p>Update your name and phone{{ isTrainee ? ' and university' : '' }} below.</p></div>\n    <div class=\"form-grid\">\n      <label>Full Name<input formControlName=\"name\">@if (form.controls.name.touched && form.controls.name.invalid) { <small class=\"field-error\">Enter at least 2 characters.</small> }</label>\n      <label>Email<input type=\"email\" formControlName=\"email\"></label>\n      <label>Phone Number<input formControlName=\"phone\">@if (form.controls.phone.touched && form.controls.phone.invalid) { <small class=\"field-error\">Enter a complete Egyptian mobile number starting with 010, 011, 012, or 015.</small> }</label>\n      <label>Role<input formControlName=\"roleLabel\"></label>\n      <label>Department<input formControlName=\"department\"></label>\n      <label>Join Date<input type=\"date\" formControlName=\"joinDate\"></label>\n      @if (isTrainee) {\n        <label>University<select formControlName=\"university\">@for (university of universities; track university) { <option [value]=\"university\">{{ university }}</option> }</select>@if (form.controls.university.touched && form.controls.university.invalid) { <small class=\"field-error\">Select a university.</small> }</label>\n      }\n    </div>\n    <div class=\"form-actions\"><button class=\"primary-button\" type=\"submit\">Update Profile</button></div>\n  </form>\n</section>\n", styles: [":host { display: block; }\n.profile-avatar { overflow: hidden; }\n.profile-avatar img { display: block; width: 100%; height: 100%; object-fit: cover; }\n.photo-input { position: absolute; width: 1px; height: 1px; opacity: 0; pointer-events: none; }\n.photo-help, .photo-name { display: block; margin-top: 9px; color: var(--muted); font-size: 9px; line-height: 1.45; }\n.photo-name { overflow: hidden; color: var(--blue); text-overflow: ellipsis; white-space: nowrap; }\n.profile-section-title { margin-bottom: 20px; padding-bottom: 14px; border-bottom: 1px solid var(--border); }\n.profile-section-title p { margin: 5px 0 0; color: var(--muted); font-size: 10px; }\n"] }]
    }], () => [], null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(ProfilePage, { className: "ProfilePage", filePath: "src/app/components/profile/profile.page.ts", lineNumber: 10 }); })();
