import { Transaction } from "@mysten/sui/transactions";
import { packageID } from "../package";

export const add_chatroom_profile = (chatroom: string, profileCap: string, profile: string) => {
    const tx = new Transaction();
    tx.moveCall({
        target: `${packageID}::chat_contract::add_chatroom_profile`,
        arguments: [
            tx.object(chatroom),
            tx.object(profileCap),
            tx.object(profile),
        ],
    });
    return tx;
};