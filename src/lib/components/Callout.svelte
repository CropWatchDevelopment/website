<script lang="ts">
    export let callout;
</script>

{#if callout}
    <div class="callouts-wrapper">
        <div class="container">
            <div class="title">
                <!-- <h2>Welcome to <span>CropWatch</span></h2> -->
                {callout.title}
                <span class="title-border-green"></span>
            </div>
            <p>
                {@html callout.description}
            </p>
            {#each callout.Callouts as item}
                <div
                    class="col-sm-6 col-md-3 callouts wow fadeIn animated"
                    data-wow-duration="1.5s"
                >
                    <i class="fa fa-tablet circle"></i>
                    <h3>{item.title}</h3>
                    <p>
                        {@html item.description}
                    </p>
                    <a href="javascript:void(0)" class="btn">{item.button_text}</a>
                </div>
            {/each}
        </div>
    </div>
{/if}
