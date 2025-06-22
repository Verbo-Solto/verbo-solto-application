import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Send, Paperclip, Smile } from "lucide-react"

export function ChatInterface() {
  const conversations = [
    {
      id: 1,
      name: "Sarah Wilson",
      lastMessage: "Hey, how are you doing today?",
      time: "2m ago",
      unread: 2,
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 2,
      name: "Mike Johnson",
      lastMessage: "Can we schedule a meeting for tomorrow?",
      time: "1h ago",
      unread: 0,
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 3,
      name: "Team Chat",
      lastMessage: "Great work on the project everyone!",
      time: "3h ago",
      unread: 5,
      avatar: "/placeholder.svg?height=40&width=40",
    },
  ]

  const messages = [
    {
      id: 1,
      sender: "Sarah Wilson",
      content: "Hey! How's your day going?",
      time: "10:30 AM",
      isOwn: false,
    },
    {
      id: 2,
      sender: "You",
      content: "Pretty good! Just working on some designs. How about you?",
      time: "10:32 AM",
      isOwn: true,
    },
    {
      id: 3,
      sender: "Sarah Wilson",
      content: "Same here! I'm excited to see what you're working on. Can you share a preview?",
      time: "10:35 AM",
      isOwn: false,
    },
    {
      id: 4,
      sender: "You",
      content: "I'll send it over in a few minutes.",
      time: "10:36 AM",
      isOwn: true,
    },
  ]

  return (
    <div className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-6">
      {/* Conversations List */}
      <Card className="lg:col-span-1 p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-[#131313]">Messages</h3>
          <Button size="sm" className="bg-[#009c3b] hover:bg-[#009c3b]/90">
            New Chat
          </Button>
        </div>

        <div className="space-y-3">
          {conversations.map((conv) => (
            <div key={conv.id} className="flex items-center gap-3 p-3 rounded-lg hover:bg-[#f4f4f4] cursor-pointer">
              <Avatar>
                <AvatarImage src={conv.avatar || "/placeholder.svg"} />
                <AvatarFallback>
                  {conv.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <p className="font-medium text-[#131313] truncate">{conv.name}</p>
                  <span className="text-xs text-[#6e6e6e]">{conv.time}</span>
                </div>
                <p className="text-sm text-[#6e6e6e] truncate">{conv.lastMessage}</p>
              </div>
              {conv.unread > 0 && (
                <div className="w-5 h-5 bg-[#009c3b] rounded-full flex items-center justify-center">
                  <span className="text-xs text-white font-medium">{conv.unread}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </Card>

      {/* Chat Window */}
      <Card className="lg:col-span-2 flex flex-col h-[600px]">
        {/* Chat Header */}
        <div className="flex items-center gap-3 p-4 border-b border-[#e2e2e2]">
          <Avatar>
            <AvatarImage src="/placeholder.svg?height=40&width=40" />
            <AvatarFallback>SW</AvatarFallback>
          </Avatar>
          <div>
            <h4 className="font-medium text-[#131313]">Sarah Wilson</h4>
            <p className="text-sm text-[#6e6e6e]">Online</p>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 p-4 space-y-4 overflow-y-auto">
          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.isOwn ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                  message.isOwn ? "bg-[#009c3b] text-white" : "bg-[#f4f4f4] text-[#131313]"
                }`}
              >
                <p className="text-sm">{message.content}</p>
                <p className={`text-xs mt-1 ${message.isOwn ? "text-white/70" : "text-[#6e6e6e]"}`}>{message.time}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Message Input */}
        <div className="p-4 border-t border-[#e2e2e2]">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="text-[#6e6e6e]">
              <Paperclip className="w-4 h-4" />
            </Button>
            <Input placeholder="Type a message..." className="flex-1" />
            <Button variant="ghost" size="icon" className="text-[#6e6e6e]">
              <Smile className="w-4 h-4" />
            </Button>
            <Button size="icon" className="bg-[#009c3b] hover:bg-[#009c3b]/90">
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )
}
