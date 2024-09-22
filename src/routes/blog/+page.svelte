<script lang="ts">
	import { PUBLIC_APIURL } from "$env/static/public";
    import moment from "moment";

	export let data;
	console.log(data.articles);
</script>

<section class="inner-wrapper">
	<div class="container">
		{#if data.articles.length == 0}
			<div class="inner-wrapper-main oops">
				<p>No posts found, check back later for updates!</p>
				<a href="/" class="btn-home">Home</a>
			</div>
		{/if}
		<div class="row">
			{#each data.articles as article}
				<div class="col-md-6">
					<div class="thumbnail">
						<a class="hover-img" href={`/blog/${article.id}`}>
							<img
								alt={`${article.title} Thumbnail`}
								src={`${PUBLIC_APIURL}/assets/${article.image}?width=600`}
							/>
						</a>
						<div class="date">
							<span>{moment(article.date_created).format('YYYY MMM DD')}</span>
							<!-- <span>by<a href="javascript:void(0)">Admin</a></span> -->
							<!-- <span>3 comment</span> -->
						</div>
						<div class="caption">
							<h3>
								<a href={`/blog/${article.id}`}
									>{article.tagline}</a
								>
							</h3>
							<p>
								<a href={`/blog/${article.id}`} class="readmore"
									>Read more...</a
								>
							</p>
							{#each article.attributes as arrtibute}
								<span class="badge badge-primary tw-mr-2"
									>{arrtibute}</span
								>
							{/each}
						</div>
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>
