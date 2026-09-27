import React from 'react'
import useAuth from '../../hooks/useAuth'

export default function ConversationList({ conversations, selectedId, onSelect }) {
    const { user } = useAuth();

    if (conversations.length === 0) {
        return <p className="p-4 opacity-50">এখনো কোনো কথোপকথন নেই</p>;
    }

    return (
        <ul className="menu w-full">
            {conversations.map(conv => {
                const otherEmail = conv.participants.find(p => p !== user.email);
                return (
                    <li key={conv._id}>
                        <a
                            className={selectedId === conv._id ? 'active' : ''}
                            onClick={() => onSelect(conv)}
                        >
                            <div className="flex flex-col items-start">
                                <span className="font-semibold">{otherEmail}</span>
                                <span className="text-xs opacity-60 truncate max-w-52">
                                    {conv.lastMessage || 'কথোপকথন শুরু করুন'}
                                </span>
                            </div>
                        </a>
                    </li>
                );
            })}
        </ul>
    )
}