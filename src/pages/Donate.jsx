import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import {
  FaCircleCheck,
  FaHouse,
  FaRotateRight,
  FaHandsPraying,
  FaCloudArrowUp,
  FaXmark,
  FaMobileScreen,
  FaQrcode,
  FaCopy,
  FaCheck,
  FaBuildingColumns,
  FaSackDollar,
} from "react-icons/fa6";
import "./Donate.css";

const PRESET_AMOUNTS = [
  { value: 501, label: "₹501" },
  { value: 1100, label: "₹1,100" },
  { value: 5100, label: "₹5,100" },
  { value: 11000, label: "₹11,000" },
];

const AMOUNT_LABELS = [
  { amount: "₹501", hindi: "सेवा सहयोग", english: "Seva Contribution" },
  { amount: "₹1,100", hindi: "विशेष सहयोग", english: "Special Contribution" },
  { amount: "₹5,100", hindi: "महा सहयोग", english: "Grand Contribution" },
  {
    amount: "₹11,000",
    hindi: "श्रेष्ठ सहयोग",
    english: "Supreme Contribution",
  },
];

const BANK_DETAILS = [
  {
    label: "Account Name",
    labelHi: "खाता नाम",
    value: "Shiv Khatu Shyam Ji Temple Devbhoomi Trust",
    copyable: false,
  },
  {
    label: "A/c No.",
    labelHi: "खाता संख्या",
    value: "666931056566166",
    copyable: true,
  },
  {
    label: "IFSC Code",
    labelHi: "IFSC कोड",
    value: "AUBL0002119",
    copyable: true,
  },
  {
    label: "Bank",
    labelHi: "बैंक",
    value: "AU Small Finance Bank",
    copyable: false,
  },
  {
    label: "Branch",
    labelHi: "शाखा",
    value: "Rishikesh, Uttarakhand",
    copyable: false,
  },
];

function Donate() {
  const { t } = useLanguage();

  // Form state
  const [selectedAmount, setSelectedAmount] = useState(null);
  const [customAmount, setCustomAmount] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [pan, setPan] = useState("");
  const [message, setMessage] = useState("");
  const [utr, setUtr] = useState("");
  const [screenshot, setScreenshot] = useState(null);
  const [screenshotPreview, setScreenshotPreview] = useState(null);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [copiedField, setCopiedField] = useState(null);

  const fileInputRef = useRef(null);

  const getDonationAmount = () => {
    if (customAmount && Number(customAmount) > 0) return Number(customAmount);
    return selectedAmount;
  };

  const handleAmountSelect = (amount) => {
    setSelectedAmount(amount);
    setCustomAmount("");
    setErrors((prev) => ({ ...prev, amount: "" }));
  };

  const handleCustomAmountChange = (e) => {
    const val = e.target.value;
    setCustomAmount(val);
    if (val && Number(val) > 0) {
      setSelectedAmount(null);
    }
    setErrors((prev) => ({ ...prev, amount: "" }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setScreenshot(file);
      setScreenshotPreview(URL.createObjectURL(file));
      setErrors((prev) => ({ ...prev, payment: "" }));
    }
  };

  const handleFileDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      setScreenshot(file);
      setScreenshotPreview(URL.createObjectURL(file));
      setErrors((prev) => ({ ...prev, payment: "" }));
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const removeScreenshot = () => {
    setScreenshot(null);
    setScreenshotPreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const copyToClipboard = async (text, field) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedField(field);
      setTimeout(() => setCopiedField(null), 2000);
    } catch {
      // fallback
      const textarea = document.createElement("textarea");
      textarea.value = text;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setCopiedField(field);
      setTimeout(() => setCopiedField(null), 2000);
    }
  };

  const validate = () => {
    const newErrors = {};
    const amount = getDonationAmount();

    if (!amount || amount <= 0) {
      newErrors.amount = t(
        "कृपया दान राशि चुनें",
        "Please select a donation amount",
      );
    }
    if (!name.trim()) {
      newErrors.name = t("कृपया अपना नाम दर्ज करें", "Please enter your name");
    }
    if (!phone.trim() || !/^\d{10}$/.test(phone.trim())) {
      newErrors.phone = t(
        "कृपया 10 अंकों का मोबाइल नंबर दर्ज करें",
        "Please enter a valid 10-digit phone number",
      );
    }
    if (!utr.trim() && !screenshot) {
      newErrors.payment = t(
        "कृपया UTR नंबर दर्ज करें या स्क्रीनशॉट अपलोड करें",
        "Please enter UTR or upload screenshot",
      );
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      setIsSubmitting(true);
      const scriptURL = import.meta.env.VITE_GOOGLE_SHEET_URL;
      const imgbbAPIKey = import.meta.env.VITE_IMGBB_API_KEY;

      let screenshotUrl = "";

      // 1. Upload Screenshot to ImgBB (if exists)
      if (screenshot && imgbbAPIKey) {
        try {
          const formData = new FormData();
          formData.append("image", screenshot);
          
          const imgRes = await fetch(`https://api.imgbb.com/1/upload?key=${imgbbAPIKey}`, {
            method: 'POST',
            body: formData,
          });
          const imgData = await imgRes.json();
          if (imgData && imgData.success) {
            screenshotUrl = imgData.data.url;
          } else {
            screenshotUrl = "Upload Failed: " + screenshot.name;
          }
        } catch (err) {
          console.error("Image upload failed:", err);
          screenshotUrl = "Upload Failed: " + screenshot.name;
        }
      } else if (screenshot) {
        screenshotUrl = screenshot.name;
      }

      // 2. Submit to Google Sheets
      if (scriptURL) {
        try {
          await fetch(scriptURL, {
            method: 'POST',
            body: JSON.stringify({
              formType: 'donation',
              name,
              phone,
              email,
              amount: getDonationAmount(),
              address,
              pan,
              utr,
              screenshot: screenshotUrl
            }),
          });
        } catch (error) {
          console.error("Error submitting form:", error);
        }
      } else {
        await new Promise(resolve => setTimeout(resolve, 1000));
      }

      setIsSubmitting(false);
      setFormSubmitted(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleNewDonation = () => {
    setSelectedAmount(null);
    setCustomAmount("");
    setName("");
    setPhone("");
    setEmail("");
    setAddress("");
    setPan("");
    setMessage("");
    setUtr("");
    setScreenshot(null);
    setScreenshotPreview(null);
    setFormSubmitted(false);
    setErrors({});
  };

  return (
    <div className="donate-page">
      {/* ===== Page Hero Banner ===== */}
      <section className="donate-hero">
        <div className="donate-hero__overlay" />
        <div className="donate-hero__content">
          <h1 className="donate-hero__title">
            <span className="donate-hero__title-hi">
              {t("दान करें", "Make a Donation")}
            </span>
          </h1>
          <p className="donate-hero__subtitle">
            {t(
              "आपका सहयोग इस दिव्य मंदिर के निर्माण में अमूल्य योगदान है",
              "Your contribution is invaluable to the construction of this divine temple",
            )}
          </p>
          <div className="donate-hero__decorative">
            <span className="donate-hero__om">
              <FaHandsPraying />
            </span>
          </div>
        </div>
      </section>

      {/* ===== Main Content Grid ===== */}
      <section className="donate-content">
        <div className="donate-grid">
          {/* ===== LEFT COLUMN: Donor Form ===== */}
          <div className="donate-form-col">
            {formSubmitted ? (
              /* --- Success State --- */
              <div className="donate-success-card">
                <div className="donate-success__icon">
                  <FaCircleCheck />
                </div>
                <h2 className="donate-success__title-hi">
                  {t(
                    "धन्यवाद! आपका दान सफलतापूर्वक दर्ज किया गया है।",
                    "Thank you! Your donation has been recorded successfully.",
                  )}
                </h2>
                <p className="donate-success__msg-hi">
                  {t(
                    "हम शीघ्र ही आपसे संपर्क करेंगे और रसीद प्रदान करेंगे।",
                    "We will contact you shortly with a receipt.",
                  )}
                </p>
                <div className="donate-success__actions">
                  <Link to="/" className="donate-btn donate-btn--outline">
                    <FaHouse className="inline-icon" /> {t("होम पेज", "Home")}
                  </Link>
                  <button
                    type="button"
                    className="donate-btn donate-btn--primary"
                    onClick={handleNewDonation}
                  >
                    <FaRotateRight className="inline-icon" />{" "}
                    {t("और दान करें", "Donate Again")}
                  </button>
                </div>
              </div>
            ) : (
              /* --- Donation Form --- */
              <form
                className="donate-form-card"
                onSubmit={handleSubmit}
                noValidate
              >
                {/* Step 1: Donation Amount */}
                <div className="donate-form__section">
                  <div className="donate-form__section-header">
                    <span className="donate-form__step-num">1</span>
                    <div>
                      <h2 className="donate-form__section-title-hi">
                        {t("सहयोग राशि", "Donated Amount")}
                      </h2>
                    </div>
                  </div>

                  <div className="donate-custom-amount">
                    <label className="donate-label">
                      <span className="donate-label__hi">
                        {t("राशि दर्ज करें", "Enter donated amount")} *
                      </span>
                    </label>
                    <div className="donate-input-prefix">
                      <span className="donate-input-prefix__symbol">₹</span>
                      <input
                        type="number"
                        className={`donate-input ${errors.amount ? "donate-input--error" : ""}`}
                        placeholder={t("राशि दर्ज करें", "Enter amount")}
                        min="1"
                        value={customAmount}
                        onChange={handleCustomAmountChange}
                      />
                    </div>
                  </div>

                  {errors.amount && (
                    <p className="donate-error">{errors.amount}</p>
                  )}
                </div>

                {/* Step 2: Donor Information */}
                <div className="donate-form__section">
                  <div className="donate-form__section-header">
                    <span className="donate-form__step-num">2</span>
                    <div>
                      <h2 className="donate-form__section-title-hi">
                        {t("दानदाता की जानकारी", "Donor Information")}
                      </h2>
                    </div>
                  </div>

                  <div className="donate-fields-grid">
                    {/* Full Name */}
                    <div className="donate-field">
                      <label className="donate-label">
                        <span className="donate-label__hi">
                          {t("पूरा नाम", "Full Name")} *
                        </span>
                      </label>
                      <input
                        type="text"
                        className={`donate-input ${errors.name ? "donate-input--error" : ""}`}
                        placeholder={t(
                          "अपना पूरा नाम दर्ज करें",
                          "Enter your full name",
                        )}
                        value={name}
                        onChange={(e) => {
                          setName(e.target.value);
                          setErrors((p) => ({ ...p, name: "" }));
                        }}
                        required
                      />
                      {errors.name && (
                        <p className="donate-error">{errors.name}</p>
                      )}
                    </div>

                    {/* Phone */}
                    <div className="donate-field">
                      <label className="donate-label">
                        <span className="donate-label__hi">
                          {t("मोबाइल नंबर", "Phone Number")} *
                        </span>
                      </label>
                      <input
                        type="tel"
                        className={`donate-input ${errors.phone ? "donate-input--error" : ""}`}
                        placeholder={t(
                          "10 अंकों का मोबाइल नंबर",
                          "10-digit mobile number",
                        )}
                        pattern="[0-9]{10}"
                        maxLength={10}
                        value={phone}
                        onChange={(e) => {
                          setPhone(e.target.value.replace(/\D/g, ""));
                          setErrors((p) => ({ ...p, phone: "" }));
                        }}
                        required
                      />
                      {errors.phone && (
                        <p className="donate-error">{errors.phone}</p>
                      )}
                    </div>

                    {/* Email */}
                    <div className="donate-field">
                      <label className="donate-label">
                        <span className="donate-label__hi">
                          {t("ईमेल (वैकल्पिक)", "Email (Optional)")}
                        </span>
                      </label>
                      <input
                        type="email"
                        className="donate-input"
                        placeholder="email@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>

                    {/* PAN */}
                    <div className="donate-field">
                      <label className="donate-label">
                        <span className="donate-label__hi">
                          {t("पैन नंबर (वैकल्पिक)", "PAN Number (Optional)")}
                        </span>
                      </label>
                      <input
                        type="text"
                        className="donate-input"
                        placeholder="ABCDE1234F"
                        maxLength={10}
                        value={pan}
                        onChange={(e) => setPan(e.target.value.toUpperCase())}
                      />
                      <span className="donate-field__hint">
                        {t("कर रसीद के लिए", "For tax receipt")}
                      </span>
                    </div>

                    {/* Address - full width */}
                    <div className="donate-field donate-field--full">
                      <label className="donate-label">
                        <span className="donate-label__hi">
                          {t("पता (वैकल्पिक)", "Address (Optional)")}
                        </span>
                      </label>
                      <textarea
                        className="donate-input donate-textarea"
                        rows={2}
                        placeholder={t(
                          "अपना पता दर्ज करें",
                          "Enter your address",
                        )}
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                      />
                    </div>

                    {/* Message / Sankalp - full width */}
                    <div className="donate-field donate-field--full">
                      <label className="donate-label">
                        <span className="donate-label__hi">
                          {t(
                            "संकल्प / संदेश (वैकल्पिक)",
                            "Message / Sankalp (Optional)",
                          )}
                        </span>
                      </label>
                      <textarea
                        className="donate-input donate-textarea"
                        rows={3}
                        placeholder={t(
                          "अपनी भावना या संकल्प लिखें...",
                          "Write your message or sankalp...",
                        )}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                {/* Step 3: Payment Verification */}
                <div className="donate-form__section">
                  <div className="donate-form__section-header">
                    <span className="donate-form__step-num">3</span>
                    <div>
                      <h2 className="donate-form__section-title-hi">
                        {t("भुगतान सत्यापन", "Payment Verification")}
                      </h2>
                    </div>
                  </div>

                  <div className="donate-payment-note">
                    <p className="donate-payment-note__hi">
                      {t(
                        "कृपया नीचे दिए गए बैंक विवरण या QR कोड से भुगतान करें और भुगतान का प्रमाण अपलोड करें",
                        "Please make payment using bank details or QR code below, then provide proof of payment",
                      )}
                    </p>
                  </div>

                  {/* UTR Field */}
                  <div className="donate-field">
                    <label className="donate-label">
                      <span className="donate-label__hi">
                        {t(
                          "UTR / Transaction ID दर्ज करें",
                          "UTR / Transaction ID",
                        )}
                      </span>
                    </label>
                    <input
                      type="text"
                      className={`donate-input ${errors.payment ? "donate-input--error" : ""}`}
                      placeholder="UTR / Transaction ID"
                      value={utr}
                      onChange={(e) => {
                        setUtr(e.target.value);
                        setErrors((p) => ({ ...p, payment: "" }));
                      }}
                    />
                  </div>

                  <div className="donate-or-divider">
                    <span>{t("या", "OR")}</span>
                  </div>

                  {/* Screenshot Upload */}
                  <div className="donate-field">
                    <label className="donate-label">
                      <span className="donate-label__hi">
                        {t(
                          "भुगतान का स्क्रीनशॉट अपलोड करें",
                          "Upload Payment Screenshot",
                        )}
                      </span>
                    </label>
                    <div
                      className="donate-upload-zone"
                      onClick={() => fileInputRef.current?.click()}
                      onDrop={handleFileDrop}
                      onDragOver={handleDragOver}
                    >
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        className="donate-upload-zone__input"
                        onChange={handleFileChange}
                      />
                      {screenshotPreview ? (
                        <div className="donate-upload-preview">
                          <img
                            src={screenshotPreview}
                            alt={t(
                              "भुगतान स्क्रीनशॉट",
                              "Payment screenshot preview",
                            )}
                            className="donate-upload-preview__img"
                          />
                          <button
                            type="button"
                            className="donate-upload-preview__remove"
                            onClick={(e) => {
                              e.stopPropagation();
                              removeScreenshot();
                            }}
                          >
                            <FaXmark className="inline-icon" />{" "}
                            {t("हटाएं", "Remove")}
                          </button>
                        </div>
                      ) : (
                        <div className="donate-upload-zone__content">
                          <span className="donate-upload-zone__icon">
                            <FaCloudArrowUp />
                          </span>
                          <p className="donate-upload-zone__text">
                            {t(
                              "क्लिक करें या फ़ाइल यहाँ ड्रॉप करें",
                              "Click or drag & drop image here",
                            )}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  {errors.payment && (
                    <p className="donate-error">{errors.payment}</p>
                  )}
                </div>

                {/* Submit Button */}
                <button type="submit" className="donate-submit-btn" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <span className="donate-submit-btn__spinner" style={{display: 'inline-block', width: '20px', height: '20px', border: '2px solid rgba(255,255,255,0.3)', borderRadius: '50%', borderTopColor: '#fff', animation: 'spin 1s ease-in-out infinite'}} />
                  ) : (
                    <>
                      <span className="donate-submit-btn__icon">
                        <FaHandsPraying />
                      </span>
                      <span>{t("दान जमा करें", "Submit Donation")}</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* ===== RIGHT COLUMN: Payment Information ===== */}
          <div className="donate-info-col">
            {/* QR / UPI Card */}
            <div className="donate-info-card donate-upi-card">
              <h3 className="donate-info-card__title">
                <span className="donate-info-card__title-icon">
                  <FaMobileScreen />
                </span>
                {t("स्कैन करें और भुगतान करें", "SCAN & PAY")}
              </h3>
              <div className="donate-upi-card__body">
                <div className="donate-upi-card__qr-img-wrapper">
                  <img
                    src="/images/QR_Code.png"
                    alt="Donation QR Code"
                    className="donate-upi-card__qr-img"
                  />
                  <small>
                    {t(
                      "किसी भी UPI ऐप से स्कैन करें",
                      "Scan using any UPI app",
                    )}
                  </small>
                </div>
                <div className="donate-upi-card__details">
                  <p className="donate-upi-card__name">
                    SHIV KHATUSHYAMJI TEMPLE DEVBHOOMI
                  </p>
                  <div className="donate-upi-card__id-row">
                    <span className="donate-upi-card__label">UPI ID:</span>
                    <span className="donate-upi-card__value">
                      shivkhatushyamtemple@aubiz
                    </span>
                  </div>
                  <button
                    type="button"
                    className="donate-copy-btn"
                    onClick={() =>
                      copyToClipboard("shivkhatushyamtemple@aubiz", "upi")
                    }
                  >
                    {copiedField === "upi" ? (
                      <>
                        <FaCheck className="inline-icon" />{" "}
                        {t("कॉपी हो गया!", "Copied!")}
                      </>
                    ) : (
                      <>
                        <FaCopy className="inline-icon" />{" "}
                        {t("UPI ID कॉपी करें", "Copy UPI ID")}
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Bank Details Card */}
            <div className="donate-info-card donate-bank-card">
              <h3 className="donate-info-card__title">
                <span className="donate-info-card__title-icon">
                  <FaBuildingColumns />
                </span>
                <span>{t("बैंक विवरण", "Bank Account Details")}</span>
              </h3>
              <div className="donate-bank-rows">
                {BANK_DETAILS.map((item) => (
                  <div className="donate-bank-row" key={item.label}>
                    <span className="donate-bank-row__label">
                      {t(item.labelHi, item.label)}
                    </span>
                    <span className="donate-bank-row__value">
                      {item.value}
                      {item.copyable && (
                        <button
                          type="button"
                          className="donate-copy-btn donate-copy-btn--inline"
                          onClick={() =>
                            copyToClipboard(item.value, item.label)
                          }
                        >
                          {copiedField === item.label ? (
                            <FaCheck />
                          ) : (
                            <FaCopy />
                          )}
                        </button>
                      )}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Donate;
