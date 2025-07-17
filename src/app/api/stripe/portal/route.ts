import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { stripe } from "@/lib/stripe";
import { getStripeCustomerId } from "@/lib/stripe/session";

export async function POST(){
    try{
        const session = await auth()
        const userId = session?.user?.id as string

        // StripeカスタマーIDの取得
        const stripeCustomerId = await getStripeCustomerId(userId)


// ──────────────── ①stripeCustomerId をログ出力 ────────────────
        console.log('✨ stripeCustomerId:', stripeCustomerId)



        if(!stripeCustomerId){
            return NextResponse.json(
                { error: 'サブスクリプションが見つかりません'},
                { status: 404}
            )
        }

        // Stripeカスタマーポータルセッションの作成
        const portalSession = await stripe.billingPortal.sessions.create({
            customer: stripeCustomerId,
            return_url: `${process.env.NEXT_PUBLIC_APP_URL}/subscription`
        })

// ──────────────── ②portalSession をログ出力 ────────────────
        console.log('✨ portalSession:', portalSession)


        return NextResponse.json({ url: portalSession.url })

    //} catch(error){
    //    console.error('カスタマーポータルエラー', error)

    
    } catch (error: any) {
        // エラー詳細をログ出力
        console.error('✨ stripeCustomerId (再確認):', error?.stripeCustomerId);
        console.error('✨ portalSession エラー詳細 message:', error.message);
        console.error('✨ portalSession エラー詳細 stack:', error.stack);
        console.error('✨ stripe API エラーオブジェクト:', error);



        return NextResponse.json(
            { error: 'ポータルセッションの作成に失敗しました' },
            { status: 500}
        )
    }
}