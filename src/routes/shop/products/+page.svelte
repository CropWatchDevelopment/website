<script lang="ts">
    import { CurrencyToSymbol } from "$lib/helpers/currencyToSymbol";
    import { onMount } from "svelte";
    import PRODUCT_IMAGE_COMING_SOON from "$lib/images/Product-Image-Coming-Soon.jpg";
    import ProductSearch from "$lib/components/ProductSearch.svelte";

    let products = [];
    let loading: boolean = true;
    let searchText: string = "";

    onMount(() => {
        fetch("/api/v1/stripe/products")
            .then((res) => res.json())
            .then((data) => {
                if (data) {
                    products = data.data;
                    for (let product of products) {
                        getProductPrice(product);
                    }
                }
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                loading = false;
            });
    });

    const getProductPrice = (product) => {
        return fetch(`/api/v1/stripe/products/price/${product.default_price}`)
            .then((res) => res.json())
            .then((data) => {
                product["price"] = data;
            });
    };

    function handleSearchInput(event) {
        searchText = event.detail;  // Update the searchText with input value
    }

    function truncateDescription(description) {
        return description && description.length > 500
            ? description.substring(0, 500) + "..."
            : description;
    }
</script>

{#if loading}
    <div id="dvLoading" />
{/if}

<ProductSearch {searchText} on:input={handleSearchInput} />

<section class="inner-wrapper">
    <div class="container">
        <div class="row">
            {#each products.filter(f => f.name.toLowerCase().includes(searchText.toLowerCase())) as product}
                <div class="col-md-4">
                    <div class="card equal-height">
                        <div class="container-fluid">
                            <div class="wrapper row">
                                <div class="preview col-md-12">
                                    <div class="preview-pic tab-content">
                                        <div class="tab-pane active" id="pic-1">
                                            <img
                                                src={product.images.length > 0
                                                    ? product.images[0]
                                                    : PRODUCT_IMAGE_COMING_SOON}
                                                alt="product"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div class="details col-md-12">
                                    <h3 class="product-title">
                                        <a href={``}>{product.name}</a>
                                    </h3>
                                    <div class="rating">
                                        <div class="stars">
                                            <span class="fa fa-star checked"></span>
                                            <span class="fa fa-star checked"></span>
                                            <span class="fa fa-star checked"></span>
                                            <span class="fa fa-star"></span>
                                            <span class="fa fa-star"></span>
                                        </div>
                                        <span class="review-no">41 reviews</span>
                                    </div>
                                    <p class="product-description">
                                        {truncateDescription(product.description ?? "More info coming soon!")}
                                    </p>
                                    <h4 class="price">
                                        current price: <span
                                            >{product.price?.unit_amount
                                                ? product.price?.unit_amount
                                                      .toString()
                                                      .replace(
                                                          /\B(?=(\d{3})+(?!\d))/g,
                                                          ",",
                                                      )
                                                : "Call for pricing!"}
                                            {CurrencyToSymbol(
                                                product.price?.currency,
                                            )}</span
                                        >
                                    </h4>
                                    <p class="vote">
                                        <strong>91%</strong> of buyers enjoyed this
                                        product!
                                        <strong>(87 votes)</strong>
                                    </p>
                                    <div class="action">
                                        <button
                                            class="add-to-cart btn btn-default"
                                            type="button">add to cart</button
                                        >
                                        <a
                                            class="btn btn-default"
                                            type="button"
                                            href={`/shop/products/${product.id}`}
                                            ><span class="fa fa-eye"></span> View Details</a
                                        >
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            {/each}
        </div>
    </div>
</section>

<style>
    img {
        max-width: 50%;
    }

    .card {
        margin-top: 50px;
        background: #eee;
        padding: 3em;
        line-height: 1.5em;
        display: flex;
        flex-direction: column;
    }

    .equal-height {
        height: 100%;
    }

    .product-description {
        overflow: hidden;
        text-overflow: ellipsis;
    }

    /* Flexbox layout to ensure equal height */
    .row {
        display: flex;
        flex-wrap: wrap;
    }

    .col-md-4 {
        display: flex;
        flex-direction: column;
    }

    .preview {
        display: flex;
        flex-direction: column;
        flex-grow: 1;
    }

    .details {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        flex-grow: 1;
    }
</style>
