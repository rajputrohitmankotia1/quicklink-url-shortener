import { useState } from "react";
import "./App.css";

function App() {
  const [longUrl, setLongUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const shortenUrl = async () => {
    if (!longUrl) {
      setError("Please enter a valid URL");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setShortUrl("");

      const response = await fetch(
        `https://tinyurl.com/api-create.php?url=${encodeURIComponent(longUrl)}`
      );

      const data = await response.text();

      if (data.startsWith("http")) {
        setShortUrl(data);
      } else {
        setError("Failed to shorten URL");
      }
    } catch (err) {
      setError("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shortUrl);
  };

  const resetAll = () => {
    setLongUrl("");
    setShortUrl("");
    setError("");
  };

  return (
    <div className="background">

      <div className="content-wrapper">

        {/* CARD */}
        <div className="card">
          <h1 className="logo">🔗 QuickLink</h1>
          <p className="subtitle">Modern URL Shortener</p>

          <input
            type="text"
            placeholder="Paste your long URL..."
            value={longUrl}
            onChange={(e) => setLongUrl(e.target.value)}
          />

          <button onClick={shortenUrl} disabled={loading}>
            {loading ? "Shortening..." : "Shorten URL"}
          </button>

          {error && <p className="error">{error}</p>}

          {shortUrl && (
            <div className="result">
              <input type="text" value={shortUrl} readOnly />
              <button className="copy-btn" onClick={copyToClipboard}>
                Copy
              </button>
            </div>
          )}

          {(shortUrl || error) && (
            <button className="reset-btn" onClick={resetAll}>
              Reset
            </button>
          )}
        </div>

        {/* AD SECTION */}
        <div className="ad-section">
          <p className="ad-label">Sponsored</p>
          <div className="ad-box">
            Your Ad Goes Here
          </div>
        </div>

        {/* SEO CONTENT */}
        <div className="seo-content">
          <h2>Why Use QuickLink?</h2>
          <p>
            QuickLink is a free online URL shortener tool for WhatsApp, Instagram, YouTube and social media. Instantly convert long links into short, shareable URLs with no signup required.
          </p>

          <h3>Features</h3>
          <ul>
            <li>Instant link shortening</li>
            <li>Secure and reliable</li>
            <li>No sign-up required</li>
            <li>Mobile-friendly design</li>
          </ul>
        </div>
{/* FAQ Section */}
<div className="faq-section">
  <h2>Frequently Asked Questions</h2>

  <div className="faq-item">
    <h4>Is QuickLink free to use?</h4>
    <p>
      Yes, QuickLink is completely free. You can shorten unlimited links
      without creating an account.
    </p>
  </div>

  <div className="faq-item">
    <h4>How do I shorten a URL?</h4>
    <p>
      Simply paste your long URL into the input field and click the
      "Shorten URL" button. Your short link will be generated instantly.
    </p>
  </div>

  <div className="faq-item">
    <h4>Is the shortened link permanent?</h4>
    <p>
      Yes, the generated link will continue to work as long as the service
      remains active.
    </p>
  </div>

  <div className="faq-item">
    <h4>Can I use QuickLink for WhatsApp or Instagram?</h4>
    <p>
      Absolutely. QuickLink is perfect for shortening long links for
      WhatsApp messages, Instagram bios, YouTube descriptions, and more.
    </p>
  </div>

</div>

      </div>
    </div>
  );
}

export default App;
