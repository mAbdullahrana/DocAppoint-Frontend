const BASE_URL = 'http://localhost:3000/api/v1'

export const createChatGroup = async (receiverId, token) => {
  const response = await fetch(`${BASE_URL}/chat-groups/create-chat-group`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ receiverId }),
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message || 'Failed to create chat group')
  }

  return response.json()
}

export const getUserChats = async (token) => {
  const response = await fetch(`${BASE_URL}/chat-groups/user-chats`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message || 'Failed to get user chats')
  }

  return response.json()
}

export const getChatById = async (chatId, token) => {
  const response = await fetch(`${BASE_URL}/chat-groups/chat/${chatId}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message || 'Failed to get chat')
  }

  return response.json()
}

export const getMessagesByChatGroup = async (chatId, token) => {
  const response = await fetch(
    `${BASE_URL}/messages/chat-group/${chatId}`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  )

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message || 'Failed to get messages')
  }

  return response.json()
}

export const createMessage = async (chatGroupId, message, token) => {
  const response = await fetch(`${BASE_URL}/messages/create-message`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ chatGroupId, message }),
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message || 'Failed to create message')
  }

  return response.json()
}
