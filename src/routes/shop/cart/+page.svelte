<script lang="ts">
    let productsInCart = [
        {
            id: 1,
            name: "Product name",
            brand: "Brand name",
            status: "In Stock",
            price: 4.87,
            quantity: 3,
            total: 14.61,
        },
        {
            id: 2,
            name: "Product name",
            brand: "Brand name",
            status: "Leaves warehouse in 2 - 3 weeks",
            price: 4.99,
            quantity: 2,
            total: 9.98,
        },
    ];

    // Calculate subtotal
    $: subtotal = productsInCart.reduce(
        (acc, product) => acc + product.price * product.quantity,
        0,
    );
</script>

<div class="container">
    <div class="row">
        <div class="col-sm-12 col-md-10 col-md-offset-1">
            <table class="table table-hover">
                <thead>
                    <tr>
                        <th>Product</th>
                        <th>Quantity</th>
                        <th class="text-center">Price</th>
                        <th class="text-center">Total</th>
                        <th> </th>
                    </tr>
                </thead>
                <tbody>
                    {#each productsInCart as product}
                        <tr>
                            <td class="col-sm-8 col-md-6">
                                <div class="media">
                                    <a class="thumbnail pull-left" href="#">
                                        <img
                                            class="media-object"
                                            src="http://icons.iconarchive.com/icons/custom-icon-design/flatastic-2/72/product-icon.png"
                                            style="width: 72px; height: 72px;"
                                        />
                                    </a>
                                    <div class="media-body">
                                        <h4 class="media-heading">
                                            <a href="#">{product.name}</a>
                                        </h4>
                                        <h5 class="media-heading">
                                            by <a href="#">{product.brand}</a>
                                        </h5>
                                        <span>Status: </span><span
                                            class="text-success"
                                            ><strong>In Stock</strong></span
                                        >
                                    </div>
                                </div></td
                            >
                            <td
                                class="col-sm-1 col-md-1"
                                style="text-align: center"
                            >
                                <input
                                    type="number"
                                    class="form-control"
                                    id="exampleInputEmail1"
                                    min="1"
                                    bind:value={product.quantity}
                                />
                            </td>
                            <td class="col-sm-1 col-md-1 text-center"
                                ><strong>${product.price}</strong></td
                            >
                            <td class="col-sm-1 col-md-1 text-center"
                                ><strong
                                    >${(
                                        product.price * product.quantity
                                    ).toFixed(2)}</strong
                                ></td
                            >
                            <td class="col-sm-1 col-md-1">
                                <button
                                    type="button"
                                    class="btn btn-danger"
                                    on:click={() => {
                                        productsInCart = productsInCart.filter(
                                            (p) => p.id !== product.id,
                                        );
                                    }}
                                >
                                    <span class="glyphicon glyphicon-remove"
                                    ></span>
                                    Remove
                                </button>
                            </td>
                        </tr>
                    {/each}
                    <tr>
                        <td> </td>
                        <td> </td>
                        <td> </td>
                        <td><h5>Subtotal</h5></td>
                        <td class="text-right"
                            ><h5>
                                <strong>${subtotal.toFixed(2)}</strong>
                            </h5></td
                        >
                    </tr>
                    <tr>
                        <td> </td>
                        <td> </td>
                        <td> </td>
                        <td><h5>Estimated Tax</h5></td>
                        <td class="text-right"
                            ><h5><strong>$6.94</strong></h5></td
                        >
                    </tr>
                    <tr>
                        <td> </td>
                        <td> </td>
                        <td> </td>
                        <td><h3>Total</h3></td>
                        <td class="text-right"
                            ><h3>
                                {#if subtotal === 0}
                                    <strong>$0.00</strong>
                                {:else}
                                    <strong
                                        >${(subtotal + 6.94).toFixed(2)}</strong
                                    >
                                {/if}
                            </h3></td
                        >
                    </tr>
                    <tr>
                        <td> </td>
                        <td> </td>
                        <td> </td>
                        <td>
                            <a type="button" class="btn btn-default" href="/shop/products">
                                <span class="glyphicon glyphicon-shopping-cart"
                                ></span> Continue Shopping
                            </a></td
                        >
                        <td>
                            <button type="button" class="btn btn-success">
                                Checkout <span class="glyphicon glyphicon-play"
                                ></span>
                            </button></td
                        >
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</div>
