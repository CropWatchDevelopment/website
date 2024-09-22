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
                console.log(data);
                if (data) {
                    products = data.data;
                    for (let product of products) {
                        getProductPrice(product);
                    }
                    products = products;
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
            })
            .finally(() => {
                products = products;
            });
    };

    function handleSearchInput(event) {
        searchText = event.detail;  // Update the searchText with input value
    }
</script>

{#if loading}
    <div id="dvLoading" />
{/if}

<ProductSearch {searchText} on:input={handleSearchInput} />

<section class="inner-wrapper">
    <div class="container">
        {#each products.filter(f => f.name.toLowerCase().includes(searchText.toLowerCase())) as product}
            <div class="card">
                <div class="container-fliud">
                    <div class="wrapper row">
                        <div class="preview col-md-6">
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
                        <div class="details col-md-6">
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
                                {product.description ??
                                    "More info coming soon!"}
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
        {/each}
    </div>
</section>

<style>
    img {
        max-width: 50%;
    }

    .preview {
        display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-orient: vertical;
        -webkit-box-direction: normal;
        -webkit-flex-direction: column;
        -ms-flex-direction: column;
        flex-direction: column;
    }
    @media screen and (max-width: 996px) {
        .preview {
            margin-bottom: 20px;
        }
    }

    .preview-pic {
        -webkit-box-flex: 1;
        -webkit-flex-grow: 1;
        -ms-flex-positive: 1;
        flex-grow: 1;
    }

    .tab-content {
        overflow: hidden;
    }
    .tab-content img {
        width: 100%;
        -webkit-animation-name: opacity;
        animation-name: opacity;
        -webkit-animation-duration: 0.3s;
        animation-duration: 0.3s;
    }

    .card {
        margin-top: 50px;
        background: #eee;
        padding: 3em;
        line-height: 1.5em;
    }

    @media screen and (min-width: 997px) {
        .wrapper {
            display: -webkit-box;
            display: -webkit-flex;
            display: -ms-flexbox;
            display: flex;
        }
    }

    .details {
        display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-orient: vertical;
        -webkit-box-direction: normal;
        -webkit-flex-direction: column;
        -ms-flex-direction: column;
        flex-direction: column;
    }

    .colors {
        -webkit-box-flex: 1;
        -webkit-flex-grow: 1;
        -ms-flex-positive: 1;
        flex-grow: 1;
    }

    .product-title,
    .price,
    .sizes,
    .colors {
        text-transform: UPPERCASE;
        font-weight: bold;
    }

    .checked,
    .price span {
        color: #ff9f1a;
    }

    .product-title,
    .rating,
    .product-description,
    .price,
    .vote,
    .sizes {
        margin-bottom: 15px;
    }

    .product-title {
        margin-top: 0;
    }

    .size {
        margin-right: 10px;
    }
    .size:first-of-type {
        margin-left: 40px;
    }

    .color {
        display: inline-block;
        vertical-align: middle;
        margin-right: 10px;
        height: 2em;
        width: 2em;
        border-radius: 2px;
    }
    .color:first-of-type {
        margin-left: 20px;
    }

    .add-to-cart,
    .like {
        background: #ff9f1a;
        padding: 1.2em 1.5em;
        border: none;
        text-transform: UPPERCASE;
        font-weight: bold;
        color: #fff;
        -webkit-transition: background 0.3s ease;
        transition: background 0.3s ease;
    }
    .add-to-cart:hover,
    .like:hover {
        background: #b36800;
        color: #fff;
    }

    .not-available {
        text-align: center;
        line-height: 2em;
    }
    .not-available:before {
        font-family: fontawesome;
        content: "\f00d";
        color: #fff;
    }

    .orange {
        background: #ff9f1a;
    }

    .green {
        background: #85ad00;
    }

    .blue {
        background: #0076ad;
    }

    .tooltip-inner {
        padding: 1.3em;
    }

    @-webkit-keyframes opacity {
        0% {
            opacity: 0;
            -webkit-transform: scale(3);
            transform: scale(3);
        }
        100% {
            opacity: 1;
            -webkit-transform: scale(1);
            transform: scale(1);
        }
    }

    @keyframes opacity {
        0% {
            opacity: 0;
            -webkit-transform: scale(3);
            transform: scale(3);
        }
        100% {
            opacity: 1;
            -webkit-transform: scale(1);
            transform: scale(1);
        }
    }
</style>
