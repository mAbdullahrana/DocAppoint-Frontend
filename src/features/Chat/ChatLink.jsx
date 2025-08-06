import { Link } from 'react-router-dom'
import { MessageCircle } from 'lucide-react'

function ChatLink() {
  return (
    <Link
      to="/dashboard/chat"
      className="inline-flex items-center gap-2 px-4 py-2 bg-secondary text-surface rounded-lg hover:bg-secondary-light transition"
      style={{
        background: 'var(--color-secondary)',
        color: 'var(--color-surface)',
      }}
    >
      <MessageCircle size={16} />
      Messages
    </Link>
  )
}

export default ChatLink
