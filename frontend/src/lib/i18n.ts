export type Language = 'en' | 'hi' | 'mr';

export interface Translations {
  nav: {
    howItWorks: string;
    features: string;
    sectors: string;
    about: string;
    signIn: string;
    getStarted: string;
    modeBadge: string;
  };
  hero: {
    titlePart1: string;
    titlePart2: string;
    highlightOrange: string;
    highlightAmber: string;
    subtitle: string;
    ctaPrimary: string;
    ctaDemo: string;
    trust1: string;
    trust2: string;
    trust3: string;
    quickAccess: string;
    verifiedPill: string;
    prototypeTag: string;
  };
  hiw: {
    eyebrow: string;
    title: string;
    subtitle: string;
    deptProcessing: string;
  };
  features: {
    title: string;
    subtitle: string;
  };
  sectors: {
    eyebrow: string;
    title: string;
    subtitle: string;
    heroConfigured: string;
    rulesReview: string;
  };
  cta: {
    badge: string;
    title: string;
    subtitle: string;
    btnEntrepreneur: string;
    btnOfficer: string;
    coverageHeader: string;
  };
}

export const translations: Record<Language, Translations> = {
  en: {
    nav: {
      howItWorks: 'How It Works',
      features: 'Features',
      sectors: 'Sectors',
      about: 'About',
      signIn: 'Sign In',
      getStarted: 'Get Started',
      modeBadge: 'Prototype Active',
    },
    hero: {
      titlePart1: 'One Platform.',
      titlePart2: 'Every Business Approval,',
      highlightOrange: 'Pre-validation',
      highlightAmber: 'Simplified.',
      subtitle:
        'Discover regulatory requirements, prepare applications, validate documents, and follow your approval journey through one connected workspace.',
      ctaPrimary: 'Start Your Journey',
      ctaDemo: 'View Demonstration',
      trust1: 'Engine Verified',
      trust2: 'Guided Roadmap',
      trust3: 'Pre-validation',
      quickAccess: 'Quick Access',
      verifiedPill: 'Demonstration Profile',
      prototypeTag: 'Maharashtra Approval Prototype',
    },
    hiw: {
      eyebrow: 'HOW IT WORKS',
      title: 'From Profile to Approval in 5 Steps',
      subtitle:
        'A clear, connected process for preparing an application and following it through departmental review.',
      deptProcessing: 'DEPARTMENT PROCESSING',
    },
    features: {
      title: 'Everything you need, in one connected system',
      subtitle:
        'From intelligence to approval — Veriqo connects every step for entrepreneurs and reviewers alike.',
    },
    sectors: {
      eyebrow: 'SECTOR COVERAGE',
      title: '4 Sectors • 12 Sub-sectors',
      subtitle:
        'The prototype supports business profiling across four Maharashtra sector groups. Detailed rule coverage is configured for the hero pathway.',
      heroConfigured: 'HERO PATHWAY CONFIGURED',
      rulesReview: 'RULES NEED REVIEW',
    },
    cta: {
      badge: 'MAHARASHTRA PROTOTYPE WORKFLOW',
      title: 'Prepare and follow your approval journey in one place.',
      subtitle:
        'Explore the demonstration to see how a business profile, roadmap, documents and departmental workflow stay connected.',
      btnEntrepreneur: 'Start as Entrepreneur',
      btnOfficer: 'Officer Demonstration Login',
      coverageHeader: 'Prototype Coverage',
    },
  },
  hi: {
    nav: {
      howItWorks: 'कार्यप्रणाली',
      features: 'विशेषताएं',
      sectors: 'क्षेत्र',
      about: 'परिचय',
      signIn: 'लॉग इन',
      getStarted: 'शुरू करें',
      modeBadge: 'प्रोटोटाइप सक्रिय',
    },
    hero: {
      titlePart1: 'एक मंच।',
      titlePart2: 'प्रत्येक व्यावसायिक स्वीकृति,',
      highlightOrange: 'सत्यापन',
      highlightAmber: 'सरलीकृत।',
      subtitle:
        'नियामक आवश्यकताओं की खोज करें, आवेदन तैयार करें, दस्तावेज़ों का पूर्व-सत्यापन करें और एक ही जुड़े हुए कार्यक्षेत्र से अपनी यात्रा ट्रैक करें।',
      ctaPrimary: 'अपनी यात्रा शुरू करें',
      ctaDemo: 'डेमो देखें',
      trust1: 'इंजन सत्यापित',
      trust2: 'मार्गदर्शित रोडमैप',
      trust3: 'पूर्व-सत्यापन',
      quickAccess: 'त्वरित पहुंच',
      verifiedPill: 'डेमो प्रोफ़ाइल',
      prototypeTag: 'महाराष्ट्र स्वीकृति प्रोटोटाइप',
    },
    hiw: {
      eyebrow: 'कार्यप्रणाली',
      title: 'प्रोफ़ाइल से स्वीकृति तक 5 चरण',
      subtitle:
        'आवेदन तैयार करने और विभागीय समीक्षा के माध्यम से आगे बढ़ने की एक स्पष्ट, जुड़ी हुई प्रक्रिया।',
      deptProcessing: 'विभागीय प्रक्रिया',
    },
    features: {
      title: 'आपकी आवश्यकता अनुसार सब कुछ, एक सिस्टम में',
      subtitle:
        'सूचना से स्वीकृति तक — वेरिको उद्यमियों और अधिकारियों के लिए हर चरण को जोड़ता है।',
    },
    sectors: {
      eyebrow: 'क्षेत्र कवरेज',
      title: '4 क्षेत्र • 12 उप-क्षेत्र',
      subtitle:
        'प्रोटोटाइप चार महाराष्ट्र क्षेत्र समूहों में व्यावसायिक प्रोफाइलिंग का समर्थन करता है। विस्तृत नियम हीरो पाथवे के लिए कॉन्फ़िगर किए गए हैं।',
      heroConfigured: 'हीरो पाथवे कॉन्फ़िगर किया गया',
      rulesReview: 'नियम समीक्षा आवश्यक',
    },
    cta: {
      badge: 'महाराष्ट्र प्रोटोटाइप वर्कफ़्लो',
      title: 'अपनी स्वीकृति यात्रा की तैयारी और ट्रैकिंग एक ही स्थान पर करें।',
      subtitle:
        'यह देखने के लिए डेमो देखें कि व्यावसायिक प्रोफ़ाइल, रोडमैप और दस्तावेज़ कैसे जुड़े रहते हैं।',
      btnEntrepreneur: 'उद्यमी के रूप में शुरू करें',
      btnOfficer: 'अधिकारी डेमो लॉगिन',
      coverageHeader: 'प्रोटोटाइप कवरेज',
    },
  },
  mr: {
    nav: {
      howItWorks: 'कार्यपद्धती',
      features: 'वैशिष्ट्ये',
      sectors: 'उद्योग क्षेत्रे',
      about: 'माहिती',
      signIn: 'साइन इन',
      getStarted: 'सुरू करा',
      modeBadge: 'प्रोटोटाइप सक्रिय',
    },
    hero: {
      titlePart1: 'एक व्यासपीठ.',
      titlePart2: 'प्रत्येक व्यावसायिक मंजुरी,',
      highlightOrange: 'पूर्व-पडताळणी',
      highlightAmber: 'सोपी व सुलभ.',
      subtitle:
        'नियामक आवश्यकता शोधा, अर्ज तयार करा, कागदपत्रांची पूर्व-पडताळणी करा आणि एकाच जोडलेल्या वर्कस्पेसवरून प्रगतीचा मागोवा घ्या.',
      ctaPrimary: 'प्रवास सुरू करा',
      ctaDemo: 'डेमो पहा',
      trust1: 'इंजिन सत्यापित',
      trust2: 'मार्गदर्शित रोडमॅप',
      trust3: 'पूर्व-पडताळणी',
      quickAccess: 'द्रुत प्रवेश',
      verifiedPill: 'डेमो प्रोफाइल',
      prototypeTag: 'महाराष्ट्र मंजुरी प्रोटोटाइप',
    },
    hiw: {
      eyebrow: 'कार्यपद्धती',
      title: 'प्रोफाइल ते मंजुरीपर्यंत ५ टप्पे',
      subtitle:
        'अर्ज तयार करण्यासाठी आणि विभागीय पुनरावलोकन पूर्ण करण्यासाठी स्पष्ट आणि जोडलेली प्रक्रिया.',
      deptProcessing: 'विभागीय प्रक्रिया',
    },
    features: {
      title: 'एका जोडलेल्या प्रणालीत सर्व काही उपलब्ध',
      subtitle:
        'माहितीपासून मंजुरीपर्यंत — वेरिको उद्योजक आणि अधिकाऱ्यांसाठी प्रत्येक टप्पा सुलभ करते.',
    },
    sectors: {
      eyebrow: 'क्षेत्र व्याप्ती',
      title: '४ क्षेत्रे • १२ उप-क्षेत्रे',
      subtitle:
        'प्रोटोटाइप चार महाराष्ट्र क्षेत्र समूहांमध्ये बिझनेस प्रोफाइलिंगला समर्थन देतो. सविस्तर नियम मुख्य पाथवेसाठी कॉन्फिगर केले आहेत.',
      heroConfigured: 'मुख्य पाथवे कॉन्फिगर केलेला',
      rulesReview: 'नियम पुनरावलोकन आवश्यक',
    },
    cta: {
      badge: 'महाराष्ट्र प्रोटोटाइप वर्कफ्लो',
      title: 'तुमच्या मंजुरी प्रवासाची तयारी आणि मागोवा एकाच ठिकाणी घ्या.',
      subtitle:
        'व्यवसाय प्रोफाइल, रोडमॅप आणि कागदपत्रे कशी जोडलेली राहतात हे पाहण्यासाठी प्रात्यक्षिक तपासा.',
      btnEntrepreneur: 'उद्योजक म्हणून सुरू करा',
      btnOfficer: 'अधिकारी डेमो लॉगिन',
      coverageHeader: 'प्रोटोटाइप व्याप्ती',
    },
  },
};

