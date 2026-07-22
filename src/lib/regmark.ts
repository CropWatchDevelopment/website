// 商標記号（®）を上付き表示にするための小さなヘルパー。
// プレーン文字列（columns.ts のタイトルや関連リンクのラベルなど）を
// {@html} で描画する箇所でのみ使うこと。信頼できる自前のコピー専用。
export function regMark(text: string): string {
	return text.replace(/®/g, '<sup class="reg">®</sup>');
}
