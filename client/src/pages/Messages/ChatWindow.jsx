import React, { useEffect, useRef, useState } from 'react'
import useAuth from '../../hooks/useAuth'
import useMessageApi from '../../api/useMessageApi'
import { notifyError } from '../../utils/notify.js'

const POLL_INTERVAL_MS = 4000;

export default function ChatWindow({ conversation }) {
    const { user } = useAuth();
    const { getMessages, sendMessage } = useMessageApi();
    const [messages, setMessages] = useState([]);
    const [text, setText] = useState('');
    const [loading, setLoading] = useState(true);
    const bottomRef = useRef(null);

    useEffect(() => {
        if (!conversation?._id) return;
        let cancelled = false;

        const load = async () => {
            try {
                const data = await getMessages(conversation._id);
                if (!cancelled) setMessages(data);
            } catch (error) {
                notifyError(error);
            } finally {
                if (!cancelled) setLoading(false);
            }
        };

        setLoading(true);
        load();
        const interval = setInterval(load, POLL_INTERVAL_MS);

        return () => {
            cancelled = true;
            clearInterval(interval);
        };
    }, [conversation?._id]);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSend = async (e) => {
        e.preventDefault();
        const trimmed = text.trim();
        if (!trimmed) return;
        setText('');
        try {
            const saved = await sendMessage(conversation._id, trimmed);
            setMessages(prev => [...prev, saved]);
        } catch (error) {
            notifyError(error);
        }
    };

    if (!conversation) {
        return (
            <div className="flex items-center justify-center h-full text-base-content/50">
                একটা কথোপকথন সিলেক্ট করুন
            </div>
        );
    }

    return (
        <div className="flex flex-col h-full">
            <div className="flex-1 overflow-y-auto p-4 space-y-2">
                {loading && <p className="text-center opacity-50">লোড হচ্ছে...</p>}
                {!loading && messages.length === 0 && (
                    <p className="text-center opacity-50">এখনো কোনো মেসেজ নেই, প্রথম মেসেজটা আপনিই পাঠান</p>
                )}
                {messages.map(msg => (
                    <div
                        key={msg._id}
                        className={`chat ${msg.sender === user.email ? 'chat-end' : 'chat-start'}`}
                    >
                        <div className={`chat-bubble ${msg.sender === user.email ? 'chat-bubble-primary' : ''}`}>
                            {msg.text}
                        </div>
                    </div>
                ))}
                <div ref={bottomRef}></div>
            </div>

            <form onSubmit={handleSend} className="p-3 border-t flex gap-2">
                <input
                    type="text"
                    value={text}
                    onChange={e => setText(e.target.value)}
                    placeholder="মেসেজ লিখুন..."
                    className="input input-bordered flex-1"
                />
                <button type="submit" className="btn btn-primary">Send</button>
            </form>
        </div>
    )
}