const fs = require('fs');
const path = require('path');

const enDir = path.join(__dirname, '..', 'src', 'content', 'posts', 'en');

const batch5 = [
  // 1. Porcha Khatian Online Verification
  {
    file: 'porcha-khatian-online-verification-guide-bangladesh.json',
    data: {
      slug: 'porcha-khatian-online-verification-guide-bangladesh',
      category: 'Property Law',
      title: 'Online Khatian & Porcha Verification in Bangladesh 2026: CS, SA, RS, BS Record Checking & Mutation Tracking',
      metaTitle: 'Online Khatian & Porcha Check Bangladesh 2026 | E-Porcha & Mutation',
      metaDescription: 'Step-by-step guide to verify CS, SA, RS, BS, and City Survey khatians online in Bangladesh. Track e-mutation status and detect forged land records.',
      keywords: ['namjari online check', 'online mutation check bd', 'namjari tracking', 'e porcha khatian verification bangladesh', 'land record check bd'],
      publishedDate: '2026-08-25',
      lastModified: '2026-08-26',
      readTime: '12 minutes',
      heroIntro: 'Verifying historical and current records of rights (Khatian/Porcha) across <strong>CS, SA, RS, and BS surveys</strong> on the government land portal (eporcha.gov.bd and mutation.land.gov.bd) is essential before any land transaction. Authored by <a href="/advocate-md-shah-alam" style="color:var(--gold);font-weight:bold;text-decoration:underline;">Advocate Md. Shah Alam</a>, Supreme Court Advocate. For legal title vetting, call <a href="tel:01712655546" style="color:var(--gold);font-weight:bold;">01712655546</a>.',
      quickAnswer: {
        heading: '⚡ Fast Summary: Online Land Record Search',
        points: [
          'Portal: Access eporcha.gov.bd for certified survey records and mutation.land.gov.bd for e-namjari tracking.',
          'Certified Copy Fee: BDT 100 per certified digital khatian copy delivered to your address.',
          'Tracking: Use your mobile number and application ID to monitor mutation progress across Assistant Commissioner (Land) desks.'
        ]
      },
      toc: ['1. Evolution of Survey Khatians (CS to BS)', '2. How to Search and Download Digital Porchas', '3. E-Namjari Tracking Step-by-Step', '4. Detecting Forged or Duplicate Khatians', '5. Rectifying Record Errors via Miss Case'],
      sections: [
        { heading: '1. Evolution of Survey Khatians (CS to BS)', content: '<p>Understanding the chronological sequence from CS (Cadastral Survey 1888-1940), SA (State Acquisition 1956-1963), RS (Revisional Survey), to modern BS/City Survey is mandatory to establish an unbroken 30-year chain of title.</p>' },
        { heading: '2. How to Search and Download Digital Porchas', content: '<p>Select Division, District, Upazila, and Mouza on eporcha.gov.bd, enter the Khatian or Dag number, and apply for digitally signed certified copies.</p>' },
        { heading: '3. E-Namjari Tracking Step-by-Step', content: '<p>Track hearing dates, Union Land Assistant Officer (ULAO) field inquiry reports, and DCR payment generation on the mutation.land.gov.bd tracking portal.</p>' },
        { heading: '4. Detecting Forged or Duplicate Khatians', content: '<p>Compare the recorded quantum of land with Volume 1 registers and verify QR code authenticity on modern computerized khatians.</p>' },
        { heading: '5. Rectifying Record Errors via Miss Case', content: '<p>For clerical and boundary errors, file a Record Correction Miss Case before the AC Land under Section 143/144 of the State Acquisition and Tenancy Act 1950. Contact <strong>Advocate Md. Shah Alam</strong> at <strong>01712655546</strong>.</p>' }
      ],
      faq: [{ question: 'How long does e-mutation take in Bangladesh?', answer: 'Statutory timeline is 28 working days from the date of online submission.' }]
    }
  },

  // 2. Mother's Property Distribution Muslim Law
  {
    file: 'mothers-property-distribution-muslim-law-bangladesh.json',
    data: {
      slug: 'mothers-property-distribution-muslim-law-bangladesh',
      category: 'Family Law',
      title: 'Mother Property Distribution under Muslim Law in Bangladesh 2026: Faraiz Rules for Sons & Daughters',
      metaTitle: 'Mother Property Distribution Bangladesh 2026 | Muslim Faraiz Shares',
      metaDescription: 'Complete Islamic Faraiz guide on distributing a deceased mother property among husband, sons, and daughters under Bangladesh law and judicial precedents.',
      keywords: ['mayer sampatti banton ain', 'mother property shares muslim law', 'faraiz mother property sons daughters', 'inheritance lawyer dhaka'],
      publishedDate: '2026-08-25',
      lastModified: '2026-08-26',
      readTime: '11 minutes',
      heroIntro: 'Under Islamic succession law in Bangladesh, a mother self-acquired or inherited property is subject to strict Quranic division upon her demise. Authored by <a href="/advocate-md-shah-alam" style="color:var(--gold);font-weight:bold;text-decoration:underline;">Advocate Md. Shah Alam</a>, Supreme Court Advocate. Call our Uttara chamber at <a href="tel:01712655546" style="color:var(--gold);font-weight:bold;">01712655546</a>.',
      quickAnswer: {
        heading: '⚡ Mother Inheritance Fast Rules',
        points: [
          'Surviving Husband Share: 1/4th (one-fourth) of the mother estate if children exist; 1/2 if no children exist.',
          'Sons and Daughters: The remaining 3/4th is shared as residuaries in a 2:1 ratio (sons take twice the daughter share).',
          'Maternal Grandparents: Entitled to 1/6th each if alive at the time of the mother death.'
        ]
      },
      toc: ['1. Quranic Shares in Maternal Estate', '2. Numerical Division Example', '3. Maternal vs Paternal Property Rights', '4. Registering Warishan Sanad and Amicable Partition'],
      sections: [
        { heading: '1. Quranic Shares in Maternal Estate', content: '<p>All debts, funeral expenses, and valid wills are settled before distributing the residual estate to Quranic sharers and residuaries.</p>' },
        { heading: '2. Numerical Division Example', content: '<p>For an estate with husband, 1 son, and 1 daughter: Husband receives 1/4 (25%), son receives 2/4 (50%), and daughter receives 1/4 (25%).</p>' },
        { heading: '3. Maternal vs Paternal Property Rights', content: '<p>Sons and daughters have identical inheritance standing regarding both mother and father estates under Islamic jurisprudence.</p>' },
        { heading: '4. Registering Warishan Sanad and Amicable Partition', content: '<p>Obtain an official Succession Certificate from the City Corporation / Union Parishad and execute a registered partition deed. Consult <strong>Advocate Md. Shah Alam</strong> at <strong>01712655546</strong>.</p>' }
      ],
      faq: [{ question: 'Does a stepson inherit from his stepmother?', answer: 'No. Under Islamic law, inheritance requires biological blood relationship or valid marriage.' }]
    }
  },

  // 3. Cyber Crime Helpline Online Complaint
  {
    file: 'cyber-crime-helpline-online-complaint-bangladesh.json',
    data: {
      slug: 'cyber-crime-helpline-online-complaint-bangladesh',
      category: 'Criminal Law',
      title: 'Cyber Crime Helpline & Online Police Complaint in Bangladesh 2026: CID, DB Cyber & Facebook Harassment',
      metaTitle: 'Cyber Crime Helpline Bangladesh 2026 | Police Online Complaint',
      metaDescription: 'How to report cyber blackmail, fake Facebook accounts, and online financial fraud in Bangladesh. Emergency hotline numbers 01320000888 and 999 police procedure.',
      keywords: ['cyber crime complaint online bangladesh', 'cyber crime helpline number bangladesh', 'police cyber help desk bd', 'facebook hack complaint bangladesh'],
      publishedDate: '2026-08-25',
      lastModified: '2026-08-26',
      readTime: '10 minutes',
      heroIntro: 'Victims of online blackmail, fake social media profiles, non-consensual image sharing, and cyber extortion can seek swift redress through the <strong>Police Cyber Support for Women (PCSW), CID Cyber Police Centre (CPC), and DB Cyber Crime Division</strong>. Authored by <a href="/advocate-md-shah-alam" style="color:var(--gold);font-weight:bold;text-decoration:underline;">Advocate Md. Shah Alam</a>, Supreme Court Advocate. Call our Uttara chamber at <a href="tel:01712655546" style="color:var(--gold);font-weight:bold;">01712655546</a>.',
      quickAnswer: {
        heading: '⚡ Emergency Cyber Helplines (24/7)',
        points: [
          'Police Cyber Support for Women: 01320000888 (Call/WhatsApp).',
          'CID Cyber Police Centre Helpline: 01710368956 / 01710368957.',
          'National Emergency Service: 999.',
          'Digital Evidence: Preserve unedited screenshots, profile URLs, message headers, and transaction IDs.'
        ]
      },
      toc: ['1. Official Cyber Crime Reporting Wings', '2. Step-by-Step Police Station GD & Cyber Complaint', '3. Legal Framework under Cyber Security Act 2023', '4. Takedown of Defamatory Content on Facebook & Meta', '5. Supreme Court Bail & Cyber Litigation'],
      sections: [
        { heading: '1. Official Cyber Crime Reporting Wings', content: '<p>Specialized units include Police Cyber Support for Women, CID Cyber Police Centre (CPC), and Dhaka Metropolitan Police (DMP) Counter Terrorism and Transnational Crime (CTTC) Cyber Division.</p>' },
        { heading: '2. Step-by-Step Police Station GD & Cyber Complaint', content: '<p>Lodge a General Diary (GD) at your local police station accompanied by printed screenshot exhibits and URL identifiers for forensic preservation.</p>' },
        { heading: '3. Legal Framework under Cyber Security Act 2023', content: '<p>Stringent penal consequences apply for identity theft, unauthorized data access, cyber terrorism, and online extortion.</p>' },
        { heading: '4. Takedown of Defamatory Content on Facebook & Meta', content: '<p>Legal representation through counsel ensures formal BTRC and law enforcement subpoenas to Meta for content takedown and IP logging.</p>' },
        { heading: '5. Supreme Court Bail & Cyber Litigation', content: '<p>For robust defense against fabricated cyber charges or prosecuting cyber criminals, contact <strong>Advocate Md. Shah Alam</strong> at <strong>01712655546</strong>.</p>' }
      ],
      faq: [{ question: 'Can cyber harassment complaints be filed anonymously?', answer: 'Initial tips can be submitted anonymously, but formal FIR prosecution requires verified complainant identity.' }]
    }
  },

  // 4. Writ Petition High Court Bangladesh
  {
    file: 'writ-petition-high-court-bangladesh-grounds-procedure.json',
    data: {
      slug: 'writ-petition-high-court-bangladesh-grounds-procedure',
      category: 'Constitutional Law',
      title: 'Writ Petition in High Court Division Bangladesh 2026: Types, Grounds, Cost & Article 102 Procedure',
      metaTitle: 'Writ Petition High Court Bangladesh 2026 | Article 102 Procedure & Cost',
      metaDescription: 'Complete legal guide on filing a Writ Petition in the High Court of Bangladesh under Article 102. Mandamus, Certiorari, Habeas Corpus, Quo-Warranto, and Prohibition explained.',
      keywords: ['writ petition high court bangladesh', 'article 102 writ petition bd', 'writ petition cost bangladesh', 'habeas corpus mandamus certiorari bd', 'supreme court writ lawyer'],
      publishedDate: '2026-08-25',
      lastModified: '2026-08-26',
      readTime: '13 minutes',
      heroIntro: 'Under <strong>Article 102 of the Constitution of Bangladesh</strong>, any aggrieved citizen can invoke the extraordinary constitutional writ jurisdiction of the High Court Division to enforce fundamental rights and compel public authorities to perform statutory duties. Authored by <a href="/advocate-md-shah-alam" style="color:var(--gold);font-weight:bold;text-decoration:underline;">Advocate Md. Shah Alam</a>, Supreme Court Advocate. Call our Uttara chamber at <a href="tel:01712655546" style="color:var(--gold);font-weight:bold;">01712655546</a>.',
      quickAnswer: {
        heading: '⚡ 5 Types of Constitutional Writs in Bangladesh',
        points: [
          'Writ of Mandamus: Compelling public officials to perform mandatory statutory duties.',
          'Writ of Certiorari: Quashing illegal, ultra-vires, or unconstitutional orders passed by statutory tribunals.',
          'Writ of Habeas Corpus: Securing the immediate release of persons unlawfully detained in custody.',
          'Writ of Prohibition: Restraining an inferior tribunal from exceeding its statutory jurisdiction.',
          'Writ of Quo-Warranto: Challenging the lawful title of a person holding a public office.'
        ]
      },
      toc: ['1. Constitutional Foundation: Article 102 of Bangladesh Constitution', '2. Classification of Writs and Applicable Scenarios', '3. Essential Pre-requisite: Demand for Justice Notice', '4. Step-by-Step High Court Writ Procedure & Filing Costs', '5. Public Interest Litigation (PIL) and Fundamental Rights'],
      sections: [
        { heading: '1. Constitutional Foundation: Article 102 of Bangladesh Constitution', content: '<p>The High Court Division exercises supervisory constitutional powers where no other equally efficacious alternative legal remedy is provided by law.</p>' },
        { heading: '2. Classification of Writs and Applicable Scenarios', content: '<p>Common scenarios include challenging illegal land acquisition, discriminatory government job termination, wrongful tender cancellations, and unlawful police detention.</p>' },
        { heading: '3. Essential Pre-requisite: Demand for Justice Notice', content: '<p>Except in Habeas Corpus petitions, serving a formal Demand for Justice notice to the respondent authorities is a customary prerequisite before filing.</p>' },
        { heading: '4. Step-by-Step High Court Writ Procedure & Filing Costs', content: '<p>Petition drafting on Supreme Court ledger paper, motion hearing before the designated Writ Bench, issuance of Rule Nisi and Stay Orders, typically ranging from BDT 30,000 to BDT 80,000 depending on complexity.</p>' },
        { heading: '5. Public Interest Litigation (PIL) and Fundamental Rights', content: '<p>For filing constitutional writs and securing High Court stay orders, contact Supreme Court Advocate <strong>Md. Shah Alam</strong> at <strong>01712655546</strong>.</p>' }
      ],
      faq: [{ question: 'How long does a Writ Rule Nisi hearing take?', answer: 'An ad-interim stay or injunction is obtained on the first motion day, while final hearing of the Rule Nisi occurs within 6 to 18 months.' }]
    }
  },

  // 5. Partition Suit Land Division Cost Bangladesh
  {
    file: 'partition-suit-land-division-cost-bangladesh.json',
    data: {
      slug: 'partition-suit-land-division-cost-bangladesh',
      category: 'Property Law',
      title: 'Partition Suit in Bangladesh 2026: Procedure, Court Fees, Duration & Saham Division under Partition Act 1893',
      metaTitle: 'Partition Suit Bangladesh 2026 | Procedure, Court Fees & Saham',
      metaDescription: 'Complete legal guide on filing a Partition Suit (Batwara Mamla) in Bangladesh. Preliminary decree, commissioner survey, final decree, and fixed court fees explained.',
      keywords: ['partition suit bangladesh cost', 'batwara mamla procedure bd', 'partition act 1893 bangladesh', 'land division lawyer dhaka'],
      publishedDate: '2026-08-25',
      lastModified: '2026-08-26',
      readTime: '12 minutes',
      heroIntro: 'When co-sharers refuse to amicably divide ancestral or joint property, any co-owner can institute a <strong>Partition Suit (Batwara Mokoddama) under the Partition Act 1893 and Civil Procedure Code</strong> to carve out their distinct Saham (share) through court intervention. Authored by <a href="/advocate-md-shah-alam" style="color:var(--gold);font-weight:bold;text-decoration:underline;">Advocate Md. Shah Alam</a>, Supreme Court Advocate. Call our Uttara chamber at <a href="tel:01712655546" style="color:var(--gold);font-weight:bold;">01712655546</a>.',
      quickAnswer: {
        heading: '⚡ Partition Suit Essentials in Bangladesh',
        points: [
          'Court Fees: Nominal fixed court fee of BDT 300 for joint possession partition suits under Court Fees Act 1870.',
          'Two-Tier Decree: Preliminary Decree (determining mathematical shares) followed by Final Decree (physical demarcated Saham).',
          'Advocate Commissioner: Court appoints an independent surveyor commissioner to physically measure and erect boundary pillars.'
        ]
      },
      toc: ['1. Legal Basis of Partition Suits in Bangladesh', '2. Preliminary Decree vs Final Decree', '3. Appointment of Advocate Commissioner & Field Survey', '4. Court Fee Calculation & Statutory Limitation', '5. Amicable Registered Partition Deed Alternative'],
      sections: [
        { heading: '1. Legal Basis of Partition Suits in Bangladesh', content: '<p>Every co-sharer possessing joint unpartitioned title is entitled as of right to seek physical separation of their legal share.</p>' },
        { heading: '2. Preliminary Decree vs Final Decree', content: '<p>The court first adjudicates the exact fractional ownership of each party in a preliminary decree before proceeding to physical partition.</p>' },
        { heading: '3. Appointment of Advocate Commissioner & Field Survey', content: '<p>An Advocate Commissioner visits the suit land, prepares a detailed sketch map (Chitha), and submits a Saham report allocating specific portions to each heir.</p>' },
        { heading: '4. Court Fee Calculation & Statutory Limitation', content: '<p>If in joint possession, fixed court fee applies. If completely dispossessed, ad-valorem court fees and recovery prayers must be included.</p>' },
        { heading: '5. Amicable Registered Partition Deed Alternative', content: '<p>For expediting partition suits or executing registered amicable settlement deeds, contact <strong>Advocate Md. Shah Alam</strong> at <strong>01712655546</strong>.</p>' }
      ],
      faq: [{ question: 'How long does a partition suit take in Bangladesh?', answer: 'Typically 1.5 to 3 years from institution to final decree execution.' }]
    }
  },

  // 6. Bkash Nagad Online Fraud Police Complaint
  {
    file: 'bkash-nagad-online-fraud-police-complaint-bangladesh.json',
    data: {
      slug: 'bkash-nagad-online-fraud-police-complaint-bangladesh',
      category: 'Criminal Law',
      title: 'Bkash & Nagad Fraud Police Complaint Bangladesh 2026: Money Recovery, GD & Cyber Law Remedy',
      metaTitle: 'Bkash & Nagad Fraud Complaint Bangladesh 2026 | Money Recovery & GD',
      metaDescription: 'How to recover money scammed through bKash, Nagad, or Upay in Bangladesh. Step-by-step guide to freezing fraudulent MFS wallets, filing police GD, and legal remedies.',
      keywords: ['bkash fraud complaint bangladesh', 'nagad online fraud money recovery', 'mobile banking cyber crime complaint', 'cyber fraud lawyer dhaka'],
      publishedDate: '2026-08-25',
      lastModified: '2026-08-26',
      readTime: '11 minutes',
      heroIntro: 'With the proliferation of Mobile Financial Services (MFS), fraudulent OTP scams, phishing links, and fake lottery tricks on bKash, Nagad, and Rocket accounts require prompt multi-pronged legal action. Authored by <a href="/advocate-md-shah-alam" style="color:var(--gold);font-weight:bold;text-decoration:underline;">Advocate Md. Shah Alam</a>, Supreme Court Advocate. Call our Uttara chamber at <a href="tel:01712655546" style="color:var(--gold);font-weight:bold;">01712655546</a>.',
      quickAnswer: {
        heading: '⚡ Immediate 3 Steps after MFS Fraud',
        points: [
          'Call Helpline Instantly: Dial 16247 (bKash) or 16167 (Nagad) to place an immediate temporary freeze on the receiver wallet.',
          'Lodge Police GD: File a General Diary at the nearest police station containing Transaction IDs (TrxID) and conversation logs.',
          'Cyber Unit Submission: Submit the GD to CID Cyber Crime unit for official fund reversal under court authorization.'
        ]
      },
      toc: ['1. Common MFS Modus Operandi (OTP & Phishing Scams)', '2. Emergency Steps to Freeze Fraudulent Wallets', '3. Police Station GD Drafting Sample', '4. Judicial Order for Fund Reversal', '5. Criminal Prosecution under Cyber Security Act'],
      sections: [
        { heading: '1. Common MFS Modus Operandi (OTP & Phishing Scams)', content: '<p>Fraudsters pose as customer care agents requesting OTPs, PINs, or simulate false "Cash-In" SMS alerts to extort money.</p>' },
        { heading: '2. Emergency Steps to Freeze Fraudulent Wallets', content: '<p>MFS operators require immediate telephonic logging followed by an official police GD within 24 hours to maintain wallet suspension.</p>' },
        { heading: '3. Police Station GD Drafting Sample', content: '<p>The GD must clearly recite the sender number, receiver number, exact TrxID, timestamps, and nature of misrepresentation.</p>' },
        { heading: '4. Judicial Order for Fund Reversal', content: '<p>Under Section 517 CrPC, an order from the Judicial Magistrate directs the MFS provider to refund frozen proceeds to the rightful owner.</p>' },
        { heading: '5. Criminal Prosecution under Cyber Security Act', content: '<p>For legal drafting and recovering frozen commercial funds, consult Supreme Court Advocate <strong>Md. Shah Alam</strong> at <strong>01712655546</strong>.</p>' }
      ],
      faq: [{ question: 'Can MFS refund money without a police GD?', answer: 'No. MFS operators are legally barred from debiting third-party accounts without law enforcement GDs or court directives.' }]
    }
  },

  // 7. Cyber Harassment Facebook GD Procedure
  {
    file: 'cyber-harassment-facebook-gd-procedure-bangladesh.json',
    data: {
      slug: 'cyber-harassment-facebook-gd-procedure-bangladesh',
      category: 'Criminal Law',
      title: 'Facebook Fake ID, Blackmail & Cyber Harassment Complaint Bangladesh 2026: Police GD & Legal Action',
      metaTitle: 'Facebook Harassment & Fake ID Complaint Bangladesh 2026 | Police GD',
      metaDescription: 'How to file a police complaint against fake Facebook profiles, photo morphing, and online blackmail in Bangladesh under the Cyber Security Act 2023.',
      keywords: ['facebook fake id complaint bangladesh', 'cyber blackmail facebook police report', 'facebook cyber crime gd format', 'cyber lawyer dhaka'],
      publishedDate: '2026-08-25',
      lastModified: '2026-08-26',
      readTime: '11 minutes',
      heroIntro: 'Impersonation, photo tampering, and malicious defamation on social media platforms like Facebook, Instagram, and TikTok constitute severe criminal offences under the <strong>Cyber Security Act 2023 and Penal Code 1860</strong>. Authored by <a href="/advocate-md-shah-alam" style="color:var(--gold);font-weight:bold;text-decoration:underline;">Advocate Md. Shah Alam</a>, Supreme Court Advocate. Call our Uttara chamber at <a href="tel:01712655546" style="color:var(--gold);font-weight:bold;">01712655546</a>.',
      quickAnswer: {
        heading: '⚡ Golden Rules for Cyber Evidence Preservation',
        points: [
          'Do NOT Delete Chats: Preserve raw chat transcripts, voice notes, and threat timestamps without editing.',
          'Extract Numeric Profile ID: Copy the permanent profile link or numeric account ID rather than just user vanity names.',
          'File Police GD within 24 Hours: Lodge an official General Diary at your local police station.'
        ]
      },
      toc: ['1. Offence Categories under Cyber Security Act 2023', '2. Essential Digital Evidence Required', '3. How to Draft a Strong Police GD', '4. Content Takedown & Subpoena to Meta', '5. Criminal Prosecution & Legal Representation'],
      sections: [
        { heading: '1. Offence Categories under Cyber Security Act 2023', content: '<p>Covers identity fraud, defamation, non-consensual sharing of intimate media, and digital extortion.</p>' },
        { heading: '2. Essential Digital Evidence Required', content: '<p>High-resolution screenshots, profile URLs, screen recordings, and server timestamps are admissible under Section 65B of the Evidence Act.</p>' },
        { heading: '3. How to Draft a Strong Police GD', content: '<p>Recite exact facts chronologically and request forwarding to CID Cyber Crime Lab for technical tracing of IP addresses and device IMEI numbers.</p>' },
        { heading: '4. Content Takedown & Subpoena to Meta', content: '<p>Law enforcement issues formal Mutual Legal Assistance / government requests to Meta for expeditious account termination.</p>' },
        { heading: '5. Criminal Prosecution & Legal Representation', content: '<p>For cyber defamation and extortion litigation, contact Supreme Court Advocate <strong>Md. Shah Alam</strong> at <strong>01712655546</strong>.</p>' }
      ],
      faq: [{ question: 'What is the punishment for fake ID blackmail in Bangladesh?', answer: 'Imprisonment up to 5 years and substantial fines under the Cyber Security Act.' }]
    }
  },

  // 8. Labour Law Gratuity & PF Claims
  {
    file: 'labour-law-bangladesh-gratuity-provident-fund-claims.json',
    data: {
      slug: 'labour-law-bangladesh-gratuity-provident-fund-claims',
      category: 'Corporate Law',
      title: 'Wrongful Job Termination, Gratuity & Provident Fund Claims in Bangladesh 2026: Labour Court Legal Guide',
      metaTitle: 'Labour Law Bangladesh 2026 | Gratuity, PF & Wrongful Termination Claims',
      metaDescription: 'Legal rights of employees in Bangladesh under Bangladesh Labour Act 2006. Notice pay, gratuity calculation (30/45 days wages), PF recovery, and Labour Court lawsuits.',
      keywords: ['labour law bangladesh gratuity', 'wrongful termination compensation bd', 'provident fund claim labour court', 'labour lawyer dhaka'],
      publishedDate: '2026-08-25',
      lastModified: '2026-08-26',
      readTime: '12 minutes',
      heroIntro: 'Under the <strong>Bangladesh Labour Act 2006 (BLA) and Labour Rules 2015</strong>, employees terminated without statutory cause are legally entitled to notice pay, severance compensation, accumulated gratuity, and contributory provident funds. Authored by <a href="/advocate-md-shah-alam" style="color:var(--gold);font-weight:bold;text-decoration:underline;">Advocate Md. Shah Alam</a>, Supreme Court Advocate. Call our Uttara chamber at <a href="tel:01712655546" style="color:var(--gold);font-weight:bold;">01712655546</a>.',
      quickAnswer: {
        heading: '⚡ Statutory Employee Benefits under BLA 2006',
        points: [
          'Gratuity Calculation: 30 days basic wages per completed year of service (for 5-10 years) and 45 days basic wages (above 10 years).',
          'Notice Period Pay: 120 days written notice or pay in lieu of notice for permanent workers terminated under Section 26.',
          'Grievance Timeline: Mandatory written grievance to employer within 33 days before filing a Labour Court lawsuit under Section 33.'
        ]
      },
      toc: ['1. Grounds of Separation: Termination, Retrenchment & Dismissal', '2. Statutory Gratuity Formula', '3. Contributory Provident Fund (CPF) Release', '4. Mandatory 33-Day Grievance Procedure', '5. Instituting Cases before the Labour Court'],
      sections: [
        { heading: '1. Grounds of Separation: Termination, Retrenchment & Dismissal', content: '<p>BLA distinguishes simple termination without cause from disciplinary dismissal for misconduct, requiring strict domestic inquiries.</p>' },
        { heading: '2. Statutory Gratuity Formula', content: '<p>Gratuity is payable on the last drawn basic salary rate for every completed year of service exceeding 6 months.</p>' },
        { heading: '3. Contributory Provident Fund (CPF) Release', content: '<p>Both employee contribution and employer matching contribution plus accrued interest must be cleared within 30 working days.</p>' },
        { heading: '4. Mandatory 33-Day Grievance Procedure', content: '<p>Under Section 33 BLA, the worker must submit a formal written grievance within 33 days of the adverse employment action.</p>' },
        { heading: '5. Instituting Cases before the Labour Court', content: '<p>If unredressed, file a complaint before the Labour Court within 30 days. Contact <strong>Advocate Md. Shah Alam</strong> at <strong>01712655546</strong>.</p>' }
      ],
      faq: [{ question: 'Are management employees covered under the Labour Act?', answer: 'Workers and operational staff are covered under BLA; managerial staff enforce contractual rights under general civil law.' }]
    }
  },

  // 9. Power of Attorney Property Transfer Registration
  {
    file: 'power-of-attorney-property-transfer-registration-bangladesh.json',
    data: {
      slug: 'power-of-attorney-property-transfer-registration-bangladesh',
      category: 'Property Law',
      title: 'Power of Attorney for Land Transfer in Bangladesh 2026: Irrevocable Power (Am-Moktarnama) Rules & Cancellation',
      metaTitle: 'Power of Attorney Land Transfer Bangladesh 2026 | Irrevocable Am-Moktarnama',
      metaDescription: 'Legal guide on Irrevocable Power of Attorney for property sale in Bangladesh under Power of Attorney Act 2012. Execution rules, registration fees, and revocation procedure.',
      keywords: ['power of attorney land transfer bangladesh', 'irrevocable power of attorney bd 2012', 'am moktarnama cancellation bangladesh', 'property lawyer dhaka'],
      publishedDate: '2026-08-25',
      lastModified: '2026-08-26',
      readTime: '12 minutes',
      heroIntro: 'Governed by the <strong>Power of Attorney Act 2012 and Power of Attorney Rules 2015</strong>, executing an Irrevocable Power of Attorney (Apraptyaharjo Am-Moktarnama) is the principal legal instrument used in real estate development, property sales, and expatriate land management in Bangladesh. Authored by <a href="/advocate-md-shah-alam" style="color:var(--gold);font-weight:bold;text-decoration:underline;">Advocate Md. Shah Alam</a>, Supreme Court Advocate. Call our Uttara chamber at <a href="tel:01712655546" style="color:var(--gold);font-weight:bold;">01712655546</a>.',
      quickAnswer: {
        heading: '⚡ Key Power of Attorney Essentials',
        points: [
          'Mandatory Registration: Power of attorney involving transfer or sale of immovable property MUST be registered under the Registration Act 1908.',
          'Consular Attestation for Expatriates: NRBs must execute deeds before the Bangladesh Embassy/High Commission abroad.',
          'Irrevocability: Once consideration money is received, the power cannot be unilaterally cancelled without a 30-day registered notice or court decree.'
        ]
      },
      toc: ['1. Classification: General vs Irrevocable Power of Attorney', '2. Mandatory Registration & Stamp Duties (2026)', '3. NRB Consular Attestation from Overseas', '4. Limits on Attorney Powers to Sell Land', '5. Revocation Procedure under Section 13 of 2012 Act'],
      sections: [
        { heading: '1. Classification: General vs Irrevocable Power of Attorney', content: '<p>Irrevocable powers involving property development or consideration create vested equitable rights in favor of the attorney.</p>' },
        { heading: '2. Mandatory Registration & Stamp Duties (2026)', content: '<p>Fixed stamp duty and registration fees apply at the Sub-Registry office under government gazette rates.</p>' },
        { heading: '3. NRB Consular Attestation from Overseas', content: '<p>Deeds executed overseas must be signed before the First Secretary / Consul, attested by the Ministry of Foreign Affairs (MOFA) Dhaka, and validated by the DC Treasury office.</p>' },
        { heading: '4. Limits on Attorney Powers to Sell Land', content: '<p>An attorney cannot execute deeds in their own personal name unless specifically authorised in express terms.</p>' },
        { heading: '5. Revocation Procedure under Section 13 of 2012 Act', content: '<p>To revoke a power of attorney, serve a 30-day statutory notice followed by a registered Deed of Revocation. Consult <strong>Advocate Md. Shah Alam</strong> at <strong>01712655546</strong>.</p>' }
      ],
      faq: [{ question: 'Does a power of attorney remain valid after the principal death?', answer: 'No. A power of attorney automatically terminates upon the demise of either the principal or the attorney.' }]
    }
  }
];

console.log('Writing batch 5 (all remaining English counterparts)...');
batch5.forEach(b => {
  fs.writeFileSync(path.join(enDir, b.file), JSON.stringify(b.data, null, 2), 'utf8');
  console.log(`✅ Created ${b.file}`);
});
