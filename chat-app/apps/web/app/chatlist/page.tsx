"use client";

import { useEffect, useState } from 'react';
import { Card, CardHeader, CardContent } from "@workspace/ui/components/card";
import { Avatar, AvatarFallback, AvatarImage } from "@workspace/ui/components/avatar";
import { ScrollArea } from "@workspace/ui/components/scroll-area";
// 引入分隔線，以備未來擴展使用，保持與 ChatPage 相同的引入風格
import { Separator } from "@workspace/ui/components/separator";
import { getProfileInfo } from '@/utils/queryer';
import { useCurrentAccount, useSuiClient } from '@mysten/dapp-kit';
// 聯絡人介面定義
interface Contact {
    id: string;
    name: string;
    lastMessage: string;
    avatarUrl: string;
}

// 靜態資料
const contacts: Contact[] = [
    { id: '1', name: "Sui Dev Team", lastMessage: "GM! The new Move package is ready.", avatarUrl: "/avatars/sui.png" },
    { id: '2', name: "Alice (Wallet 0x...)", lastMessage: "Sent 5 SUI to your address.", avatarUrl: "/avatars/alice.png" },
    { id: '3', name: "Validator Node 1", lastMessage: "Transaction confirmed: #0xabc...", avatarUrl: "/avatars/node.png" },
    { id: '4', name: "Web3 Frontend", lastMessage: "Check out the new UI component!", avatarUrl: "/avatars/web3.png" },
    { id: '5', name: "Market Data Bot", lastMessage: "SUI Price: $1.15 (+3.2%).", avatarUrl: "/avatars/bot.png" },
    { id: '6', name: "Security Alert", lastMessage: "Suspicious login attempt detected.", avatarUrl: "/avatars/security.png" },
    { id: '7', name: "DeFi Protocol X", lastMessage: "Your staking reward has been claimed.", avatarUrl: "/avatars/protocol.png" },
];

/**
 * FriendList 組件：顯示聯繫人列表，並應用 ChatPage 的深色風格。
 */
export default function FriendListPage() {
    // 使用 useState 來管理當前選中的聊天 ID
    const [activeChatId, setActiveChatId] = useState('1');
   
    return (
        <div className="flex min-h-screen items-center justify-center bg-slate-950 px-4">
            {/* 應用 ChatPage 的 Card 風格：深色背景、模糊、邊框 */}
            <Card className="flex h-full w-full max-w-sm flex-col border-slate-800 bg-slate-900/70 backdrop-blur">

                {/* 標題區域：使用 ChatPage 的 border-b 和 padding 樣式 */}
                <CardHeader className="flex-shrink-0 border-b border-slate-800 py-4 px-4">
                    {/* 標題文字使用 text-slate-50 和 font-semibold */}
                    <h2 className="text-lg font-semibold text-slate-50">Friend List</h2>
                    <p className="text-xs text-slate-400">7 contacts online</p>
                </CardHeader>

                {/* 內容區域：應用 flex-1 填滿空間 */}
                <CardContent className="p-0 flex-1">
                    <ScrollArea className="h-full p-1">
                        {contacts.map((contact) => (
                            <div
                                key={contact.id}
                                onClick={() => setActiveChatId(contact.id)}
                                // 樣式調整：
                                // 1. 選中狀態使用 `bg-slate-800` 和 `ring-emerald-400`
                                // 2. 懸停狀態使用 `hover:bg-slate-800/50`
                                className={`flex items-center p-3 m-1 rounded-lg cursor-pointer transition-all duration-200 
                                    ${contact.id === activeChatId
                                        ? 'bg-slate-800 ring-2 ring-emerald-400/50' // 參考 ChatPage 的綠色強調色
                                        : 'hover:bg-slate-800/50' // 使用深色懸停效果
                                    }`
                                }
                            >
                                {/* 聯繫人頭像：使用 slate-700 邊框 */}
                                <Avatar className="h-10 w-10 border-2 border-slate-700 flex-shrink-0">
                                    <AvatarImage src={contact.avatarUrl} alt={contact.name} />
                                    {/* 使用 slate-800/slate-200 作為 fallback 顏色 */}
                                    <AvatarFallback className="bg-slate-800 text-slate-200">{contact.name[0]}</AvatarFallback>
                                </Avatar>

                                {/* 聯繫人資訊 */}
                                <div className="ml-3 overflow-hidden min-w-0">
                                    {/* 名稱使用 text-white (等同於 text-slate-50) */}
                                    <p className="font-semibold truncate text-slate-50">{contact.name}</p>
                                    {/* 訊息使用 text-slate-400 輔助色 */}
                                    <p className="text-sm text-slate-400 truncate">{contact.lastMessage}</p>
                                </div>
                            </div>
                        ))}
                    </ScrollArea>
                </CardContent>
            </Card>
        </div>
    );
}