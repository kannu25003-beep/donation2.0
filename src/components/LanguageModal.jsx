import { useLanguage } from '../context/LanguageContext';
import { TbOm } from 'react-icons/tb';
import { FaHandsPraying } from 'react-icons/fa6';
import './LanguageModal.css';

function LanguageModal() {
  const { lang, setLang } = useLanguage();

  // Don't render if language is already selected
  if (lang) return null;

  return (
    <div className="lang-modal-overlay" role="dialog" aria-modal="true" aria-label="Choose Language">
      <div className="lang-modal-card">
        {/* OM Symbol */}
        <span className="lang-modal-om" aria-hidden="true"><TbOm /></span>

        {/* Decorative Divider */}
        <div className="lang-modal-divider" aria-hidden="true">
          <span className="lang-modal-divider__line" />
          <span className="lang-modal-divider__dot" />
          <span className="lang-modal-divider__line" />
        </div>

        {/* Title */}
        <h2 className="lang-modal-title">भाषा चुनें</h2>
        <p className="lang-modal-subtitle">Choose Language</p>

        {/* Language Options */}
        <div className="lang-modal-options">
          {/* Hindi Card */}
          <button
            className="lang-card"
            onClick={() => setLang('hi')}
            aria-label="हिन्दी चुनें (Select Hindi)"
          >
            <span className="lang-card__accent" aria-hidden="true" />
            <span className="lang-card__icon" aria-hidden="true"><FaHandsPraying /></span>
            <span className="lang-card__primary">हिन्दी</span>
            <span className="lang-card__secondary">Hindi</span>
          </button>

          {/* English Card */}
          <button
            className="lang-card"
            onClick={() => setLang('en')}
            aria-label="Select English"
          >
            <span className="lang-card__accent" aria-hidden="true" />
            <span className="lang-card__icon" aria-hidden="true"><FaHandsPraying /></span>
            <span className="lang-card__primary">English</span>
            <span className="lang-card__secondary">अंग्रेज़ी</span>
          </button>
        </div>

        {/* Footer Mantra */}
        <div className="lang-modal-footer" aria-hidden="true">
          <p className="lang-modal-mantra">हर हर महादेव <FaHandsPraying className="inline-icon" /> जय श्री खाटू श्याम</p>
        </div>
      </div>
    </div>
  );
}

export default LanguageModal;
