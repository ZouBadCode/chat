"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCurrentAccount, useSuiClient } from '@mysten/dapp-kit';
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { getProfileInfo } from '@/utils/queryer';

export default function FriendListPage() {
    const router = useRouter();
    const suiClient = useSuiClient();
    const currentAccount = useCurrentAccount();

    const [friends, setFriends] = useState<FriendChat[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const init = async () => {
            if (!currentAccount?.address) return;
            setIsLoading(true);
            
            try {
                // A. 拿到我的 Profile
                const myProfile = await getProfileInfo({ suiClient, address: currentAccount.address });
                
                if (myProfile) {
                    // B. 取得聊天室 ID 列表 (這裡你需要根據你的合約邏輯修改)
                    // 假設 myProfile 裡沒有存 chatrooms，我們先用假資料測試
                    // 在真實情況，你可能要用 suiClient.getOwnedObjects 篩選 Chatroom 類型
                    const myChatRoomIds = await mockGetMyChatRooms(myProfile.profileId);
                    
                    // C. 核心：把 ID 轉成朋友資料
                    const enrichedFriends = await fetchFriendList(
                        suiClient, 
                        myProfile.profileId, 
                        myChatRoomIds
                    );
                    
                    setFriends(enrichedFriends);
                }
            } catch (e) {
                console.error(e);
            } finally {
                setIsLoading(false);
            }
        };

        init();
    }, [suiClient, currentAccount]);

    return (
        <div className="flex min-h-screen items-center justify-center bg-slate-950 px-4">
            <Card className="flex h-[600px] w-full max-w-sm flex-col border-slate-800 bg-slate-900/70 backdrop-blur">
                <CardHeader className="flex-shrink-0 border-b border-slate-800 py-4 px-4">
                    <h2 className="text-lg font-semibold text-slate-50">Friends</h2>
                    <p className="text-xs text-slate-400">
                        {isLoading ? "Loading..." : `${friends.length} chats`}
                    </p>
                </CardHeader>

                <CardContent className="p-0 flex-1">
                    <ScrollArea className="h-full p-1">
                        {/* Loading 狀態 */}
                        {isLoading && (
                            <div className="flex justify-center p-4 text-slate-500">Syncing friends...</div>
                        )}

                        {/* 列表渲染 */}
                        {!isLoading && friends.map((friend) => (
                            <div
                                key={friend.id}
                                onClick={() => router.push(`/chat/${friend.id}`)} // 點擊跳轉到聊天室 ID
                                className="flex items-center p-3 m-1 rounded-lg cursor-pointer transition-all duration-200 hover:bg-slate-800/50 group"
                            >
                                {/* 頭像 */}
                                <Avatar className="h-10 w-10 border-2 border-slate-700 flex-shrink-0 group-hover:border-slate-600">
                                    <AvatarImage src={friend.friendAvatar} />
                                    <AvatarFallback className="bg-slate-800 text-slate-200">
                                        {friend.friendName.substring(0, 2).toUpperCase()}
                                    </AvatarFallback>
                                </Avatar>

                                {/* 名字與訊息 */}
                                <div className="ml-3 overflow-hidden min-w-0">
                                    <p className="font-semibold truncate text-slate-50">
                                        {friend.friendName}
                                    </p>
                                    <p className="text-sm text-slate-400 truncate">
                                        {friend.lastMessage}
                                    </p>
                                </div>
                            </div>
                        ))}

                        {/* 空狀態 */}
                        {!isLoading && friends.length === 0 && (
                            <div className="text-center p-4 text-slate-500">
                                No friends found. Create a chat!
                            </div>
                        )}
                    </ScrollArea>
                </CardContent>
            </Card>
        </div>
    );
}

// 模擬函式：你需要替換成真實的邏輯
async function mockGetMyChatRooms(profileId: string) {
    // 回傳幾個測試用的 Chatroom ID (請確保這些 ID 在鏈上真實存在，不然會報錯)
    // 如果你在測試網，可以先去 explorer 複製幾個 Object ID 貼在這裡測試
    return [
       // "0x1234... (你的 Chatroom Object ID)"
    ]; 
}