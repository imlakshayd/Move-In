import React, { useEffect, useMemo, useRef, useState } from "react";
import "./CustomerMessagesPage.css";
import {
  Phone,
  Video,
  MoreVertical,
  Search,
  CheckCircle2,
  Send,
} from "lucide-react";

const INITIAL_CONVERSATIONS = [
  {
    id: "swift",
    name: "Swift Movers LLC",
    company: "Swift Movers LLC",
    online: true,
    unread: 2,
    timeLabel: "10:30 AM",
    preview: "I can start at 9 AM on the 25th. Does that work for you?",
    verified: true,
    avatar: "SW",
    messages: [
      {
        sender: "vendor",
        text: "Hi! Thanks for booking with Swift Movers. I wanted to confirm your move details.",
        time: "10:15 AM",
      },
      {
        sender: "customer",
        text: "Hi! Yes, I need to move from 123 Main St to 456 Oak Ave on November 25th.",
        time: "10:18 AM",
      },
      {
        sender: "vendor",
        text: "Perfect! What time works best for you?",
        time: "10:20 AM",
      },
      {
        sender: "customer",
        text: "Would 9 AM be possible?",
        time: "10:25 AM",
      },
      {
        sender: "vendor",
        text: "I can start at 9 AM on the 25th. Does that work for you?",
        time: "10:30 AM",
      },
    ],
  },
  {
    id: "city",
    name: "City Haulers",
    company: "City Haulers",
    online: false,
    unread: 1,
    timeLabel: "Nov 18",
    preview: "We offer packing services as well. Would you like to add them?",
    verified: true,
    avatar: "CH",
    messages: [
      {
        sender: "vendor",
        text: "We offer packing services as well. Would you like to add them?",
        time: "9:15 AM",
      },
    ],
  },
  {
    id: "pro",
    name: "Pro Transport Co.",
    company: "Pro Transport Co.",
    online: false,
    unread: 0,
    timeLabel: "Oct 15",
    preview: "Thanks again for choosing us.",
    verified: true,
    avatar: "PT",
    messages: [
      {
        sender: "vendor",
        text: "Thanks again for choosing us.",
        time: "1:10 PM",
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

export default function CustomerMessagesPage({ selectedVendor }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [conversations, setConversations] = useState(INITIAL_CONVERSATIONS);
  const [selectedConversationId, setSelectedConversationId] = useState(
    selectedVendor?.vendorId || INITIAL_CONVERSATIONS[0]?.id
  );
  const [newMessage, setNewMessage] = useState("");

  const chatBodyRef = useRef(null);

  useEffect(() => {
    if (!selectedVendor?.vendorId) return;

    setConversations((prev) => {
      const exists = prev.some((c) => c.id === selectedVendor.vendorId);
      if (exists) return prev;

      return [
        {
          id: selectedVendor.vendorId,
          name: selectedVendor.vendorName,
          company: selectedVendor.vendorName,
          online: true,
          unread: 0,
          timeLabel: "Now",
          preview: "Start your conversation here...",
          verified: true,
          avatar: getInitials(selectedVendor.vendorName),
          messages: [
            {
              sender: "vendor",
              text: `Hi! This is ${selectedVendor.vendorName}. How can I help with your booking ${selectedVendor.bookingId}?`,
              time: getCurrentTimeLabel(),
            },
          ],
        },
        ...prev,
      ];
    });

    setSelectedConversationId(selectedVendor.vendorId);
  }, [selectedVendor]);

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
                  sender: "customer",
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
    return <div className="messages-page-wrap">No conversations yet.</div>;
  }

  return (
    <div className="messages-page-wrap">
      <section className="messages-shell">
        <aside className="messages-sidebar">
          <div className="messages-search">
            <Search size={16} />
            <input
              type="text"
              placeholder="Search conversations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="conversation-list">
            {filteredConversations.map((conversation) => (
              <button
                key={conversation.id}
                className={`conversation-item ${
                  selectedConversationId === conversation.id ? "active" : ""
                }`}
                onClick={() => setSelectedConversationId(conversation.id)}
              >
                <div className="conversation-avatar-wrap">
                  <div className="conversation-avatar">{conversation.avatar}</div>
                  <span className="conversation-online-dot"></span>
                </div>

                <div className="conversation-content">
                  <div className="conversation-row-top">
                    <div className="conversation-name-line">
                      <span className="conversation-name">{conversation.name}</span>
                      {conversation.verified && (
                        <CheckCircle2
                          size={14}
                          className="verified-icon-inline"
                        />
                      )}
                    </div>
                    <span className="conversation-time">
                      {conversation.timeLabel}
                    </span>
                  </div>

                  <div className="conversation-company">
                    {conversation.company}
                  </div>

                  <div className="conversation-row-bottom">
                    <p className="conversation-preview">{conversation.preview}</p>

                    {conversation.unread > 0 && (
                      <span className="conversation-badge">
                        {conversation.unread}
                      </span>
                    )}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </aside>

        <section className="chat-panel">
          <div className="chat-header">
            <div className="chat-header-left">
              <div className="chat-avatar">{selectedConversation.avatar}</div>

              <div>
                <div className="chat-name-row">
                  <h2>{selectedConversation.name}</h2>

                  {selectedConversation.verified && (
                    <span className="verified-badge">
                      <CheckCircle2 size={14} />
                      Verified
                    </span>
                  )}
                </div>

                <div className="chat-company">{selectedConversation.company}</div>
                <div className="chat-status">
                  {selectedConversation.online ? "Online" : "Offline"}
                </div>
              </div>
            </div>

            <div className="chat-header-actions">
              <button type="button" className="icon-btn">
                <Phone size={18} />
              </button>
              <button type="button" className="icon-btn">
                <Video size={18} />
              </button>
              <button type="button" className="icon-btn">
                <MoreVertical size={18} />
              </button>
            </div>
          </div>

          <div className="chat-body" ref={chatBodyRef}>
            {selectedConversation.messages.map((message, index) => (
              <div
                key={index}
                className={`message-row ${
                  message.sender === "customer" ? "right" : "left"
                }`}
              >
                <div className="message-group">
                  <div
                    className={`message-bubble ${
                      message.sender === "customer"
                        ? "customer-bubble"
                        : "vendor-bubble"
                    }`}
                  >
                    {message.text}
                  </div>
                  <div
                    className={`message-time ${
                      message.sender === "customer" ? "time-right" : "time-left"
                    }`}
                  >
                    {message.time}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="chat-input-bar">
            <input
              type="text"
              className="chat-input"
              placeholder={`Message ${selectedConversation.name}...`}
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <button
              type="button"
              className="send-btn"
              onClick={handleSendMessage}
            >
              <Send size={18} />
              Send
            </button>
          </div>
        </section>
      </section>
    </div>
  );
}