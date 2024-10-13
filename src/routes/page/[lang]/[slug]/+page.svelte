<script lang="ts">
    import { PUBLIC_APIURL } from '$env/static/public';

    export let data;
</script>

{#if data.page && data.page.translations.length > 0}
    <section class="inner-wrapper">
        <div class="container">
            <div class="row">
                <div class="title">
                    <h2>{@html data.page.translations[0].page_title}</h2>
                    <span class="title-border-green"></span>
                </div>
                <div class="inner-wrapper-main">
                    <!-- <div class="col-sm-12">
                        <div
                            class="light-bg space-30 inset-left-30 inset-right-30"
                        >
                            
                        </div>
                    </div> -->
                    <div class="col-sm-6 offset-top-30">
                        <div
                            class="light-bg space-30 inset-left-30 inset-right-30"
                        >
                            <img src={`${PUBLIC_APIURL}/assets/${data.page.translations[0].image}`} alt="example" />
                        </div>
                    </div>
                    <div class="col-sm-6 offset-top-30">
                        <div
                            class="light-bg space-30 inset-left-30 inset-right-30"
                        >
                                {@html data.page.translations[0].page_content}
                        </div>
                    </div>
                    <div class="col-sm-4 offset-top-30">
                        <div
                            class="light-bg space-30 inset-left-30 inset-right-30"
                        >
                            <h3>1/3</h3>
                            <p>
                                Lorem Ipsum is simply dummy text of the printing
                                and typesetting industry. Lorem Ipsum has been
                                the industry's standard dummy text ever since
                                the 1500s, when an unknown printer took a galley
                                of type and scrambled it to make a type specimen
                                book. It has survived not only five centuries,
                                but also the leap into electronic. Lorem Ipsum
                                is simply dummy text of the printing.
                            </p>
                        </div>
                    </div>
                    <div class="col-sm-4 offset-top-30">
                        <div
                            class="light-bg space-30 inset-left-30 inset-right-30"
                        >
                            <h3>1/3</h3>
                            <p>
                                Lorem Ipsum is simply dummy text of the printing
                                and typesetting industry. Lorem Ipsum has been
                                the industry's standard dummy text ever since
                                the 1500s, when an unknown printer took a galley
                                of type and scrambled it to make a type specimen
                                book. It has survived not only five centuries,
                                but also the leap into electronic. Lorem Ipsum
                                is simply dummy text of the printing.
                            </p>
                        </div>
                    </div>
                    <div class="col-sm-4 offset-top-30">
                        <div
                            class="light-bg space-30 inset-left-30 inset-right-30"
                        >
                            <h3>1/3</h3>
                            <p>
                                Lorem Ipsum is simply dummy text of the printing
                                and typesetting industry. Lorem Ipsum has been
                                the industry's standard dummy text ever since
                                the 1500s, when an unknown printer took a galley
                                of type and scrambled it to make a type specimen
                                book. It has survived not only five centuries,
                                but also the leap into electronic. Lorem Ipsum
                                is simply dummy text of the printing.
                            </p>
                        </div>
                    </div>
                    <div class="col-sm-3 offset-top-30">
                        <div
                            class="light-bg space-30 inset-left-30 inset-right-30"
                        >
                            <h3>1/4</h3>
                            <p>
                                Lorem Ipsum is simply dummy text of the printing
                                and typesetting industry. Lorem Ipsum has been
                                the industry's standard dummy text ever since
                                the 1500s, when an unknown printer.
                            </p>
                        </div>
                    </div>
                    <div class="col-sm-3 offset-top-30">
                        <div
                            class="light-bg space-30 inset-left-30 inset-right-30"
                        >
                            <h3>1/4</h3>
                            <p>
                                Lorem Ipsum is simply dummy text of the printing
                                and typesetting industry. Lorem Ipsum has been
                                the industry's standard dummy text ever since
                                the 1500s, when an unknown printer.
                            </p>
                        </div>
                    </div>
                    <div class="col-sm-3 offset-top-30">
                        <div
                            class="light-bg space-30 inset-left-30 inset-right-30"
                        >
                            <h3>1/4</h3>
                            <p>
                                Lorem Ipsum is simply dummy text of the printing
                                and typesetting industry. Lorem Ipsum has been
                                the industry's standard dummy text ever since
                                the 1500s, when an unknown printer.
                            </p>
                        </div>
                    </div>
                    <div class="col-sm-3 offset-top-30">
                        <div
                            class="light-bg space-30 inset-left-30 inset-right-30"
                        >
                            <h3>1/4</h3>
                            <p>
                                Lorem Ipsum is simply dummy text of the printing
                                and typesetting industry. Lorem Ipsum has been
                                the industry's standard dummy text ever since
                                the 1500s, when an unknown printer.
                            </p>
                        </div>
                    </div>
                    <div class="col-sm-2 offset-top-30">
                        <div
                            class="light-bg space-30 inset-left-30 inset-right-30"
                        >
                            <h3>1/6</h3>
                            <p>
                                Lorem Ipsum is simply dummy text of the printing
                                and typesetting industry.
                            </p>
                        </div>
                    </div>
                    <div class="col-sm-2 offset-top-30">
                        <div
                            class="light-bg space-30 inset-left-30 inset-right-30"
                        >
                            <h3>1/6</h3>
                            <p>
                                Lorem Ipsum is simply dummy text of the printing
                                and typesetting industry.
                            </p>
                        </div>
                    </div>
                    <div class="col-sm-2 offset-top-30">
                        <div
                            class="light-bg space-30 inset-left-30 inset-right-30"
                        >
                            <h3>1/6</h3>
                            <p>
                                Lorem Ipsum is simply dummy text of the printing
                                and typesetting industry.
                            </p>
                        </div>
                    </div>
                    <div class="col-sm-2 offset-top-30">
                        <div
                            class="light-bg space-30 inset-left-30 inset-right-30"
                        >
                            <h3>1/6</h3>
                            <p>
                                Lorem Ipsum is simply dummy text of the printing
                                and typesetting industry.
                            </p>
                        </div>
                    </div>
                    <div class="col-sm-2 offset-top-30">
                        <div
                            class="light-bg space-30 inset-left-30 inset-right-30"
                        >
                            <h3>1/6</h3>
                            <p>
                                Lorem Ipsum is simply dummy text of the printing
                                and typesetting industry.
                            </p>
                        </div>
                    </div>
                    <div class="col-sm-2 offset-top-30">
                        <div
                            class="light-bg space-30 inset-left-30 inset-right-30"
                        >
                            <h3>1/6</h3>
                            <p>
                                Lorem Ipsum is simply dummy text of the printing
                                and typesetting industry.
                            </p>
                        </div>
                    </div>
                    <div class="col-sm-4 offset-top-30">
                        <div
                            class="light-bg space-30 inset-left-30 inset-right-30"
                        >
                            <h3>1/3</h3>
                            <p>
                                Lorem Ipsum is simply dummy text of the printing
                                and typesetting industry. Lorem Ipsum has been
                                the industry's standard dummy text ever since
                                the 1500s, when an unknown printer.
                            </p>
                        </div>
                    </div>
                    <div class="col-sm-8 offset-top-30">
                        <div
                            class="light-bg space-30 inset-left-30 inset-right-30"
                        >
                            <h3>2/3</h3>
                            <p>
                                Lorem Ipsum is simply dummy text of the printing
                                and typesetting industry. Lorem Ipsum has been
                                the industry's standard dummy text ever since
                                the 1500s, when an unknown printer. the
                                industry's standard dummy text ever since the
                                1500s, when an unknown printer. the industry's
                                standard dummy text ever since the 1500s, when
                                an unknown printer. the industry's standard
                                dummy text ever since the 1500s, when an unknown
                                printer.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
{:else}
    <br />
    <div class="container">
        <div class="row">
            <div class="inner-wrapper-main oops">
                <h2>
                    <i class="fa fa-exclamation-circle" aria-hidden="true"></i>
                </h2>
                <p>We have not translated this page yet!</p>
                <a href="/" class="btn-home">Home</a>
            </div>
        </div>
    </div>
    <br />
{/if}


<pre>{JSON.stringify(data, null, 2)}</pre>