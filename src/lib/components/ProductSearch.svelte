<script lang="ts">
    import { createEventDispatcher } from "svelte";
    export let searchText: string = '';

    const dispatch = createEventDispatcher();

    function handleInput(event: Event) {
        const target = event.target as HTMLInputElement;
        dispatch('input', target.value);
    }
</script>

<div class="theme-bg no-padding">
    <div class="container">
        <div class="row">
            <div class="col-md-12">
                <!-- TEXT -->
                <div class="cta-text">
                    <input
                        class="txt"
                        type="text"
                        value={searchText}
                        on:input={handleInput}
                        placeholder="Search for products"
                    />
                </div>
            </div>
        </div>
    </div>
</div>
