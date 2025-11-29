module chat_contract::chat_contract;

use std::string::String;

public struct Profile has key, store {
    username: String,
}