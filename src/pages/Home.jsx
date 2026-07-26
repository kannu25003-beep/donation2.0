import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import {
  FaLocationDot,
  FaReceipt,
  FaCamera,
  FaCircleCheck,
  FaBuildingColumns,
  FaHandsPraying,
} from "react-icons/fa6";
import "./Home.css";

const donationTiers = [
  { amount: "₹501", labelHi: "सेवा सहयोग", labelEn: "Seva Contribution" },
  { amount: "₹1,100", labelHi: "विशेष सहयोग", labelEn: "Special Contribution" },
  { amount: "₹5,100", labelHi: "महा सहयोग", labelEn: "Grand Contribution" },
  {
    amount: "₹11,000",
    labelHi: "श्रेष्ठ सहयोग",
    labelEn: "Supreme Contribution",
  },
];

const commitments = [
  {
    icon: <FaReceipt />,
    hindi: "सभी दानदाताओं को रसीद प्रदान की जाएगी।",
    english: "Receipt will be provided to all donors.",
  },
  {
    icon: <FaCamera />,
    hindi:
      "निर्माण कार्य की प्रगति की फोटो/वीडियो नियमित रूप से साझा की जाएगी।",
    english: "Regular photo/video updates of construction progress.",
  },
  {
    icon: <FaCircleCheck />,
    hindi:
      "पूर्ण पारदर्शिता के साथ आपके सहयोग का सही उपयोग सुनिश्चित किया जाएगा।",
    english: "Full transparency in utilization of your contribution.",
  },
  {
    icon: <FaBuildingColumns />,
    hindi: "मंदिर निर्माण में आपका योगदान सदैव अमर रहेगा।",
    english: "Your contribution to the temple will be eternally remembered.",
  },
];

const bannerImages = [
  "/images/WhatsApp Image 2026-07-26 at 5.32.03 PM.jpeg",
  "/images/WhatsApp Image 2026-07-26 at 5.32.19 PM.jpeg",
];

function Home() {
  const { t } = useLanguage();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % bannerImages.length);
    }, 5000); // Change image every 5 seconds
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="home">
      {/* ───────── Hero Section ───────── */}
      <section className="hero">
        {bannerImages.map((img, index) => (
          <div
            key={index}
            className={`hero__bg-image ${index === currentImageIndex ? "active" : ""}`}
            style={{ backgroundImage: `url("${encodeURI(img)}")` }}
          />
        ))}
        <div className="hero__bg-overlay" />
        <div className="hero__bg-om" aria-hidden="true" />

        <div className="hero__content">
          <div
            className="hero__taglines fadeInUp"
            style={{ animationDelay: "0s" }}
          >
            <span className="hero__tagline">
              {t("ॐ नमः शिवाय", "Om Namah Shivay")}
            </span>
            <span className="hero__tagline-divider">✦</span>
            <span className="hero__tagline">
              {t("जय श्री खाटू श्याम", "Jai Shri Khatu Shyam")}
            </span>
          </div>

          <h1
            className="hero__title fadeInUp"
            style={{ animationDelay: "0.15s" }}
          >
            {t(
              "भव्य मंदिर निर्माण अभियान",
              "Grand Temple Construction Campaign",
            )}
          </h1>

          <h2
            className="hero__subtitle fadeInUp"
            style={{ animationDelay: "0.3s" }}
          >
            भगवान शिव एवं श्री खाटू श्याम जी मंदिर
          </h2>

          <div
            className="hero__location fadeInUp"
            style={{ animationDelay: "0.45s" }}
          >
            <span className="hero__location-icon">
              <FaLocationDot />
            </span>
            {t(
              "ऋषिकेश\u00A0–\u00A0मसूरी\u00A0–\u00A0गंगोत्री हाईवे के पावन क्षेत्र में",
              "On the sacred Rishikesh\u00A0–\u00A0Mussoorie\u00A0–\u00A0Gangotri Highway",
            )}
          </div>

          <p
            className="hero__description fadeInUp"
            style={{ animationDelay: "0.6s" }}
          >
            {t(
              "भगवान शिव एवं श्री खाटू श्याम जी के भव्य मंदिर का निर्माण कार्य प्रारंभ हो चुका है। यह दिव्य धाम आने वाली पीढ़ियों के लिए आस्था, सेवा और सनातन संस्कृति का एक महान केंद्र बनेगा।",
              "The grand construction of the temple dedicated to Bhagwan Shiv and Shri Khatu Shyam Ji has begun. This divine abode will become a great centre of faith, service, and Sanatan culture for generations to come.",
            )}
          </p>

          <Link
            to="/donate"
            className="hero__cta fadeInUp"
            style={{ animationDelay: "0.75s" }}
          >
            {t("अभी दान करें", "Donate Now")}
          </Link>
        </div>
      </section>

      {/* ───────── Commitments ───────── */}
      <section className="commitments">
        <div className="section-header fadeInUp">
          <h2 className="section-title">
            {t("हमारे संकल्प", "Our Commitments")}
          </h2>
          <p className="section-subtitle">
            {t("पारदर्शिता और विश्वास", "Transparency & Trust")}
          </p>
        </div>

        <div className="commitments__grid">
          {commitments.map((item, i) => (
            <div
              className="commitment-card fadeInUp"
              key={i}
              style={{ animationDelay: `${0.1 + i * 0.12}s` }}
            >
              <span className="commitment-card__icon">{item.icon}</span>
              <p className="commitment-card__text">
                {t(item.hindi, item.english)}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ───────── Gallery Section ───────── */}
      <section className="gallery-section">
        <div className="section-header fadeInUp">
          <h2 className="section-title">
            {t(
              "दिव्य दर्शन एवं प्रस्तावित स्वरूप",
              "Divine Darshan & Proposed Vision",
            )}
          </h2>
          <p className="section-subtitle">
            {t("भव्य मंदिर की एक झलक", "A Glimpse of the Grand Temple")}
          </p>
        </div>
        <div className="gallery-grid">
          {bannerImages.map((img, index) => (
            <div
              className="gallery-item fadeInUp"
              key={index}
              style={{ animationDelay: `${0.2 + index * 0.15}s` }}
            >
              <img src={img} alt={`Divine glimpse ${index + 1}`} />
            </div>
          ))}
        </div>
      </section>

      {/* ───────── CTA Banner ───────── */}
      <section className="cta-banner">
        <div className="cta-banner__content fadeInUp">
          <p className="cta-banner__text">
            {t(
              "आइए, मिलकर सनातन संस्कृति के इस दिव्य धाम के निर्माण में अपना अमूल्य सहयोग प्रदान करें।",
              "Join us in building this divine temple. Every contribution matters.",
            )}
          </p>
          <Link to="/donate" className="cta-banner__btn">
            {t("अभी दान करें", "Donate Now")}
          </Link>
        </div>
      </section>
    </div>
  );
}

export default Home;
