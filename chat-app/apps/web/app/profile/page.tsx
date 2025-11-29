"use client";

import { useState, FormEvent } from "react";
import {
    Card,
    CardHeader,
    CardContent,
    CardFooter,
} from "@workspace/ui/components/card";
import { Input } from "@workspace/ui/components/input";
import { Button } from "@workspace/ui/components/button";
import { Avatar, AvatarFallback, AvatarImage } from "@workspace/ui/components/avatar";
import { Separator } from "@workspace/ui/components/separator";
import { Textarea } from "@workspace/ui/components/textarea"; // 引入 Textarea 用於狀態編輯
import { useCurrentAccount, useSuiClient } from "@mysten/dapp-kit";
// 雖然 Profile UI 中可能不會直接調用 getProfileCap 並處理其副作用，
// 但為了保持與您提供的 ChatPage 相同的引入風格，我們仍然引入它。
import { getProfileCap } from "@/utils/queryer";


export default function ProfilePage() {
    const currentAccount = useCurrentAccount();
    const suiClient = useSuiClient();
    // 假設這裡也會有獲取 Profile Cap 的邏輯，但為了保持風格，暫時只引入
    // 您可以在此處加入 useEffect 來處理 getProfileCap 的非同步邏輯
    // const [userProfile, setUserProfile] = useState<any>(null);
    // useEffect(() => { /* fetch profile logic */ }, [currentAccount, suiClient]);

    // 示例用戶資料
    const [username, setUsername] = useState("KC.sui");
    const [status, setStatus] = useState("Building the decentralized future on Sui.");
    const [isEditingStatus, setIsEditingStatus] = useState(false);
    const [tempStatus, setTempStatus] = useState(status); // 用於編輯時的暫存狀態

    // 假設頭像 URL
    const avatarUrl = "/avatars/default-user.png";
    const walletAddress = currentAccount?.address || "0x...NotConnected";

    const handleStatusSave = (e: FormEvent) => {
        e.preventDefault();
        setStatus(tempStatus.trim());
        setIsEditingStatus(false);
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-slate-950 px-4">
            <Card className="flex h-auto w-full max-w-lg flex-col border-slate-800 bg-slate-900/70 backdrop-blur">
                {/* Header */}
                <CardHeader className="flex flex-row items-center justify-between border-b border-slate-800 py-4">
                    <h1 className="text-lg font-semibold text-slate-50">User Profile</h1>
                    {/* 可以加入一個編輯按鈕 */}
                    <Button
                        variant="ghost"
                        size="sm"
                        className="text-slate-400 hover:bg-slate-800 hover:text-slate-50"
                        onClick={() => setIsEditingStatus(!isEditingStatus)}
                    >
                        {isEditingStatus ? "Cancel" : "Edit Status"}
                    </Button>
                </CardHeader>

                {/* Content - Profile Details */}
                <CardContent className="flex-1 p-6 flex flex-col items-center gap-6">
                    <Avatar className="h-24 w-24 border-4 border-emerald-400/60 shadow-lg">
                        <AvatarImage src={avatarUrl} alt={username} />
                        <AvatarFallback className="bg-slate-800 text-xl text-slate-50">
                            {username[0]?.toUpperCase() ?? "U"}
                        </AvatarFallback>
                    </Avatar>

                    <div className="text-center">
                        <h2 className="text-2xl font-bold text-slate-50">{username}</h2>
                        <p className="text-sm text-slate-400 mt-1 flex items-center justify-center gap-1">
                            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400 mr-1">
                                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400/60" />
                            </span>
                            Wallet: <span className="font-mono text-emerald-300 text-xs">{walletAddress.substring(0, 6)}...{walletAddress.substring(walletAddress.length - 4)}</span>
                        </p>
                    </div>

                    <Separator className="bg-slate-800 w-full" />

                    <div className="w-full text-left">
                        <h3 className="text-md font-semibold text-slate-50 mb-2">About Me</h3>
                        {isEditingStatus ? (
                            <form onSubmit={handleStatusSave} className="flex flex-col gap-2">
                                <Textarea
                                    value={tempStatus}
                                    onChange={(e) => setTempStatus(e.target.value)}
                                    placeholder="Update your status..."
                                    className="border-slate-700 bg-slate-900 text-slate-50 placeholder:text-slate-500 focus-visible:ring-emerald-400 min-h-[80px]"
                                />
                                <Button
                                    type="submit"
                                    size="sm"
                                    className="self-end bg-emerald-600 text-slate-50 hover:bg-emerald-700"
                                >
                                    Save Status
                                </Button>
                            </form>
                        ) : (
                            <p className="text-slate-300 text-sm leading-relaxed whitespace-pre-wrap">{status}</p>
                        )}
                    </div>
                </CardContent>

                {/* Footer (可選，但為了保持 ChatPage 風格保留) */}
                <CardFooter className="p-3 border-t border-slate-800 flex justify-center">
                    <p className="text-xs text-slate-500">Last updated: {new Date().toLocaleDateString()}</p>
                </CardFooter>
            </Card>
        </div>
    );
}