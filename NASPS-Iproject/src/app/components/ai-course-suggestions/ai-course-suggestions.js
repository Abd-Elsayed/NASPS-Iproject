import { Component, computed, inject, input, signal } from '@angular/core';
import { finalize } from 'rxjs';
import { AiService } from '../../services/ai.service';
import { ToastService } from '../../services/toast.service';
import { DataService } from '../../services/data.service';
import * as i0 from "@angular/core";
const _forTrack0 = ($index, $item) => $item.title;
const _forTrack1 = ($index, $item) => $item.order;
function AiCourseSuggestions_Conditional_16_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵdomElementStart(0, "div", 5)(1, "strong");
    i0.ɵɵtext(2, "AI path unavailable");
    i0.ɵɵdomElementEnd();
    i0.ɵɵdomElementStart(3, "span");
    i0.ɵɵtext(4);
    i0.ɵɵdomElementEnd()();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(ctx_r0.error());
} }
function AiCourseSuggestions_Conditional_17_For_11_For_21_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵdomElementStart(0, "span");
    i0.ɵɵtext(1);
    i0.ɵɵdomElementEnd();
} if (rf & 2) {
    const skill_r2 = ctx.$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(skill_r2);
} }
function AiCourseSuggestions_Conditional_17_For_11_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵdomElementStart(0, "article", 13)(1, "span", 15);
    i0.ɵɵtext(2);
    i0.ɵɵdomElementEnd();
    i0.ɵɵdomElementStart(3, "div")(4, "div", 16)(5, "span");
    i0.ɵɵtext(6);
    i0.ɵɵdomElementEnd();
    i0.ɵɵdomElementStart(7, "span");
    i0.ɵɵtext(8, "\u2022");
    i0.ɵɵdomElementEnd();
    i0.ɵɵdomElementStart(9, "span");
    i0.ɵɵtext(10);
    i0.ɵɵdomElementEnd()();
    i0.ɵɵdomElementStart(11, "h3");
    i0.ɵɵtext(12);
    i0.ɵɵdomElementEnd();
    i0.ɵɵdomElementStart(13, "p");
    i0.ɵɵtext(14);
    i0.ɵɵdomElementEnd();
    i0.ɵɵdomElementStart(15, "small")(16, "strong");
    i0.ɵɵtext(17, "Why now:");
    i0.ɵɵdomElementEnd();
    i0.ɵɵtext(18);
    i0.ɵɵdomElementEnd();
    i0.ɵɵdomElementStart(19, "div", 17);
    i0.ɵɵrepeaterCreate(20, AiCourseSuggestions_Conditional_17_For_11_For_21_Template, 2, 1, "span", null, i0.ɵɵrepeaterTrackByIdentity);
    i0.ɵɵdomElementEnd()()();
} if (rf & 2) {
    const item_r3 = ctx.$implicit;
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(item_r3.order);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(item_r3.difficulty);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate1("", item_r3.estimatedHours, " hours");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(item_r3.title);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(item_r3.description);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate1(" ", item_r3.reason);
    i0.ɵɵadvance(2);
    i0.ɵɵrepeater(item_r3.skills);
} }
function AiCourseSuggestions_Conditional_17_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵdomElementStart(0, "section", 6)(1, "div", 11)(2, "div")(3, "span", 3);
    i0.ɵɵtext(4, "GENERATED FROM YOUR TASK PROGRESS");
    i0.ɵɵdomElementEnd();
    i0.ɵɵdomElementStart(5, "p");
    i0.ɵɵtext(6);
    i0.ɵɵdomElementEnd()();
    i0.ɵɵdomElementStart(7, "strong");
    i0.ɵɵtext(8);
    i0.ɵɵdomElementEnd()();
    i0.ɵɵdomElementStart(9, "div", 12);
    i0.ɵɵrepeaterCreate(10, AiCourseSuggestions_Conditional_17_For_11_Template, 22, 6, "article", 13, _forTrack1);
    i0.ɵɵdomElementEnd();
    i0.ɵɵdomElementStart(12, "p", 14);
    i0.ɵɵtext(13, "AI recommendations are advisory. Review them against your internship goals.");
    i0.ɵɵdomElementEnd()();
} if (rf & 2) {
    const path_r4 = ctx;
    i0.ɵɵadvance(6);
    i0.ɵɵtextInterpolate(path_r4.summary);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1("", path_r4.progressPercent, "%");
    i0.ɵɵadvance(2);
    i0.ɵɵrepeater(path_r4.recommendations);
} }
function AiCourseSuggestions_For_25_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵdomElementStart(0, "article", 9)(1, "span", 15);
    i0.ɵɵtext(2);
    i0.ɵɵdomElementEnd();
    i0.ɵɵdomElementStart(3, "div", 18)(4, "div", 16)(5, "span");
    i0.ɵɵtext(6);
    i0.ɵɵdomElementEnd();
    i0.ɵɵdomElementStart(7, "span");
    i0.ɵɵtext(8, "\u2022");
    i0.ɵɵdomElementEnd();
    i0.ɵɵdomElementStart(9, "span");
    i0.ɵɵtext(10);
    i0.ɵɵdomElementEnd()();
    i0.ɵɵdomElementStart(11, "h3");
    i0.ɵɵtext(12);
    i0.ɵɵdomElementEnd();
    i0.ɵɵdomElementStart(13, "p");
    i0.ɵɵtext(14);
    i0.ɵɵdomElementEnd();
    i0.ɵɵdomElementStart(15, "div", 19)(16, "a", 20);
    i0.ɵɵtext(17, "Coursera ");
    i0.ɵɵdomElementStart(18, "span");
    i0.ɵɵtext(19, "\u2197");
    i0.ɵɵdomElementEnd()();
    i0.ɵɵdomElementStart(20, "a", 21);
    i0.ɵɵtext(21, "Udemy ");
    i0.ɵɵdomElementStart(22, "span");
    i0.ɵɵtext(23, "\u2197");
    i0.ɵɵdomElementEnd()()()()();
} if (rf & 2) {
    const course_r5 = ctx.$implicit;
    const ɵ$index_103_r6 = ctx.$index;
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ɵ$index_103_r6 + 1);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(course_r5.level);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(course_r5.duration);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(course_r5.title);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(course_r5.reason);
    i0.ɵɵadvance(2);
    i0.ɵɵdomProperty("href", ctx_r0.courseraUrl(course_r5.title), i0.ɵɵsanitizeUrl);
    i0.ɵɵattribute("aria-label", "Find " + course_r5.title + " courses on Coursera");
    i0.ɵɵadvance(4);
    i0.ɵɵdomProperty("href", ctx_r0.udemyUrl(course_r5.title), i0.ɵɵsanitizeUrl);
    i0.ɵɵattribute("aria-label", "Find " + course_r5.title + " courses on Udemy");
} }
const LEARNING_PATHS = {
    'Frontend Web Development': [
        { title: 'HTML & CSS Foundations', level: 'Start here', duration: '6 hours', reason: 'Build responsive and accessible page layouts.' },
        { title: 'Modern JavaScript Essentials', level: 'Next step', duration: '10 hours', reason: 'Learn the language used by every frontend framework.' },
        { title: 'Angular Fundamentals', level: 'Build project', duration: '12 hours', reason: 'Create components, forms, services and routed applications.' },
    ],
    'Backend Development': [
        { title: 'Programming & Git Foundations', level: 'Start here', duration: '7 hours', reason: 'Prepare the coding and version-control fundamentals.' },
        { title: 'REST API Development', level: 'Next step', duration: '10 hours', reason: 'Design endpoints, validation and error responses.' },
        { title: 'Database-Driven API Project', level: 'Build project', duration: '14 hours', reason: 'Connect authentication, APIs and persistent data.' },
    ],
    'Full-Stack Development': [
        { title: 'Web Development Foundations', level: 'Start here', duration: '8 hours', reason: 'Understand how browser, server and database work together.' },
        { title: 'Angular & REST APIs', level: 'Next step', duration: '12 hours', reason: 'Build a typed frontend connected to a backend.' },
        { title: 'Full-Stack Capstone', level: 'Build project', duration: '18 hours', reason: 'Deliver one complete authenticated application.' },
    ],
    'Mobile Application Development': [
        { title: 'Mobile UI & UX Basics', level: 'Start here', duration: '5 hours', reason: 'Learn mobile navigation, layouts and platform patterns.' },
        { title: 'Mobile App Development Fundamentals', level: 'Next step', duration: '12 hours', reason: 'Build screens, state and network requests.' },
        { title: 'Publishable Mobile App', level: 'Build project', duration: '16 hours', reason: 'Turn the skills into a tested portfolio application.' },
    ],
    'UI/UX Design': [
        { title: 'UX Research Fundamentals', level: 'Start here', duration: '5 hours', reason: 'Learn interviews, personas and problem definition.' },
        { title: 'Wireframing & Prototyping', level: 'Next step', duration: '8 hours', reason: 'Translate findings into testable user flows.' },
        { title: 'Product Design Case Study', level: 'Build project', duration: '12 hours', reason: 'Create a complete portfolio-ready design story.' },
    ],
    'Data Science & AI': [
        { title: 'Python for Data Analysis', level: 'Start here', duration: '10 hours', reason: 'Build the programming base for data work.' },
        { title: 'Statistics & Machine Learning', level: 'Next step', duration: '14 hours', reason: 'Understand models, evaluation and reliable conclusions.' },
        { title: 'End-to-End AI Project', level: 'Build project', duration: '18 hours', reason: 'Clean data, train a model and present its results.' },
    ],
    'Cyber Security': [
        { title: 'Networking & Security Basics', level: 'Start here', duration: '8 hours', reason: 'Understand protocols, threats and core defenses.' },
        { title: 'Web Application Security', level: 'Next step', duration: '10 hours', reason: 'Practice identifying and preventing common vulnerabilities.' },
        { title: 'Security Assessment Lab', level: 'Build project', duration: '14 hours', reason: 'Document risks and fixes in a safe practice environment.' },
    ],
    'DevOps & Cloud Computing': [
        { title: 'Linux, Git & Networking', level: 'Start here', duration: '8 hours', reason: 'Build the foundation used by cloud and automation tools.' },
        { title: 'Docker & CI/CD', level: 'Next step', duration: '10 hours', reason: 'Automate repeatable builds, tests and deployments.' },
        { title: 'Cloud Deployment Project', level: 'Build project', duration: '14 hours', reason: 'Deploy and monitor a complete application.' },
    ],
    'Software Testing & Quality Assurance': [
        { title: 'Software Testing Foundations', level: 'Start here', duration: '6 hours', reason: 'Learn test levels, cases and defect reporting.' },
        { title: 'API & UI Test Automation', level: 'Next step', duration: '10 hours', reason: 'Automate repeatable checks for faster feedback.' },
        { title: 'Complete QA Test Plan', level: 'Build project', duration: '12 hours', reason: 'Produce a practical test suite and quality report.' },
    ],
    'Business Analysis': [
        { title: 'Business Analysis Foundations', level: 'Start here', duration: '6 hours', reason: 'Learn stakeholders, scope and requirement discovery.' },
        { title: 'Requirements & Process Modeling', level: 'Next step', duration: '8 hours', reason: 'Turn needs into clear workflows and specifications.' },
        { title: 'Business Case Study', level: 'Build project', duration: '10 hours', reason: 'Document one solution from problem to acceptance criteria.' },
    ],
    'Project Management': [
        { title: 'Project Management Essentials', level: 'Start here', duration: '6 hours', reason: 'Understand scope, schedule, risk and stakeholders.' },
        { title: 'Agile & Scrum Practice', level: 'Next step', duration: '7 hours', reason: 'Plan iterations and collaborate with a delivery team.' },
        { title: 'Project Delivery Simulation', level: 'Build project', duration: '10 hours', reason: 'Create a complete plan and manage realistic changes.' },
    ],
    'Digital Marketing': [
        { title: 'Digital Marketing Foundations', level: 'Start here', duration: '6 hours', reason: 'Understand audiences, channels and campaign goals.' },
        { title: 'Content, SEO & Analytics', level: 'Next step', duration: '9 hours', reason: 'Create discoverable content and measure performance.' },
        { title: 'Campaign Strategy Project', level: 'Build project', duration: '10 hours', reason: 'Plan, budget and evaluate a complete campaign.' },
    ],
    'Human Resources': [
        { title: 'HR Fundamentals', level: 'Start here', duration: '6 hours', reason: 'Understand recruitment, onboarding and employee support.' },
        { title: 'People Analytics & Performance', level: 'Next step', duration: '8 hours', reason: 'Use evidence to improve employee decisions.' },
        { title: 'Employee Journey Project', level: 'Build project', duration: '10 hours', reason: 'Design a measurable onboarding and development plan.' },
    ],
};
const GENERAL_PATH = [
    { title: 'Professional Communication', level: 'Start here', duration: '4 hours', reason: 'Strengthen the communication needed in every internship.' },
    { title: 'Digital Productivity & Git', level: 'Next step', duration: '6 hours', reason: 'Organize work and collaborate with your team.' },
    { title: 'Internship Portfolio Project', level: 'Build project', duration: '10 hours', reason: 'Turn your learning into evidence of your skills.' },
];
export class AiCourseSuggestions {
    ai = inject(AiService);
    toast = inject(ToastService);
    data = inject(DataService);
    internshipProgram = input('', /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "internshipProgram" }] : /* istanbul ignore next */ []));
    traineeId = input(null, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "traineeId" }] : /* istanbul ignore next */ []));
    courses = computed(() => LEARNING_PATHS[this.internshipProgram()] ?? GENERAL_PATH, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "courses" }] : /* istanbul ignore next */ []));
    loading = signal(false, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "loading" }] : /* istanbul ignore next */ []));
    error = signal('', /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "error" }] : /* istanbul ignore next */ []));
    learningPath = signal(null, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "learningPath" }] : /* istanbul ignore next */ []));
    generatePersonalizedPath() {
        const traineeId = this.traineeId();
        if (!traineeId || this.loading()) {
            if (!traineeId)
                this.error.set('A trainee account is required to generate a learning path.');
            return;
        }
        this.loading.set(true);
        this.error.set('');
        const tasks = this.data.tasks().filter(task => task.traineeId === traineeId);
        this.ai.createLearningPath(traineeId, tasks).pipe(finalize(() => this.loading.set(false))).subscribe({
            next: path => {
                this.learningPath.set(path);
                this.toast.show('Your personalized learning path is ready.', 'success');
            },
            error: error => {
                this.error.set(error.message);
                this.toast.show(error.message, 'error');
            },
        });
    }
    courseraUrl(courseTitle) {
        return `https://www.coursera.org/search?query=${this.courseQuery(courseTitle)}`;
    }
    udemyUrl(courseTitle) {
        return `https://www.udemy.com/courses/search/?q=${this.courseQuery(courseTitle)}`;
    }
    courseQuery(courseTitle) {
        return encodeURIComponent(`${courseTitle} ${this.internshipProgram()}`.trim());
    }
    static ɵfac = function AiCourseSuggestions_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || AiCourseSuggestions)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: AiCourseSuggestions, selectors: [["app-ai-course-suggestions"]], inputs: { internshipProgram: [1, "internshipProgram"], traineeId: [1, "traineeId"] }, decls: 30, vars: 5, consts: [[1, "panel", "coach-panel"], [1, "coach-heading"], ["aria-hidden", "true", 1, "coach-icon"], [1, "eyebrow"], ["type", "button", 1, "primary-button", "ai-generate", 3, "click", "disabled"], ["role", "alert", 1, "ai-state", "ai-error"], ["aria-label", "AI-generated personalized learning path", 1, "generated-path"], [1, "starter-heading"], [1, "course-list"], [1, "course-card"], [1, "coach-note"], [1, "path-summary"], [1, "ai-recommendations"], [1, "ai-recommendation"], [1, "ai-disclaimer"], [1, "step-number"], [1, "course-meta"], [1, "skill-tags"], [1, "course-copy"], [1, "course-actions"], ["target", "_blank", "rel", "noopener noreferrer", 1, "provider-link", "coursera", 3, "href"], ["target", "_blank", "rel", "noopener noreferrer", 1, "provider-link", "udemy", 3, "href"]], template: function AiCourseSuggestions_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵdomElementStart(0, "section", 0)(1, "div", 1)(2, "span", 2);
            i0.ɵɵtext(3, "\u2726");
            i0.ɵɵdomElementEnd();
            i0.ɵɵdomElementStart(4, "div")(5, "span", 3);
            i0.ɵɵtext(6, "AI LEARNING COACH");
            i0.ɵɵdomElementEnd();
            i0.ɵɵdomElementStart(7, "h2");
            i0.ɵɵtext(8, "Your recommended learning path");
            i0.ɵɵdomElementEnd();
            i0.ɵɵdomElementStart(9, "p");
            i0.ɵɵtext(10, "Suggestions personalized for ");
            i0.ɵɵdomElementStart(11, "strong");
            i0.ɵɵtext(12);
            i0.ɵɵdomElementEnd();
            i0.ɵɵtext(13, ".");
            i0.ɵɵdomElementEnd()();
            i0.ɵɵdomElementStart(14, "button", 4);
            i0.ɵɵdomListener("click", function AiCourseSuggestions_Template_button_click_14_listener() { return ctx.generatePersonalizedPath(); });
            i0.ɵɵtext(15);
            i0.ɵɵdomElementEnd()();
            i0.ɵɵconditionalCreate(16, AiCourseSuggestions_Conditional_16_Template, 5, 1, "div", 5);
            i0.ɵɵconditionalCreate(17, AiCourseSuggestions_Conditional_17_Template, 14, 2, "section", 6);
            i0.ɵɵdomElementStart(18, "div", 7)(19, "span", 3);
            i0.ɵɵtext(20, "PROGRAM STARTER RESOURCES");
            i0.ɵɵdomElementEnd();
            i0.ɵɵdomElementStart(21, "p");
            i0.ɵɵtext(22, "These resources remain available even when the AI provider is not configured.");
            i0.ɵɵdomElementEnd()();
            i0.ɵɵdomElementStart(23, "div", 8);
            i0.ɵɵrepeaterCreate(24, AiCourseSuggestions_For_25_Template, 24, 9, "article", 9, _forTrack0);
            i0.ɵɵdomElementEnd();
            i0.ɵɵdomElementStart(26, "p", 10)(27, "span");
            i0.ɵɵtext(28, "i");
            i0.ɵɵdomElementEnd();
            i0.ɵɵtext(29, " Start with step 1, then move through the path in order. Use Coursera or Udemy to compare available courses, ratings and prices.");
            i0.ɵɵdomElementEnd()();
        } if (rf & 2) {
            let tmp_4_0;
            i0.ɵɵadvance(12);
            i0.ɵɵtextInterpolate(ctx.internshipProgram() || "your internship");
            i0.ɵɵadvance(2);
            i0.ɵɵdomProperty("disabled", ctx.loading() || !ctx.traineeId());
            i0.ɵɵadvance();
            i0.ɵɵtextInterpolate1(" ", ctx.loading() ? "Building path\u2026" : ctx.learningPath() ? "Regenerate AI path" : "Generate AI path", " ");
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.error() ? 16 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional((tmp_4_0 = ctx.learningPath()) ? 17 : -1, tmp_4_0);
            i0.ɵɵadvance(7);
            i0.ɵɵrepeater(ctx.courses());
        } }, styles: ["[_nghost-%COMP%] { display: block; }\n.coach-panel[_ngcontent-%COMP%] { overflow: hidden; position: relative; }\n.coach-panel[_ngcontent-%COMP%]::before { content: ''; position: absolute; top: -80px; right: -55px; width: 190px; height: 190px; border-radius: 50%; background: radial-gradient(circle, rgba(32, 96, 144, .13), transparent 68%); pointer-events: none; }\n.coach-heading[_ngcontent-%COMP%] { display: grid; grid-template-columns: 44px 1fr auto; align-items: center; gap: 14px; margin-bottom: 20px; }\n.coach-icon[_ngcontent-%COMP%] { display: grid; place-items: center; width: 44px; height: 44px; border-radius: 13px; color: #fff; background: linear-gradient(145deg, var(--%NS%blue-dark), #2a83c2); box-shadow: 0 8px 18px rgba(32, 96, 144, .22); font-size: 21px; }\n.coach-heading[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] { margin: 3px 0 4px; font-size: 17px; }\n.coach-heading[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] { margin: 0; color: var(--%NS%muted); font-size: 10px; }\n.coach-heading[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] { color: var(--%NS%blue); }\n.personalized-badge[_ngcontent-%COMP%] { padding: 7px 10px; border-radius: 999px; color: var(--%NS%blue); background: var(--%NS%light-blue); font-size: 9px; font-weight: 800; }\n.ai-generate[_ngcontent-%COMP%] { min-width: 138px; border: 0; white-space: nowrap; cursor: pointer; }\n.ai-generate[_ngcontent-%COMP%]:disabled { cursor: not-allowed; opacity: .6; }\n.ai-state[_ngcontent-%COMP%] { display: grid; gap: 4px; margin-bottom: 16px; padding: 12px 14px; border-radius: 9px; font-size: 10px; }\n.ai-error[_ngcontent-%COMP%] { color: #8b2d2d; border: 1px solid #f1bcbc; background: #fff5f5; }\n.generated-path[_ngcontent-%COMP%] { margin-bottom: 20px; padding: 16px; border: 1px solid #b9d8ed; border-radius: 12px; background: linear-gradient(145deg, #f6fbff, #fff); }\n.path-summary[_ngcontent-%COMP%] { display: flex; align-items: center; justify-content: space-between; gap: 15px; margin-bottom: 14px; }\n.path-summary[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] { margin: 5px 0 0; color: #536479; font-size: 10px; line-height: 1.55; }\n.path-summary[_ngcontent-%COMP%]    > strong[_ngcontent-%COMP%] { color: var(--%NS%blue); font-size: 21px; }\n.ai-recommendations[_ngcontent-%COMP%] { display: grid; gap: 9px; }\n.ai-recommendation[_ngcontent-%COMP%] { display: grid; grid-template-columns: 31px 1fr; gap: 11px; padding: 13px; border: 1px solid var(--%NS%border); border-radius: 9px; background: #fff; }\n.ai-recommendation[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] { margin: 0 0 5px; font-size: 12px; }\n.ai-recommendation[_ngcontent-%COMP%]   p[_ngcontent-%COMP%], .ai-recommendation[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] { display: block; margin: 0 0 6px; color: var(--%NS%muted); font-size: 9px; line-height: 1.55; }\n.skill-tags[_ngcontent-%COMP%] { display: flex; flex-wrap: wrap; gap: 5px; margin-top: 8px; }\n.skill-tags[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] { padding: 4px 7px; border-radius: 999px; color: var(--%NS%blue-dark); background: var(--%NS%light-blue); font-size: 8px; font-weight: 700; }\n.ai-disclaimer[_ngcontent-%COMP%] { margin: 12px 0 0; color: var(--%NS%muted); font-size: 8px; }\n.starter-heading[_ngcontent-%COMP%] { margin: 4px 0 12px; }\n.starter-heading[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] { margin: 4px 0 0; color: var(--%NS%muted); font-size: 9px; }\n.course-list[_ngcontent-%COMP%] { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 12px; }\n.course-card[_ngcontent-%COMP%] { display: grid; grid-template-columns: 31px 1fr; gap: 10px; min-width: 0; padding: 16px; border: 1px solid var(--%NS%border); border-radius: 11px; background: linear-gradient(145deg, #fff, #f9fcff); }\n.course-card[_ngcontent-%COMP%]:first-child { border-color: #a9cee9; box-shadow: 0 7px 18px rgba(32, 96, 144, .08); }\n.step-number[_ngcontent-%COMP%] { display: grid; place-items: center; width: 31px; height: 31px; border-radius: 9px; color: var(--%NS%blue); background: var(--%NS%light-blue); font-size: 11px; font-weight: 800; }\n.course-card[_ngcontent-%COMP%]:first-child   .step-number[_ngcontent-%COMP%] { color: #fff; background: var(--%NS%blue); }\n.course-copy[_ngcontent-%COMP%] { min-width: 0; }\n.course-meta[_ngcontent-%COMP%] { display: flex; flex-wrap: wrap; gap: 5px; margin-bottom: 7px; color: var(--%NS%blue); font-size: 8px; font-weight: 800; text-transform: uppercase; letter-spacing: .035em; }\n.course-copy[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] { margin: 0 0 7px; font-size: 12px; line-height: 1.35; }\n.course-copy[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] { margin: 0; color: #6f7c8d; font-size: 9px; line-height: 1.55; }\n.course-actions[_ngcontent-%COMP%] { display: flex; flex-wrap: wrap; gap: 7px; margin-top: 12px; }.provider-link[_ngcontent-%COMP%] { display: inline-flex; align-items: center; justify-content: center; gap: 5px; min-height: 30px; padding: 0 10px; border: 1px solid var(--%NS%border); border-radius: 8px; font-size: 9px; font-weight: 800; text-decoration: none; transition: transform .18s ease, border-color .18s ease, box-shadow .18s ease; }.provider-link[_ngcontent-%COMP%]:hover { transform: translateY(-1px); box-shadow: 0 5px 12px rgba(22, 79, 125, .1); }.provider-link.coursera[_ngcontent-%COMP%] { color: #0755a5; border-color: #bad5ef; background: #f2f8ff; }.provider-link.udemy[_ngcontent-%COMP%] { color: #6d28a8; border-color: #dac8eb; background: #faf6ff; }.provider-link[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] { font-size: 11px; }\n.coach-note[_ngcontent-%COMP%] { display: flex; align-items: center; gap: 8px; margin: 15px 0 0; color: var(--%NS%muted); font-size: 9px; line-height: 1.5; }\n.coach-note[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] { display: grid; place-items: center; flex: 0 0 18px; height: 18px; border: 1px solid #bcd1e1; border-radius: 50%; color: var(--%NS%blue); font-weight: 800; }\n@media (max-width: 820px) { .course-list[_ngcontent-%COMP%] { grid-template-columns: 1fr; }.coach-heading[_ngcontent-%COMP%] { grid-template-columns: 44px minmax(0, 1fr); }.personalized-badge[_ngcontent-%COMP%], .ai-generate[_ngcontent-%COMP%] { grid-column: 2; width: fit-content; } }\n@media (max-width: 480px) { .coach-heading[_ngcontent-%COMP%] { grid-template-columns: 1fr; }.coach-icon[_ngcontent-%COMP%], .coach-heading[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%], .ai-generate[_ngcontent-%COMP%] { grid-column: 1; }.ai-generate[_ngcontent-%COMP%] { width: 100%; } }"] });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AiCourseSuggestions, [{
        type: Component,
        args: [{ selector: 'app-ai-course-suggestions', template: "<section class=\"panel coach-panel\">\n  <div class=\"coach-heading\">\n    <span class=\"coach-icon\" aria-hidden=\"true\">\u2726</span>\n    <div>\n      <span class=\"eyebrow\">AI LEARNING COACH</span>\n      <h2>Your recommended learning path</h2>\n      <p>Suggestions personalized for <strong>{{ internshipProgram() || 'your internship' }}</strong>.</p>\n    </div>\n    <button class=\"primary-button ai-generate\" type=\"button\" (click)=\"generatePersonalizedPath()\" [disabled]=\"loading() || !traineeId()\">\n      {{ loading() ? 'Building path\u2026' : learningPath() ? 'Regenerate AI path' : 'Generate AI path' }}\n    </button>\n  </div>\n\n  @if (error()) { <div class=\"ai-state ai-error\" role=\"alert\"><strong>AI path unavailable</strong><span>{{ error() }}</span></div> }\n  @if (learningPath(); as path) {\n    <section class=\"generated-path\" aria-label=\"AI-generated personalized learning path\">\n      <div class=\"path-summary\"><div><span class=\"eyebrow\">GENERATED FROM YOUR TASK PROGRESS</span><p>{{ path.summary }}</p></div><strong>{{ path.progressPercent }}%</strong></div>\n      <div class=\"ai-recommendations\">\n        @for (item of path.recommendations; track item.order) {\n          <article class=\"ai-recommendation\"><span class=\"step-number\">{{ item.order }}</span><div><div class=\"course-meta\"><span>{{ item.difficulty }}</span><span>\u2022</span><span>{{ item.estimatedHours }} hours</span></div><h3>{{ item.title }}</h3><p>{{ item.description }}</p><small><strong>Why now:</strong> {{ item.reason }}</small><div class=\"skill-tags\">@for (skill of item.skills; track skill) { <span>{{ skill }}</span> }</div></div></article>\n        }\n      </div>\n      <p class=\"ai-disclaimer\">AI recommendations are advisory. Review them against your internship goals.</p>\n    </section>\n  }\n\n  <div class=\"starter-heading\"><span class=\"eyebrow\">PROGRAM STARTER RESOURCES</span><p>These resources remain available even when the AI provider is not configured.</p></div>\n\n  <div class=\"course-list\">\n    @for (course of courses(); track course.title; let step = $index) {\n      <article class=\"course-card\">\n        <span class=\"step-number\">{{ step + 1 }}</span>\n        <div class=\"course-copy\">\n          <div class=\"course-meta\"><span>{{ course.level }}</span><span>\u2022</span><span>{{ course.duration }}</span></div>\n          <h3>{{ course.title }}</h3>\n          <p>{{ course.reason }}</p>\n          <div class=\"course-actions\">\n            <a class=\"provider-link coursera\" [href]=\"courseraUrl(course.title)\" target=\"_blank\" rel=\"noopener noreferrer\" [attr.aria-label]=\"'Find ' + course.title + ' courses on Coursera'\">Coursera <span>\u2197</span></a>\n            <a class=\"provider-link udemy\" [href]=\"udemyUrl(course.title)\" target=\"_blank\" rel=\"noopener noreferrer\" [attr.aria-label]=\"'Find ' + course.title + ' courses on Udemy'\">Udemy <span>\u2197</span></a>\n          </div>\n        </div>\n      </article>\n    }\n  </div>\n\n  <p class=\"coach-note\"><span>i</span> Start with step 1, then move through the path in order. Use Coursera or Udemy to compare available courses, ratings and prices.</p>\n</section>\n", styles: [":host { display: block; }\n.coach-panel { overflow: hidden; position: relative; }\n.coach-panel::before { content: ''; position: absolute; top: -80px; right: -55px; width: 190px; height: 190px; border-radius: 50%; background: radial-gradient(circle, rgba(32, 96, 144, .13), transparent 68%); pointer-events: none; }\n.coach-heading { display: grid; grid-template-columns: 44px 1fr auto; align-items: center; gap: 14px; margin-bottom: 20px; }\n.coach-icon { display: grid; place-items: center; width: 44px; height: 44px; border-radius: 13px; color: #fff; background: linear-gradient(145deg, var(--blue-dark), #2a83c2); box-shadow: 0 8px 18px rgba(32, 96, 144, .22); font-size: 21px; }\n.coach-heading h2 { margin: 3px 0 4px; font-size: 17px; }\n.coach-heading p { margin: 0; color: var(--muted); font-size: 10px; }\n.coach-heading p strong { color: var(--blue); }\n.personalized-badge { padding: 7px 10px; border-radius: 999px; color: var(--blue); background: var(--light-blue); font-size: 9px; font-weight: 800; }\n.ai-generate { min-width: 138px; border: 0; white-space: nowrap; cursor: pointer; }\n.ai-generate:disabled { cursor: not-allowed; opacity: .6; }\n.ai-state { display: grid; gap: 4px; margin-bottom: 16px; padding: 12px 14px; border-radius: 9px; font-size: 10px; }\n.ai-error { color: #8b2d2d; border: 1px solid #f1bcbc; background: #fff5f5; }\n.generated-path { margin-bottom: 20px; padding: 16px; border: 1px solid #b9d8ed; border-radius: 12px; background: linear-gradient(145deg, #f6fbff, #fff); }\n.path-summary { display: flex; align-items: center; justify-content: space-between; gap: 15px; margin-bottom: 14px; }\n.path-summary p { margin: 5px 0 0; color: #536479; font-size: 10px; line-height: 1.55; }\n.path-summary > strong { color: var(--blue); font-size: 21px; }\n.ai-recommendations { display: grid; gap: 9px; }\n.ai-recommendation { display: grid; grid-template-columns: 31px 1fr; gap: 11px; padding: 13px; border: 1px solid var(--border); border-radius: 9px; background: #fff; }\n.ai-recommendation h3 { margin: 0 0 5px; font-size: 12px; }\n.ai-recommendation p, .ai-recommendation small { display: block; margin: 0 0 6px; color: var(--muted); font-size: 9px; line-height: 1.55; }\n.skill-tags { display: flex; flex-wrap: wrap; gap: 5px; margin-top: 8px; }\n.skill-tags span { padding: 4px 7px; border-radius: 999px; color: var(--blue-dark); background: var(--light-blue); font-size: 8px; font-weight: 700; }\n.ai-disclaimer { margin: 12px 0 0; color: var(--muted); font-size: 8px; }\n.starter-heading { margin: 4px 0 12px; }\n.starter-heading p { margin: 4px 0 0; color: var(--muted); font-size: 9px; }\n.course-list { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 12px; }\n.course-card { display: grid; grid-template-columns: 31px 1fr; gap: 10px; min-width: 0; padding: 16px; border: 1px solid var(--border); border-radius: 11px; background: linear-gradient(145deg, #fff, #f9fcff); }\n.course-card:first-child { border-color: #a9cee9; box-shadow: 0 7px 18px rgba(32, 96, 144, .08); }\n.step-number { display: grid; place-items: center; width: 31px; height: 31px; border-radius: 9px; color: var(--blue); background: var(--light-blue); font-size: 11px; font-weight: 800; }\n.course-card:first-child .step-number { color: #fff; background: var(--blue); }\n.course-copy { min-width: 0; }\n.course-meta { display: flex; flex-wrap: wrap; gap: 5px; margin-bottom: 7px; color: var(--blue); font-size: 8px; font-weight: 800; text-transform: uppercase; letter-spacing: .035em; }\n.course-copy h3 { margin: 0 0 7px; font-size: 12px; line-height: 1.35; }\n.course-copy p { margin: 0; color: #6f7c8d; font-size: 9px; line-height: 1.55; }\n.course-actions { display: flex; flex-wrap: wrap; gap: 7px; margin-top: 12px; }.provider-link { display: inline-flex; align-items: center; justify-content: center; gap: 5px; min-height: 30px; padding: 0 10px; border: 1px solid var(--border); border-radius: 8px; font-size: 9px; font-weight: 800; text-decoration: none; transition: transform .18s ease, border-color .18s ease, box-shadow .18s ease; }.provider-link:hover { transform: translateY(-1px); box-shadow: 0 5px 12px rgba(22, 79, 125, .1); }.provider-link.coursera { color: #0755a5; border-color: #bad5ef; background: #f2f8ff; }.provider-link.udemy { color: #6d28a8; border-color: #dac8eb; background: #faf6ff; }.provider-link span { font-size: 11px; }\n.coach-note { display: flex; align-items: center; gap: 8px; margin: 15px 0 0; color: var(--muted); font-size: 9px; line-height: 1.5; }\n.coach-note span { display: grid; place-items: center; flex: 0 0 18px; height: 18px; border: 1px solid #bcd1e1; border-radius: 50%; color: var(--blue); font-weight: 800; }\n@media (max-width: 820px) { .course-list { grid-template-columns: 1fr; }.coach-heading { grid-template-columns: 44px minmax(0, 1fr); }.personalized-badge, .ai-generate { grid-column: 2; width: fit-content; } }\n@media (max-width: 480px) { .coach-heading { grid-template-columns: 1fr; }.coach-icon, .coach-heading > div, .ai-generate { grid-column: 1; }.ai-generate { width: 100%; } }\n"] }]
    }], null, { internshipProgram: [{ type: i0.Input, args: [{ isSignal: true, alias: "internshipProgram", required: false }] }], traineeId: [{ type: i0.Input, args: [{ isSignal: true, alias: "traineeId", required: false }] }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(AiCourseSuggestions, { className: "AiCourseSuggestions", filePath: "src/app/components/ai-course-suggestions/ai-course-suggestions.ts", lineNumber: 94 }); })();
