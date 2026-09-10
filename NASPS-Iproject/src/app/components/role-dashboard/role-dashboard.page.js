import { DatePipe } from '@angular/common';
import { Component, computed } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AiCourseSuggestions } from '../ai-course-suggestions/ai-course-suggestions';
import * as i0 from "@angular/core";
import * as i1 from "../../services/data.service";
import * as i2 from "../../services/auth.service";
const _c0 = () => [34, 48, 42, 68, 75, 88];
const _c1 = () => ["Apr", "May", "Jun", "Jul", "Aug", "Sep"];
const _c2 = a0 => ["/admin/tasks", a0, "review"];
const _c3 = a0 => ["/trainee/tasks", a0];
const _forTrack0 = ($index, $item) => $item.label;
const _forTrack1 = ($index, $item) => $item.id;
function RoleDashboardPage_Conditional_0_For_10_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "article", 3)(1, "span", 14);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "div")(4, "span");
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "strong");
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "small");
    i0.ɵɵtext(9);
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const stat_r1 = ctx.$implicit;
    i0.ɵɵadvance();
    i0.ɵɵclassMap(stat_r1.tone);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(stat_r1.label === "Trainees" ? "\u2659" : stat_r1.label === "Tasks" ? "\u2713" : stat_r1.label === "Pending Tasks" ? "\u25F7" : "\u25CF");
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(stat_r1.label);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(stat_r1.value);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(stat_r1.hint);
} }
function RoleDashboardPage_Conditional_0_For_26_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 9);
    i0.ɵɵelement(1, "span", 15)(2, "span", 16);
    i0.ɵɵelementStart(3, "small");
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const height_r2 = ctx.$implicit;
    const $index_r3 = ctx.$index;
    const ctx_r3 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵstyleProp("height", height_r2, "%");
    i0.ɵɵadvance();
    i0.ɵɵstyleProp("height", ctx_r3.Math.max(18, height_r2 - 22 + $index_r3 % 2 * 16), "%");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(i0.ɵɵpureFunction0(5, _c1)[$index_r3]);
} }
function RoleDashboardPage_Conditional_0_For_38_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "a", 13)(1, "span", 17);
    i0.ɵɵtext(2, "\u2713");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "span")(4, "strong");
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "small");
    i0.ɵɵtext(7);
    i0.ɵɵpipe(8, "date");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(9, "span", 18);
    i0.ɵɵtext(10);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const task_r5 = ctx.$implicit;
    i0.ɵɵproperty("routerLink", i0.ɵɵpureFunction1(8, _c2, task_r5.id));
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(task_r5.title);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1("Due ", i0.ɵɵpipeBind2(8, 5, task_r5.dueDate, "MMM d, y"));
    i0.ɵɵadvance(2);
    i0.ɵɵattribute("data-status", task_r5.status);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(task_r5.status);
} }
function RoleDashboardPage_Conditional_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 0)(1, "div")(2, "span", 1);
    i0.ɵɵtext(3, "OVERVIEW");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "h1");
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "p");
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(8, "section", 2);
    i0.ɵɵrepeaterCreate(9, RoleDashboardPage_Conditional_0_For_10_Template, 10, 6, "article", 3, _forTrack0);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(11, "section", 4)(12, "article", 5)(13, "div", 6)(14, "div")(15, "h2");
    i0.ɵɵtext(16, "Tasks Overview");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(17, "p");
    i0.ɵɵtext(18, "Monthly activity for the current cycle");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(19, "span", 7);
    i0.ɵɵelement(20, "i");
    i0.ɵɵtext(21, " Completed ");
    i0.ɵɵelement(22, "i");
    i0.ɵɵtext(23, " Pending");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(24, "div", 8);
    i0.ɵɵrepeaterCreate(25, RoleDashboardPage_Conditional_0_For_26_Template, 5, 6, "div", 9, i0.ɵɵrepeaterTrackByIndex);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(27, "article", 10)(28, "div", 6)(29, "div")(30, "h2");
    i0.ɵɵtext(31, "Recent Tasks");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(32, "p");
    i0.ɵɵtext(33, "Latest activity and due dates");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(34, "a", 11);
    i0.ɵɵtext(35, "View all");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(36, "div", 12);
    i0.ɵɵrepeaterCreate(37, RoleDashboardPage_Conditional_0_For_38_Template, 11, 10, "a", 13, _forTrack1);
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const ctx_r3 = i0.ɵɵnextContext();
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate1("Welcome back, ", ctx_r3.auth.identity().name);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1("", ctx_r3.auth.identity().roleLabel, " \u00B7 here is what is happening with your trainee team.");
    i0.ɵɵadvance(2);
    i0.ɵɵrepeater(ctx_r3.adminStats());
    i0.ɵɵadvance(16);
    i0.ɵɵrepeater(i0.ɵɵpureFunction0(2, _c0));
    i0.ɵɵadvance(12);
    i0.ɵɵrepeater(ctx_r3.recentAdminTasks());
} }
function RoleDashboardPage_Conditional_1_Conditional_64_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 29)(1, "div", 37)(2, "span", 38);
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "span", 18);
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(6, "h3");
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "p");
    i0.ɵɵtext(9);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(10, "div", 39)(11, "span");
    i0.ɵɵtext(12);
    i0.ɵɵpipe(13, "date");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(14, "a", 40);
    i0.ɵɵtext(15, "Start now \u2192");
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const task_r6 = ctx;
    const ctx_r3 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(2);
    i0.ɵɵattribute("data-priority", task_r6.priority);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1("", task_r6.priority, " priority");
    i0.ɵɵadvance();
    i0.ɵɵattribute("data-status", task_r6.status);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(task_r6.status);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(task_r6.title);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r3.nextTaskReason());
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate1("Due ", i0.ɵɵpipeBind2(13, 8, task_r6.dueDate, "MMM d, y"));
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("routerLink", i0.ɵɵpureFunction1(11, _c3, task_r6.id));
} }
function RoleDashboardPage_Conditional_1_Conditional_65_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 30)(1, "span");
    i0.ɵɵtext(2, "\u2713");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "div")(4, "h3");
    i0.ɵɵtext(5, "All tasks completed");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "p");
    i0.ɵɵtext(7, "Great work. Use your learning path below to keep improving.");
    i0.ɵɵelementEnd()()();
} }
function RoleDashboardPage_Conditional_1_For_81_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "a", 13);
    i0.ɵɵelement(1, "span", 41);
    i0.ɵɵelementStart(2, "span")(3, "strong");
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "small");
    i0.ɵɵtext(6);
    i0.ɵɵpipe(7, "date");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(8, "span");
    i0.ɵɵtext(9, "\u203A");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const task_r7 = ctx.$implicit;
    i0.ɵɵproperty("routerLink", i0.ɵɵpureFunction1(8, _c3, task_r7.id));
    i0.ɵɵadvance();
    i0.ɵɵattribute("data-status", task_r7.status);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(task_r7.title);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate2("", i0.ɵɵpipeBind2(7, 5, task_r7.dueDate, "MMM d"), " \u00B7 ", task_r7.status);
} }
function RoleDashboardPage_Conditional_1_ForEmpty_82_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 34);
    i0.ɵɵtext(1, "No open deadlines.");
    i0.ɵɵelementEnd();
} }
function RoleDashboardPage_Conditional_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "section", 19)(1, "div")(2, "span", 1);
    i0.ɵɵtext(3, "TRAINEE DASHBOARD");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "h1");
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "p");
    i0.ɵɵtext(7, "Stay focused on your next task and keep developing the skills for your internship.");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(8, "div", 20)(9, "span");
    i0.ɵɵtext(10, "Internship Program");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(11, "strong");
    i0.ɵɵtext(12);
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(13, "section", 21)(14, "article", 3)(15, "span", 22);
    i0.ɵɵtext(16, "\u2713");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(17, "div")(18, "span");
    i0.ɵɵtext(19, "Assigned Tasks");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(20, "strong");
    i0.ɵɵtext(21);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(22, "small");
    i0.ɵɵtext(23, "Your complete workload");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(24, "article", 3)(25, "span", 23);
    i0.ɵɵtext(26, "\u25F7");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(27, "div")(28, "span");
    i0.ɵɵtext(29, "Pending");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(30, "strong");
    i0.ɵɵtext(31);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(32, "small");
    i0.ɵɵtext(33, "Waiting to be started");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(34, "article", 3)(35, "span", 24);
    i0.ɵɵtext(36, "\u21BB");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(37, "div")(38, "span");
    i0.ɵɵtext(39, "In Progress");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(40, "strong");
    i0.ɵɵtext(41);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(42, "small");
    i0.ɵɵtext(43, "Active or needs changes");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(44, "article", 3)(45, "span", 25);
    i0.ɵɵtext(46, "\u25CF");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(47, "div")(48, "span");
    i0.ɵɵtext(49, "Completed");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(50, "strong");
    i0.ɵɵtext(51);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(52, "small");
    i0.ɵɵtext(53);
    i0.ɵɵelementEnd()()()();
    i0.ɵɵelementStart(54, "section", 26)(55, "article", 27)(56, "div", 6)(57, "div")(58, "span", 1);
    i0.ɵɵtext(59, "RECOMMENDED NEXT ACTION");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(60, "h2");
    i0.ɵɵtext(61, "What should I start with?");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(62, "span", 28);
    i0.ɵɵtext(63, "\u2726 Smart priority");
    i0.ɵɵelementEnd()();
    i0.ɵɵconditionalCreate(64, RoleDashboardPage_Conditional_1_Conditional_64_Template, 16, 13, "div", 29)(65, RoleDashboardPage_Conditional_1_Conditional_65_Template, 8, 0, "div", 30);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(66, "article", 31)(67, "div", 6)(68, "div")(69, "span", 1);
    i0.ɵɵtext(70, "YOUR PROGRESS");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(71, "h2");
    i0.ɵɵtext(72, "Internship completion");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(73, "strong");
    i0.ɵɵtext(74);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(75, "div", 32);
    i0.ɵɵelement(76, "span");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(77, "p");
    i0.ɵɵtext(78);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(79, "div", 33);
    i0.ɵɵrepeaterCreate(80, RoleDashboardPage_Conditional_1_For_81_Template, 10, 10, "a", 13, _forTrack1, false, RoleDashboardPage_Conditional_1_ForEmpty_82_Template, 2, 0, "span", 34);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(83, "a", 35);
    i0.ɵɵtext(84, "Open all tasks \u2192");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelement(85, "app-ai-course-suggestions", 36);
} if (rf & 2) {
    let tmp_8_0;
    const ctx_r3 = i0.ɵɵnextContext();
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate1("Welcome back, ", ctx_r3.trainee()?.name || "Trainee");
    i0.ɵɵadvance(7);
    i0.ɵɵtextInterpolate(ctx_r3.trainee()?.internshipProgram || "Not assigned yet");
    i0.ɵɵadvance(9);
    i0.ɵɵtextInterpolate(ctx_r3.assignedTasks().length);
    i0.ɵɵadvance(10);
    i0.ɵɵtextInterpolate(ctx_r3.pendingTasks().length);
    i0.ɵɵadvance(10);
    i0.ɵɵtextInterpolate(ctx_r3.inProgressTasks().length);
    i0.ɵɵadvance(10);
    i0.ɵɵtextInterpolate(ctx_r3.completedTasks().length);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1("", ctx_r3.progress(), "% overall progress");
    i0.ɵɵadvance(11);
    i0.ɵɵconditional((tmp_8_0 = ctx_r3.nextTask()) ? 64 : 65, tmp_8_0);
    i0.ɵɵadvance(10);
    i0.ɵɵtextInterpolate1("", ctx_r3.progress(), "%");
    i0.ɵɵadvance(2);
    i0.ɵɵstyleProp("width", ctx_r3.progress(), "%");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate2("", ctx_r3.completedTasks().length, " of ", ctx_r3.assignedTasks().length, " assigned tasks completed.");
    i0.ɵɵadvance(2);
    i0.ɵɵrepeater(ctx_r3.upcomingTasks());
    i0.ɵɵadvance(5);
    i0.ɵɵproperty("internshipProgram", ctx_r3.trainee()?.internshipProgram || "")("traineeId", ctx_r3.trainee()?.id ?? null);
} }
export class RoleDashboardPage {
    data;
    auth;
    Math = Math;
    isAdmin = computed(() => this.auth.role() === 'admin', /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "isAdmin" }] : /* istanbul ignore next */ []));
    trainee = computed(() => this.auth.currentUser() ?? this.data.trainees().find(item => item.id === this.auth.currentTraineeId()), /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "trainee" }] : /* istanbul ignore next */ []));
    adminStats = computed(() => [
        { label: 'Trainees', value: this.data.trainees().length, hint: 'Total trainees', tone: 'blue' },
        { label: 'Tasks', value: this.data.tasks().length, hint: 'Total tasks', tone: 'violet' },
        { label: 'Pending Tasks', value: this.data.pendingTasks(), hint: 'Needs attention', tone: 'orange' },
        { label: 'Completed Tasks', value: this.data.completedTasks(), hint: 'Successfully done', tone: 'green' },
    ], /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "adminStats" }] : /* istanbul ignore next */ []));
    recentAdminTasks = computed(() => this.data.tasks().slice(0, 4), /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "recentAdminTasks" }] : /* istanbul ignore next */ []));
    priorityOrder = { High: 0, Medium: 1, Low: 2 };
    assignedTasks = computed(() => this.data.tasks().filter(task => task.traineeId === this.auth.currentTraineeId()), /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "assignedTasks" }] : /* istanbul ignore next */ []));
    completedTasks = computed(() => this.assignedTasks().filter(task => task.status === 'Completed'), /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "completedTasks" }] : /* istanbul ignore next */ []));
    pendingTasks = computed(() => this.assignedTasks().filter(task => task.status === 'Pending'), /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "pendingTasks" }] : /* istanbul ignore next */ []));
    inProgressTasks = computed(() => this.assignedTasks().filter(task => task.status === 'In Progress' || task.status === 'Needs Changes'), /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "inProgressTasks" }] : /* istanbul ignore next */ []));
    progress = computed(() => this.assignedTasks().length
        ? Math.round((this.completedTasks().length / this.assignedTasks().length) * 100)
        : 0, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "progress" }] : /* istanbul ignore next */ []));
    nextTask = computed(() => this.sortForAction(this.assignedTasks().filter(task => task.status !== 'Completed'))[0], /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "nextTask" }] : /* istanbul ignore next */ []));
    upcomingTasks = computed(() => this.sortForAction(this.assignedTasks().filter(task => task.status !== 'Completed')).slice(0, 3), /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "upcomingTasks" }] : /* istanbul ignore next */ []));
    nextTaskReason = computed(() => {
        const task = this.nextTask();
        if (!task)
            return 'You have completed every assigned task.';
        if (task.status === 'Needs Changes')
            return 'The admin requested changes, so this should be handled first.';
        if (task.status === 'In Progress')
            return 'Continue the work you already started before opening another task.';
        if (task.priority === 'High')
            return 'This is your highest-priority open task and should be your next focus.';
        return 'This is the nearest open deadline in your current task list.';
    }, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "nextTaskReason" }] : /* istanbul ignore next */ []));
    constructor(data, auth) {
        this.data = data;
        this.auth = auth;
        void this.auth.loadCurrentUser();
        void this.data.refreshNotificationsFromServer();
        if (this.auth.role() === 'admin') {
            void this.data.refreshTraineesFromServer();
            void this.data.refreshTasksFromServer();
        }
        else {
            void this.data.refreshTasksFromServer(this.auth.currentTraineeId());
        }
    }
    sortForAction(tasks) {
        const statusOrder = { 'Needs Changes': 0, 'In Progress': 1, 'Pending': 2 };
        return [...tasks].sort((a, b) => (statusOrder[a.status] ?? 3) - (statusOrder[b.status] ?? 3) ||
            this.priorityOrder[a.priority] - this.priorityOrder[b.priority] ||
            a.dueDate.localeCompare(b.dueDate));
    }
    static ɵfac = function RoleDashboardPage_Factory(__ngFactoryType__) { /* @ts-ignore */
    return new (__ngFactoryType__ || RoleDashboardPage)(i0.ɵɵdirectiveInject(i1.DataService), i0.ɵɵdirectiveInject(i2.AuthService)); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: RoleDashboardPage, selectors: [["app-role-dashboard-page"]], decls: 2, vars: 1, consts: [[1, "page-heading"], [1, "eyebrow"], [1, "stats-grid"], [1, "stat-card"], [1, "dashboard-grid"], [1, "panel", "chart-panel"], [1, "panel-title"], [1, "legend"], ["aria-label", "Illustrative monthly task chart", 1, "chart"], [1, "chart-column"], [1, "panel", "recent-panel"], ["routerLink", "/admin/tasks"], [1, "activity-list"], [3, "routerLink"], [1, "stat-icon"], [1, "bar", "completed"], [1, "bar", "pending"], [1, "activity-icon"], [1, "status"], [1, "welcome-banner"], [1, "program-card"], [1, "stats-grid", "trainee-stats"], [1, "stat-icon", "blue"], [1, "stat-icon", "orange"], [1, "stat-icon", "violet"], [1, "stat-icon", "green"], [1, "focus-grid"], [1, "panel", "focus-card"], [1, "ai-chip"], [1, "focus-task"], [1, "all-done"], [1, "panel", "progress-card"], [1, "progress-track"], [1, "mini-task-list"], [1, "empty-upcoming"], ["routerLink", "/trainee/tasks", 1, "text-button", "all-tasks-link"], [3, "internshipProgram", "traineeId"], [1, "focus-topline"], [1, "priority"], [1, "focus-footer"], [1, "primary-button", 3, "routerLink"], [1, "task-dot"]], template: function RoleDashboardPage_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵconditionalCreate(0, RoleDashboardPage_Conditional_0_Template, 39, 3)(1, RoleDashboardPage_Conditional_1_Template, 86, 16);
        } if (rf & 2) {
            i0.ɵɵconditional(ctx.isAdmin() ? 0 : 1);
        } }, dependencies: [RouterLink, AiCourseSuggestions, DatePipe], styles: ["[_nghost-%COMP%] { display: grid; gap: 18px; }\n.welcome-banner[_ngcontent-%COMP%] { display: flex; align-items: flex-end; justify-content: space-between; gap: 22px; margin-bottom: 6px; }\n.welcome-banner[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] { margin: 4px 0 6px; color: var(--%NS%ink); font-size: clamp(25px, 3vw, 34px); letter-spacing: -.035em; }.welcome-banner[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] { max-width: 590px; margin: 0; color: var(--%NS%muted); font-size: 13px; line-height: 1.5; }\n.program-card[_ngcontent-%COMP%] { display: grid; gap: 5px; min-width: 235px; padding: 13px 16px; border: 1px solid #c9dfef; border-radius: 11px; background: var(--%NS%light-blue); }.program-card[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] { color: var(--%NS%muted); font-size: 9px; text-transform: uppercase; letter-spacing: .06em; }.program-card[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] { color: var(--%NS%blue-dark); font-size: 12px; line-height: 1.35; }\n.trainee-stats[_ngcontent-%COMP%] { margin-bottom: 0; }.focus-grid[_ngcontent-%COMP%] { display: grid; grid-template-columns: minmax(0, 1.35fr) minmax(320px, .9fr); gap: 18px; align-items: stretch; }.focus-card[_ngcontent-%COMP%], .progress-card[_ngcontent-%COMP%] { min-width: 0; }.focus-card[_ngcontent-%COMP%]   .panel-title[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%], .progress-card[_ngcontent-%COMP%]   .panel-title[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] { margin: 4px 0 0; }\n.ai-chip[_ngcontent-%COMP%] { padding: 7px 10px; border-radius: 999px; color: var(--%NS%blue); background: var(--%NS%light-blue); font-size: 9px; font-weight: 800; }.focus-task[_ngcontent-%COMP%] { padding: 19px; border: 1px solid #c9dfef; border-radius: 11px; background: linear-gradient(135deg, #f8fcff, #fff); }.focus-topline[_ngcontent-%COMP%] { display: flex; gap: 7px; margin-bottom: 12px; }.focus-task[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] { margin: 0 0 8px; font-size: 17px; }.focus-task[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] { margin: 0; color: #667589; font-size: 10px; line-height: 1.65; }\n.focus-footer[_ngcontent-%COMP%] { display: flex; align-items: center; justify-content: space-between; gap: 15px; margin-top: 18px; padding-top: 15px; border-top: 1px solid #e3edf4; }.focus-footer[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%] { color: var(--%NS%muted); font-size: 10px; font-weight: 700; }.all-done[_ngcontent-%COMP%] { display: flex; align-items: center; gap: 13px; min-height: 120px; padding: 18px; border-radius: 11px; background: #f4fbf8; }.all-done[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%] { display: grid; place-items: center; flex: 0 0 42px; height: 42px; border-radius: 50%; color: #fff; background: var(--%NS%green); }\n.all-done[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] { margin: 0 0 5px; font-size: 14px; }.all-done[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] { margin: 0; color: var(--%NS%muted); font-size: 10px; }.progress-card[_ngcontent-%COMP%]   .panel-title[_ngcontent-%COMP%]    > strong[_ngcontent-%COMP%] { color: var(--%NS%blue); font-size: 22px; }.progress-track[_ngcontent-%COMP%] { height: 8px; overflow: hidden; border-radius: 999px; background: #e7edf2; }.progress-track[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] { display: block; height: 100%; border-radius: inherit; background: linear-gradient(90deg, var(--%NS%blue), #43a0df); transition: width .3s ease; }\n.progress-card[_ngcontent-%COMP%]    > p[_ngcontent-%COMP%] { margin: 8px 0 15px; color: var(--%NS%muted); font-size: 9px; }.mini-task-list[_ngcontent-%COMP%] { display: grid; border-top: 1px solid #edf1f6; }.mini-task-list[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] { display: grid; grid-template-columns: 9px 1fr auto; align-items: center; gap: 9px; min-width: 0; padding: 10px 2px; border-bottom: 1px solid #edf1f6; color: inherit; text-decoration: none; }.mini-task-list[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%]:nth-child(2) { display: grid; min-width: 0; gap: 3px; }.mini-task-list[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-size: 10px; }.mini-task-list[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] { color: var(--%NS%muted); font-size: 8px; }\n.task-dot[_ngcontent-%COMP%] { width: 7px; height: 7px; border-radius: 50%; background: var(--%NS%orange); }.task-dot[data-status=\"In Progress\"][_ngcontent-%COMP%] { background: var(--%NS%blue); }.task-dot[data-status=\"Needs Changes\"][_ngcontent-%COMP%] { background: var(--%NS%red); }.empty-upcoming[_ngcontent-%COMP%] { padding: 20px 0; color: var(--%NS%muted); font-size: 10px; }.all-tasks-link[_ngcontent-%COMP%] { width: fit-content; min-height: 30px; margin: 9px -8px -8px auto; padding-inline: 8px; }\n@media (max-width: 1080px) { .focus-grid[_ngcontent-%COMP%] { grid-template-columns: 1fr; } } @media (max-width: 720px) { .welcome-banner[_ngcontent-%COMP%] { align-items: flex-start; flex-direction: column; padding: 23px 20px; }.program-card[_ngcontent-%COMP%] { width: 100%; min-width: 0; }.focus-footer[_ngcontent-%COMP%] { align-items: flex-start; flex-direction: column; }.focus-footer[_ngcontent-%COMP%]   .primary-button[_ngcontent-%COMP%] { width: 100%; } }"] });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(RoleDashboardPage, [{
        type: Component,
        args: [{ selector: 'app-role-dashboard-page', imports: [DatePipe, RouterLink, AiCourseSuggestions], template: "@if (isAdmin()) {\n  <div class=\"page-heading\"><div><span class=\"eyebrow\">OVERVIEW</span><h1>Welcome back, {{ auth.identity().name }}</h1><p>{{ auth.identity().roleLabel }} \u00B7 here is what is happening with your trainee team.</p></div></div>\n  <section class=\"stats-grid\">\n    @for (stat of adminStats(); track stat.label) {\n      <article class=\"stat-card\"><span class=\"stat-icon\" [class]=\"stat.tone\">{{ stat.label === 'Trainees' ? '\u2659' : stat.label === 'Tasks' ? '\u2713' : stat.label === 'Pending Tasks' ? '\u25F7' : '\u25CF' }}</span><div><span>{{ stat.label }}</span><strong>{{ stat.value }}</strong><small>{{ stat.hint }}</small></div></article>\n    }\n  </section>\n  <section class=\"dashboard-grid\">\n    <article class=\"panel chart-panel\">\n      <div class=\"panel-title\"><div><h2>Tasks Overview</h2><p>Monthly activity for the current cycle</p></div><span class=\"legend\"><i></i> Completed <i></i> Pending</span></div>\n      <div class=\"chart\" aria-label=\"Illustrative monthly task chart\">\n        @for (height of [34, 48, 42, 68, 75, 88]; track $index) { <div class=\"chart-column\"><span class=\"bar completed\" [style.height.%]=\"height\"></span><span class=\"bar pending\" [style.height.%]=\"Math.max(18, height - 22 + ($index % 2) * 16)\"></span><small>{{ ['Apr','May','Jun','Jul','Aug','Sep'][$index] }}</small></div> }\n      </div>\n    </article>\n    <article class=\"panel recent-panel\">\n      <div class=\"panel-title\"><div><h2>Recent Tasks</h2><p>Latest activity and due dates</p></div><a routerLink=\"/admin/tasks\">View all</a></div>\n      <div class=\"activity-list\">\n        @for (task of recentAdminTasks(); track task.id) { <a [routerLink]=\"['/admin/tasks', task.id, 'review']\"><span class=\"activity-icon\">\u2713</span><span><strong>{{ task.title }}</strong><small>Due {{ task.dueDate | date:'MMM d, y' }}</small></span><span class=\"status\" [attr.data-status]=\"task.status\">{{ task.status }}</span></a> }\n      </div>\n    </article>\n  </section>\n} @else {\n  <section class=\"welcome-banner\">\n    <div><span class=\"eyebrow\">TRAINEE DASHBOARD</span><h1>Welcome back, {{ trainee()?.name || 'Trainee' }}</h1><p>Stay focused on your next task and keep developing the skills for your internship.</p></div>\n    <div class=\"program-card\"><span>Internship Program</span><strong>{{ trainee()?.internshipProgram || 'Not assigned yet' }}</strong></div>\n  </section>\n  <section class=\"stats-grid trainee-stats\">\n    <article class=\"stat-card\"><span class=\"stat-icon blue\">\u2713</span><div><span>Assigned Tasks</span><strong>{{ assignedTasks().length }}</strong><small>Your complete workload</small></div></article>\n    <article class=\"stat-card\"><span class=\"stat-icon orange\">\u25F7</span><div><span>Pending</span><strong>{{ pendingTasks().length }}</strong><small>Waiting to be started</small></div></article>\n    <article class=\"stat-card\"><span class=\"stat-icon violet\">\u21BB</span><div><span>In Progress</span><strong>{{ inProgressTasks().length }}</strong><small>Active or needs changes</small></div></article>\n    <article class=\"stat-card\"><span class=\"stat-icon green\">\u25CF</span><div><span>Completed</span><strong>{{ completedTasks().length }}</strong><small>{{ progress() }}% overall progress</small></div></article>\n  </section>\n  <section class=\"focus-grid\">\n    <article class=\"panel focus-card\">\n      <div class=\"panel-title\"><div><span class=\"eyebrow\">RECOMMENDED NEXT ACTION</span><h2>What should I start with?</h2></div><span class=\"ai-chip\">\u2726 Smart priority</span></div>\n      @if (nextTask(); as task) {\n        <div class=\"focus-task\"><div class=\"focus-topline\"><span class=\"priority\" [attr.data-priority]=\"task.priority\">{{ task.priority }} priority</span><span class=\"status\" [attr.data-status]=\"task.status\">{{ task.status }}</span></div><h3>{{ task.title }}</h3><p>{{ nextTaskReason() }}</p><div class=\"focus-footer\"><span>Due {{ task.dueDate | date:'MMM d, y' }}</span><a class=\"primary-button\" [routerLink]=\"['/trainee/tasks', task.id]\">Start now \u2192</a></div></div>\n      } @else { <div class=\"all-done\"><span>\u2713</span><div><h3>All tasks completed</h3><p>Great work. Use your learning path below to keep improving.</p></div></div> }\n    </article>\n    <article class=\"panel progress-card\">\n      <div class=\"panel-title\"><div><span class=\"eyebrow\">YOUR PROGRESS</span><h2>Internship completion</h2></div><strong>{{ progress() }}%</strong></div>\n      <div class=\"progress-track\"><span [style.width.%]=\"progress()\"></span></div><p>{{ completedTasks().length }} of {{ assignedTasks().length }} assigned tasks completed.</p>\n      <div class=\"mini-task-list\">@for (task of upcomingTasks(); track task.id) { <a [routerLink]=\"['/trainee/tasks', task.id]\"><span class=\"task-dot\" [attr.data-status]=\"task.status\"></span><span><strong>{{ task.title }}</strong><small>{{ task.dueDate | date:'MMM d' }} \u00B7 {{ task.status }}</small></span><span>\u203A</span></a> } @empty { <span class=\"empty-upcoming\">No open deadlines.</span> }</div>\n      <a class=\"text-button all-tasks-link\" routerLink=\"/trainee/tasks\">Open all tasks \u2192</a>\n    </article>\n  </section>\n  <app-ai-course-suggestions [internshipProgram]=\"trainee()?.internshipProgram || ''\" [traineeId]=\"trainee()?.id ?? null\" />\n}\n", styles: [":host { display: grid; gap: 18px; }\n.welcome-banner { display: flex; align-items: flex-end; justify-content: space-between; gap: 22px; margin-bottom: 6px; }\n.welcome-banner h1 { margin: 4px 0 6px; color: var(--ink); font-size: clamp(25px, 3vw, 34px); letter-spacing: -.035em; }.welcome-banner p { max-width: 590px; margin: 0; color: var(--muted); font-size: 13px; line-height: 1.5; }\n.program-card { display: grid; gap: 5px; min-width: 235px; padding: 13px 16px; border: 1px solid #c9dfef; border-radius: 11px; background: var(--light-blue); }.program-card span { color: var(--muted); font-size: 9px; text-transform: uppercase; letter-spacing: .06em; }.program-card strong { color: var(--blue-dark); font-size: 12px; line-height: 1.35; }\n.trainee-stats { margin-bottom: 0; }.focus-grid { display: grid; grid-template-columns: minmax(0, 1.35fr) minmax(320px, .9fr); gap: 18px; align-items: stretch; }.focus-card, .progress-card { min-width: 0; }.focus-card .panel-title h2, .progress-card .panel-title h2 { margin: 4px 0 0; }\n.ai-chip { padding: 7px 10px; border-radius: 999px; color: var(--blue); background: var(--light-blue); font-size: 9px; font-weight: 800; }.focus-task { padding: 19px; border: 1px solid #c9dfef; border-radius: 11px; background: linear-gradient(135deg, #f8fcff, #fff); }.focus-topline { display: flex; gap: 7px; margin-bottom: 12px; }.focus-task h3 { margin: 0 0 8px; font-size: 17px; }.focus-task p { margin: 0; color: #667589; font-size: 10px; line-height: 1.65; }\n.focus-footer { display: flex; align-items: center; justify-content: space-between; gap: 15px; margin-top: 18px; padding-top: 15px; border-top: 1px solid #e3edf4; }.focus-footer > span { color: var(--muted); font-size: 10px; font-weight: 700; }.all-done { display: flex; align-items: center; gap: 13px; min-height: 120px; padding: 18px; border-radius: 11px; background: #f4fbf8; }.all-done > span { display: grid; place-items: center; flex: 0 0 42px; height: 42px; border-radius: 50%; color: #fff; background: var(--green); }\n.all-done h3 { margin: 0 0 5px; font-size: 14px; }.all-done p { margin: 0; color: var(--muted); font-size: 10px; }.progress-card .panel-title > strong { color: var(--blue); font-size: 22px; }.progress-track { height: 8px; overflow: hidden; border-radius: 999px; background: #e7edf2; }.progress-track span { display: block; height: 100%; border-radius: inherit; background: linear-gradient(90deg, var(--blue), #43a0df); transition: width .3s ease; }\n.progress-card > p { margin: 8px 0 15px; color: var(--muted); font-size: 9px; }.mini-task-list { display: grid; border-top: 1px solid #edf1f6; }.mini-task-list a { display: grid; grid-template-columns: 9px 1fr auto; align-items: center; gap: 9px; min-width: 0; padding: 10px 2px; border-bottom: 1px solid #edf1f6; color: inherit; text-decoration: none; }.mini-task-list a > span:nth-child(2) { display: grid; min-width: 0; gap: 3px; }.mini-task-list strong { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-size: 10px; }.mini-task-list small { color: var(--muted); font-size: 8px; }\n.task-dot { width: 7px; height: 7px; border-radius: 50%; background: var(--orange); }.task-dot[data-status=\"In Progress\"] { background: var(--blue); }.task-dot[data-status=\"Needs Changes\"] { background: var(--red); }.empty-upcoming { padding: 20px 0; color: var(--muted); font-size: 10px; }.all-tasks-link { width: fit-content; min-height: 30px; margin: 9px -8px -8px auto; padding-inline: 8px; }\n@media (max-width: 1080px) { .focus-grid { grid-template-columns: 1fr; } } @media (max-width: 720px) { .welcome-banner { align-items: flex-start; flex-direction: column; padding: 23px 20px; }.program-card { width: 100%; min-width: 0; }.focus-footer { align-items: flex-start; flex-direction: column; }.focus-footer .primary-button { width: 100%; } }\n"] }]
    }], () => [{ type: i1.DataService }, { type: i2.AuthService }], null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(RoleDashboardPage, { className: "RoleDashboardPage", filePath: "src/app/components/role-dashboard/role-dashboard.page.ts", lineNumber: 15 }); })();
