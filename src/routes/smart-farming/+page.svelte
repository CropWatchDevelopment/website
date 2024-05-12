<script>
	import { mdiDotsGrid } from "@mdi/js";


	import { Button, Card, Icon } from "svelte-ux";

</script>
<main class="flex flex-col overflow-visible">

    <Card classes="flex-1">
        <div class="flex items-center justify-between">
            <h1 class="text-2xl font-bold">Smart Farming</h1>
            <div class="flex items-center">
                <Button>
                    <Icon path={mdiDotsGrid} />
                </Button>
            </div>
        </div>
        <div class="flex items center">
            <p class="text-gray-500">
                Smart farming is a concept quickly catching on in the agricultural business. Offering high-precision crop control, useful data collection, and automated farming techniques, there are clearly many advantages a farm can gain from implementing smart farming.
            </p>
        </div>
    </Card>

</main>
