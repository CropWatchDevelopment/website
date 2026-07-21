<script lang="ts">
	import Seo from '$lib/components/Seo.svelte';
	import '$lib/styles/legal.css';

	const title = '利用規約・クッキーポリシー｜CropWatch 日本';
	const description =
		'合同会社クロップウォッチが提供するサービスに関するクッキーの利用方針および利用者の権利についてのご案内。';
</script>

<Seo {title} {description} />

<article class="legal-doc">
	<h1>クッキーポリシー</h1>
	<p>
		本サービスにおけるクッキー等の利用目的、取得情報、そして利用者が選択できる管理方法についてご案内します。
	</p>

	<hr />

	<h2>01. クッキー等の利用について</h2>
	<p>
		合同会社クロップウォッチ（以下「当社」といいます。）が提供するサービス（以下「本サービス」といいます。）では、クッキー（Cookie）その他情報収集モジュール等（以下「クッキー等」といいます。）を使用しています。当社はクッキー等を通じて、本サービスへの利用者のアクセス情報、閲覧情報等を取得することができます。なお、クッキー等を通じて取得するこれらの情報（以下「クッキー情報」といいます。）には、単独で利用者自身を識別し特定できる情報は含まれていません。
	</p>

	<hr />

	<h2>02. クッキー等の管理方法</h2>
	<p>
		利用者は、本サービス上でのクッキー等の使用を許可しない場合、各ブラウザの設定にてクッキー等を無効化してください。ただし、クッキー等を無効にすると、本サービスの利便性が損なわれたり、提供できる機能やサービスの範囲が限定されたりする場合があります。
	</p>

	<hr />

	<h2>03. 利用している主なクッキー等</h2>
	<p>本サービスで利用している代表的なクッキー等の内容は以下のとおりです。</p>

	<div class="legal-table-wrap">
		<table>
			<thead>
				<tr>
					<th>クッキー名称</th>
					<th>送信先</th>
					<th>取得する情報の概要</th>
					<th>利用目的</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td>Google Analytics</td>
					<td>Google LLC</td>
					<td>
						<p><strong>【例】</strong></p>
						<ul>
							<li>IPアドレス</li>
							<li>端末固有のユニークID</li>
							<li>利用者の行動情報（サイト上のクリックやページ遷移等）</li>
							<li>利用者が閲覧したページのURL</li>
							<li>位置情報</li>
							<li>滞在時間等</li>
						</ul>
					</td>
					<td>
						<p><strong>【例】</strong></p>
						<p>
							本サービスの利用状況を把握し、サービス向上および利用者の興味やニーズにより適した機能を提供するため
						</p>
					</td>
				</tr>
				<tr>
					<td>sb-dpaoqrcfswnzknixwkll-auth-token.X</td>
					<td>Supabase Inc</td>
					<td>利用者のJavaScript Webトークン（JWT）およびリフレッシュトークン</td>
					<td>認証および認可に使用</td>
				</tr>
			</tbody>
		</table>
	</div>

	<p>
		※Google Analyticsにおけるデータ取り扱いの詳細は
		<a href="https://policies.google.com/privacy?hl=ja" target="_blank" rel="noopener noreferrer">こちら</a>
		をご確認ください。
	</p>

	<hr />

	<p class="legal-meta">2024年8月1日　制定・施行</p>
</article>
