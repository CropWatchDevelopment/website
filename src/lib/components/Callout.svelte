<script lang="ts">
    import { PUBLIC_APIURL } from "$env/static/public";

    export let callout;
    export let callouts: any = [];
</script>

{#if callout}
    <div class="callouts-wrapper">
        <div class="container">
            <div class="title">
                <h2>{@html callout.translations[0].title}</h2>

                <span class="title-border-green"></span>
            </div>
            <p>
                {@html callout.translations[0].description}
            </p>
            {#each callouts as item}
                {#if item.status === "published"}
                    <div
                        class="callout-item col-sm-6 col-md-3 callouts wow fadeIn animated"
                        data-wow-duration="1.5s"
                    >
                        {#if item.translations[0].image}
                                <img
                                    src={`${PUBLIC_APIURL}/assets/${item.translations[0].image}`}
                                    alt={item.translations[0]?.title}
                                    class="tw-w-36 tw-h-36 tw-rounded-full"
                                />
                        {:else}
                            <i class="fa fa-image circle" />
                        {/if}
                        <h3 class="tw-mt-4">
                            {item.translations[0]?.title ?? ""}
                        </h3>
                        <p>
                            {@html item.translations[0]?.description ?? ""}
                        </p>
                        <a href="javascript:void(0)" class="btn"
                            >{item.translations[0]?.button_text ??
                                "Read More"}</a
                        >
                    </div>
                {/if}
            {/each}
        </div>
    </div>
{/if}

<style>
    .callouts-wrapper .row {
        display: flex;
        flex-wrap: wrap;
        justify-content: center; /* Horizontally center the callouts */
    }

    .callout-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center; /* Vertically center content within each callout */
        margin-bottom: 20px;
        text-align: center; /* Ensure the text is centered */
    }
</style>
