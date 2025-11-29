"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardHeader, CardContent } from "@workspace/ui/components/card";
import { ScrollArea } from "@workspace/ui/components/scroll-area";
import { useCurrentAccount, useSuiClient } from '@mysten/dapp-kit';
import { getProfileInfo } from '@/utils/queryer'; 

export default function ChatRoomListPage() {
    const router = useRouter();
    const suiClient = useSuiClient();
    const currentAccount = useCurrentAccount();

    // ⭐️ 這裡我們只存 ID 字串就好
    const [chatRoomIds, setChatRoomIds] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const initData = async () => {
            if (!currentAccount?.address) return;

            try {
                // 1. 取得 Profile
                const profile = await getProfileInfo({ 
                    suiClient, 
                    address: currentAccount.address 
                });

                if (profile) {
                    // 2. 假設 Profile 裡有一個欄位叫 joined_chatrooms 存了 vector<ID>
                    // 如果你的架構不同（例如是透過 Event 抓取的），這裡要改成你的抓法
                    const roomIds = await mockFetchMyRoomIds(profile.profileId);
                    setChatRoomIds(roomIds);
                }
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        };

        initData();
    }, [suiClient, currentAccount]);

    return (
        <div className="flex min-h-screen items-center justify-center bg-slate-950 px-4">
            <Card className="flex h-[600px] w-full max-w-md flex-col border-slate-800 bg-slate-900/70 backdrop-blur">
                <CardHeader className="border-b border-slate-800 py-4 px-4">
                    <h2 className="text-lg font-semibold text-slate-50">Chat Rooms</h2>
                    <p className="text-xs text-slate-400">ID Only Mode</p>
                </CardHeader>

                <CardContent className="p-0 flex-1">
                    <ScrollArea className="h-full p-2">
                        {chatRoomIds.map((id) => (
                            <div
                                key={id}
                                onClick={() => router.push(`/chatroom/${id}`)}
                                className="flex items-center p-4 m-1 rounded-lg cursor-pointer hover:bg-slate-800/60 border border-slate-800 transition-all"
                            >
                                {/* 用一個簡單的 Hashicon 或圖標 */}
                                <div className="h-10 w-10 rounded-full bg-slate-700 flex items-center justify-center mr-3">
                                    <span className="text-slate-300 text-xs">#</span>
                                </div>

                                <div className="overflow-hidden">
                                    {/* ⭐️ 直接顯示 ID，截斷中間讓它好看一點 */}
                                    <p className="text-sm font-mono text-slate-300 truncate">
                                        {formatAddress(id)}
                                    </p>
                                    <p className="text-xs text-slate-500">
                                        Click to enter
                                    </p>
                                </div>
                            </div>
                        ))}
                        
                        {chatRoomIds.length === 0 && !isLoading && (
                            <div className="p-4 text-center text-slate-500">No rooms found</div>
                        )}
                    </ScrollArea>
                </CardContent>
            </Card>
        </div>
    );
}

// --- 輔助函式 ---

// 讓長長的 ID 變成 "0x1234...abcd"
function formatAddress(addr: string) {
    if (!addr) return "";
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
}

// 模擬抓取 ID 列表 (請替換成你真實的 Profile 欄位讀取)
async function mockFetchMyRoomIds(profileId: string): Promise<string[]> {
    // 假設你的 Profile 物件裡有一個欄位叫 `rooms: vector<ID>`
    // 這裡先回傳假資料測試
    return [
        "0x0527c731057c72f0729792613764834479579698d248386a3472093740284720",
        "0x127c731057c72f0729792613764834479579698d248386a3472093740284721",
    ];
}