import { Component, inject, input, signal } from '@angular/core';
import { finalize } from 'rxjs';
import { AiService } from '../../services/ai.service';
import { ToastService } from '../../services/toast.service';
import { DataService } from '../../services/data.service';
import * as i0 from "@angular/core";
function TraineeInsights_Conditional_11_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵdomElementStart(0, "p", 5)(1, "strong");
    i0.ɵɵtext(2, "Insights unavailable.");
    i0.ɵɵdomElementEnd();
    i0.ɵɵtext(3);
    i0.ɵɵdomElementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate1(" ", ctx_r0.error());
} }
function TraineeInsights_Conditional_12_For_13_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵdomElementStart(0, "li");
    i0.ɵɵtext(1);
    i0.ɵɵdomElementEnd();
} if (rf & 2) {
    const item_r2 = ctx.$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(item_r2);
} }
function TraineeInsights_Conditional_12_ForEmpty_14_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵdomElementStart(0, "li");
    i0.ɵɵtext(1, "Not enough evidence yet.");
    i0.ɵɵdomElementEnd();
} }
function TraineeInsights_Conditional_12_For_20_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵdomElementStart(0, "li");
    i0.ɵɵtext(1);
    i0.ɵɵdomElementEnd();
} if (rf & 2) {
    const item_r3 = ctx.$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(item_r3);
} }
function TraineeInsights_Conditional_12_ForEmpty_21_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵdomElementStart(0, "li");
    i0.ɵɵtext(1, "Not enough evidence yet.");
    i0.ɵɵdomElementEnd();
} }
function TraineeInsights_Conditional_12_For_27_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵdomElementStart(0, "li");
    i0.ɵɵtext(1);
    i0.ɵɵdomElementEnd();
} if (rf & 2) {
    const item_r4 = ctx.$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(item_r4);
} }
function TraineeInsights_Conditional_12_For_33_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵdomElementStart(0, "li");
    i0.ɵɵtext(1);
    i0.ɵɵdomElementEnd();
} if (rf & 2) {
    const item_r5 = ctx.$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(item_r5);
} }
function TraineeInsights_Conditional_12_For_39_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵdomElementStart(0, "li");
    i0.ɵɵtext(1);
    i0.ɵɵdomElementEnd();
} if (rf & 2) {
    const item_r6 = ctx.$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(item_r6);
} }
function TraineeInsights_Conditional_12_ForEmpty_40_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵdomElementStart(0, "li");
    i0.ɵɵtext(1, "No evidence-based warning was identified.");
    i0.ɵɵdomElementEnd();
} }
function TraineeInsights_Conditional_12_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵdomElementStart(0, "div", 6)(1, "span");
    i0.ɵɵtext(2, "AI summary");
    i0.ɵɵdomElementEnd();
    i0.ɵɵdomElementStart(3, "h3");
    i0.ɵɵtext(4);
    i0.ɵɵdomElementEnd();
    i0.ɵɵdomElementStart(5, "p");
    i0.ɵɵtext(6);
    i0.ɵɵdomElementEnd()();
    i0.ɵɵdomElementStart(7, "div", 7)(8, "article")(9, "h3");
    i0.ɵɵtext(10, "Strengths");
    i0.ɵɵdomElementEnd();
    i0.ɵɵdomElementStart(11, "ul");
    i0.ɵɵrepeaterCreate(12, TraineeInsights_Conditional_12_For_13_Template, 2, 1, "li", null, i0.ɵɵrepeaterTrackByIdentity, false, TraineeInsights_Conditional_12_ForEmpty_14_Template, 2, 0, "li");
    i0.ɵɵdomElementEnd()();
    i0.ɵɵdomElementStart(15, "article")(16, "h3");
    i0.ɵɵtext(17, "Areas to improve");
    i0.ɵɵdomElementEnd();
    i0.ɵɵdomElementStart(18, "ul");
    i0.ɵɵrepeaterCreate(19, TraineeInsights_Conditional_12_For_20_Template, 2, 1, "li", null, i0.ɵɵrepeaterTrackByIdentity, false, TraineeInsights_Conditional_12_ForEmpty_21_Template, 2, 0, "li");
    i0.ɵɵdomElementEnd()();
    i0.ɵɵdomElementStart(22, "article")(23, "h3");
    i0.ɵɵtext(24, "Recommendations");
    i0.ɵɵdomElementEnd();
    i0.ɵɵdomElementStart(25, "ul");
    i0.ɵɵrepeaterCreate(26, TraineeInsights_Conditional_12_For_27_Template, 2, 1, "li", null, i0.ɵɵrepeaterTrackByIdentity);
    i0.ɵɵdomElementEnd()();
    i0.ɵɵdomElementStart(28, "article")(29, "h3");
    i0.ɵɵtext(30, "Next steps");
    i0.ɵɵdomElementEnd();
    i0.ɵɵdomElementStart(31, "ul");
    i0.ɵɵrepeaterCreate(32, TraineeInsights_Conditional_12_For_33_Template, 2, 1, "li", null, i0.ɵɵrepeaterTrackByIdentity);
    i0.ɵɵdomElementEnd()();
    i0.ɵɵdomElementStart(34, "article", 8)(35, "h3");
    i0.ɵɵtext(36, "Attention indicators");
    i0.ɵɵdomElementEnd();
    i0.ɵɵdomElementStart(37, "ul");
    i0.ɵɵrepeaterCreate(38, TraineeInsights_Conditional_12_For_39_Template, 2, 1, "li", null, i0.ɵɵrepeaterTrackByIdentity, false, TraineeInsights_Conditional_12_ForEmpty_40_Template, 2, 0, "li");
    i0.ɵɵdomElementEnd()()();
    i0.ɵɵdomElementStart(41, "p", 9);
    i0.ɵɵtext(42, "AI output is advisory. Verify it against the trainee's work before making administrative decisions.");
    i0.ɵɵdomElementEnd();
} if (rf & 2) {
    const result_r7 = ctx;
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(result_r7.summary);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(result_r7.progressAssessment);
    i0.ɵɵadvance(6);
    i0.ɵɵrepeater(result_r7.strengths);
    i0.ɵɵadvance(7);
    i0.ɵɵrepeater(result_r7.areasForImprovement);
    i0.ɵɵadvance(7);
    i0.ɵɵrepeater(result_r7.recommendations);
    i0.ɵɵadvance(6);
    i0.ɵɵrepeater(result_r7.nextSteps);
    i0.ɵɵadvance(6);
    i0.ɵɵrepeater(result_r7.attentionIndicators);
} }
export class TraineeInsights {
    ai = inject(AiService);
    toast = inject(ToastService);
    data = inject(DataService);
    traineeId = input.required(/* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "traineeId" }] : /* istanbul ignore next */ []));
    loading = signal(false, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "loading" }] : /* istanbul ignore next */ []));
    error = signal('', /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "error" }] : /* istanbul ignore next */ []));
    insights = signal(null, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "insights" }] : /* istanbul ignore next */ []));
    analyze() {
        if (this.loading())
            return;
        this.loading.set(true);
        this.error.set('');
        const tasks = this.data.tasks().filter(task => task.traineeId === this.traineeId());
        this.ai.createTraineeInsights(this.traineeId(), tasks).pipe(finalize(() => this.loading.set(false))).subscribe({
            next: insights => { this.insights.set(insights); this.toast.show('AI trainee insights are ready.', 'success'); },
            error: error => { this.error.set(error.message); this.toast.show(error.message, 'error'); },
        });
    }
    static ɵfac = function TraineeInsights_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || TraineeInsights)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: TraineeInsights, selectors: [["app-trainee-insights"]], inputs: { traineeId: [1, "traineeId"] }, decls: 13, vars: 4, consts: [["aria-labelledby", "insights-heading", 1, "panel", "insight-panel"], [1, "insight-heading"], [1, "eyebrow"], ["id", "insights-heading"], ["type", "button", 1, "primary-button", 3, "click", "disabled"], ["role", "alert", 1, "insight-error"], [1, "summary"], [1, "insight-grid"], [1, "attention"], [1, "disclaimer"]], template: function TraineeInsights_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵdomElementStart(0, "section", 0)(1, "div", 1)(2, "div")(3, "span", 2);
            i0.ɵɵtext(4, "ADMIN AI ASSISTANT");
            i0.ɵɵdomElementEnd();
            i0.ɵɵdomElementStart(5, "h2", 3);
            i0.ɵɵtext(6, "Trainee progress insights");
            i0.ɵɵdomElementEnd();
            i0.ɵɵdomElementStart(7, "p");
            i0.ɵɵtext(8, "Analyze saved task status and admin review data without changing the trainee record.");
            i0.ɵɵdomElementEnd()();
            i0.ɵɵdomElementStart(9, "button", 4);
            i0.ɵɵdomListener("click", function TraineeInsights_Template_button_click_9_listener() { return ctx.analyze(); });
            i0.ɵɵtext(10);
            i0.ɵɵdomElementEnd()();
            i0.ɵɵconditionalCreate(11, TraineeInsights_Conditional_11_Template, 4, 1, "p", 5);
            i0.ɵɵconditionalCreate(12, TraineeInsights_Conditional_12_Template, 43, 5);
            i0.ɵɵdomElementEnd();
        } if (rf & 2) {
            let tmp_3_0;
            i0.ɵɵadvance(9);
            i0.ɵɵdomProperty("disabled", ctx.loading());
            i0.ɵɵadvance();
            i0.ɵɵtextInterpolate(ctx.loading() ? "Analyzing\u2026" : ctx.insights() ? "Refresh insights" : "Analyze trainee");
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.error() ? 11 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional((tmp_3_0 = ctx.insights()) ? 12 : -1, tmp_3_0);
        } }, styles: ["[_nghost-%COMP%] { display: block; margin-top: 16px; }\n.insight-heading[_ngcontent-%COMP%] { display: flex; justify-content: space-between; align-items: flex-start; gap: 16px; }\n.insight-heading[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] { margin: 4px 0; font-size: 17px; }\n.insight-heading[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] { margin: 0; color: var(--%NS%muted); font-size: 10px; }\n.insight-heading[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] { border: 0; cursor: pointer; white-space: nowrap; }\n.insight-heading[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:disabled { opacity: .6; cursor: not-allowed; }\n.insight-error[_ngcontent-%COMP%] { margin: 14px 0 0; padding: 11px; border: 1px solid #efbcbc; border-radius: 8px; color: #8d2c2c; background: #fff5f5; font-size: 10px; }\n.summary[_ngcontent-%COMP%] { margin-top: 16px; padding: 14px; border-left: 3px solid var(--%NS%blue); border-radius: 8px; background: var(--%NS%light-blue); }\n.summary[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] { color: var(--%NS%blue); font-size: 8px; font-weight: 800; text-transform: uppercase; }\n.summary[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] { margin: 5px 0; font-size: 12px; }\n.summary[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] { margin: 0; color: var(--%NS%muted); font-size: 10px; line-height: 1.55; }\n.insight-grid[_ngcontent-%COMP%] { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 10px; margin-top: 11px; }\n.insight-grid[_ngcontent-%COMP%]   article[_ngcontent-%COMP%] { padding: 13px; border: 1px solid var(--%NS%border); border-radius: 9px; background: #fff; }\n.insight-grid[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] { margin: 0 0 8px; font-size: 11px; }\n.insight-grid[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%] { margin: 0; padding-left: 17px; color: var(--%NS%muted); font-size: 9px; line-height: 1.65; }\n.attention[_ngcontent-%COMP%] { grid-column: 1 / -1; }\n.disclaimer[_ngcontent-%COMP%] { margin: 12px 0 0; color: var(--%NS%muted); font-size: 8px; }\n@media (max-width: 650px) { .insight-heading[_ngcontent-%COMP%] { display: grid; }.insight-grid[_ngcontent-%COMP%] { grid-template-columns: 1fr; }.attention[_ngcontent-%COMP%] { grid-column: auto; } }"] });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(TraineeInsights, [{
        type: Component,
        args: [{ selector: 'app-trainee-insights', template: "<section class=\"panel insight-panel\" aria-labelledby=\"insights-heading\">\n  <div class=\"insight-heading\"><div><span class=\"eyebrow\">ADMIN AI ASSISTANT</span><h2 id=\"insights-heading\">Trainee progress insights</h2><p>Analyze saved task status and admin review data without changing the trainee record.</p></div><button class=\"primary-button\" type=\"button\" (click)=\"analyze()\" [disabled]=\"loading()\">{{ loading() ? 'Analyzing\u2026' : insights() ? 'Refresh insights' : 'Analyze trainee' }}</button></div>\n  @if (error()) { <p class=\"insight-error\" role=\"alert\"><strong>Insights unavailable.</strong> {{ error() }}</p> }\n  @if (insights(); as result) {\n    <div class=\"summary\"><span>AI summary</span><h3>{{ result.summary }}</h3><p>{{ result.progressAssessment }}</p></div>\n    <div class=\"insight-grid\">\n      <article><h3>Strengths</h3><ul>@for (item of result.strengths; track item) { <li>{{ item }}</li> } @empty { <li>Not enough evidence yet.</li> }</ul></article>\n      <article><h3>Areas to improve</h3><ul>@for (item of result.areasForImprovement; track item) { <li>{{ item }}</li> } @empty { <li>Not enough evidence yet.</li> }</ul></article>\n      <article><h3>Recommendations</h3><ul>@for (item of result.recommendations; track item) { <li>{{ item }}</li> }</ul></article>\n      <article><h3>Next steps</h3><ul>@for (item of result.nextSteps; track item) { <li>{{ item }}</li> }</ul></article>\n      <article class=\"attention\"><h3>Attention indicators</h3><ul>@for (item of result.attentionIndicators; track item) { <li>{{ item }}</li> } @empty { <li>No evidence-based warning was identified.</li> }</ul></article>\n    </div>\n    <p class=\"disclaimer\">AI output is advisory. Verify it against the trainee's work before making administrative decisions.</p>\n  }\n</section>\n", styles: [":host { display: block; margin-top: 16px; }\n.insight-heading { display: flex; justify-content: space-between; align-items: flex-start; gap: 16px; }\n.insight-heading h2 { margin: 4px 0; font-size: 17px; }\n.insight-heading p { margin: 0; color: var(--muted); font-size: 10px; }\n.insight-heading button { border: 0; cursor: pointer; white-space: nowrap; }\n.insight-heading button:disabled { opacity: .6; cursor: not-allowed; }\n.insight-error { margin: 14px 0 0; padding: 11px; border: 1px solid #efbcbc; border-radius: 8px; color: #8d2c2c; background: #fff5f5; font-size: 10px; }\n.summary { margin-top: 16px; padding: 14px; border-left: 3px solid var(--blue); border-radius: 8px; background: var(--light-blue); }\n.summary span { color: var(--blue); font-size: 8px; font-weight: 800; text-transform: uppercase; }\n.summary h3 { margin: 5px 0; font-size: 12px; }\n.summary p { margin: 0; color: var(--muted); font-size: 10px; line-height: 1.55; }\n.insight-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 10px; margin-top: 11px; }\n.insight-grid article { padding: 13px; border: 1px solid var(--border); border-radius: 9px; background: #fff; }\n.insight-grid h3 { margin: 0 0 8px; font-size: 11px; }\n.insight-grid ul { margin: 0; padding-left: 17px; color: var(--muted); font-size: 9px; line-height: 1.65; }\n.attention { grid-column: 1 / -1; }\n.disclaimer { margin: 12px 0 0; color: var(--muted); font-size: 8px; }\n@media (max-width: 650px) { .insight-heading { display: grid; }.insight-grid { grid-template-columns: 1fr; }.attention { grid-column: auto; } }\n"] }]
    }], null, { traineeId: [{ type: i0.Input, args: [{ isSignal: true, alias: "traineeId", required: true }] }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(TraineeInsights, { className: "TraineeInsights", filePath: "src/app/components/trainee-insights/trainee-insights.ts", lineNumber: 13 }); })();
