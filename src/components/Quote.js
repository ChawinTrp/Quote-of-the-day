'use client';
import { useState, useEffect } from 'react';

const Quote = () => {
    const [quote, setQuote] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchQuote = async () => {
            setLoading(true);
            try {
                const response = await fetch('https://quotes-api-self.vercel.app/quote');
                if (!response.ok) {
                    let errorMessage = `HTTP error ${response.status}`;
                    try {
                        const errorData = await response.json();
                        errorMessage += `: ${errorData?.message || response.statusText}`;
                    } catch (jsonError) { /* Ignore JSON parsing errors */ }
                    throw new Error(errorMessage);
                }
                const data = await response.json();
                setQuote(data);
            } catch (err) {
                console.error("Error fetching quote:", err);
                setError(err.message || "Failed to fetch quote.");
            } finally {
                setLoading(false);
            }
        };

        fetchQuote();
    }, []);

    if (loading) {
        return (
            <div className="quote-container loading">
                <p>Loading quote...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="quote-container error">
                <p style={{ color: 'red' }}>Error: {error}</p>
            </div>
        );
    }

    if (!quote) {
        return (
            <div className="quote-container no-quote">
                <p>No quote available.</p>
            </div>
        );
    }

    return (
        <div className="quote-container">
            <div className="quote-content"> {/* Added a wrapper for styling */}
                <h1 className='quote-header'>Quote of the Day</h1>
                <p className="quote-text">"{quote.quote}"</p>
                <p className="quote-author">- {quote.author}</p>
            </div>
        </div>
    );
};

export default Quote;