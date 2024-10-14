import { writable } from 'svelte/store';
 


export const language = writable<'ja-JP' | 'en-US'>('ja-JP');