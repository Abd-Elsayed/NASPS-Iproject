import { Component, computed, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ToastService } from '../../services/toast.service';
import * as i0 from "@angular/core";
import * as i1 from "@angular/forms";
function AuthPage_Conditional_4_Conditional_7_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "small", 7);
    i0.ɵɵtext(1, "Email, Trainee ID, or username is required.");
    i0.ɵɵelementEnd();
} }
function AuthPage_Conditional_4_Conditional_14_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "small", 11);
    i0.ɵɵtext(1, "Password must contain at least 8 characters.");
    i0.ɵɵelementEnd();
} }
function AuthPage_Conditional_4_Conditional_15_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 12);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx_r1.serverError());
} }
function AuthPage_Conditional_4_Template(rf, ctx) { if (rf & 1) {
    const _r1 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 4)(1, "h1");
    i0.ɵɵtext(2, "Sign in to your workspace");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(3, "form", 5);
    i0.ɵɵlistener("ngSubmit", function AuthPage_Conditional_4_Template_form_ngSubmit_3_listener() { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.submit()); });
    i0.ɵɵelementStart(4, "label");
    i0.ɵɵtext(5, "Email, Trainee ID or Username ");
    i0.ɵɵelement(6, "input", 6);
    i0.ɵɵcontrolCreate();
    i0.ɵɵconditionalCreate(7, AuthPage_Conditional_4_Conditional_7_Template, 2, 0, "small", 7);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "label");
    i0.ɵɵtext(9, "Password ");
    i0.ɵɵelementStart(10, "span", 8);
    i0.ɵɵelement(11, "input", 9);
    i0.ɵɵcontrolCreate();
    i0.ɵɵelementStart(12, "button", 10);
    i0.ɵɵlistener("click", function AuthPage_Conditional_4_Template_button_click_12_listener() { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.showPassword = !ctx_r1.showPassword); });
    i0.ɵɵtext(13);
    i0.ɵɵelementEnd()();
    i0.ɵɵconditionalCreate(14, AuthPage_Conditional_4_Conditional_14_Template, 2, 0, "small", 11);
    i0.ɵɵelementEnd();
    i0.ɵɵconditionalCreate(15, AuthPage_Conditional_4_Conditional_15_Template, 2, 1, "p", 12);
    i0.ɵɵelementStart(16, "div", 13)(17, "a", 14);
    i0.ɵɵtext(18, "Forgot password?");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(19, "button", 15);
    i0.ɵɵtext(20, "Sign In");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(21, "p", 16);
    i0.ɵɵtext(22, "Your account role is identified securely by the NASPS server after sign in.");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("formGroup", ctx_r1.loginForm);
    i0.ɵɵadvance(3);
    i0.ɵɵcontrol();
    i0.ɵɵadvance();
    i0.ɵɵconditional((ctx_r1.loginForm.controls.email.dirty || ctx_r1.loginForm.controls.email.touched) && ctx_r1.loginForm.controls.email.invalid ? 7 : -1);
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("type", ctx_r1.showPassword ? "text" : "password");
    i0.ɵɵcontrol();
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r1.showPassword ? "Hide" : "Show");
    i0.ɵɵadvance();
    i0.ɵɵconditional((ctx_r1.loginForm.controls.password.dirty || ctx_r1.loginForm.controls.password.touched) && ctx_r1.loginForm.controls.password.invalid ? 14 : -1);
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r1.serverError() ? 15 : -1);
} }
function AuthPage_Conditional_5_Conditional_11_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "small", 7);
    i0.ɵɵtext(1, "Enter your full name.");
    i0.ɵɵelementEnd();
} }
function AuthPage_Conditional_5_Conditional_15_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "small", 7);
    i0.ɵɵtext(1, "Enter a valid email that contains \u201C@nasps\u201D.");
    i0.ɵɵelementEnd();
} }
function AuthPage_Conditional_5_For_22_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 22);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const dept_r4 = ctx.$implicit;
    i0.ɵɵproperty("value", dept_r4);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(dept_r4);
} }
function AuthPage_Conditional_5_Conditional_23_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "small", 7);
    i0.ɵɵtext(1, "Choose your department.");
    i0.ɵɵelementEnd();
} }
function AuthPage_Conditional_5_Conditional_42_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "small", 7);
    i0.ɵɵtext(1, "Passwords do not match yet.");
    i0.ɵɵelementEnd();
} }
function AuthPage_Conditional_5_Conditional_43_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 12);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx_r1.serverError());
} }
function AuthPage_Conditional_5_Template(rf, ctx) { if (rf & 1) {
    const _r3 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 4)(1, "span", 17);
    i0.ɵɵtext(2, "ADMIN SIGN-UP");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "h1");
    i0.ɵɵtext(4, "Create your admin account");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "p");
    i0.ɵɵtext(6, "Use your NASPS email address. We email a 6-digit code to verify it before your first sign-in.");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(7, "form", 5);
    i0.ɵɵlistener("ngSubmit", function AuthPage_Conditional_5_Template_form_ngSubmit_7_listener() { i0.ɵɵrestoreView(_r3); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.submitRegister()); });
    i0.ɵɵelementStart(8, "label");
    i0.ɵɵtext(9, "Full name ");
    i0.ɵɵelement(10, "input", 18);
    i0.ɵɵcontrolCreate();
    i0.ɵɵconditionalCreate(11, AuthPage_Conditional_5_Conditional_11_Template, 2, 0, "small", 7);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(12, "label");
    i0.ɵɵtext(13, "NASPS email ");
    i0.ɵɵelement(14, "input", 19);
    i0.ɵɵcontrolCreate();
    i0.ɵɵconditionalCreate(15, AuthPage_Conditional_5_Conditional_15_Template, 2, 0, "small", 7);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(16, "label");
    i0.ɵɵtext(17, "Department ");
    i0.ɵɵelementStart(18, "select", 20)(19, "option", 21);
    i0.ɵɵtext(20, "Select a department");
    i0.ɵɵelementEnd();
    i0.ɵɵrepeaterCreate(21, AuthPage_Conditional_5_For_22_Template, 2, 2, "option", 22, i0.ɵɵrepeaterTrackByIdentity);
    i0.ɵɵelementEnd();
    i0.ɵɵcontrolCreate();
    i0.ɵɵconditionalCreate(23, AuthPage_Conditional_5_Conditional_23_Template, 2, 0, "small", 7);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(24, "label");
    i0.ɵɵtext(25, "Password ");
    i0.ɵɵelementStart(26, "span", 8);
    i0.ɵɵelement(27, "input", 23);
    i0.ɵɵcontrolCreate();
    i0.ɵɵelementStart(28, "button", 24);
    i0.ɵɵlistener("click", function AuthPage_Conditional_5_Template_button_click_28_listener() { i0.ɵɵrestoreView(_r3); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.showNewPassword = !ctx_r1.showNewPassword); });
    i0.ɵɵtext(29);
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(30, "ul", 25)(31, "li");
    i0.ɵɵtext(32, "At least 8 characters");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(33, "li");
    i0.ɵɵtext(34, "Uppercase and lowercase letters");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(35, "li");
    i0.ɵɵtext(36, "One number");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(37, "li");
    i0.ɵɵtext(38, "One special character");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(39, "label");
    i0.ɵɵtext(40, "Confirm password ");
    i0.ɵɵelement(41, "input", 26);
    i0.ɵɵcontrolCreate();
    i0.ɵɵconditionalCreate(42, AuthPage_Conditional_5_Conditional_42_Template, 2, 0, "small", 7);
    i0.ɵɵelementEnd();
    i0.ɵɵconditionalCreate(43, AuthPage_Conditional_5_Conditional_43_Template, 2, 1, "p", 12);
    i0.ɵɵelementStart(44, "button", 15);
    i0.ɵɵtext(45, "Create Account & Send Code");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(46, "a", 27);
    i0.ɵɵtext(47, "Back to sign in");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(7);
    i0.ɵɵproperty("formGroup", ctx_r1.registerForm);
    i0.ɵɵadvance(3);
    i0.ɵɵcontrol();
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r1.registerForm.controls.name.touched && ctx_r1.registerForm.controls.name.invalid ? 11 : -1);
    i0.ɵɵadvance(3);
    i0.ɵɵcontrol();
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r1.registerForm.controls.email.touched && ctx_r1.registerForm.controls.email.invalid ? 15 : -1);
    i0.ɵɵadvance(3);
    i0.ɵɵcontrol();
    i0.ɵɵadvance(3);
    i0.ɵɵrepeater(ctx_r1.departments);
    i0.ɵɵadvance(2);
    i0.ɵɵconditional(ctx_r1.registerForm.controls.department.touched && ctx_r1.registerForm.controls.department.invalid ? 23 : -1);
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("type", ctx_r1.showNewPassword ? "text" : "password");
    i0.ɵɵcontrol();
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r1.showNewPassword ? "Hide" : "Show");
    i0.ɵɵadvance();
    i0.ɵɵclassProp("live", ctx_r1.registerForm.controls.password.dirty);
    i0.ɵɵadvance();
    i0.ɵɵclassProp("valid", ctx_r1.regHasMinLength())("invalid", ctx_r1.registerForm.controls.password.dirty && !ctx_r1.regHasMinLength());
    i0.ɵɵadvance(2);
    i0.ɵɵclassProp("valid", ctx_r1.regHasUpperLower())("invalid", ctx_r1.registerForm.controls.password.dirty && !ctx_r1.regHasUpperLower());
    i0.ɵɵadvance(2);
    i0.ɵɵclassProp("valid", ctx_r1.regHasNumber())("invalid", ctx_r1.registerForm.controls.password.dirty && !ctx_r1.regHasNumber());
    i0.ɵɵadvance(2);
    i0.ɵɵclassProp("valid", ctx_r1.regHasSpecial())("invalid", ctx_r1.registerForm.controls.password.dirty && !ctx_r1.regHasSpecial());
    i0.ɵɵadvance(4);
    i0.ɵɵcontrol();
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r1.registerForm.controls.confirm.dirty && !ctx_r1.regPasswordsMatch() ? 42 : -1);
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r1.serverError() ? 43 : -1);
} }
function AuthPage_Conditional_6_Conditional_14_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "small", 7);
    i0.ɵɵtext(1, "Enter exactly 6 digits.");
    i0.ɵɵelementEnd();
} }
function AuthPage_Conditional_6_Conditional_15_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 12);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx_r1.serverError());
} }
function AuthPage_Conditional_6_Template(rf, ctx) { if (rf & 1) {
    const _r5 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 4)(1, "span", 17);
    i0.ɵɵtext(2, "EMAIL VERIFICATION");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "h1");
    i0.ɵɵtext(4, "Verify your email");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "p");
    i0.ɵɵtext(6, "Enter the 6-digit code sent to ");
    i0.ɵɵelementStart(7, "strong");
    i0.ɵɵtext(8);
    i0.ɵɵelementEnd();
    i0.ɵɵtext(9, ".");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(10, "form", 5);
    i0.ɵɵlistener("ngSubmit", function AuthPage_Conditional_6_Template_form_ngSubmit_10_listener() { i0.ɵɵrestoreView(_r5); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.submitAccountVerification()); });
    i0.ɵɵelementStart(11, "label");
    i0.ɵɵtext(12, "Verification code ");
    i0.ɵɵelement(13, "input", 28);
    i0.ɵɵcontrolCreate();
    i0.ɵɵconditionalCreate(14, AuthPage_Conditional_6_Conditional_14_Template, 2, 0, "small", 7);
    i0.ɵɵelementEnd();
    i0.ɵɵconditionalCreate(15, AuthPage_Conditional_6_Conditional_15_Template, 2, 1, "p", 12);
    i0.ɵɵelementStart(16, "button", 15);
    i0.ɵɵtext(17, "Verify & Continue");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(18, "button", 29);
    i0.ɵɵlistener("click", function AuthPage_Conditional_6_Template_button_click_18_listener() { i0.ɵɵrestoreView(_r5); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.resendAccountCode()); });
    i0.ɵɵtext(19, "Resend code");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(20, "a", 27);
    i0.ɵɵtext(21, "Back to sign in");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(8);
    i0.ɵɵtextInterpolate(ctx_r1.auth.verifyEmailAddress() || "your email");
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("formGroup", ctx_r1.accountCodeForm);
    i0.ɵɵadvance(3);
    i0.ɵɵcontrol();
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r1.accountCodeForm.controls.code.touched && ctx_r1.accountCodeForm.controls.code.invalid ? 14 : -1);
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r1.serverError() ? 15 : -1);
} }
function AuthPage_Conditional_7_Conditional_7_Conditional_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "small", 7);
    i0.ɵɵtext(1, "Enter a valid registered email address.");
    i0.ɵɵelementEnd();
} }
function AuthPage_Conditional_7_Conditional_7_Conditional_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 12);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx_r1.serverError());
} }
function AuthPage_Conditional_7_Conditional_7_Template(rf, ctx) { if (rf & 1) {
    const _r6 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "form", 5);
    i0.ɵɵlistener("ngSubmit", function AuthPage_Conditional_7_Conditional_7_Template_form_ngSubmit_0_listener() { i0.ɵɵrestoreView(_r6); const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.sendPasswordResetCode()); });
    i0.ɵɵelementStart(1, "label");
    i0.ɵɵtext(2, "Registered Email ");
    i0.ɵɵelement(3, "input", 31);
    i0.ɵɵcontrolCreate();
    i0.ɵɵconditionalCreate(4, AuthPage_Conditional_7_Conditional_7_Conditional_4_Template, 2, 0, "small", 7);
    i0.ɵɵelementEnd();
    i0.ɵɵconditionalCreate(5, AuthPage_Conditional_7_Conditional_7_Conditional_5_Template, 2, 1, "p", 12);
    i0.ɵɵelementStart(6, "button", 15);
    i0.ɵɵtext(7, "Send Reset Code");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "a", 27);
    i0.ɵɵtext(9, "Back to sign in");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵproperty("formGroup", ctx_r1.forgotEmailForm);
    i0.ɵɵadvance(3);
    i0.ɵɵcontrol();
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r1.forgotEmailForm.controls.email.touched && ctx_r1.forgotEmailForm.controls.email.invalid ? 4 : -1);
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r1.serverError() ? 5 : -1);
} }
function AuthPage_Conditional_7_Conditional_8_Conditional_11_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "small", 7);
    i0.ɵɵtext(1, "Enter exactly 6 digits.");
    i0.ɵɵelementEnd();
} }
function AuthPage_Conditional_7_Conditional_8_Conditional_30_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "small", 7);
    i0.ɵɵtext(1, "Passwords do not match yet.");
    i0.ɵɵelementEnd();
} }
function AuthPage_Conditional_7_Conditional_8_Conditional_31_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 12);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx_r1.serverError());
} }
function AuthPage_Conditional_7_Conditional_8_Template(rf, ctx) { if (rf & 1) {
    const _r7 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 32)(1, "span");
    i0.ɵɵtext(2, "Code sent to");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "strong");
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "button", 24);
    i0.ɵɵlistener("click", function AuthPage_Conditional_7_Conditional_8_Template_button_click_5_listener() { i0.ɵɵrestoreView(_r7); const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.resetCodeSent.set(false)); });
    i0.ɵɵtext(6, "Change email");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(7, "form", 5);
    i0.ɵɵlistener("ngSubmit", function AuthPage_Conditional_7_Conditional_8_Template_form_ngSubmit_7_listener() { i0.ɵɵrestoreView(_r7); const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.submitForgotPassword()); });
    i0.ɵɵelementStart(8, "label");
    i0.ɵɵtext(9, "6-digit verification code ");
    i0.ɵɵelement(10, "input", 33);
    i0.ɵɵcontrolCreate();
    i0.ɵɵconditionalCreate(11, AuthPage_Conditional_7_Conditional_8_Conditional_11_Template, 2, 0, "small", 7);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(12, "label");
    i0.ɵɵtext(13, "New password ");
    i0.ɵɵelementStart(14, "span", 8);
    i0.ɵɵelement(15, "input", 23);
    i0.ɵɵcontrolCreate();
    i0.ɵɵelementStart(16, "button", 24);
    i0.ɵɵlistener("click", function AuthPage_Conditional_7_Conditional_8_Template_button_click_16_listener() { i0.ɵɵrestoreView(_r7); const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.showNewPassword = !ctx_r1.showNewPassword); });
    i0.ɵɵtext(17);
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(18, "ul", 25)(19, "li");
    i0.ɵɵtext(20, "At least 8 characters");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(21, "li");
    i0.ɵɵtext(22, "Uppercase and lowercase letters");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(23, "li");
    i0.ɵɵtext(24, "One number");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(25, "li");
    i0.ɵɵtext(26, "One special character");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(27, "label");
    i0.ɵɵtext(28, "Confirm new password");
    i0.ɵɵelement(29, "input", 26);
    i0.ɵɵcontrolCreate();
    i0.ɵɵconditionalCreate(30, AuthPage_Conditional_7_Conditional_8_Conditional_30_Template, 2, 0, "small", 7);
    i0.ɵɵelementEnd();
    i0.ɵɵconditionalCreate(31, AuthPage_Conditional_7_Conditional_8_Conditional_31_Template, 2, 1, "p", 12);
    i0.ɵɵelementStart(32, "button", 15);
    i0.ɵɵtext(33, "Verify Code & Reset Password");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(34, "button", 29);
    i0.ɵɵlistener("click", function AuthPage_Conditional_7_Conditional_8_Template_button_click_34_listener() { i0.ɵɵrestoreView(_r7); const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.sendPasswordResetCode()); });
    i0.ɵɵtext(35, "Resend code");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(36, "a", 27);
    i0.ɵɵtext(37, "Back to sign in");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(ctx_r1.resetEmail());
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("formGroup", ctx_r1.passwordForm);
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("formControl", ctx_r1.forgotCodeForm.controls.code);
    i0.ɵɵcontrol();
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r1.forgotCodeForm.controls.code.touched && ctx_r1.forgotCodeForm.controls.code.invalid ? 11 : -1);
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("type", ctx_r1.showNewPassword ? "text" : "password");
    i0.ɵɵcontrol();
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r1.showNewPassword ? "Hide" : "Show");
    i0.ɵɵadvance();
    i0.ɵɵclassProp("live", ctx_r1.passwordForm.controls.password.dirty);
    i0.ɵɵadvance();
    i0.ɵɵclassProp("valid", ctx_r1.passwordHasMinimumLength())("invalid", ctx_r1.passwordForm.controls.password.dirty && !ctx_r1.passwordHasMinimumLength());
    i0.ɵɵadvance(2);
    i0.ɵɵclassProp("valid", ctx_r1.passwordHasUppercase() && ctx_r1.passwordHasLowercase())("invalid", ctx_r1.passwordForm.controls.password.dirty && (!ctx_r1.passwordHasUppercase() || !ctx_r1.passwordHasLowercase()));
    i0.ɵɵadvance(2);
    i0.ɵɵclassProp("valid", ctx_r1.passwordHasNumber())("invalid", ctx_r1.passwordForm.controls.password.dirty && !ctx_r1.passwordHasNumber());
    i0.ɵɵadvance(2);
    i0.ɵɵclassProp("valid", ctx_r1.passwordHasSpecialCharacter())("invalid", ctx_r1.passwordForm.controls.password.dirty && !ctx_r1.passwordHasSpecialCharacter());
    i0.ɵɵadvance(4);
    i0.ɵɵcontrol();
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r1.passwordForm.controls.confirm.dirty && !ctx_r1.passwordsMatch() ? 30 : -1);
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r1.serverError() ? 31 : -1);
} }
function AuthPage_Conditional_7_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 4)(1, "span", 17);
    i0.ɵɵtext(2, "ACCOUNT RECOVERY");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "h1");
    i0.ɵɵtext(4, "Reset your password");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "p");
    i0.ɵɵtext(6, "Enter the registered Admin or Trainee email to receive a reset code.");
    i0.ɵɵelementEnd()();
    i0.ɵɵconditionalCreate(7, AuthPage_Conditional_7_Conditional_7_Template, 10, 3, "form", 30)(8, AuthPage_Conditional_7_Conditional_8_Template, 38, 26);
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(7);
    i0.ɵɵconditional(!ctx_r1.resetCodeSent() ? 7 : 8);
} }
function AuthPage_Conditional_8_Conditional_26_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "small", 11);
    i0.ɵɵtext(1, "Passwords do not match yet.");
    i0.ɵɵelementEnd();
} }
function AuthPage_Conditional_8_Conditional_27_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 12);
    i0.ɵɵtext(1, "Check the password rules and make sure both passwords match.");
    i0.ɵɵelementEnd();
} }
function AuthPage_Conditional_8_Conditional_28_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 12);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx_r1.serverError());
} }
function AuthPage_Conditional_8_Template(rf, ctx) { if (rf & 1) {
    const _r8 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 4)(1, "span", 17);
    i0.ɵɵtext(2, "FIRST LOGIN");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "h1");
    i0.ɵɵtext(4, "Create your private password");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "p");
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(7, "form", 5);
    i0.ɵɵlistener("ngSubmit", function AuthPage_Conditional_8_Template_form_ngSubmit_7_listener() { i0.ɵɵrestoreView(_r8); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.submit()); });
    i0.ɵɵelementStart(8, "label");
    i0.ɵɵtext(9, "New password ");
    i0.ɵɵelementStart(10, "span", 8);
    i0.ɵɵelement(11, "input", 23);
    i0.ɵɵcontrolCreate();
    i0.ɵɵelementStart(12, "button", 24);
    i0.ɵɵlistener("click", function AuthPage_Conditional_8_Template_button_click_12_listener() { i0.ɵɵrestoreView(_r8); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.showNewPassword = !ctx_r1.showNewPassword); });
    i0.ɵɵtext(13);
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(14, "ul", 25)(15, "li");
    i0.ɵɵtext(16, "At least 8 characters");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(17, "li");
    i0.ɵɵtext(18, "Uppercase and lowercase letters");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(19, "li");
    i0.ɵɵtext(20, "One number");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(21, "li");
    i0.ɵɵtext(22, "One special character");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(23, "label");
    i0.ɵɵtext(24, "Confirm password");
    i0.ɵɵelement(25, "input", 26);
    i0.ɵɵcontrolCreate();
    i0.ɵɵconditionalCreate(26, AuthPage_Conditional_8_Conditional_26_Template, 2, 0, "small", 11);
    i0.ɵɵelementEnd();
    i0.ɵɵconditionalCreate(27, AuthPage_Conditional_8_Conditional_27_Template, 2, 0, "p", 12);
    i0.ɵɵconditionalCreate(28, AuthPage_Conditional_8_Conditional_28_Template, 2, 1, "p", 12);
    i0.ɵɵelementStart(29, "button", 15);
    i0.ɵɵtext(30, "Create Password & Continue");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(31, "a", 27);
    i0.ɵɵtext(32, "Back to sign in");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(6);
    i0.ɵɵtextInterpolate(ctx_r1.auth.pendingPasswordEmail() || "Sign in with your temporary password first.");
    i0.ɵɵadvance();
    i0.ɵɵproperty("formGroup", ctx_r1.passwordForm);
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("type", ctx_r1.showNewPassword ? "text" : "password");
    i0.ɵɵcontrol();
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r1.showNewPassword ? "Hide" : "Show");
    i0.ɵɵadvance();
    i0.ɵɵclassProp("live", ctx_r1.passwordForm.controls.password.dirty);
    i0.ɵɵadvance();
    i0.ɵɵclassProp("valid", ctx_r1.passwordHasMinimumLength())("invalid", ctx_r1.passwordForm.controls.password.dirty && !ctx_r1.passwordHasMinimumLength());
    i0.ɵɵadvance(2);
    i0.ɵɵclassProp("valid", ctx_r1.passwordHasUppercase() && ctx_r1.passwordHasLowercase())("invalid", ctx_r1.passwordForm.controls.password.dirty && (!ctx_r1.passwordHasUppercase() || !ctx_r1.passwordHasLowercase()));
    i0.ɵɵadvance(2);
    i0.ɵɵclassProp("valid", ctx_r1.passwordHasNumber())("invalid", ctx_r1.passwordForm.controls.password.dirty && !ctx_r1.passwordHasNumber());
    i0.ɵɵadvance(2);
    i0.ɵɵclassProp("valid", ctx_r1.passwordHasSpecialCharacter())("invalid", ctx_r1.passwordForm.controls.password.dirty && !ctx_r1.passwordHasSpecialCharacter());
    i0.ɵɵadvance(4);
    i0.ɵɵcontrol();
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r1.passwordForm.controls.confirm.dirty && !ctx_r1.passwordsMatch() ? 26 : -1);
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r1.submitted() && (ctx_r1.passwordForm.invalid || ctx_r1.passwordForm.value.password !== ctx_r1.passwordForm.value.confirm) ? 27 : -1);
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r1.serverError() ? 28 : -1);
} }
export class AuthPage {
    fb = inject(FormBuilder);
    route = inject(ActivatedRoute);
    router = inject(Router);
    toast = inject(ToastService);
    auth = inject(AuthService);
    mode = (this.route.snapshot.data['mode'] ?? 'login');
    isPassword = computed(() => this.mode === 'password', /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "isPassword" }] : /* istanbul ignore next */ []));
    isForgotPassword = computed(() => this.mode === 'forgot', /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "isForgotPassword" }] : /* istanbul ignore next */ []));
    isRegister = computed(() => this.mode === 'register', /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "isRegister" }] : /* istanbul ignore next */ []));
    isVerify = computed(() => this.mode === 'verify', /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "isVerify" }] : /* istanbul ignore next */ []));
    isLogin = computed(() => this.mode === 'login' || this.mode === 'admin' || this.mode === 'trainee', /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "isLogin" }] : /* istanbul ignore next */ []));
    departments = ['Engineering', 'Design', 'Data & AI', 'Operations', 'HR', 'Marketing', 'Finance', 'Product'];
    showPassword = false;
    showNewPassword = false;
    submitted = signal(false, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "submitted" }] : /* istanbul ignore next */ []));
    serverError = signal('', /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "serverError" }] : /* istanbul ignore next */ []));
    resetCodeSent = signal(false, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "resetCodeSent" }] : /* istanbul ignore next */ []));
    resetEmail = signal('', /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "resetEmail" }] : /* istanbul ignore next */ []));
    loginForm = this.fb.nonNullable.group({
        email: ['', [Validators.required]],
        password: ['', [Validators.required, Validators.minLength(8)]],
    });
    passwordForm = this.fb.nonNullable.group({
        password: ['', [Validators.required, Validators.minLength(8), Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^A-Za-z0-9]).+$/)]],
        confirm: ['', Validators.required],
    });
    registerForm = this.fb.nonNullable.group({
        name: ['', [Validators.required, Validators.minLength(2)]],
        email: ['', [Validators.required, Validators.email, Validators.pattern(/@nasps/i)]],
        department: ['', Validators.required],
        password: ['', [Validators.required, Validators.minLength(8), Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^A-Za-z0-9]).+$/)]],
        confirm: ['', Validators.required],
    });
    accountCodeForm = this.fb.nonNullable.group({
        code: ['', [Validators.required, Validators.pattern(/^\d{6}$/)]],
    });
    forgotEmailForm = this.fb.nonNullable.group({
        email: ['', [Validators.required, Validators.email]],
    });
    forgotCodeForm = this.fb.nonNullable.group({
        code: ['', [Validators.required, Validators.pattern(/^\d{6}$/)]],
    });
    constructor() {
        const emailFromLink = this.route.snapshot.queryParamMap.get('email');
        if (this.mode === 'verify' && emailFromLink) {
            this.auth.prepareEmailVerification(emailFromLink);
        }
        if (this.mode === 'forgot' && emailFromLink) {
            this.forgotEmailForm.controls.email.setValue(emailFromLink.trim().toLowerCase());
        }
    }
    async sendPasswordResetCode() {
        const emailControl = this.forgotEmailForm.controls.email;
        emailControl.markAsTouched();
        this.serverError.set('');
        if (emailControl.invalid) {
            this.toast.show('Enter a valid registered admin or trainee email.', 'error');
            return;
        }
        const email = emailControl.value.trim().toLowerCase();
        const result = await this.auth.requestPasswordReset(email);
        if (!result.success) {
            this.serverError.set(result.message);
            this.toast.show(result.message, 'error');
            return;
        }
        this.resetEmail.set(email);
        this.resetCodeSent.set(true);
        this.forgotCodeForm.reset();
        this.passwordForm.reset();
        this.toast.show(result.message, 'info', 10000);
    }
    async submitForgotPassword() {
        this.submitted.set(true);
        this.serverError.set('');
        if (this.forgotCodeForm.invalid || this.passwordForm.invalid || !this.passwordsMatch()) {
            this.forgotCodeForm.markAllAsTouched();
            this.passwordForm.markAllAsTouched();
            this.toast.show('Check the verification code and password rules.', 'error');
            return;
        }
        const result = await this.auth.resetForgottenPassword(this.resetEmail(), this.forgotCodeForm.controls.code.value, this.passwordForm.controls.password.value);
        if (!result.success) {
            this.serverError.set(result.message);
            this.toast.show(result.message, 'error');
            return;
        }
        this.toast.show(result.message, 'success');
        await this.router.navigate(['/login']);
    }
    regPwd() { return this.registerForm.controls.password.value; }
    regHasMinLength() { return this.regPwd().length >= 8; }
    regHasUpperLower() { return /[A-Z]/.test(this.regPwd()) && /[a-z]/.test(this.regPwd()); }
    regHasNumber() { return /\d/.test(this.regPwd()); }
    regHasSpecial() { return /[^A-Za-z0-9]/.test(this.regPwd()); }
    regPasswordsMatch() { return this.registerForm.controls.password.value === this.registerForm.controls.confirm.value; }
    async submitRegister() {
        this.submitted.set(true);
        this.serverError.set('');
        if (this.registerForm.invalid || !this.regPasswordsMatch()) {
            this.registerForm.markAllAsTouched();
            this.toast.show('Check the form: a NASPS email, a department, and a strong matching password are required.', 'error');
            return;
        }
        const value = this.registerForm.getRawValue();
        const result = await this.auth.registerAdmin({
            name: value.name.trim(),
            email: value.email.trim().toLowerCase(),
            password: value.password,
            department: value.department,
        });
        if (!result.success) {
            this.serverError.set(result.message);
            this.toast.show(result.message, 'error');
            return;
        }
        this.submitted.set(false);
        this.toast.show(result.message, 'success', 12000);
        // auth.registerAdmin already routed to /verify-email
    }
    async submitAccountVerification() {
        this.submitted.set(true);
        this.serverError.set('');
        const control = this.accountCodeForm.controls.code;
        control.markAsTouched();
        if (control.invalid) {
            this.toast.show('Enter the 6-digit code from your email.', 'error');
            return;
        }
        const result = await this.auth.verifyEmailCode(control.value);
        if (!result.success) {
            this.serverError.set(result.message);
            this.toast.show(result.message, 'error');
            return;
        }
        this.toast.show(result.requiresPasswordChange ? 'Email verified. Create your private password.' : result.message, 'success');
    }
    async resendAccountCode() {
        const result = await this.auth.resendVerificationCode();
        this.toast.show(result.message, result.success ? 'info' : 'error', 12000);
    }
    passwordHasMinimumLength() { return this.passwordForm.controls.password.value.length >= 8; }
    passwordHasUppercase() { return /[A-Z]/.test(this.passwordForm.controls.password.value); }
    passwordHasLowercase() { return /[a-z]/.test(this.passwordForm.controls.password.value); }
    passwordHasNumber() { return /\d/.test(this.passwordForm.controls.password.value); }
    passwordHasSpecialCharacter() { return /[^A-Za-z0-9]/.test(this.passwordForm.controls.password.value); }
    passwordsMatch() { return this.passwordForm.controls.password.value === this.passwordForm.controls.confirm.value; }
    async submit() {
        this.submitted.set(true);
        this.serverError.set('');
        if (this.isPassword()) {
            if (this.passwordForm.invalid || this.passwordForm.value.password !== this.passwordForm.value.confirm) {
                this.passwordForm.markAllAsTouched();
                this.toast.show('Check the password rules and matching confirmation.', 'error');
                return;
            }
            const result = await this.auth.changeFirstPasswordWithToken(this.passwordForm.controls.password.value);
            if (!result.success)
                this.serverError.set(result.message);
            this.toast.show(result.message, result.success ? 'success' : 'error');
            return;
        }
        if (this.loginForm.invalid) {
            this.loginForm.markAllAsTouched();
            this.toast.show('Enter your email, trainee ID, or username and password.', 'error');
            return;
        }
        const value = this.loginForm.getRawValue();
        const result = await this.auth.loginWithToken(value.email, value.password);
        if (!result.success)
            this.serverError.set(result.message);
        this.toast.show(result.message, result.success ? 'success' : 'error');
    }
    static ɵfac = function AuthPage_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || AuthPage)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: AuthPage, selectors: [["app-auth-page"]], decls: 11, vars: 1, consts: [[1, "auth-page"], [1, "auth-card"], ["routerLink", "/login", 1, "auth-brand"], ["src", "/assets/nasps-logo-horizontal.png", "alt", "NASPS Technology and Innovation"], [1, "auth-copy"], ["novalidate", "", 3, "ngSubmit", "formGroup"], ["type", "text", "formControlName", "email", "placeholder", "name@example.com, NASPS-T002, or 2", "autocomplete", "username"], [1, "field-error"], [1, "password-field"], ["formControlName", "password", "placeholder", "Enter password", "autocomplete", "current-password", 3, "type"], ["type", "button", "aria-label", "Show or hide password", 3, "click"], ["role", "alert", 1, "field-error"], ["role", "alert", 1, "auth-error"], [1, "form-row", "login-actions"], ["routerLink", "/forgot-password", 1, "forgot-link"], ["type", "submit", 1, "primary-button", "full"], [1, "automatic-role-note"], [1, "eyebrow"], ["type", "text", "formControlName", "name", "placeholder", "e.g. Huda Nabil", "autocomplete", "name"], ["type", "email", "formControlName", "email", "placeholder", "name@nasps.com", "autocomplete", "email"], ["formControlName", "department"], ["value", "", "disabled", ""], [3, "value"], ["formControlName", "password", "placeholder", "Create a strong password", "autocomplete", "new-password", 3, "type"], ["type", "button", 3, "click"], [1, "requirements"], ["type", "password", "formControlName", "confirm", "placeholder", "Repeat your password", "autocomplete", "new-password"], ["routerLink", "/login", 1, "switch-role"], ["inputmode", "numeric", "maxlength", "6", "formControlName", "code", "placeholder", "6-digit code"], ["type", "button", 1, "text-button", "resend-button", 3, "click"], ["novalidate", "", 3, "formGroup"], ["type", "email", "formControlName", "email", "placeholder", "name@example.com", "autocomplete", "email"], [1, "reset-destination"], ["inputmode", "numeric", "maxlength", "6", "placeholder", "Enter the code", 3, "formControl"]], template: function AuthPage_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "main", 0)(1, "section", 1)(2, "a", 2);
            i0.ɵɵelement(3, "img", 3);
            i0.ɵɵelementEnd();
            i0.ɵɵconditionalCreate(4, AuthPage_Conditional_4_Template, 23, 6)(5, AuthPage_Conditional_5_Template, 48, 26)(6, AuthPage_Conditional_6_Template, 22, 4)(7, AuthPage_Conditional_7_Template, 9, 1)(8, AuthPage_Conditional_8_Template, 33, 25);
            i0.ɵɵelementStart(9, "footer");
            i0.ɵɵtext(10, "\u00A9 2026 NASPS. All rights reserved.");
            i0.ɵɵelementEnd()()();
        } if (rf & 2) {
            i0.ɵɵadvance(4);
            i0.ɵɵconditional(ctx.isLogin() ? 4 : ctx.isRegister() ? 5 : ctx.isVerify() ? 6 : ctx.isForgotPassword() ? 7 : 8);
        } }, dependencies: [ReactiveFormsModule, i1.ɵNgNoValidate, i1.NgSelectOption, i1.ɵNgSelectMultipleOption, i1.DefaultValueAccessor, i1.SelectControlValueAccessor, i1.NgControlStatus, i1.NgControlStatusGroup, i1.MaxLengthValidator, i1.FormControlDirective, i1.FormGroupDirective, i1.FormControlName, RouterLink], styles: [".auth-page[_ngcontent-%COMP%] { min-height: 100vh; display: grid; place-items: center; padding: 28px; background: radial-gradient(circle at 50% 0, #fff 0, var(--%NS%light-blue) 52%, var(--%NS%surface-soft) 100%); }\n.auth-card[_ngcontent-%COMP%] { width: min(470px, 100%); padding: 36px 42px 26px; border: 1px solid #dce8f0; border-radius: 20px; background: rgba(255,255,255,.98); box-shadow: 0 24px 70px rgba(22, 79, 125, .14); }\n.auth-brand[_ngcontent-%COMP%] { display: flex; justify-content: center; margin-bottom: 32px; }.auth-brand[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] { display: block; width: 235px; max-width: 100%; height: auto; }\n.auth-copy[_ngcontent-%COMP%] { margin-bottom: 24px; text-align: center; }.auth-copy[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] { margin: 6px 0 7px; color: var(--%NS%ink); font-size: 27px; letter-spacing: -.03em; }.auth-copy[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] { margin: 0; color: var(--%NS%muted); font-size: 12px; }\nform[_ngcontent-%COMP%] { display: grid; gap: 15px; }label[_ngcontent-%COMP%] { display: grid; gap: 7px; color: #3e4c5f; font-size: 12px; font-weight: 700; }input[_ngcontent-%COMP%] { width: 100%; height: 44px; border: 1px solid var(--%NS%border); border-radius: 9px; padding: 0 13px; color: var(--%NS%ink); outline: 0; font: inherit; }input[_ngcontent-%COMP%]:focus { border-color: var(--%NS%blue); box-shadow: 0 0 0 3px rgba(32, 96, 144, .11); }\n.password-field[_ngcontent-%COMP%] { position: relative; }.password-field[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] { position: absolute; right: 6px; top: 6px; height: 32px; border: 0; color: var(--%NS%blue); background: transparent; font-size: 11px; cursor: pointer; }.password-field[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] { padding-right: 58px; }\n.form-row[_ngcontent-%COMP%] { display: flex; align-items: center; justify-content: space-between; gap: 14px; }.checkbox[_ngcontent-%COMP%] { display: flex; align-items: center; gap: 7px; }.checkbox[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] { width: 15px; height: 15px; accent-color: var(--%NS%blue); }.forgot-link[_ngcontent-%COMP%] { color: var(--%NS%blue); font-size: 11px; font-weight: 800; text-decoration: none; }.forgot-link[_ngcontent-%COMP%]:hover { text-decoration: underline; }.full[_ngcontent-%COMP%] { width: 100%; justify-content: center; }\n.login-actions[_ngcontent-%COMP%] { justify-content: flex-end; }\n.switch-role[_ngcontent-%COMP%] { display: block; margin-top: 16px; color: var(--%NS%blue); text-align: center; font-size: 11px; font-weight: 800; text-decoration: none; }.demo-note[_ngcontent-%COMP%] { margin-top: 16px; padding: 11px 12px; border-radius: 9px; color: #55667a; background: var(--%NS%surface-soft); text-align: center; font-size: 10px; line-height: 1.55; }.auth-error[_ngcontent-%COMP%] { margin: 0; padding: 9px 11px; border-radius: 8px; color: #a33840; background: #fff0f1; font-size: 11px; }.requirements[_ngcontent-%COMP%] { margin: -5px 0 0; padding-left: 18px; color: #657388; font-size: 10px; line-height: 1.6; }footer[_ngcontent-%COMP%] { margin-top: 26px; color: #9ba8b7; text-align: center; font-size: 9px; }\n.email-verification[_ngcontent-%COMP%] { display: grid; gap: 10px; margin-bottom: 16px; padding: 14px; border: 1px solid #d5e4ee; border-radius: 11px; background: #f8fbfd; }.email-verification.verified[_ngcontent-%COMP%] { color: #176d52; border-color: #bfe3d4; background: #eef9f4; }.email-verification[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] { font-size: 12px; }.email-verification[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] { margin: 4px 0 0; color: var(--%NS%muted); font-size: 10px; line-height: 1.45; }.email-verification[_ngcontent-%COMP%]   .secondary-button[_ngcontent-%COMP%] { width: 100%; }\n.automatic-role-note[_ngcontent-%COMP%] { margin: 13px 0 0; color: var(--%NS%muted); text-align: center; font-size: 9px; }\n.reset-destination[_ngcontent-%COMP%] { display: grid; grid-template-columns: 1fr auto; gap: 4px 10px; margin-bottom: 16px; padding: 12px 14px; border: 1px solid #d5e4ee; border-radius: 10px; background: #f8fbfd; }.reset-destination[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] { color: var(--%NS%muted); font-size: 9px; text-transform: uppercase; }.reset-destination[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] { grid-column: 1; color: var(--%NS%ink); font-size: 11px; }.reset-destination[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] { grid-column: 2; grid-row: 1 / span 2; border: 0; color: var(--%NS%blue); background: transparent; font-size: 10px; font-weight: 800; cursor: pointer; }.resend-button[_ngcontent-%COMP%] { justify-self: center; }\n.requirements[_ngcontent-%COMP%]   li[_ngcontent-%COMP%] { transition: color .18s ease; }.requirements[_ngcontent-%COMP%]   li.valid[_ngcontent-%COMP%] { color: var(--%NS%green); font-weight: 700; }.requirements[_ngcontent-%COMP%]   li.invalid[_ngcontent-%COMP%] { color: var(--%NS%red); font-weight: 700; }\n@media (max-width: 560px) { .auth-page[_ngcontent-%COMP%] { padding: 16px; }.auth-card[_ngcontent-%COMP%] { padding: 28px 22px 22px; }.auth-brand[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] { width: 210px; } }"] });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AuthPage, [{
        type: Component,
        args: [{ selector: 'app-auth-page', imports: [ReactiveFormsModule, RouterLink], template: "<main class=\"auth-page\">\n  <section class=\"auth-card\">\n    <a class=\"auth-brand\" routerLink=\"/login\"><img src=\"/assets/nasps-logo-horizontal.png\" alt=\"NASPS Technology and Innovation\"></a>\n\n    @if (isLogin()) {\n      <div class=\"auth-copy\">\n        <h1>Sign in to your workspace</h1>\n      </div>\n      <form [formGroup]=\"loginForm\" (ngSubmit)=\"submit()\" novalidate>\n        <label>Email, Trainee ID or Username\n          <input type=\"text\" formControlName=\"email\" placeholder=\"name@example.com, NASPS-T002, or 2\" autocomplete=\"username\">\n          @if ((loginForm.controls.email.dirty || loginForm.controls.email.touched) && loginForm.controls.email.invalid) { <small class=\"field-error\">Email, Trainee ID, or username is required.</small> }\n        </label>\n        <label>Password\n          <span class=\"password-field\">\n            <input [type]=\"showPassword ? 'text' : 'password'\" formControlName=\"password\" placeholder=\"Enter password\" autocomplete=\"current-password\">\n            <button type=\"button\" (click)=\"showPassword = !showPassword\" aria-label=\"Show or hide password\">{{ showPassword ? 'Hide' : 'Show' }}</button>\n          </span>\n          @if ((loginForm.controls.password.dirty || loginForm.controls.password.touched) && loginForm.controls.password.invalid) { <small class=\"field-error\" role=\"alert\">Password must contain at least 8 characters.</small> }\n        </label>\n        @if (serverError()) { <p class=\"auth-error\" role=\"alert\">{{ serverError() }}</p> }\n        <div class=\"form-row login-actions\"><a class=\"forgot-link\" routerLink=\"/forgot-password\">Forgot password?</a></div>\n        <button class=\"primary-button full\" type=\"submit\">Sign In</button>\n      </form>\n      <p class=\"automatic-role-note\">Your account role is identified securely by the NASPS server after sign in.</p>\n    } @else if (isRegister()) {\n      <div class=\"auth-copy\">\n        <span class=\"eyebrow\">ADMIN SIGN-UP</span>\n        <h1>Create your admin account</h1>\n        <p>Use your NASPS email address. We email a 6-digit code to verify it before your first sign-in.</p>\n      </div>\n      <form [formGroup]=\"registerForm\" (ngSubmit)=\"submitRegister()\" novalidate>\n        <label>Full name\n          <input type=\"text\" formControlName=\"name\" placeholder=\"e.g. Huda Nabil\" autocomplete=\"name\">\n          @if (registerForm.controls.name.touched && registerForm.controls.name.invalid) { <small class=\"field-error\">Enter your full name.</small> }\n        </label>\n        <label>NASPS email\n          <input type=\"email\" formControlName=\"email\" placeholder=\"name@nasps.com\" autocomplete=\"email\">\n          @if (registerForm.controls.email.touched && registerForm.controls.email.invalid) { <small class=\"field-error\">Enter a valid email that contains \u201C@nasps\u201D.</small> }\n        </label>\n        <label>Department\n          <select formControlName=\"department\">\n            <option value=\"\" disabled>Select a department</option>\n            @for (dept of departments; track dept) { <option [value]=\"dept\">{{ dept }}</option> }\n          </select>\n          @if (registerForm.controls.department.touched && registerForm.controls.department.invalid) { <small class=\"field-error\">Choose your department.</small> }\n        </label>\n        <label>Password\n          <span class=\"password-field\">\n            <input [type]=\"showNewPassword ? 'text' : 'password'\" formControlName=\"password\" placeholder=\"Create a strong password\" autocomplete=\"new-password\">\n            <button type=\"button\" (click)=\"showNewPassword = !showNewPassword\">{{ showNewPassword ? 'Hide' : 'Show' }}</button>\n          </span>\n        </label>\n        <ul class=\"requirements\" [class.live]=\"registerForm.controls.password.dirty\">\n          <li [class.valid]=\"regHasMinLength()\" [class.invalid]=\"registerForm.controls.password.dirty && !regHasMinLength()\">At least 8 characters</li>\n          <li [class.valid]=\"regHasUpperLower()\" [class.invalid]=\"registerForm.controls.password.dirty && !regHasUpperLower()\">Uppercase and lowercase letters</li>\n          <li [class.valid]=\"regHasNumber()\" [class.invalid]=\"registerForm.controls.password.dirty && !regHasNumber()\">One number</li>\n          <li [class.valid]=\"regHasSpecial()\" [class.invalid]=\"registerForm.controls.password.dirty && !regHasSpecial()\">One special character</li>\n        </ul>\n        <label>Confirm password\n          <input type=\"password\" formControlName=\"confirm\" placeholder=\"Repeat your password\" autocomplete=\"new-password\">\n          @if (registerForm.controls.confirm.dirty && !regPasswordsMatch()) { <small class=\"field-error\">Passwords do not match yet.</small> }\n        </label>\n        @if (serverError()) { <p class=\"auth-error\" role=\"alert\">{{ serverError() }}</p> }\n        <button class=\"primary-button full\" type=\"submit\">Create Account & Send Code</button>\n        <a class=\"switch-role\" routerLink=\"/login\">Back to sign in</a>\n      </form>\n    } @else if (isVerify()) {\n      <div class=\"auth-copy\">\n        <span class=\"eyebrow\">EMAIL VERIFICATION</span>\n        <h1>Verify your email</h1>\n        <p>Enter the 6-digit code sent to <strong>{{ auth.verifyEmailAddress() || 'your email' }}</strong>.</p>\n      </div>\n      <form [formGroup]=\"accountCodeForm\" (ngSubmit)=\"submitAccountVerification()\" novalidate>\n        <label>Verification code\n          <input inputmode=\"numeric\" maxlength=\"6\" formControlName=\"code\" placeholder=\"6-digit code\">\n          @if (accountCodeForm.controls.code.touched && accountCodeForm.controls.code.invalid) { <small class=\"field-error\">Enter exactly 6 digits.</small> }\n        </label>\n        @if (serverError()) { <p class=\"auth-error\" role=\"alert\">{{ serverError() }}</p> }\n        <button class=\"primary-button full\" type=\"submit\">Verify & Continue</button>\n        <button class=\"text-button resend-button\" type=\"button\" (click)=\"resendAccountCode()\">Resend code</button>\n        <a class=\"switch-role\" routerLink=\"/login\">Back to sign in</a>\n      </form>\n    } @else if (isForgotPassword()) {\n      <div class=\"auth-copy\">\n        <span class=\"eyebrow\">ACCOUNT RECOVERY</span>\n        <h1>Reset your password</h1>\n        <p>Enter the registered Admin or Trainee email to receive a reset code.</p>\n      </div>\n      @if (!resetCodeSent()) {\n        <form [formGroup]=\"forgotEmailForm\" (ngSubmit)=\"sendPasswordResetCode()\" novalidate>\n          <label>Registered Email\n            <input type=\"email\" formControlName=\"email\" placeholder=\"name@example.com\" autocomplete=\"email\">\n            @if (forgotEmailForm.controls.email.touched && forgotEmailForm.controls.email.invalid) { <small class=\"field-error\">Enter a valid registered email address.</small> }\n          </label>\n          @if (serverError()) { <p class=\"auth-error\" role=\"alert\">{{ serverError() }}</p> }\n          <button class=\"primary-button full\" type=\"submit\">Send Reset Code</button>\n          <a class=\"switch-role\" routerLink=\"/login\">Back to sign in</a>\n        </form>\n      } @else {\n        <div class=\"reset-destination\"><span>Code sent to</span><strong>{{ resetEmail() }}</strong><button type=\"button\" (click)=\"resetCodeSent.set(false)\">Change email</button></div>\n        <form [formGroup]=\"passwordForm\" (ngSubmit)=\"submitForgotPassword()\" novalidate>\n          <label>6-digit verification code\n            <input inputmode=\"numeric\" maxlength=\"6\" [formControl]=\"forgotCodeForm.controls.code\" placeholder=\"Enter the code\">\n            @if (forgotCodeForm.controls.code.touched && forgotCodeForm.controls.code.invalid) { <small class=\"field-error\">Enter exactly 6 digits.</small> }\n          </label>\n          <label>New password\n            <span class=\"password-field\"><input [type]=\"showNewPassword ? 'text' : 'password'\" formControlName=\"password\" placeholder=\"Create a strong password\" autocomplete=\"new-password\"><button type=\"button\" (click)=\"showNewPassword = !showNewPassword\">{{ showNewPassword ? 'Hide' : 'Show' }}</button></span>\n          </label>\n          <ul class=\"requirements\" [class.live]=\"passwordForm.controls.password.dirty\">\n            <li [class.valid]=\"passwordHasMinimumLength()\" [class.invalid]=\"passwordForm.controls.password.dirty && !passwordHasMinimumLength()\">At least 8 characters</li>\n            <li [class.valid]=\"passwordHasUppercase() && passwordHasLowercase()\" [class.invalid]=\"passwordForm.controls.password.dirty && (!passwordHasUppercase() || !passwordHasLowercase())\">Uppercase and lowercase letters</li>\n            <li [class.valid]=\"passwordHasNumber()\" [class.invalid]=\"passwordForm.controls.password.dirty && !passwordHasNumber()\">One number</li>\n            <li [class.valid]=\"passwordHasSpecialCharacter()\" [class.invalid]=\"passwordForm.controls.password.dirty && !passwordHasSpecialCharacter()\">One special character</li>\n          </ul>\n          <label>Confirm new password<input type=\"password\" formControlName=\"confirm\" placeholder=\"Repeat your password\" autocomplete=\"new-password\">@if (passwordForm.controls.confirm.dirty && !passwordsMatch()) { <small class=\"field-error\">Passwords do not match yet.</small> }</label>\n          @if (serverError()) { <p class=\"auth-error\" role=\"alert\">{{ serverError() }}</p> }\n          <button class=\"primary-button full\" type=\"submit\">Verify Code & Reset Password</button>\n          <button class=\"text-button resend-button\" type=\"button\" (click)=\"sendPasswordResetCode()\">Resend code</button>\n          <a class=\"switch-role\" routerLink=\"/login\">Back to sign in</a>\n        </form>\n      }\n    } @else {\n      <div class=\"auth-copy\">\n        <span class=\"eyebrow\">FIRST LOGIN</span>\n        <h1>Create your private password</h1>\n        <p>{{ auth.pendingPasswordEmail() || 'Sign in with your temporary password first.' }}</p>\n      </div>\n      <form [formGroup]=\"passwordForm\" (ngSubmit)=\"submit()\" novalidate>\n        <label>New password\n          <span class=\"password-field\"><input [type]=\"showNewPassword ? 'text' : 'password'\" formControlName=\"password\" placeholder=\"Create a strong password\" autocomplete=\"new-password\"><button type=\"button\" (click)=\"showNewPassword = !showNewPassword\">{{ showNewPassword ? 'Hide' : 'Show' }}</button></span>\n        </label>\n        <ul class=\"requirements\" [class.live]=\"passwordForm.controls.password.dirty\">\n          <li [class.valid]=\"passwordHasMinimumLength()\" [class.invalid]=\"passwordForm.controls.password.dirty && !passwordHasMinimumLength()\">At least 8 characters</li>\n          <li [class.valid]=\"passwordHasUppercase() && passwordHasLowercase()\" [class.invalid]=\"passwordForm.controls.password.dirty && (!passwordHasUppercase() || !passwordHasLowercase())\">Uppercase and lowercase letters</li>\n          <li [class.valid]=\"passwordHasNumber()\" [class.invalid]=\"passwordForm.controls.password.dirty && !passwordHasNumber()\">One number</li>\n          <li [class.valid]=\"passwordHasSpecialCharacter()\" [class.invalid]=\"passwordForm.controls.password.dirty && !passwordHasSpecialCharacter()\">One special character</li>\n        </ul>\n        <label>Confirm password<input type=\"password\" formControlName=\"confirm\" placeholder=\"Repeat your password\" autocomplete=\"new-password\">@if (passwordForm.controls.confirm.dirty && !passwordsMatch()) { <small class=\"field-error\" role=\"alert\">Passwords do not match yet.</small> }</label>\n        @if (submitted() && (passwordForm.invalid || passwordForm.value.password !== passwordForm.value.confirm)) { <p class=\"auth-error\" role=\"alert\">Check the password rules and make sure both passwords match.</p> }\n        @if (serverError()) { <p class=\"auth-error\" role=\"alert\">{{ serverError() }}</p> }\n        <button class=\"primary-button full\" type=\"submit\">Create Password & Continue</button>\n        <a class=\"switch-role\" routerLink=\"/login\">Back to sign in</a>\n      </form>\n    }\n    <footer>\u00A9 2026 NASPS. All rights reserved.</footer>\n  </section>\n</main>\n", styles: [".auth-page { min-height: 100vh; display: grid; place-items: center; padding: 28px; background: radial-gradient(circle at 50% 0, #fff 0, var(--light-blue) 52%, var(--surface-soft) 100%); }\n.auth-card { width: min(470px, 100%); padding: 36px 42px 26px; border: 1px solid #dce8f0; border-radius: 20px; background: rgba(255,255,255,.98); box-shadow: 0 24px 70px rgba(22, 79, 125, .14); }\n.auth-brand { display: flex; justify-content: center; margin-bottom: 32px; }.auth-brand img { display: block; width: 235px; max-width: 100%; height: auto; }\n.auth-copy { margin-bottom: 24px; text-align: center; }.auth-copy h1 { margin: 6px 0 7px; color: var(--ink); font-size: 27px; letter-spacing: -.03em; }.auth-copy p { margin: 0; color: var(--muted); font-size: 12px; }\nform { display: grid; gap: 15px; }label { display: grid; gap: 7px; color: #3e4c5f; font-size: 12px; font-weight: 700; }input { width: 100%; height: 44px; border: 1px solid var(--border); border-radius: 9px; padding: 0 13px; color: var(--ink); outline: 0; font: inherit; }input:focus { border-color: var(--blue); box-shadow: 0 0 0 3px rgba(32, 96, 144, .11); }\n.password-field { position: relative; }.password-field button { position: absolute; right: 6px; top: 6px; height: 32px; border: 0; color: var(--blue); background: transparent; font-size: 11px; cursor: pointer; }.password-field input { padding-right: 58px; }\n.form-row { display: flex; align-items: center; justify-content: space-between; gap: 14px; }.checkbox { display: flex; align-items: center; gap: 7px; }.checkbox input { width: 15px; height: 15px; accent-color: var(--blue); }.forgot-link { color: var(--blue); font-size: 11px; font-weight: 800; text-decoration: none; }.forgot-link:hover { text-decoration: underline; }.full { width: 100%; justify-content: center; }\n.login-actions { justify-content: flex-end; }\n.switch-role { display: block; margin-top: 16px; color: var(--blue); text-align: center; font-size: 11px; font-weight: 800; text-decoration: none; }.demo-note { margin-top: 16px; padding: 11px 12px; border-radius: 9px; color: #55667a; background: var(--surface-soft); text-align: center; font-size: 10px; line-height: 1.55; }.auth-error { margin: 0; padding: 9px 11px; border-radius: 8px; color: #a33840; background: #fff0f1; font-size: 11px; }.requirements { margin: -5px 0 0; padding-left: 18px; color: #657388; font-size: 10px; line-height: 1.6; }footer { margin-top: 26px; color: #9ba8b7; text-align: center; font-size: 9px; }\n.email-verification { display: grid; gap: 10px; margin-bottom: 16px; padding: 14px; border: 1px solid #d5e4ee; border-radius: 11px; background: #f8fbfd; }.email-verification.verified { color: #176d52; border-color: #bfe3d4; background: #eef9f4; }.email-verification strong { font-size: 12px; }.email-verification p { margin: 4px 0 0; color: var(--muted); font-size: 10px; line-height: 1.45; }.email-verification .secondary-button { width: 100%; }\n.automatic-role-note { margin: 13px 0 0; color: var(--muted); text-align: center; font-size: 9px; }\n.reset-destination { display: grid; grid-template-columns: 1fr auto; gap: 4px 10px; margin-bottom: 16px; padding: 12px 14px; border: 1px solid #d5e4ee; border-radius: 10px; background: #f8fbfd; }.reset-destination span { color: var(--muted); font-size: 9px; text-transform: uppercase; }.reset-destination strong { grid-column: 1; color: var(--ink); font-size: 11px; }.reset-destination button { grid-column: 2; grid-row: 1 / span 2; border: 0; color: var(--blue); background: transparent; font-size: 10px; font-weight: 800; cursor: pointer; }.resend-button { justify-self: center; }\n.requirements li { transition: color .18s ease; }.requirements li.valid { color: var(--green); font-weight: 700; }.requirements li.invalid { color: var(--red); font-weight: 700; }\n@media (max-width: 560px) { .auth-page { padding: 16px; }.auth-card { padding: 28px 22px 22px; }.auth-brand img { width: 210px; } }\n"] }]
    }], () => [], null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(AuthPage, { className: "AuthPage", filePath: "src/app/components/auth/auth.page.ts", lineNumber: 13 }); })();
