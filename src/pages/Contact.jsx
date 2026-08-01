import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { FaPhone, FaEnvelope, FaLocationDot, FaCircleCheck, FaBuildingColumns, FaFacebook, FaInstagram } from 'react-icons/fa6';
import './Contact.css';

const Contact = () => {
  const { t } = useLanguage();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const scriptURL = import.meta.env.VITE_GOOGLE_SHEET_URL;

    if (scriptURL) {
      try {
        await fetch(scriptURL, {
          method: 'POST',
          body: JSON.stringify({
            formType: 'contact',
            ...formData
          }),
        });
      } catch (error) {
        console.error('Error submitting form:', error);
      }
    } else {
      // If no URL is set, we just simulate the delay for demo purposes
      await new Promise((resolve) => setTimeout(resolve, 1200));
    }

    setIsSubmitting(false);
    setSubmitted(true);
    setFormData({ name: '', phone: '', email: '', subject: '', message: '' });

    // Auto-hide success message after 6 seconds
    setTimeout(() => setSubmitted(false), 6000);
  };

  return (
    <div className="contact-page">
      {/* ── Hero Banner ── */}
      <section className="contact-hero">
        <div className="contact-hero__overlay" />
        <div className="contact-hero__content">
          <h1 className="contact-hero__title">
            {t('संपर्क करें', 'Contact Us')}
          </h1>
          <p className="contact-hero__tagline">
            {t(
              'हम आपकी सेवा में सदैव उपलब्ध हैं',
              'We are always available to serve you'
            )}
          </p>
          <div className="contact-hero__ornament">
            <span></span><span></span><span></span>
          </div>
        </div>
      </section>

      {/* ── Contact Main ── */}
      <section className="contact-main">
        <div className="contact-container">
          <div className="contact-main__grid">
            {/* Left: Contact Info Cards */}
            <div className="contact-details-card">
              <div className="contact-form-card__header">
                <h2 className="contact-form-card__title">
                  {t('संपर्क विवरण', 'Contact Details')}
                </h2>
              </div>
              <ul className="contact-details-list">
                {/* Phone */}
                <li className="contact-details-item">
                  <div className="contact-details-text">
                    <h3 className="contact-details-label">
                      <FaPhone className="contact-details-icon" /> {t('फोन नंबर', 'Phone Number')}
                    </h3>
                    <a href="tel:9310565661" className="contact-details-value">9310565661</a>
                    <p className="contact-details-sub">
                      {t('सोमवार - रविवार, सुबह 9 बजे - रात 9 बजे', 'Monday - Sunday, 9 AM - 9 PM')}
                    </p>
                  </div>
                </li>

                {/* Email */}
                <li className="contact-details-item">
                  <div className="contact-details-text">
                    <h3 className="contact-details-label">
                      <FaEnvelope className="contact-details-icon" /> {t('ईमेल', 'Email')}
                    </h3>
                    <a href="mailto:Shivkhatushyamjitemple15@gmail.com" className="contact-details-value">
                      Shivkhatushyamjitemple15@gmail.com
                    </a>
                  </div>
                </li>

                {/* Location */}
                <li className="contact-details-item">
                  <div className="contact-details-text">
                    <h3 className="contact-details-label">
                      <FaLocationDot className="contact-details-icon" /> {t('पता', 'Address')}
                    </h3>
                    <p className="contact-details-value">
                      {t('ऋषिकेश - मसूरी - गंगोत्री हाईवे, उत्तराखंड', 'Rishikesh - Mussoorie - Gangotri Highway, Uttarakhand')}
                    </p>
                  </div>
                </li>

                {/* Facebook */}
                <li className="contact-details-item">
                  <div className="contact-details-text">
                    <h3 className="contact-details-label">
                      <FaFacebook className="contact-details-icon" /> {t('फेसबुक', 'Facebook')}
                    </h3>
                    <a href="https://www.facebook.com/share/1M9dFvZb7P/" target="_blank" rel="noopener noreferrer" className="contact-details-value">
                      Shiv Khatu Shyam Ji
                    </a>
                  </div>
                </li>

                {/* Instagram */}
                <li className="contact-details-item">
                  <div className="contact-details-text">
                    <h3 className="contact-details-label">
                      <FaInstagram className="contact-details-icon" /> {t('इंस्टाग्राम', 'Instagram')}
                    </h3>
                    <a href="https://www.instagram.com/khatushyamji.15/" target="_blank" rel="noopener noreferrer" className="contact-details-value">
                      @khatushyamji.15
                    </a>
                  </div>
                </li>
              </ul>
            </div>

            {/* Right: Form */}
            <div className="contact-form-card">
              <div className="contact-form-card__header">
                <h2 className="contact-form-card__title">
                  {t('संदेश भेजें', 'Send us a Message')}
                </h2>
              </div>

              {submitted && (
                <div className="contact-success" role="alert">
                  <span className="contact-success__icon"><FaCircleCheck /></span>
                  <p>
                    {t(
                      'आपका संदेश भेज दिया गया है। हम शीघ्र ही आपसे संपर्क करेंगे।',
                      'Your message has been sent. We will contact you shortly.'
                    )}
                  </p>
                </div>
              )}

              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="contact-form__group">
                  <label htmlFor="contact-name" className="contact-form__label">
                    {t('नाम', 'Name')}
                    <span className="contact-form__required">*</span>
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder={t('आपका नाम दर्ज करें', 'Enter your name')}
                    required
                    className="contact-form__input"
                  />
                </div>

                <div className="contact-form__group">
                  <label htmlFor="contact-phone" className="contact-form__label">
                    {t('फोन नंबर', 'Phone')}
                    <span className="contact-form__required">*</span>
                  </label>
                  <input
                    id="contact-phone"
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder={t('आपका फोन नंबर', 'Your phone number')}
                    required
                    className="contact-form__input"
                  />
                </div>

                <div className="contact-form__group">
                  <label htmlFor="contact-email" className="contact-form__label">
                    {t('ईमेल (वैकल्पिक)', 'Email (Optional)')}
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder={t('आपका ईमेल', 'Your email')}
                    className="contact-form__input"
                  />
                </div>

                <div className="contact-form__group">
                  <label htmlFor="contact-subject" className="contact-form__label">
                    {t('विषय', 'Subject')}
                    <span className="contact-form__required">*</span>
                  </label>
                  <input
                    id="contact-subject"
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder={t('संदेश का विषय', 'Message subject')}
                    required
                    className="contact-form__input"
                  />
                </div>

                <div className="contact-form__group">
                  <label htmlFor="contact-message" className="contact-form__label">
                    {t('संदेश', 'Message')}
                    <span className="contact-form__required">*</span>
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows="5"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder={t('अपना संदेश यहाँ लिखें...', 'Write your message here...')}
                    required
                    className="contact-form__input contact-form__textarea"
                  />
                </div>

                <button
                  type="submit"
                  className="contact-form__submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <span className="contact-form__spinner" />
                  ) : (
                    <>{t('संदेश भेजें', 'Send Message')}</>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* ── Bank Details ── */}
      <section className="contact-bank">
        <div className="contact-container">
          <div className="contact-section-header">
            <h2 className="contact-section-header__title">
              {t('बैंक विवरण', 'Bank Details')}
            </h2>
            <div className="contact-section-header__ornament">
              <span></span><span></span><span></span>
            </div>
          </div>

          <div className="contact-bank__card">
            <div className="contact-bank__icon" aria-hidden="true"><FaBuildingColumns /></div>
            <div className="contact-bank__rows">
              <div className="contact-bank__row">
                <span className="contact-bank__label">{t('खाता नाम', 'A/c Name')}</span>
                <span className="contact-bank__value">
                  Shiv Khatu Shyam Ji Temple Devbhoomi Trust
                </span>
              </div>
              <div className="contact-bank__row">
                <span className="contact-bank__label">{t('खाता संख्या', 'A/c No.')}</span>
                <span className="contact-bank__value contact-bank__value--mono">
                  666931056566166
                </span>
              </div>
              <div className="contact-bank__row">
                <span className="contact-bank__label">{t('IFSC कोड', 'IFSC Code')}</span>
                <span className="contact-bank__value contact-bank__value--mono">
                  AUBL0002119
                </span>
              </div>
              <div className="contact-bank__row">
                <span className="contact-bank__label">{t('बैंक', 'Bank')}</span>
                <span className="contact-bank__value">
                  AU Small Finance Bank
                </span>
              </div>
              <div className="contact-bank__row">
                <span className="contact-bank__label">{t('शाखा', 'Branch')}</span>
                <span className="contact-bank__value">
                  {t('ऋषिकेश, उत्तराखंड', 'Rishikesh, Uttarakhand')}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
