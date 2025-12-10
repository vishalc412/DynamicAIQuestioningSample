import { useEffect, useRef, useState } from 'react';

export function useSpeechSynthesis() {
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [isSupported, setIsSupported] = useState(false);
    const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

    useEffect(() => {
        if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
            setIsSupported(true);
        }
    }, []);

    // Helper function to remove emojis and special characters from text
    const removeEmojis = (text: string): string => {
        return text
            // Remove emojis
            .replace(/[\u{1F600}-\u{1F64F}]/gu, '') // Emoticons
            .replace(/[\u{1F300}-\u{1F5FF}]/gu, '') // Misc Symbols and Pictographs
            .replace(/[\u{1F680}-\u{1F6FF}]/gu, '') // Transport and Map
            .replace(/[\u{1F1E0}-\u{1F1FF}]/gu, '') // Flags
            .replace(/[\u{2600}-\u{26FF}]/gu, '')   // Misc symbols
            .replace(/[\u{2700}-\u{27BF}]/gu, '')   // Dingbats
            .replace(/[\u{1F900}-\u{1F9FF}]/gu, '') // Supplemental Symbols and Pictographs
            .replace(/[\u{1FA00}-\u{1FA6F}]/gu, '') // Chess Symbols
            .replace(/[\u{1FA70}-\u{1FAFF}]/gu, '') // Symbols and Pictographs Extended-A
            // Clean up extra spaces
            .replace(/\s+/g, ' ')
            .trim();
    };

    const speak = (text: string, options?: { rate?: number; pitch?: number; volume?: number }) => {
        if (!isSupported || !text) return;

        // Remove emojis before speaking
        const cleanText = removeEmojis(text);

        // Cancel any ongoing speech
        window.speechSynthesis.cancel();

        const utterance = new SpeechSynthesisUtterance(cleanText);
        utterance.rate = options?.rate || 1.0;
        utterance.pitch = options?.pitch || 1.0;
        utterance.volume = options?.volume || 1.0;
        utterance.lang = 'en-US';

        utterance.onstart = () => setIsSpeaking(true);
        utterance.onend = () => setIsSpeaking(false);
        utterance.onerror = () => setIsSpeaking(false);

        utteranceRef.current = utterance;
        window.speechSynthesis.speak(utterance);
    };

    const stop = () => {
        if (isSupported) {
            window.speechSynthesis.cancel();
            setIsSpeaking(false);
        }
    };

    const toggle = (text: string) => {
        if (isSpeaking) {
            stop();
        } else {
            speak(text);
        }
    };

    return {
        speak,
        stop,
        toggle,
        isSpeaking,
        isSupported,
    };
}
