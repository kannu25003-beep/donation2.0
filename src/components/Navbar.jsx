import { useState, useEffect, useCallback } from "react";
import { Link, useLocation } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import { MdLanguage } from "react-icons/md";
import "./Navbar.css";

function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { t, setLang, isHindi } = useLanguage();

  const navLinks = [
    { path: "/", label: t("होम", "Home") },
    { path: "/about", label: t("हमारे बारे में", "About Us") },
    { path: "/donate", label: t("दान करें", "Donate") },
    { path: "/contact", label: t("संपर्क", "Contact") },
  ];

  /* ── scroll listener ── */
  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 50);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  /* close mobile menu on route change */
  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  /* lock body scroll when mobile menu is open */
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const isActive = (path) =>
    path === "/"
      ? location.pathname === "/"
      : location.pathname.startsWith(path);

  const toggleLanguage = () => {
    setLang(isHindi ? "en" : "hi");
  };

  return (
    <nav className={`navbar${scrolled ? " navbar--scrolled" : ""}`}>
      <div className="navbar__container">
        {/* ── Brand / Logo ── */}
        <Link to="/" className="navbar__brand" aria-label="Home">
          <span className="navbar__om" aria-hidden="true">
            श्री
          </span>
          <span className="navbar__temple-name">श्री खाटू श्याम मंदिर</span>
        </Link>

        {/* ── Desktop Nav Links ── */}
        <ul className="navbar__links">
          {navLinks.map(({ path, label }) => (
            <li key={path}>
              <Link
                to={path}
                className={`navbar__link${isActive(path) ? " navbar__link--active" : ""}`}
              >
                {label}
              </Link>
            </li>
          ))}
          <li>
            <button
              className="navbar__lang-btn"
              onClick={toggleLanguage}
              aria-label={t("अंग्रेज़ी में बदलें", "हिन्दी में बदलें")}
              title={t("English", "हिन्दी")}
            >
              <MdLanguage className="inline-icon" /> {t("EN", "हि")}
            </button>
          </li>
        </ul>

        {/* ── Hamburger Toggle ── */}
        <button
          className={`navbar__hamburger${mobileOpen ? " navbar__hamburger--open" : ""}`}
          onClick={() => setMobileOpen((prev) => !prev)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
        >
          <span className="navbar__hamburger-bar" />
          <span className="navbar__hamburger-bar" />
          <span className="navbar__hamburger-bar" />
        </button>
      </div>

      {/* ── Mobile Dropdown ── */}
      <div
        className={`navbar__mobile${mobileOpen ? " navbar__mobile--open" : ""}`}
        aria-hidden={!mobileOpen}
      >
        <ul className="navbar__mobile-links">
          {navLinks.map(({ path, label }) => (
            <li key={path}>
              <Link
                to={path}
                className={`navbar__mobile-link${isActive(path) ? " navbar__mobile-link--active" : ""}`}
              >
                {label}
              </Link>
            </li>
          ))}
          <li>
            <button
              className="navbar__lang-btn navbar__lang-btn--mobile"
              onClick={toggleLanguage}
              aria-label={t("अंग्रेज़ी में बदलें", "हिन्दी में बदलें")}
            >
              🌐 {t("English", "हिन्दी")}
            </button>
          </li>
        </ul>
      </div>

      {/* ── Backdrop (closes menu on tap) ── */}
      {mobileOpen && (
        <div
          className="navbar__backdrop"
          onClick={() => setMobileOpen(false)}
          aria-hidden="true"
        />
      )}
    </nav>
  );
}

export default Navbar;
