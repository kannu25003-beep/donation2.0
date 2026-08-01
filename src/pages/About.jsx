import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { FaHandsPraying, FaHands, FaBuildingColumns, FaPhone } from 'react-icons/fa6';
import { TbOm } from 'react-icons/tb';
import './About.css';

const missionCards = [
  {
    icon: <FaHandsPraying />,
    titleHi: 'आस्था',
    titleEn: 'Faith',
    descHi: 'सनातन धर्म की अमूल्य विरासत को संरक्षित करना',
    descEn: 'Preserving the priceless heritage of Sanatan Dharma',
  },
  {
    icon: <FaHands />,
    titleHi: 'सेवा',
    titleEn: 'Service',
    descHi: 'समाज सेवा और धार्मिक कार्यों के माध्यम से मानवता की सेवा',
    descEn: 'Serving humanity through social service and religious activities',
  },
  {
    icon: <TbOm />,
    titleHi: 'संस्कृति',
    titleEn: 'Culture',
    descHi: 'भारतीय संस्कृति और परंपराओं का संवर्धन एवं प्रसार',
    descEn: 'Promoting and propagating Indian culture and traditions',
  },
];

function About() {
  const { t } = useLanguage();

  const bankDetails = [
    { label: t('खाता नाम', 'A/c Name'), value: 'Shiv Khatu Shyam Ji Temple Devbhoomi Trust' },
    { label: t('खाता संख्या', 'A/c No'), value: '666931056566166' },
    { label: t('IFSC कोड', 'IFSC Code'), value: 'AUBL0002119' },
    { label: t('बैंक', 'Bank'), value: 'AU Small Finance Bank' },
    { label: t('शाखा', 'Branch'), value: t('ऋषिकेश, उत्तराखंड', 'Rishikesh, Uttarakhand') },
  ];

  return (
    <div className="about-page">
      {/* ─── Page Hero / Banner ─── */}
      <section className="about-hero">
        <div className="about-hero__overlay" />
        <div className="about-hero__content">
          <h1 className="about-hero__title-hi">
            {t('हमारे बारे में', 'About Us')}
          </h1>
        </div>
      </section>

      {/* ─── Temple Vision Section ─── */}
      <section className="about-vision">
        <div className="about-vision__inner">
          <div className="about-vision__text fade-up">
            <span className="section-label">|| श्री खाटू श्याम जी ||</span>
            <h2 className="section-title">
              <span className="section-title__hi">
                {t('मंदिर का परिचय', 'About The Temple')}
              </span>
            </h2>

            {t(
              /* Hindi paragraphs */
              <>
                <p className="about-vision__para">
                  भगवान शिव एवं श्री खाटू श्याम जी के भव्य मंदिर का निर्माण कार्य
                  प्रारंभ हो चुका है। यह दिव्य धाम आने वाली पीढ़ियों के लिए आस्था,
                  सेवा और सनातन संस्कृति का एक महान केंद्र बनेगा।
                </p>
                <p className="about-vision__para">
                  ऋषिकेश - मसूरी - गंगोत्री हाईवे के पावन क्षेत्र में बनने वाला यह
                  मंदिर न केवल धार्मिक आस्था का प्रतीक होगा, बल्कि यह सनातन संस्कृति
                  के प्रचार-प्रसार का भी एक प्रमुख केंद्र बनेगा।
                </p>
              </>,
              /* English paragraphs */
              <>
                <p className="about-vision__para">
                  The grand construction of the temple dedicated to Bhagwan Shiv and
                  Shri Khatu Shyam Ji has begun. This divine abode will become a
                  great centre of faith, service, and Sanatan culture for
                  generations to come.
                </p>
                <p className="about-vision__para">
                  Located on the sacred Rishikesh–Mussoorie–Gangotri
                  Highway in Uttarakhand, this temple will not only be a symbol of
                  religious faith but also a major centre for the promotion and
                  propagation of Sanatan culture.
                </p>
              </>
            )}
          </div>

          <div className="about-vision__decorative fade-up delay-1">
            <div className="temple-img-card">
              <img 
                src="/images/WhatsApp%20Image%202026-07-26%20at%205.32.19%20PM.jpeg" 
                alt="Proposed Temple Vision" 
                className="temple-img-card__img"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ─── Mission & Values ─── */}
      <section className="about-mission">
        <div className="about-mission__inner">
          <span className="section-label">|| हर हर महादेव ||</span>
          <h2 className="section-title centered">
            <span className="section-title__hi">
              {t('हमारे मूल्य', 'Our Mission & Values')}
            </span>
          </h2>

          <div className="about-mission__grid">
            {missionCards.map((card, i) => (
              <div
                className={`mission-card fade-up delay-${i}`}
                key={card.titleEn}
              >
                <span className="mission-card__icon">{card.icon}</span>
                <h3 className="mission-card__title-hi">{t(card.titleHi, card.titleEn)}</h3>
                <p className="mission-card__desc-hi">{t(card.descHi, card.descEn)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Trust Information ─── */}
      <section className="about-trust">
        <div className="about-trust__inner">
          <span className="section-label">|| जय श्री श्याम ||</span>
          <h2 className="section-title centered">
            <span className="section-title__hi">
              {t('ट्रस्ट की जानकारी', 'Trust Information')}
            </span>
          </h2>

          <div className="about-trust__content fade-up">
            <div className="trust-details">
              <div className="trust-detail-row">
                <span className="trust-detail-label">{t('ट्रस्ट का नाम', 'Trust Name')}</span>
                <span className="trust-detail-value">
                  Shiv Khatu Shyam Ji Temple Devbhoomi Trust
                </span>
              </div>
              <div className="trust-detail-row">
                <span className="trust-detail-label">{t('पंजीकरण', 'Registration')}</span>
                <span className="trust-detail-value">
                  {t('भारतीय ट्रस्ट अधिनियम के तहत पंजीकृत', 'Registered under Indian Trust Act')}
                </span>
              </div>
              <div className="trust-detail-row">
                <span className="trust-detail-label">{t('स्थान', 'Location')}</span>
                <span className="trust-detail-value">
                  {t('ऋषिकेश, उत्तराखंड', 'Rishikesh, Uttarakhand')}
                </span>
              </div>
              <div className="trust-detail-row">
                <span className="trust-detail-label">{t('संपर्क', 'Contact')}</span>
                <span className="trust-detail-value">
                  <a href="tel:9310565661" className="trust-phone">
                    <FaPhone className="inline-icon" /> 9310565661
                  </a>
                </span>
              </div>
            </div>

            <div className="bank-card fade-up delay-1">
              <h3 className="bank-card__heading">
                <span className="bank-card__icon"><FaBuildingColumns /></span>
                {t('दान के लिए बैंक विवरण', 'Bank Details for Donation')}
              </h3>
              <div className="bank-card__details">
                {bankDetails.map((item) => (
                  <div className="bank-row" key={item.label}>
                    <span className="bank-row__label">{item.label}</span>
                    <span className="bank-row__value">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Mahant Guru Ji Section ─── */}
      <section className="about-guru">
        <div className="about-guru__inner">
          <div className="about-guru__image fade-up">
            <div className="guru-img-wrapper">
              <img src="/images/Mahant_Guru_ji_Managing_Trustee.jpg" alt="Mahant Guru Ji" />
            </div>
          </div>
          <div className="about-guru__text fade-up delay-1">
            <span className="section-label">|| मार्गदर्शक एवं संरक्षक ||</span>
            <h2 className="section-title">
              <span className="section-title__hi">महंत गुरु जी</span>
              <span className="section-title__en">Managing Trustee</span>
            </h2>
            <p className="about-guru__desc">
              {t(
                "महंत गुरु जी के परम सानिध्य और दिव्य मार्गदर्शन में भगवान शिव एवं श्री खाटू श्याम जी के इस भव्य मंदिर का निर्माण कार्य संपन्न हो रहा है। उन्होंने अपना सम्पूर्ण जीवन सनातन धर्म के प्रचार-प्रसार, समाज कल्याण और परोपकार में समर्पित किया है। उनके आशीर्वाद और प्रेरणा से यह पवित्र धाम लाखों श्रद्धालुओं के लिए आस्था का महान केंद्र बनेगा।",
                "Under the divine guidance and blessings of Mahant Guru Ji, the construction of this grand temple dedicated to Bhagwan Shiv and Shri Khatu Shyam Ji is taking shape. He has dedicated his entire life to the propagation of Sanatan Dharma, social welfare, and philanthropy. With his vision and inspiration, this sacred abode will become a great center of faith for millions of devotees."
              )}
            </p>
          </div>
        </div>
      </section>

      {/* ─── Trust Committee ─── */}
      <section className="about-committee">
        <div className="about-committee__inner">
          <span className="section-label">|| सेवा परमो धर्म: ||</span>
          <h2 className="section-title centered">
            <span className="section-title__hi">
              {t('ट्रस्ट समिति', 'Trust Committee')}
            </span>
          </h2>
          
          <div className="committee-grid">
            {/* President */}
            <div className="committee-card fade-up">
              <div className="committee-card__img-wrapper">
                <img src="/images/President-Chairman.jpg" alt="President / Chairman" className="committee-card__img" />
              </div>
              <h3 className="committee-card__name">Kiran Tiwari</h3>
              <p className="committee-card__role">{t('अध्यक्ष', 'President / Chairman')}</p>
            </div>
            {/* Vice President */}
            <div className="committee-card fade-up delay-1">
              <div className="committee-card__img-wrapper">
                <img src="/images/Vice President.jpg" alt="Vice President" className="committee-card__img" />
              </div>
              <h3 className="committee-card__name">Vinu Tiwari</h3>
              <p className="committee-card__role">{t('उपाध्यक्ष', 'Vice President')}</p>
            </div>
            {/* Secretary */}
            <div className="committee-card fade-up delay-2">
              <div className="committee-card__img-wrapper">
                <img src="/images/Secretary.jpg" alt="Secretary" className="committee-card__img" />
              </div>
              <h3 className="committee-card__name">Minu Tiwari</h3>
              <p className="committee-card__role">{t('सचिव', 'Secretary')}</p>
            </div>
            {/* Trustee & Treasurer */}
            <div className="committee-card fade-up delay-3">
              <div className="committee-card__img-wrapper">
                <img src="/images/Trustee_and_Treasurer.jpg" alt="Trustee & Treasurer" className="committee-card__img" />
              </div>
              <h3 className="committee-card__name">Vinita</h3>
              <p className="committee-card__role">{t('ट्रस्टी एवं कोषाध्यक्ष', 'Trustee & Treasurer')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── CTA Section ─── */}
      <section className="about-cta">
        <div className="about-cta__inner fade-up">
          <span className="about-cta__om"><FaHandsPraying /></span>
          <h2 className="about-cta__title-hi">
            {t(
              'मंदिर निर्माण में अपना सहयोग दें',
              'Support the temple construction'
            )}
          </h2>
          <p className="about-cta__title-en">
            {t(
              'आपका हर सहयोग अमूल्य है',
              'Every contribution counts'
            )}
          </p>
          <Link to="/donate" className="about-cta__btn">
            <span>{t('दान करें', 'Donate Now')}</span>
            <span className="about-cta__btn-arrow">→</span>
          </Link>
        </div>
      </section>
    </div>
  );
}

export default About;
