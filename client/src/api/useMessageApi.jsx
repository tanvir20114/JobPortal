import React from 'react'
import useAxiosSecure from '../hooks/useAxiosSecure'

export default function useMessageApi() {
    const axiosSecure = useAxiosSecure();

    const conversationsPromise = async () => {
        return await axiosSecure.get('/messages/conversations').then(res => res.data)
    }

    const startConversation = async ({ jobId, applicationId, otherEmail }) => {
        return await axiosSecure.post('/messages/conversations', { jobId, applicationId, otherEmail }).then(res => res.data)
    }

    const getMessages = async (conversationId) => {
        return await axiosSecure.get(`/messages/conversations/${conversationId}/messages`).then(res => res.data)
    }

    const sendMessage = async (conversationId, text) => {
        return await axiosSecure.post(`/messages/conversations/${conversationId}/messages`, { text }).then(res => res.data)
    }

    return {
        conversationsPromise,
        startConversation,
        getMessages,
        sendMessage,
    };
}