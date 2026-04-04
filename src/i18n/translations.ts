export type Language = 'en' | 'he' | 'ar';
export type Direction = 'ltr' | 'rtl';

export const directions: Record<Language, Direction> = {
  en: 'ltr',
  he: 'rtl',
  ar: 'rtl',
};

export const langLabels: Record<Language, string> = {
  en: 'EN',
  he: 'עב',
  ar: 'عر',
};

export const translations = {
  en: {
    nav: {
      home: 'Home',
      projects: 'Projects',
      process: 'Our Process',
      contact: 'Contact',
    },
    hero: {
      badge: 'Digital Development Agency',
      title: 'We Build Digital',
      titleHighlight: 'Experiences',
      subtitle: 'Websites, Mobile Apps & Business Solutions for Forward-Thinking Entrepreneurs',
      cta: 'View Our Work',
    },
    projects: {
      title: 'Our Work',
      subtitle: 'Crafted with passion, built for success',
      uploadBtn: '+ Upload Project',
      uploadHint: 'Add images or videos via Cloudinary',
    },
    services: {
      tagline: 'Your vision, our code — ready to build something extraordinary together?',
      cta: 'Start Your Project',
    },
    clients: {
      title: 'Trusted by Leading Businesses',
    },
    flow: {
      title: 'How Sky Dev Delivers Your Solution',
      steps: [
        { icon: '🔍', title: 'Discovery', desc: 'We listen and deeply understand your business needs & goals' },
        { icon: '📋', title: 'Planning', desc: 'Strategy, wireframes & technical architecture' },
        { icon: '🎨', title: 'Design', desc: 'Modern UI/UX tailored to your brand identity' },
        { icon: '💻', title: 'Development', desc: 'Clean, scalable code built to perform & last' },
        { icon: '✅', title: 'Testing', desc: 'Rigorous QA across all devices & browsers' },
        { icon: '🚀', title: 'Launch', desc: 'Deployment, delivery & ongoing support' },
      ],
    },
    contact: {
      title: "Let's Talk",
      subtitle: "Send us a message and we'll get back to you within 24 hours",
      name: 'Full Name',
      namePlaceholder: 'John Smith',
      phone: 'Phone Number',
      phonePlaceholder: '0509005941',
      message: 'Message',
      messagePlaceholder: 'Tell us about your project... (Optional)',
      submit: 'Send Message',
      sending: 'Sending...',
      success: "Message sent successfully! We'll be in touch soon.",
      errors: {
        name: 'Please enter a valid name (at least 2 characters)',
        phone: 'Please enter a valid phone number (e.g. 0509005941)',
        sending: 'Failed to send. Please try again or email us directly.',
      },
    },
    footer: {
      rights: '© 2025 Sky Dev. All Rights Reserved.',
      followUs: 'Follow us on Instagram',
    },
  },
  he: {
    nav: {
      home: 'בית',
      projects: 'פרויקטים',
      process: 'תהליך העבודה',
      contact: 'צור קשר',
    },
    hero: {
      badge: 'חברת פיתוח דיגיטלי',
      title: 'אנחנו בונים',
      titleHighlight: 'חוויות דיגיטליות',
      subtitle: 'אתרי אינטרנט, אפליקציות ופתרונות עסקיים לבעלי עסקים שחושבים קדימה',
      cta: 'לפרויקטים שלנו',
    },
    projects: {
      title: 'הפרויקטים שלנו',
      subtitle: 'נבנה עם תשוקה, נועד להצליח',
      uploadBtn: '+ העלה פרויקט',
      uploadHint: 'הוסף תמונות או סרטונים דרך Cloudinary',
    },
    services: {
      tagline: 'החזון שלך, הקוד שלנו — מוכנים לבנות משהו יוצא דופן ביחד?',
      cta: 'התחל את הפרויקט שלך',
    },
    clients: {
      title: 'עסקים מובילים שסומכים עלינו',
    },
    flow: {
      title: 'כיצד Sky Dev מספקת את שירותיה',
      steps: [
        { icon: '🔍', title: 'הבנת הדרישות', desc: 'אנחנו מקשיבים ומבינים לעומק את הצרכים והמטרות העסקיות שלך' },
        { icon: '📋', title: 'תכנון', desc: 'אסטרטגיה, תרשימי מבנה ואדריכלות טכנית' },
        { icon: '🎨', title: 'עיצוב', desc: 'ממשק משתמש מודרני המותאם לזהות המותג שלך' },
        { icon: '💻', title: 'פיתוח', desc: 'קוד נקי, סקלבילי ומבוסס ביצועים' },
        { icon: '✅', title: 'בדיקות', desc: 'בקרת איכות מקיפה על כל המכשירים והדפדפנים' },
        { icon: '🚀', title: 'השקה ומסירה', desc: 'העלאה לאוויר, מסירה ותמיכה שוטפת' },
      ],
    },
    contact: {
      title: 'צור קשר',
      subtitle: 'שלח לנו הודעה ונחזור אליך תוך 24 שעות',
      name: 'שם מלא',
      namePlaceholder: 'ישראל ישראלי',
      phone: 'מספר טלפון',
      phonePlaceholder: '0509005941',
      message: 'הערות',
      messagePlaceholder: 'ספר לנו על הפרויקט שלך... (אופציונאלי)',
      submit: 'שלח הודעה',
      sending: 'שולח...',
      success: 'ההודעה נשלחה בהצלחה! ניצור איתך קשר בקרוב.',
      errors: {
        name: 'אנא הכנס שם חוקי (לפחות 2 תווים)',
        phone: 'אנא הכנס מספר טלפון חוקי (לדוגמה: 0509005941)',
        sending: 'שליחה נכשלה. אנא נסה שוב או צור קשר ישירות במייל.',
      },
    },
    footer: {
      rights: '© 2025 Sky Dev. כל הזכויות שמורות.',
      followUs: 'עקוב אחרינו באינסטגרם',
    },
  },
  ar: {
    nav: {
      home: 'الرئيسية',
      projects: 'المشاريع',
      process: 'طريقة عملنا',
      contact: 'تواصل معنا',
    },
    hero: {
      badge: 'شركة تطوير رقمي',
      title: 'نبني',
      titleHighlight: 'تجارب رقمية',
      subtitle: 'مواقع إلكترونية، تطبيقات موبايل وحلول أعمال لأصحاب الأعمال الطموحين',
      cta: 'مشاريعنا',
    },
    projects: {
      title: 'أعمالنا',
      subtitle: 'مصنوع بشغف، مبني للنجاح',
      uploadBtn: '+ رفع مشروع',
      uploadHint: 'أضف صور أو فيديو عبر Cloudinary',
    },
    services: {
      tagline: 'رؤيتك، كودنا — هل أنت مستعد لبناء شيء استثنائي معاً؟',
      cta: 'ابدأ مشروعك',
    },
    clients: {
      title: 'يثق بنا عملاء رواد',
    },
    flow: {
      title: 'كيف تقدم Sky Dev خدماتها',
      steps: [
        { icon: '🔍', title: 'فهم المتطلبات', desc: 'نستمع ونفهم بعمق احتياجاتك وأهدافك التجارية' },
        { icon: '📋', title: 'التخطيط', desc: 'استراتيجية، نماذج أولية وهيكل تقني' },
        { icon: '🎨', title: 'التصميم', desc: 'واجهة مستخدم عصرية مصممة لهوية علامتك التجارية' },
        { icon: '💻', title: 'التطوير', desc: 'كود نظيف وقابل للتوسع ومبني للأداء' },
        { icon: '✅', title: 'الاختبار', desc: 'ضمان الجودة على جميع الأجهزة والمتصفحات' },
        { icon: '🚀', title: 'الإطلاق', desc: 'النشر والتسليم والدعم المستمر' },
      ],
    },
    contact: {
      title: 'تواصل معنا',
      subtitle: 'أرسل لنا رسالة وسنرد عليك خلال 24 ساعة',
      name: 'الاسم الكامل',
      namePlaceholder: 'محمد أحمد',
      phone: 'رقم الهاتف',
      phonePlaceholder: '0509005941',
      message: 'ملاحظات',
      messagePlaceholder: 'أخبرنا عن مشروعك... (اختياري)',
      submit: 'إرسال الرسالة',
      sending: 'جارٍ الإرسال...',
      success: 'تم إرسال رسالتك بنجاح! سنتواصل معك قريباً.',
      errors: {
        name: 'يرجى إدخال اسم صحيح (حرفين على الأقل)',
        phone: 'يرجى إدخال رقم هاتف صحيح (مثال: 0509005941)',
        sending: 'فشل الإرسال. يرجى المحاولة مرة أخرى أو التواصل عبر البريد الإلكتروني.',
      },
    },
    footer: {
      rights: '© 2025 Sky Dev. جميع الحقوق محفوظة.',
      followUs: 'تابعنا على إنستغرام',
    },
  },
};

export type Translations = typeof translations.en;
