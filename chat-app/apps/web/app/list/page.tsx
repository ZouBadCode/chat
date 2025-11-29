"use client";

import { Button } from "@workspace/ui/components/button";
import {
    Paperclip, // 假設用於檔案
    Image, // 假設用於圖片
    Gift, // 假設用於禮物
    Wallet, // 假設用於發送資產 (符合 Web3 風格)
    Smile, // 假設用於表情符號
    X // 假設用於關閉或取消
} from "lucide-react"; // 假設您使用 Lucide Icons 或類似庫

// 定義附件選項的類型
interface AttachmentOption {
    name: string;
    icon: React.ElementType; // Icon 組件類型
    action: () => void;
    colorClass: string; // 用於區分顏色的 Tailwind 類名
}

export function ChatAttachmentOptions() {

    // 模擬操作函式
    const handleAttach = (item: string) => {
        console.log(`Action: Adding ${item}`);
        // 在實際應用中，這裡會觸發 Modal 或文件選擇器
    };

    // 附件選項列表
    const options: AttachmentOption[] = [
        {
            name: "Image",
            icon: Image,
            action: () => handleAttach("Image"),
            colorClass: "text-blue-400 hover:text-blue-300"
        },
        {
            name: "File",
            icon: Paperclip,
            action: () => handleAttach("File"),
            colorClass: "text-slate-400 hover:text-slate-300"
        },
        {
            name: "SUI Asset", // 貼合金融/Web3 主題，代替通用 "Gift"
            icon: Wallet,
            action: () => handleAttach("Asset"),
            colorClass: "text-emerald-400 hover:text-emerald-300" // 沿用 ChatPage 的強調綠
        },
        {
            name: "Gift (NFT)",
            icon: Gift,
            action: () => handleAttach("Gift"),
            colorClass: "text-pink-400 hover:text-pink-300"
        },
        {
            name: "Emoji",
            icon: Smile,
            action: () => handleAttach("Emoji"),
            colorClass: "text-yellow-400 hover:text-yellow-300"
        },
    ];

    return (
        // 使用深色背景和邊框，風格類似於 ChatPage 的 CardFooter
        <div className="w-full bg-slate-900/70 border-t border-slate-800 p-2 rounded-t-lg shadow-xl">
            <div className="flex items-center gap-3">
                {options.map((option) => (
                    <Button
                        key={option.name}
                        onClick={option.action}
                        variant="ghost" // 使用 ghost 變體，避免過度突出
                        size="sm"
                        className={`
              flex flex-col items-center justify-center p-1 h-auto w-16 text-xs transition-colors duration-200 
              ${option.colorClass} 
              hover:bg-slate-800/70 // 懸停效果使用深色
            `}
                    >
                        {/* 圖標樣式：確保尺寸一致 */}
                        <option.icon className="h-5 w-5 mb-1" />
                        <span className="text-slate-400 group-hover:text-slate-200">{option.name}</span>
                    </Button>
                ))}

                {/* 分隔線 (可選) */}
                <div className="h-8 w-px bg-slate-800/50 mx-1" />

                {/* 關閉按鈕，用於在實際聊天 UI 中切換此列表的顯示 */}
                <Button
                    onClick={() => console.log("Close Attachment Options")}
                    variant="ghost"
                    size="icon"
                    className="text-slate-500 hover:bg-slate-800 hover:text-slate-300 ml-auto"
                >
                    <X className="h-4 w-4" />
                </Button>
            </div>
        </div>
    );
}