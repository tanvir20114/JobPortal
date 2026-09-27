import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router'
import useMessageApi from '../../api/useMessageApi'
import ConversationList from './ConversationList'
import ChatWindow from './ChatWindow'
import { notifyError } from '../../utils/notify.js'


const POLL_INTERVAL_MS = 8000;

export default function Messages() {
    const { conversationsPromise } = useMessageApi();
    const location = useLocation();
    const [conversations, setConversations] = useState([]);
    const [selected, setSelected] = useState(location.state?.conversation || null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let cancelled = false;

        const load = async () => {
            try {
                const data = await conversationsPromise();
                if (!cancelled) {
                    setConversations(data);
                    if (!selected && data.length > 0) setSelected(data[0]);
                }
            } catch (error) {
                notifyError(error);
            } finally {
                if (!cancelled) setLoading(false);
            }
        };

        load();
        const interval = setInterval(load, POLL_INTERVAL_MS);
        return () => {
            cancelled = true;
            clearInterval(interval);
        };
    }, []);

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 h-[70vh] border rounded-box overflow-hidden mt-4">
            <div className="md:col-span-1 border-r overflow-y-auto">
                {loading ? (
                    <p className="p-4 opacity-50">লোড হচ্ছে...</p>
                ) : (
                    <ConversationList
                        conversations={conversations}
                        selectedId={selected?._id}
                        onSelect={setSelected}
                    />
                )}
            </div>
            <div className="md:col-span-2">
                <ChatWindow conversation={selected} />
            </div>
        </div>
    )
}