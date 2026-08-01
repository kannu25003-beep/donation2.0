import { Link } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import {
  FaLocationDot,
  FaPhone,
  FaEnvelope,
  FaBuildingColumns,
  FaHandsPraying,
  FaInstagram,
  FaFacebook,
} from "react-icons/fa6";
import "./Footer.css";

function Footer() {
  const { t } = useLanguage();

  const quickLinks = [
    { path: "/", label: t("होम", "Home") },
    { path: "/about", label: t("हमारे बारे में", "About Us") },
    { path: "/donate", label: t("दान करें", "Donate") },
    { path: "/contact", label: t("संपर्क", "Contact") },
  ];

  return (
    <footer className="footer">
      {/* ── Top Section ── */}
      <div className="footer__top">
        <div className="footer__container">
          {/* Column 1 — Temple Info */}
          <div className="footer__col footer__col--info">
            <h3 className="footer__temple-name">
              भगवान शिव एवं श्री खाटू श्याम जी मंदिर
            </h3>
            <p className="footer__location">
              <FaLocationDot className="inline-icon" />{" "}
              {t(
                "ऋषिकेश-मसूरी-गंगोत्री हाईवे, उत्तराखंड",
                "Rishikesh-Mussoorie-Gangotri Highway, Uttarakhand",
              )}
            </p>
            <p className="footer__tagline">
              {"\u201Cहारे का सहारा, बाबा श्याम हमारा\u201D"}
            </p>
          </div>

          {/* Column 2 — Quick Links */}
          <div className="footer__col footer__col--links">
            <h4 className="footer__heading">
              {t("त्वरित लिंक", "Quick Links")}
            </h4>
            <ul className="footer__link-list">
              {quickLinks.map(({ path, label }) => (
                <li key={path}>
                  <Link to={path} className="footer__link">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 — Contact */}
          <div className="footer__col footer__col--contact">
            <h4 className="footer__heading">
              {t("संपर्क करें", "Contact Us")}
            </h4>
            <ul className="footer__contact-list">
              <li>
                <span className="footer__icon" aria-hidden="true">
                  <FaPhone />
                </span>
                <a href="tel:+919310565661" className="footer__contact-link">
                  +91 93105 65661
                </a>
              </li>
              <li>
                <span className="footer__icon" aria-hidden="true">
                  <FaEnvelope />
                </span>
                <a href="mailto:Shivkhatushyamjitemple15@gmail.com" className="footer__contact-link">
                  Shivkhatushyamjitemple15@gmail.com
                </a>
              </li>
              <li>
                <span className="footer__icon" aria-hidden="true">
                  <FaBuildingColumns />
                </span>
                <span className="footer__address">
                  {t("ऋषिकेश, उत्तराखंड", "Rishikesh, Uttarakhand")}
                </span>
              </li>
            </ul>
          </div>

          {/* Column 4 — Connect Us (Social) */}
          <div className="footer__col footer__col--social">
            <h4 className="footer__heading">{t("जुड़ें", "Connect Us")}</h4>
            <ul className="footer__contact-list">
              <li>
                <span className="footer__icon" aria-hidden="true">
                  <FaFacebook />
                </span>
                <a
                  href="https://www.facebook.com/share/1M9dFvZb7P/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer__contact-link"
                >
                  Shiv Khatu Shyam Ji
                </a>
              </li>
              <li>
                <span className="footer__icon" aria-hidden="true">
                  <FaInstagram />
                </span>
                <a
                  href="https://www.instagram.com/khatushyamji.15/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer__contact-link"
                >
                  @khatushyamji.15
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* ── Divider ── */}
      <div className="footer__divider" aria-hidden="true" />

      {/* ── Bottom Bar ── */}
      <div className="footer__bottom">
        <div className="footer__container footer__bottom-inner">
          <p className="footer__copyright">
            {t(
              "© 2025 शिव खाटू श्याम जी मंदिर देवभूमि ट्रस्ट। सर्वाधिकार सुरक्षित।",
              "© 2025 Shiv Khatu Shyam Ji Temple Devbhoomi Trust. All Rights Reserved.",
            )}
          </p>
          <p className="footer__mantra">
            हर हर महादेव <FaHandsPraying className="inline-icon" /> जय श्री खाटू
            श्याम
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
