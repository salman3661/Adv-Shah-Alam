import React from 'react';
import { Phone, MessageCircle, CalendarCheck, MapPin } from 'lucide-react';
import { telLink, waLink, PRIMARY_PHONE, SECONDARY_PHONE } from '../data/contactInfo';

const MidArticleLeadCapture = ({ lang = 'bn' }) => {
    const isBn = lang === 'bn';

    const waMsg = isBn 
        ? 'আইনি কেস মূল্যায়ন ও অ্যাপয়েন্টমেন্টের জন্য যোগাযোগ' 
        : 'Hello Advocate Md. Shah Alam, I would like to schedule a legal case evaluation and document review.';

    return (
        <div 
            className="my-10 p-6 md:p-8 rounded-2xl relative overflow-hidden transition-all duration-300"
            style={{
                background: 'linear-gradient(135deg, #0B1938 0%, #142B5E 55%, #1E3A8A 100%)',
                border: '1.5px solid rgba(212, 175, 55, 0.5)',
                boxShadow: '0 20px 44px -12px rgba(11, 25, 56, 0.35), 0 0 0 1px rgba(255,255,255,0.08) inset',
            }}
        >
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '4px', background: 'linear-gradient(90deg, #D4AF37, #FDE68A, #D4AF37)' }} />
            <div style={{ position: 'absolute', top: '-40px', right: '-40px', width: '180px', height: '180px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(212,175,55,0.18) 0%, transparent 70%)', pointerEvents: 'none' }} />
            
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
                <div className="flex-1">
                    <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-extrabold mb-3.5 tracking-wide uppercase"
                        style={{ background: 'rgba(253, 230, 138, 0.16)', border: '1px solid rgba(253, 230, 138, 0.4)', color: '#FDE68A' }}>
                        <CalendarCheck size={14} />
                        {isBn ? 'আইনি কেস মূল্যায়ন ও অ্যাপয়েন্টমেন্ট' : 'Legal Case Evaluation & Chamber Appointment'}
                    </div>

                    <h3 className="text-xl md:text-2xl font-extrabold mb-2.5" style={{ color: '#FFFFFF', fontFamily: isBn ? "'Noto Serif Bengali', sans-serif" : "Georgia, serif", lineHeight: 1.4 }}>
                        {isBn 
                            ? 'আপনার মামলার নথি ও কাগজপত্র নিয়ে বিজ্ঞ আইনজীবীর সাথে বসুন' 
                            : 'Have Your Case Documents Reviewed by a Supreme Court Advocate'}
                    </h3>

                    <p className="text-sm md:text-base leading-relaxed mb-4" style={{ color: '#E2E8F0' }}>
                        {isBn 
                            ? 'জমি বিরোধ, বাটোয়ারা মামলা, জামিন, তালাক বা সাইবার অপরাধের মতো জটিল বিষয়ে ভুল পদক্ষেপে মারাত্মক ক্ষতি হতে পারে। উত্তরা সন্ধ্যা চেম্বার বা ঢাকা জজ কোর্টে সরাসরি নথিপত্র মূল্যায়ন করিয়ে সঠিক আইনি সিদ্ধান্ত নিন।'
                            : 'Do not risk critical rights in property disputes, bail hearings, family matters, or criminal charges. Schedule a direct in-chamber document evaluation at Uttara or Dhaka Judge Court.'}
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs md:text-sm font-medium" style={{ color: '#FDE68A' }}>
                        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg" style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)' }}>
                            <MapPin size={14} className="text-amber-300 shrink-0" />
                            <span>{isBn ? 'উত্তরা চেম্বার: বাড়ি ৪৬, রোড ৬/বি, সেক্টর ১২' : 'Uttara: House 46, Road 6/B, Sector 12'}</span>
                        </div>
                        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg" style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)' }}>
                            <MapPin size={14} className="text-amber-300 shrink-0" />
                            <span>{isBn ? 'জজ কোর্ট: আইনজীবী সমিতি ভবন, ৪র্থ তলা' : 'Judge Court: Lawyers Assn. Bldg, 4th Fl'}</span>
                        </div>
                    </div>
                </div>

                <div className="flex flex-row md:flex-col gap-3 w-full md:w-auto shrink-0">
                    <a
                        href={waLink(waMsg)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 md:flex-initial inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl font-extrabold text-sm text-white transition-transform hover:scale-105 active:scale-95 text-center shadow-lg"
                        style={{ background: 'linear-gradient(135deg, #25D366 0%, #16A34A 100%)', boxShadow: '0 8px 20px -4px rgba(37,211,102,0.45)' }}
                    >
                        <MessageCircle size={16} />
                        {isBn ? 'হোয়াটসঅ্যাপে বুক করুন' : 'Book on WhatsApp'}
                    </a>
                    <a
                        href={telLink()}
                        className="flex-1 md:flex-initial inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl font-extrabold text-sm transition-transform hover:scale-105 active:scale-95 text-center shadow-lg"
                        style={{ background: 'linear-gradient(135deg, #FDE68A 0%, #D4AF37 100%)', color: '#0B1528', boxShadow: '0 8px 20px -4px rgba(212,175,55,0.4)' }}
                    >
                        <Phone size={16} />
                        {isBn ? 'সরাসরি কল: ০১৭১২-৬৫৫৫৪৬' : 'Direct Call: 01712655546'}
                    </a>
                </div>
            </div>
        </div>
    );
};

export default MidArticleLeadCapture;
