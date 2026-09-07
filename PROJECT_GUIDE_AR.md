# شرح NASPS Intern Software Frontend

## 1. فكرة المشروع

المشروع نظام Frontend لإدارة تدريب المتدربين داخل NASPS. يوجد نوعان من الحسابات:

- Admin: يدير المتدربين والمهام، يراجع التسليمات، ويتابع الإحصائيات.
- Trainee: يرى قائمة مهامه ويغيّر حالة المهمة ويرسل ملفًا أو رابطًا ويعدّل بياناته.

المشروع مبني بـ Angular Standalone Components وTypeScript وReactive Forms. البيانات التجريبية وكلمات المرور محفوظة في `localStorage` لأن هذه النسخة Frontend فقط.

## 2. التشغيل وبيانات الدخول

```bash
pnpm install
pnpm start
```

ثم افتح `http://localhost:4200`.

- Admin: `admin@nasps.com` / `Admin@123`
- Trainee Demo أول مرة: `NASPS-T002` / `NASPS@T002`
- Admin Login: `/admin/login`
- Trainee Login: `/trainee/login`
- إنشاء كلمة السر الخاصة: `/create-password`

الـAdmin ينشئ حساب المتدرب أولًا، وبعد الحفظ يحصل على Trainee ID وUsername وTemporary Password. عند أول دخول للمتدرب بهذه البيانات ينتقل إجباريًا إلى صفحة إنشاء كلمة سر قوية، ثم يفتح `/trainee/dashboard`.

## 3. تنظيم المشروع

```text
src/app/
├── components/
│   ├── ai-course-suggestions/
│   ├── app-shell/
│   ├── auth/
│   ├── dashboard/
│   ├── notifications/
│   ├── profile/
│   ├── task-form/
│   ├── task-review/
│   ├── tasks/
│   ├── toast-container/
│   ├── trainee-dashboard/
│   ├── trainee-form/
│   ├── trainee-task-details/
│   ├── trainee-tasks/
│   └── trainees/
├── guards/
├── models/
└── services/
```

كل Component موجود داخل Folder منفصل وبه أربعة ملفات:

1. `.ts`: منطق الصفحة والبيانات والأحداث.
2. `.html`: شكل الصفحة وربط البيانات.
3. `.css`: تصميم الصفحة الخاص بها.
4. `.spec.ts`: Unit Test يتأكد أن الـComponent يُنشأ بنجاح.

## 4. الملفات الأساسية

### `models/models.ts`

يحدد شكل البيانات باستخدام Interfaces وUnion Types مثل `Trainee` و`TrainingTask` و`TaskStatus`. هذا يجعل TypeScript يكتشف البيانات الناقصة أو القيم غير الصحيحة أثناء الـbuild.

### `services/data.service.ts`

طبقة البيانات الوحيدة. تحتوي على Signals للمتدربين والمهام والإشعارات، ودوال الإضافة والتعديل والحذف. كل تغيير يُحفظ في `localStorage` ويظهر تلقائيًا في الصفحات المرتبطة.

### `services/auth.service.ts`

مسؤول عن:

- التحقق من بيانات Admin وTrainee.
- إنشاء Username وTemporary Password مختلفين حسب Trainee ID.
- إجبار المتدرب على تغييرها عند أول دخول.
- حفظ Role والبريد الحالي والتنقل للصفحة الصحيحة.
- تسجيل حساب مؤقت عند إضافة Trainee جديد.

هذه آلية Demo فقط؛ الإنتاج يحتاج Backend وتشفير Hashing وSession أو Token آمن.

### `services/validation.service.ts`

يحتوي على Validators مشتركة لرقم الهاتف ولينك التسليم. الهاتف يقبل صيغة دولية بين 10 و15 رقمًا، واللينك يجب أن يبدأ بـ`http://` أو `https://`.

### `services/toast.service.ts`

ينشئ رسائل Toast موحدة من أنواع Success وError وWarning وInfo، ويغلقها تلقائيًا بعد مدة محددة.

### `guards/auth.guard.ts`

يحمي Admin routes وTrainee routes. المستخدم غير المسجل أو ذو الـRole الخطأ يرجع لصفحة الدخول المناسبة.

### `app.routes.ts`

يحدد جميع روابط الصفحات. Admin وTrainee لهما child routes داخل `AppShell` حتى يظل الـSidebar ظاهرًا أثناء التنقل.

## 5. شرح الصفحات

### Auth

صفحة بسيطة في المنتصف تستخدم Reactive Forms. تظهر كـAdmin Login أوTrainee Login حسب route data، وتتحول إلى Create Password في أول دخول. قبل إنشاء كلمة السر الخاصة يجب أن يرسل الـTrainee كود OTP إلى بريده المسجل ويدخل الكود الصحيح. بعدها يطبق النظام شروط قوة كلمة السر وتأكيد التطابق ثم ينقل المتدرب إلى `/trainee/dashboard`.

### Dashboard

تعرض عدد المتدربين والمهام والحالات والمهام الحديثة. لا يوجد فيها زر Add Task؛ إنشاء المهمة يتم من صفحة Tasks.

### Trainee Dashboard وAI Course Suggestions

تعرض Dashboard المتدرب عدد المهام المسندة له، والمهام Pending وIn Progress وCompleted ونسبة الإنجاز. تختار له المهمة الأفضل للبدء بها اعتمادًا على الحالة ثم الأولوية ثم أقرب موعد تسليم. تحتوي أيضًا على Component مستقل باسم `ai-course-suggestions` ينشئ مسارًا من ثلاث مراحل طبقًا لحقل `internshipProgram`: أساسيات، خطوة تالية، ثم مشروع عملي. هذه النسخة تستخدم Recommendation Engine محليًا داخل الـFrontend؛ استخدام نموذج AI حقيقي يحتاج Backend/API حتى لا يوضع مفتاح الخدمة داخل المتصفح.

### Trainees وTrainee Form

تعرض المتدربين مع Search وEdit وDelete وتغيير الحالة. كل متدرب مرتبط بحقل `internshipProgram` واحد، ويتم اختياره من قائمة برامج التدريب ويظهر في جدول المتدربين وفي قائمة إسناد المهمة. صفحة الإضافة تحتوي أيضًا على Email وEgyptian Mobile validation وDepartment dropdown وقائمة جامعات مصر التي تشمل New Giza University. اختيار `Other` يظهر حقلًا فارغًا لكتابة اسم الجامعة. لا توجد خطوة Verification عند الـAdmin، ولا يظهر حقل Active/Inactive عند الإضافة؛ المتدرب الجديد يكون Active تلقائيًا ويمكن تعديل حالته بعد ذلك.

في نسخة الـFrontend الحالية يظهر كود Email OTP داخل Toast للـTrainee أثناء تغيير كلمة السر. الإرسال الحقيقي يحتاج Backend يحفظ مفاتيح Email provider بعيدًا عن كود المتصفح.

### Tasks وTask Form

تعرض كل المهام والفلاتر والمراجعة. Assign Trainee يسمح باختيار متدرب واحد أو `All trainees`. عند اختيار الجميع ينشئ النظام نسخة من نفس المهمة لكل متدرب. Add Task يسمح باختيار Attachment من أي نوع ملف أوصورة حتى 20 MB، وتحفظ نسخة الـFrontend اسم الملف ونوعه وحجمه.

### Task Review

تعرض وصف المهمة ومرفقاتها وتسليم المتدرب. Admin يستطيع الموافقة أو طلب تعديلات، وطلب التعديلات يحتاج Feedback واضحًا.

### Trainee Tasks

تعرض مهام الحساب الحالي مع البحث والفلاتر. لا يوجد زر أو عمود View Task. عنوان المهمة نفسه Link إلى التفاصيل حتى يستطيع المتدرب تنفيذ التسليم.

### Trainee Task Details

تسمح بإرسال Link صحيح أو ملف حتى 10 MB. الأنواع المدعومة تشمل PDF، الصور، النصوص، مستندات Office، ZIP/RAR، وملفات الكود مثل HTML وCSS وJavaScript وTypeScript وPython وJava وC/C++ وSQL.

هذه النسخة تحفظ اسم الملف ونوعه وحجمه فقط. رفع محتوى الملف الحقيقي يحتاج Backend أو خدمة Storage.

### Profile وNotifications

Profile يستخدم validation للبريد والهاتف وDepartment dropdown. Notifications تدعم Mark all as read. كل العمليات تعرض Toast بدل `alert()`.

## 6. مفاهيم Angular المستخدمة

- Standalone Components بدل `NgModule`.
- Interpolation مثل `{{ task.title }}`.
- Property Binding مثل `[routerLink]` و`[attr.data-status]`.
- Event Binding مثل `(click)` و`(change)` و`(ngSubmit)`.
- Two-way Binding باستخدام `[(ngModel)]` في البحث والمراجعة والتسليم.
- Reactive Forms باستخدام `FormBuilder` و`Validators`.
- Control Flow الحديث باستخدام `@if` و`@for`.
- Dependency Injection باستخدام `inject()` والـconstructor injection.
- Signals و`computed()` لتحديث القوائم والإحصائيات تلقائيًا.
- Router وchild routes و`router-outlet` للتنقل بدون إعادة تحميل كاملة.
- Functional Guards لحماية الصفحات حسب الـRole.
- Unit Testing باستخدام Angular TestBed وVitest.

## 7. الـValidation والـError Handling

- Email: Required وصيغة بريد صحيحة وعدم تكرار بريد Trainee.
- Phone: رقم موبايل مصري كامل يبدأ بـ010 أو011 أو012 أو015، أوالصيغة الدولية `+20`.
- Email confirmation: كود OTP من 6 أرقام صالح لمدة 5 دقائق، ويجب على الـTrainee تأكيد بريده قبل إنشاء كلمة السر الجديدة.
- Submission link: رابط كامل يبدأ بـHTTP أوHTTPS.
- Password: 8 أحرف على الأقل، حرف كبير وصغير، رقم، ورمز خاص.
- Forms: الحقول الخاطئة تتحول للون الأحمر وتظهر رسالة تحت الحقل.
- Business errors: تظهر في Toast واضحة بدل إيقاف الصفحة.
- التخزين المحلي: قراءة JSON محمية بـ`try/catch` حتى لا تتعطل الواجهة إذا فسدت البيانات.

## 8. الاختبارات

كل Component لديه ملف Unit Test. للتشغيل:

```bash
pnpm test
pnpm build
```

`pnpm test` يشغل 15 ملف اختبار، و`pnpm build` يتأكد من صحة TypeScript وAngular templates وإنتاج نسخة Production داخل `dist`.

## 9. قاعدة البيانات والـBackend

لا توجد Database حقيقية في هذه النسخة لأنها Frontend فقط. `localStorage` يمثل تخزين Demo داخل نفس المتصفح والجهاز. عند الانتقال إلى نسخة Production نحتاج:

- Backend API لتسجيل الدخول والمستخدمين والمهام.
- Database مثل PostgreSQL أوMySQL.
- تخزين ملفات مثل S3 أوFirebase Storage.
- تشفير كلمات المرور وعدم إرجاعها للFrontend.
- استبدال دوال `DataService` بطلبات Angular `HttpClient`.

Endpoints متوقعة مستقبلًا:

```text
POST   /api/auth/login
POST   /api/auth/change-password
GET    /api/trainees
POST   /api/trainees
PUT    /api/trainees/:id
DELETE /api/trainees/:id
GET    /api/tasks
POST   /api/tasks
PUT    /api/tasks/:id
POST   /api/tasks/:id/submission
```

## 10. Checklist التسليم

- شغّل `pnpm install`.
- شغّل `pnpm test` وتأكد أن 15/15 نجحوا.
- شغّل `pnpm build` وتأكد أنه بلا أخطاء.
- جرّب Admin Login وTrainee first login.
- جرّب Add Trainee والـvalidation والـDepartment.
- جرّب إسناد Task لمتدرب واحد وللجميع.
- جرّب Link وFile submission ورسائل الخطأ.
- جرّب Approve وRequest Changes وLogout والـroute guards.
- تذكّر أن البيانات والملفات الحقيقية تحتاج Backend قبل الإنتاج.
