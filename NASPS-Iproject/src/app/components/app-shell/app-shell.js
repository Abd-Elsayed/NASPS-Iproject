import { Component, computed, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { DataService } from '../../services/data.service';
import { ToastService } from '../../services/toast.service';
import * as i0 from "@angular/core";
const _forTrack0 = ($index, $item) => $item.link;
function AppShell_For_6_Conditional_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 17);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx_r1.unread());
} }
function AppShell_For_6_Template(rf, ctx) { if (rf & 1) {
    const _r1 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "a", 16);
    i0.ɵɵlistener("click", function AppShell_For_6_Template_a_click_0_listener() { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.closeMenu()); });
    i0.ɵɵelementStart(1, "span", 7);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "span");
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵconditionalCreate(5, AppShell_For_6_Conditional_5_Template, 2, 1, "span", 17);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const item_r3 = ctx.$implicit;
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵproperty("routerLink", item_r3.link);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(item_r3.icon);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(item_r3.label);
    i0.ɵɵadvance();
    i0.ɵɵconditional(item_r3.label === "Notifications" && ctx_r1.unread() ? 5 : -1);
} }
function AppShell_Conditional_11_Template(rf, ctx) { if (rf & 1) {
    const _r4 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 18);
    i0.ɵɵlistener("click", function AppShell_Conditional_11_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r4); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.closeMenu()); });
    i0.ɵɵelementEnd();
} }
function AppShell_Conditional_18_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "img", 14);
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵproperty("src", ctx_r1.photoUrl(), i0.ɵɵsanitizeUrl);
} }
function AppShell_Conditional_19_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtext(0);
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵtextInterpolate1(" ", ctx_r1.initials(), " ");
} }
export class AppShell {
    route = inject(ActivatedRoute);
    data = inject(DataService);
    toast = inject(ToastService);
    auth = inject(AuthService);
    open = signal(false, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "open" }] : /* istanbul ignore next */ []));
    role = this.route.snapshot.data['role'];
    unread = this.data.unreadNotifications;
    photoUrl = computed(() => this.auth.profilePhotoUrl() ||
        (this.role === 'admin' ? this.data.adminProfile().photoUrl : this.data.traineeProfile().photoUrl) || '', /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "photoUrl" }] : /* istanbul ignore next */ []));
    constructor() {
        void this.auth.loadCurrentUser();
        void this.data.refreshNotificationsFromServer();
    }
    trainee = computed(() => this.data.trainees().find(item => item.id === this.auth.currentTraineeId()), /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "trainee" }] : /* istanbul ignore next */ []));
    initials = computed(() => {
        const parts = this.auth.identity().name.trim().split(/\s+/).filter(Boolean);
        const letters = parts.length >= 2 ? parts[0][0] + parts[1][0] : (parts[0]?.slice(0, 2) ?? 'NA');
        return letters.toUpperCase();
    }, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "initials" }] : /* istanbul ignore next */ []));
    navItems = computed(() => this.role === 'admin' ? [
        { label: 'Dashboard', icon: '⌂', link: '/admin/dashboard' },
        ...(this.auth.identity().isSuperAdmin
            ? [{ label: 'Add Admin', icon: '＋', link: '/admin/admins/new' }]
            : [{ label: 'Trainees', icon: '♙', link: '/admin/trainees' }]),
        { label: 'Tasks', icon: '✓', link: '/admin/tasks' },
        { label: 'Notifications', icon: '◉', link: '/admin/notifications' },
        { label: 'Profile', icon: '○', link: '/admin/profile' },
    ] : [
        { label: 'Dashboard', icon: '⌂', link: '/trainee/dashboard' },
        { label: 'My Tasks', icon: '✓', link: '/trainee/tasks' },
        { label: 'Profile', icon: '○', link: '/trainee/profile' },
        { label: 'Notifications', icon: '◉', link: '/trainee/notifications' },
    ], /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "navItems" }] : /* istanbul ignore next */ []));
    closeMenu() { this.open.set(false); }
    logout() {
        this.auth.logout();
        this.toast.show('You have been signed out.', 'info');
    }
    static ɵfac = function AppShell_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || AppShell)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: AppShell, selectors: [["app-shell"]], decls: 27, vars: 7, consts: [[1, "app-frame"], [1, "sidebar"], [1, "brand", 3, "click", "routerLink"], ["src", "/assets/nasps-logo-horizontal.png", "alt", "NASPS Technology and Innovation"], ["aria-label", "Main navigation"], ["routerLinkActive", "active", 3, "routerLink"], ["type", "button", 1, "logout", 3, "click"], [1, "nav-icon"], ["aria-label", "Close menu", 1, "scrim"], [1, "main-panel"], [1, "topbar"], ["type", "button", "aria-label", "Open menu", 1, "menu-button", 3, "click"], [1, "top-user"], [1, "avatar"], ["alt", "Profile photo", 3, "src"], [1, "route-content"], ["routerLinkActive", "active", 3, "click", "routerLink"], [1, "nav-badge"], ["aria-label", "Close menu", 1, "scrim", 3, "click"]], template: function AppShell_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0)(1, "aside", 1)(2, "a", 2);
            i0.ɵɵlistener("click", function AppShell_Template_a_click_2_listener() { return ctx.closeMenu(); });
            i0.ɵɵelement(3, "img", 3);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(4, "nav", 4);
            i0.ɵɵrepeaterCreate(5, AppShell_For_6_Template, 6, 4, "a", 5, _forTrack0);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(7, "button", 6);
            i0.ɵɵlistener("click", function AppShell_Template_button_click_7_listener() { return ctx.logout(); });
            i0.ɵɵelementStart(8, "span", 7);
            i0.ɵɵtext(9, "\u21AA");
            i0.ɵɵelementEnd();
            i0.ɵɵtext(10, " Logout ");
            i0.ɵɵelementEnd()();
            i0.ɵɵconditionalCreate(11, AppShell_Conditional_11_Template, 1, 0, "button", 8);
            i0.ɵɵelementStart(12, "main", 9)(13, "header", 10)(14, "button", 11);
            i0.ɵɵlistener("click", function AppShell_Template_button_click_14_listener() { return ctx.open.set(!ctx.open()); });
            i0.ɵɵtext(15, "\u2630");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(16, "div", 12)(17, "span", 13);
            i0.ɵɵconditionalCreate(18, AppShell_Conditional_18_Template, 1, 1, "img", 14)(19, AppShell_Conditional_19_Template, 1, 1);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(20, "div")(21, "strong");
            i0.ɵɵtext(22);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(23, "span");
            i0.ɵɵtext(24);
            i0.ɵɵelementEnd()()()();
            i0.ɵɵelementStart(25, "section", 15);
            i0.ɵɵelement(26, "router-outlet");
            i0.ɵɵelementEnd()()();
        } if (rf & 2) {
            i0.ɵɵadvance();
            i0.ɵɵclassProp("open", ctx.open());
            i0.ɵɵadvance();
            i0.ɵɵproperty("routerLink", ctx.role === "admin" ? "/admin/dashboard" : "/trainee/dashboard");
            i0.ɵɵadvance(3);
            i0.ɵɵrepeater(ctx.navItems());
            i0.ɵɵadvance(6);
            i0.ɵɵconditional(ctx.open() ? 11 : -1);
            i0.ɵɵadvance(7);
            i0.ɵɵconditional(ctx.photoUrl() ? 18 : 19);
            i0.ɵɵadvance(4);
            i0.ɵɵtextInterpolate(ctx.auth.identity().name);
            i0.ɵɵadvance(2);
            i0.ɵɵtextInterpolate(ctx.auth.identity().roleLabel);
        } }, dependencies: [RouterOutlet, RouterLink, RouterLinkActive], styles: [".app-frame[_ngcontent-%COMP%] { min-height: 100vh; background: var(--%NS%surface-soft); }\n.sidebar[_ngcontent-%COMP%] { position: fixed; inset: 0 auto 0 0; width: 240px; padding: 28px 18px 20px; background: #fff; border-right: 1px solid var(--%NS%border); z-index: 20; display: flex; flex-direction: column; }\n.brand[_ngcontent-%COMP%] { display: flex; align-items: center; min-height: 74px; padding: 0 4px 22px; color: var(--%NS%ink); text-decoration: none; }\n.brand[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] { display: block; width: 198px; height: auto; max-height: 66px; object-fit: contain; object-position: left center; }\nnav[_ngcontent-%COMP%] { display: grid; gap: 7px; }\nnav[_ngcontent-%COMP%]   a[_ngcontent-%COMP%], .logout[_ngcontent-%COMP%] { display: flex; align-items: center; gap: 12px; width: 100%; padding: 12px 14px; border-radius: 9px; color: #526174; background: transparent; border: 0; text-decoration: none; font: inherit; font-weight: 600; cursor: pointer; }\nnav[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:hover, .logout[_ngcontent-%COMP%]:hover { background: var(--%NS%light-blue); color: var(--%NS%blue); }\nnav[_ngcontent-%COMP%]   a.active[_ngcontent-%COMP%] { color: #fff; background: var(--%NS%blue); box-shadow: 0 8px 18px rgba(32, 96, 144, .2); }\n.nav-icon[_ngcontent-%COMP%] { width: 20px; text-align: center; font-size: 18px; }\n.logout[_ngcontent-%COMP%] { margin-top: auto; }\n.main-panel[_ngcontent-%COMP%] { min-height: 100vh; margin-left: 240px; }\n.topbar[_ngcontent-%COMP%] { height: 74px; padding: 0 34px; display: flex; align-items: center; justify-content: flex-end; background: #fff; border-bottom: 1px solid var(--%NS%border); }\n.top-user[_ngcontent-%COMP%] { display: flex; align-items: center; gap: 10px; }\n.top-user[_ngcontent-%COMP%]   div[_ngcontent-%COMP%] { display: grid; font-size: 13px; line-height: 1.25; }\n.top-user[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]:last-child { color: var(--%NS%muted); font-size: 11px; }\n.avatar[_ngcontent-%COMP%] { display: grid; place-items: center; width: 36px; height: 36px; border-radius: 50%; color: #fff; background: linear-gradient(145deg, var(--%NS%blue-dark), var(--%NS%blue)); font-size: 11px; font-weight: 800; }\n.avatar[_ngcontent-%COMP%] { overflow: hidden; }\n.avatar[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] { width: 100%; height: 100%; object-fit: cover; display: block; }\n.route-content[_ngcontent-%COMP%] { padding: 30px 34px 44px; }\n.menu-button[_ngcontent-%COMP%], .scrim[_ngcontent-%COMP%] { display: none; }\n\n@media (max-width: 850px) {\n  .sidebar[_ngcontent-%COMP%] { transform: translateX(-102%); transition: transform .22s ease; }\n  .sidebar.open[_ngcontent-%COMP%] { transform: translateX(0); }\n  .main-panel[_ngcontent-%COMP%] { margin-left: 0; }\n  .topbar[_ngcontent-%COMP%] { justify-content: space-between; padding: 0 20px; }\n  .menu-button[_ngcontent-%COMP%] { display: block; border: 0; background: transparent; font-size: 24px; color: var(--%NS%ink); cursor: pointer; }\n  .scrim[_ngcontent-%COMP%] { display: block; position: fixed; inset: 0; z-index: 15; border: 0; background: rgba(11, 25, 47, .36); }\n  .route-content[_ngcontent-%COMP%] { padding: 22px 18px 36px; }\n}\n\n.nav-badge[_ngcontent-%COMP%] { margin-left: auto; min-width: 18px; height: 18px; padding: 0 5px; border-radius: 9px; background: var(--%NS%blue); color: #fff; font-size: 10px; font-weight: 700; display: grid; place-items: center; }"] });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AppShell, [{
        type: Component,
        args: [{ selector: 'app-shell', imports: [RouterOutlet, RouterLink, RouterLinkActive], template: "<div class=\"app-frame\">\n  <aside class=\"sidebar\" [class.open]=\"open()\">\n    <a class=\"brand\" [routerLink]=\"role === 'admin' ? '/admin/dashboard' : '/trainee/dashboard'\" (click)=\"closeMenu()\">\n      <img src=\"/assets/nasps-logo-horizontal.png\" alt=\"NASPS Technology and Innovation\">\n    </a>\n\n    <nav aria-label=\"Main navigation\">\n      @for (item of navItems(); track item.link) {\n        <a [routerLink]=\"item.link\" routerLinkActive=\"active\" (click)=\"closeMenu()\">\n          <span class=\"nav-icon\">{{ item.icon }}</span>\n          <span>{{ item.label }}</span>\n          @if (item.label === 'Notifications' && unread()) { <span class=\"nav-badge\">{{ unread() }}</span> }\n        </a>\n      }\n    </nav>\n\n    <button class=\"logout\" type=\"button\" (click)=\"logout()\">\n      <span class=\"nav-icon\">\u21AA</span> Logout\n    </button>\n  </aside>\n\n  @if (open()) { <button class=\"scrim\" aria-label=\"Close menu\" (click)=\"closeMenu()\"></button> }\n\n  <main class=\"main-panel\">\n    <header class=\"topbar\">\n      <button class=\"menu-button\" type=\"button\" aria-label=\"Open menu\" (click)=\"open.set(!open())\">\u2630</button>\n      <div class=\"top-user\">\n        <span class=\"avatar\">@if (photoUrl()) { <img [src]=\"photoUrl()\" alt=\"Profile photo\"> } @else { {{ initials() }} }</span>\n        <div>\n          <strong>{{ auth.identity().name }}</strong>\n          <span>{{ auth.identity().roleLabel }}</span>\n        </div>\n      </div>\n    </header>\n    <section class=\"route-content\">\n      <router-outlet />\n    </section>\n  </main>\n</div>\n", styles: [".app-frame { min-height: 100vh; background: var(--surface-soft); }\n.sidebar { position: fixed; inset: 0 auto 0 0; width: 240px; padding: 28px 18px 20px; background: #fff; border-right: 1px solid var(--border); z-index: 20; display: flex; flex-direction: column; }\n.brand { display: flex; align-items: center; min-height: 74px; padding: 0 4px 22px; color: var(--ink); text-decoration: none; }\n.brand img { display: block; width: 198px; height: auto; max-height: 66px; object-fit: contain; object-position: left center; }\nnav { display: grid; gap: 7px; }\nnav a, .logout { display: flex; align-items: center; gap: 12px; width: 100%; padding: 12px 14px; border-radius: 9px; color: #526174; background: transparent; border: 0; text-decoration: none; font: inherit; font-weight: 600; cursor: pointer; }\nnav a:hover, .logout:hover { background: var(--light-blue); color: var(--blue); }\nnav a.active { color: #fff; background: var(--blue); box-shadow: 0 8px 18px rgba(32, 96, 144, .2); }\n.nav-icon { width: 20px; text-align: center; font-size: 18px; }\n.logout { margin-top: auto; }\n.main-panel { min-height: 100vh; margin-left: 240px; }\n.topbar { height: 74px; padding: 0 34px; display: flex; align-items: center; justify-content: flex-end; background: #fff; border-bottom: 1px solid var(--border); }\n.top-user { display: flex; align-items: center; gap: 10px; }\n.top-user div { display: grid; font-size: 13px; line-height: 1.25; }\n.top-user span:last-child { color: var(--muted); font-size: 11px; }\n.avatar { display: grid; place-items: center; width: 36px; height: 36px; border-radius: 50%; color: #fff; background: linear-gradient(145deg, var(--blue-dark), var(--blue)); font-size: 11px; font-weight: 800; }\n.avatar { overflow: hidden; }\n.avatar img { width: 100%; height: 100%; object-fit: cover; display: block; }\n.route-content { padding: 30px 34px 44px; }\n.menu-button, .scrim { display: none; }\n\n@media (max-width: 850px) {\n  .sidebar { transform: translateX(-102%); transition: transform .22s ease; }\n  .sidebar.open { transform: translateX(0); }\n  .main-panel { margin-left: 0; }\n  .topbar { justify-content: space-between; padding: 0 20px; }\n  .menu-button { display: block; border: 0; background: transparent; font-size: 24px; color: var(--ink); cursor: pointer; }\n  .scrim { display: block; position: fixed; inset: 0; z-index: 15; border: 0; background: rgba(11, 25, 47, .36); }\n  .route-content { padding: 22px 18px 36px; }\n}\n\n.nav-badge { margin-left: auto; min-width: 18px; height: 18px; padding: 0 5px; border-radius: 9px; background: var(--blue); color: #fff; font-size: 10px; font-weight: 700; display: grid; place-items: center; }\n"] }]
    }], () => [], null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(AppShell, { className: "AppShell", filePath: "src/app/components/app-shell/app-shell.ts", lineNumber: 15 }); })();
