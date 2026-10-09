// Published prices shared by /pricing, the per-sector price boxes on
// /cold-chain, /livestock and /agriculture, and their Product JSON-LD.
// Edit here and every visible price and every Offer stays in sync.
// All amounts are 税抜 yen; use withTax() for the 税込 figure.

/** 消費税率。 */
export const TAX_RATE_PERCENT = 10;

/** 税込金額（1円未満切り捨て）。整数演算なので 800 → 880 のように誤差が出ない。 */
export const withTax = (v: number) => Math.floor((v * (100 + TAX_RATE_PERCENT)) / 100);

/** 1シート（センサー1台分の利用枠）あたりの月額利用料（税抜）。全業種共通。 */
export const SEAT_FEE = 800;

/**
 * 1契約あたりの最低シート数。シート = センサー1台をつなぐ月額の利用枠。
 * センサーは1台から買えるが、月額は最低この数のシート分になる。
 */
export const MIN_SEATS = 3;

/** 1拠点あたりのゲートウェイ・初期導入サポートの概算価格（税抜）。 */
export const GATEWAY_BASE_PRICE = 100000;

export type SectorId = 'cold-chain' | 'livestock' | 'agriculture';

export type SectorDevice = {
	/** 型番（Product.sku） */
	sku: string;
	/** 表示名 */
	label: string;
	/** 機器1台あたりの購入価格（税抜・初回のみ） */
	unitPrice: number;
};

export const SECTOR_DEVICES: Record<SectorId, SectorDevice> = {
	'cold-chain': { sku: 'CW-AIR-TH', label: '温湿度センサー', unitPrice: 32000 },
	// 温湿度センサーに CO₂ を加えたモデル（+6,000円）。畜産・農業で共通。
	livestock: { sku: 'CW-AIR-THC', label: '温湿度・CO₂センサー', unitPrice: 39000 },
	agriculture: { sku: 'CW-AIR-THC', label: '温湿度・CO₂センサー', unitPrice: 39000 }
};
