<script lang="ts">
	export let testimonials;
</script>

<div class="testimonials-wrapper">
	<div class="title">
		<h2>Our <span>Testimonials</span></h2>
		<span class="title-border-white"></span>
	</div>
	<div class="container">
		<div id="myCarousel" class="carousel slide" data-ride="carousel">
			<!-- Testimonials Indicators -->
			<ol class="carousel-indicators">
				<li
					data-target="#myCarousel"
					data-slide-to="0"
					class="active"
				></li>
				{#each testimonials?.testimonials as _, i}
					<li data-target="#myCarousel" data-slide-to={i + 1}></li>
				{/each}
			</ol>
			<!-- Testimonials slides -->
			<div class="carousel-inner" role="listbox">
				<div class="item active">
					<blockquote class="tw-flex tw-flex-col tw-items-center">
						<img
							src="/images/testimonials1.png"
							alt="Testimonials"
						/>
						<p>
							Lorem Ipsum is simply dummy text of the printing and
							typesetting industry. Lorem Ipsum has been the
							industry's standard dummy text ever since the 1500s,
							when an unknown printer took a galley of type and
							scrambled it to make a type specimen book.
						</p>
						<h3>- Michal Marek <span>General manager</span></h3>
					</blockquote>
				</div>

				{#each testimonials?.testimonials as testimonial}
					<div class="item">
						<blockquote class="tw-flex tw-flex-col tw-items-center">
							<img
								src={`${testimonial.image ? "http://0.0.0.0:8055/assets/" + testimonial.image : "/images/testimonials2.png"}`}
								alt="Testimonials"
								class="tw-mx-auto"
							/>
							<p>
								{@html testimonial.description}
							</p>
							<h3>
								- {testimonial.person_name}
								<span>{testimonial.person_position}</span>
							</h3>
						</blockquote>
					</div>
				{/each}
			</div>
		</div>
	</div>
</div>
