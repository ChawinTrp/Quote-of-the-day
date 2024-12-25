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
                    // Try to get error details from the API response (if available)
                    let errorMessage = `HTTP error ${response.status}`;
                    try {
                        const errorData = await response.json();
                        errorMessage += `: ${errorData?.message || response.statusText}`;
                    } catch (jsonError) {
                        // Ignore JSON parsing errors if the response isn't JSON
                    }
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
        return <p>Loading quote...</p>;
    }

    if (error) {
        return <p style={{ color: 'red' }}>Error: {error}</p>;
    }

    if (!quote) {
        return <p>No quote available.</p>;
    }

    return (
        <div>
            <p>"{quote.quote}"</p>
            <p>- {quote.author}</p>
        </div>
    );
};

export default Quote; 