import React, { useEffect, useMemo, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import "./VendorMessagesPage.css";

const INITIAL_CONVERSATIONS = [
  {
    id: "maya-hayes",
    name: "Maya Hayes",
    bookingId: "BK-2024-045",
    listing: "16ft Box Truck",
    online: true,
    unread: 1,
    timeLabel: "10:30 AM",
    preview: "Would 9 AM still work for the move?",
    avatar: "MH",
    messages: [
      {
        sender: "customer",
        text: "Hi, just checking if 9 AM still works for the move.",
        time: "10:25 AM",
      },
      {
        sender: "vendor",
        text: "Yes, 9 AM works perfectly. I'll be there on time.",
        time: "10:30 AM",
      },
    ],
  },
  {
    id: "mike-chen",
    name: "Mike Chen",
    bookingId: "BK-2024-044",
    listing: "16ft Box Truck",
    online: false,
    unread: 0,
    timeLabel: "Yesterday",
    preview: "Thanks again for the great service.",
    avatar: "MC",
    messages: [
      {
        sender: "customer",
        text: "Thanks again for the great service.",
        time: "3:15 PM",
      },
    ],
  },
];

function getInitials(name = "") {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function getCurrentTimeLabel() {
  return new Date().toLocaleTimeString([], {
    hour: "numeric",
    minute: "2-digit",
  });
}

export default function VendorMessagesPage() {
  const location = useLocation();
  const selectedCustomer = location.state?.selectedCustomer || null;

  const [searchTerm, setSearchTerm] = useState("");
  const [conversations, setConversations] = useState(INITIAL_CONVERSATIONS);
  const [selectedConversationId, setSelectedConversationId] = useState(
    selectedCustomer?.customerId || INITIAL_CONVERSATIONS[0]?.id
  );
  const [newMessage, setNewMessage] = useState("");

  const chatBodyRef = useRef(null);

  useEffect(() => {
    if (!selectedCustomer?.customerId) return;

    setConversations((prev) => {
      const exists = prev.some((c) => c.id === selectedCustomer.customerId);
      if (exists) return prev;

      return [
        {
          id: selectedCustomer.customerId,
          name: selectedCustomer.customerName,
          bookingId: selectedCustomer.bookingId,
          listing: selectedCustomer.listing,
          online: true,
          unread: 0,
          timeLabel: "Now",
          preview: "Start your conversation here...",
          avatar: getInitials(selectedCustomer.customerName),
          messages: [
            {
              sender: "customer",
              text: `Hi, I have a question about booking ${selectedCustomer.bookingId}.`,
              time: getCurrentTimeLabel(),
            },
          ],
        },
        ...prev,
      ];
    });

    setSelectedConversationId(selectedCustomer.customerId);
  }, [selectedCustomer]);

  const filteredConversations = useMemo(() => {
    return conversations.filter((conversation) =>
      conversation.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [conversations, searchTerm]);

  const selectedConversation =
    conversations.find((c) => c.id === selectedConversationId) ||
    filteredConversations[0] ||
    conversations[0];

  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }, [selectedConversation, conversations]);

  const handleSendMessage = () => {
    const trimmed = newMessage.trim();
    if (!trimmed || !selectedConversation) return;

    const currentTime = getCurrentTimeLabel();

    setConversations((prev) =>
      prev.map((conversation) =>
        conversation.id === selectedConversation.id
          ? {
              ...conversation,
              preview: trimmed,
              timeLabel: currentTime,
              unread: 0,
              messages: [
                ...conversation.messages,
                {
                  sender: "vendor",
                  text: trimmed,
                  time: currentTime,
                },
              ],
            }
          : conversation
      )
    );

    setNewMessage("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!selectedConversation) {
    return <div className="vendor-messages-wrap">No conversations yet.</div>;
  }

  return (
    <div className="vendor-messages-wrap">
      <div className="vendor-messages-shell">
        <aside className="vendor-messages-sidebar">
          <div className="vendor-messages-search">
            <input
              type="text"
              placeholder="Search conversations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="vendor-conversation-list">
            {filteredConversations.map((conversation) => (
              <button
                key={conversation.id}
                className={`vendor-conversation-item ${
                  selectedConversationId === conversation.id ? "active" : ""
                }`}
                onClick={() => setSelectedConversationId(conversation.id)}
              >
                <div className="vendor-conversation-avatar">
                  {conversation.avatar}
                </div>

                <div className="vendor-conversation-content">
                  <div className="vendor-conversation-top">
                    <span className="vendor-conversation-name">
                      {conversation.name}
                    </span>
                    <span className="vendor-conversation-time">
                      {conversation.timeLabel}
                    </span>
                  </div>

                  <div className="vendor-conversation-sub">
                    {conversation.bookingId} • {conversation.listing}
                  </div>

                  <div className="vendor-conversation-bottom">
                    <p className="vendor-conversation-preview">
                      {conversation.preview}
                    </p>
                    {conversation.unread > 0 && (
                      <span className="vendor-conversation-badge">
                        {conversation.unread}
                      </span>
                    )}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </aside>

        <section className="vendor-chat-panel">
          <div className="vendor-chat-header">
            <div>
              <h2>{selectedConversation.name}</h2>
              <p>
                {selectedConversation.bookingId} • {selectedConversation.listing}
              </p>
            </div>
          </div>

          <div className="vendor-chat-body" ref={chatBodyRef}>
            {selectedConversation.messages.map((message, index) => (
              <div
                key={index}
                className={`vendor-message-row ${
                  message.sender === "vendor" ? "right" : "left"
                }`}
              >
                <div className="vendor-message-group">
                  <div
                    className={`vendor-message-bubble ${
                      message.sender === "vendor"
                        ? "vendor-sent-bubble"
                        : "vendor-received-bubble"
                    }`}
                  >
                    {message.text}
                  </div>
                  <div className="vendor-message-time">{message.time}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="vendor-chat-input-bar">
            <input
              type="text"
              className="vendor-chat-input"
              placeholder={`Message ${selectedConversation.name}...`}
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <button
              type="button"
              className="vendor-send-btn"
              onClick={handleSendMessage}
            >
              Send
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}