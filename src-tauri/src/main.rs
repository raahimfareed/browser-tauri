// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use regex::Regex;

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[tauri::command]
fn search(q: &str) -> String {
    let mut query = q.to_string();
    if !is_valid_url(q) {
        query = format!("https://duckduckgo.com/?q={}", query);
    }

    query
}

fn is_valid_url(url: &str) -> bool {
    let pattern = r"^(https?://)?(www\.)?([^\s/$.?#]+\.[^\s]*)$";

    let regex = Regex::new(pattern).unwrap();

    regex.is_match(url)
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![greet, search])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
