import ChatContainer from "@/components/ChatContainer"
import { auth } from "@/auth"

type Params = {                      // 講座流
params: Promise<{
conversationId: string
  }>
}





type DifyMessage = {
  id?: string;
  query: string;
  answer: string;
}

type Message = {
    id?: string;
    role: 'user' | 'assistant';
    content: string;
}

const endpoint =  `${process.env.DIFY_API_URL}/messages`
const DIFY_API_KEY = process.env.DIFY_API_KEY

export default async function ChatPage({params}: Params) {
// 上記講座流


    const session = await auth()
    const userId = session?.user?.id as string

    const { conversationId } = await params // 講座流

    const messages: Message[] = []

  // ✅ ここにログを追加（検証のため）
    console.log('endpoint:', endpoint)
    console.log('DIFY_API_KEY:', DIFY_API_KEY) // 念のためキーも確認
    console.log('userId:', userId)
    console.log('conversationId:', conversationId)


    try {

      const response = await fetch(`${endpoint}?user=${userId}&conversation_id=${conversationId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${DIFY_API_KEY}`
            },
            cache: 'no-store'
          })

        const data = await response.json()

        // ✅ APIレスポンスの中身を確認
        console.log('data:', data)

        if(data.data){
          data.data.forEach((message: DifyMessage)=>{
            if(message.query){
              messages.push({
                id:`${message.id}-user`,
                role: 'user',
                content: message.query
              })
            }

            if(message.answer){
              messages.push({
                id: `${message.id}`,
                role: 'assistant',
                content: message.answer
              })
            }
          })
        }
    // ✅ 最終的に渡すメッセージ配列を確認
    console.log('messages:', messages)

    } catch(error){
      console.error('メッセージ取得不可',error)
    }

  return (
    <ChatContainer
      isNewChat={false}
      initialMessages={messages} 
      conversationId={conversationId}
      userId={userId} />
  )
}
