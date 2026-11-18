
import { useEffect, useState } from "react";

export default function CurrencyRates() {
  const [rates, setRates] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    async function fetchRates() {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          "https://open.er-api.com/v6/latest/KES",
          { signal: controller.signal }
        );

        if (!response.ok) {
          throw new Error("Unable to retrieve exchange rates.");
        }

        const data = await response.json();

        if (data.result !== "success" || !data.rates) {
          throw new Error("The exchange rate service returned invalid data.");
        }

        setRates(data);
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err.message || "Something went wrong.");
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    fetchRates();

    return () => controller.abort();
  }, []);

  if (loading) {
    return <section className="currency-panel">Loading exchange rates...</section>;
  }

  if (error) {
    return (
      <section className="currency-panel">
        <h3>Currency Exchange Rates</h3>
        <p>{error}</p>
        <button onClick={() => window.location.reload()}>
          Try again
        </button>
      </section>
    );
  }

  const currencies = ["USD", "EUR", "GBP"];

  return (
    <section className="currency-panel">
      <h3>Currency Exchange Rates</h3>
      <p>1 Kenyan Shilling (KES) is approximately:</p>

      <div className="currency-grid">
        {currencies.map((currency) => (
          <div className="currency-rate" key={currency}>
            <strong>{currency}</strong>
            <span>
              {rates.rates[currency]?.toFixed(6) ?? "Unavailable"}
            </span>
          </div>
        ))}
      </div>

      <small>
        Last updated: {rates.time_last_update_utc}
      </small>

      <p className="api-credit">
        Rates by{" "}
        <a
          href="https://www.exchangerate-api.com"
          target="_blank"
          rel="noreferrer"
        >
          Exchange Rate API
        </a>
      </p>
    </section>
  );
}
