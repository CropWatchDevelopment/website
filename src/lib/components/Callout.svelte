<script lang="ts">
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
                <div
                    class="col-sm-6 col-md-3 callouts wow fadeIn animated"
                    data-wow-duration="1.5s"
                >
                    <i class="fa fa-tablet circle"></i>
                    <h3>{item.translations[0]?.title ?? ''}</h3>
                    <p>
                        {@html item.translations[0]?.description ?? ''}
                    </p>
                    <a href="javascript:void(0)" class="btn">{item.translations[0]?.button_text ?? 'Read More'}</a>
                </div>
            {/each}
        </div>
    </div>
{/if}
