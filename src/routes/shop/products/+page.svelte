<script lang="ts">
    import { onMount } from "svelte";

    let products = [];

    onMount(() => {
        fetch("/api/v1/stripe/products")
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                if (data) {
                    products = data.data;
                }
            })
            .catch((err) => {
                console.log(err);
            });
    });
</script>

<div class="container mt-5 mb-5">
    <div class="d-flex justify-content-center row">
        <div class="col-md-10">
            {#each products as product}
                <div class="row p-2 bg-white border rounded">
                    <div class="col-md-3 mt-1">
                        <img
                            class="img-fluid img-responsive rounded product-image"
                            src="https://i.imgur.com/QpjAiHq.jpg"
                        />
                    </div>
                    <div class="col-md-6 mt-1">
                        <h5>{product.name}</h5>
                        <div class="d-flex flex-row">
                            <div class="ratings mr-2">
                                <i class="fa fa-star"></i><i class="fa fa-star"
                                ></i><i class="fa fa-star"></i><i
                                    class="fa fa-star"
                                ></i>
                            </div>
                            <span>310</span>
                        </div>
                        <div class="mt-1 mb-1 spec-1">
                            <span>100% cotton</span><span class="dot"
                            ></span><span>Light weight</span><span class="dot"
                            ></span><span>Best finish<br /></span>
                        </div>
                        <div class="mt-1 mb-1 spec-1">
                            <span>Unique design</span><span class="dot"
                            ></span><span>For men</span><span class="dot"
                            ></span><span>Casual<br /></span>
                        </div>
                        <p class="text-justify text-truncate para mb-0">
                            There are many variations of passages of Lorem Ipsum
                            available, but the majority have suffered alteration
                            in some form, by injected humour, or randomised
                            words which don't look even slightly believable.<br
                            /><br />
                        </p>
                    </div>
                    <div
                        class="align-items-center align-content-center col-md-3 border-left mt-1"
                    >
                        <div class="d-flex flex-row align-items-center">
                            <h4 class="mr-1">$13.99</h4>
                            <span class="strike-text">$20.99</span>
                        </div>
                        <h6 class="text-success">Free shipping</h6>
                        <div class="d-flex flex-column mt-4">
                            <button class="btn btn-primary btn-sm" type="button"
                                >Details</button
                            ><button
                                class="btn btn-outline-primary btn-sm mt-2"
                                type="button">Add to wishlist</button
                            >
                        </div>
                    </div>
                </div>
            {/each}
        </div>
    </div>
</div>

<style>
    .ratings i {
        font-size: 16px;
        color: red;
    }
    .strike-text {
        color: red;
        text-decoration: line-through;
    }
    .product-image {
        width: 100%;
    }
    .dot {
        height: 7px;
        width: 7px;
        margin-left: 6px;
        margin-right: 6px;
        margin-top: 3px;
        background-color: blue;
        border-radius: 50%;
        display: inline-block;
    }
    .spec-1 {
        color: #938787;
        font-size: 15px;
    }
    h5 {
        font-weight: 400;
    }
    .para {
        font-size: 16px;
    }
</style>
