<script>
	import Breadcrumbs from "$lib/components/Breadcrumbs.svelte";
</script>

<section class="inner-wrapper">
    <div class="container">
      <div class="single-post">
        <div class="row">
          <div class="col-sm-7 col-md-8">
            <div class="date">
              <div class="blog-meta"><span>Aug 22, 2016</span> <span>by<a href="javascript:void(0)">Admin</a></span> <span>3 comment</span></div>
            </div>
            <h2>Lorem Ipsum is simply dummy</h2>
            <ul class="list-inline">
              <li><a href="javascript:void(0)" class="fa fa-share-alt"> Share</a></li>
              <li><a class="fa-brands fa-linkedin" href="javascript:void(0)"></a></li>
            </ul>
            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. </p>
            <div class="thumbnail">
                <a class="hover-img" href="javascript:void(0)">
                    <img alt="image" src="/images/chickens.jpg">
                </a>
              <div class="caption">
                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. </p>
                <div class="unordered-list no-space">
                  <p><strong>Unordered List:</strong> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor</p>
                  <ul>
                    <li>Lorem ipsum</li>
                    <li>Dolor sit amet</li>
                    <li>Consectetur adipiscing</li>
                    <li>Sed do eiusmod</li>
                    <li>Tempor incididunt</li>
                    <li>Labore et dolore</li>
                    <li>Magna aliqua</li>
                  </ul>
                </div>
                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. </p>
                <div class="ordered-list">
                  <p><strong>Ordered List:</strong> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor</p>
                  <ol>
                    <li>Lorem ipsum</li>
                    <li>Dolor sit amet</li>
                    <li>Consectetur adipiscing</li>
                    <li>Sed do eiusmod</li>
                    <li>Tempor incididunt</li>
                    <li>Labore et dolore</li>
                    <li>Magna aliqua</li>
                  </ol>
                </div>
                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. </p>
              </div>
            </div>
            <div class="comments">
              <h2>Comments</h2>
              <div class="row">
                <div class="col-sm-2"> <a class="hover-img" href="javascript:void(0)">
                    <img src="/images/testimonials1.png" alt="Testimonials"> </a>
                </div>
                <div class="col-sm-10 meta-info">
                  <h3><a href="javascript:void(0)">Lorem Ipsum is simply dummy</a></h3>
                  <div class="meta"> Aug 22, 2016 - 04-30 PM</div>
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-xs-6 col-sm-6">
                <p><a href="javascript:void(0)"><i class="fa fa-long-arrow-left" aria-hidden="true"></i> Previous Post</a><br>
                  <strong class="hidden-xs">Previous Blog Title here</strong></p>
              </div>
              <div class="col-xs-6 col-sm-6">
                <p class="align-right"><a href="javascript:void(0)">Next Post <i class="fa fa-long-arrow-right" aria-hidden="true"></i></a><br>
                  <strong class="hidden-xs">Next Blog Title here</strong></p>
              </div>
            </div>
          </div>
          <div class="col-sm-5 col-md-4">
            <div class="sidebar">
              <div class="row">
                <div id="custom-search-input">
                  <div class="input-group col-md-12">
                    <input type="text" class="form-control input-lg" placeholder="Serach" />
                    <span class="input-group-btn">
                    <button class="btn btn-info btn-lg" type="button"> <i class="glyphicon glyphicon-search"></i> </button>
                    </span> </div>
                </div>
              </div>
              <div class="latest-blogs">
                <h2>Latest Blog</h2>
                <div class="latest-blog">
                  <div class="row">
                    <div class="col-sm-4"> <a class="hover-img" href="javascript:void(0)"> <img alt="image" src="https://placeholdit.imgix.net/~text?txtsize=80&bg=333&txtclr=cccccc&txt=600%C3%97325&w=600&h=325"> </a> </div>
                    <div class="col-sm-8 meta-info">
                      <h3><a href="javascript:void(0)">Lorem Ipsum is simply dummy</a></h3>
                      <div class="meta"> Aug 22, 2016 - 04-30 PM</div>
                    </div>
                  </div>
                </div>
                <div class="latest-blog">
                  <div class="row">
                    <div class="col-sm-4"> <a class="hover-img" href="javascript:void(0)"> <img alt="image" src="https://placeholdit.imgix.net/~text?txtsize=80&bg=333&txtclr=cccccc&txt=600%C3%97325&w=600&h=325"> </a> </div>
                    <div class="col-sm-8 meta-info">
                      <h3><a href="javascript:void(0)">Lorem Ipsum is simply dummy</a></h3>
                      <div class="meta"> Aug 22, 2016 - 04-30 PM</div>
                    </div>
                  </div>
                </div>
                <div class="latest-blog">
                  <div class="row">
                    <div class="col-sm-4"> <a class="hover-img" href="javascript:void(0)"> <img alt="image" src="https://placeholdit.imgix.net/~text?txtsize=80&bg=333&txtclr=cccccc&txt=600%C3%97325&w=600&h=325"> </a> </div>
                    <div class="col-sm-8 meta-info">
                      <h3><a href="javascript:void(0)">Lorem Ipsum is simply dummy</a></h3>
                      <div class="meta"> Aug 22, 2016 - 04-30 PM</div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="download-services">
                <h3>Please Download our latest services </h3>
                <a href="#">Download</a> </div>
              <div class="unordered-list">
                <h2> Catrgories </h2>
                <ul>
                  <li><a href="javascript:void(0)">Papilion Minter Savior</a></li>
                  <li><a href="javascript:void(0)">Draught Vaein Mynel</a></li>
                  <li><a href="javascript:void(0)">Simple Post Formatting Example</a></li>
                  <li><a href="javascript:void(0)">My Style Statement</a></li>
                  <li><a href="javascript:void(0)">Post with Image Slider</a></li>
                </ul>
              </div>
              <div class="tags">
                <h2> Tags </h2>
                <ul>
                  <li><a href="javascript:void(0)">Tag</a></li>
                  <li><a href="javascript:void(0)">Blog tag</a></li>
                  <li><a href="javascript:void(0)">Service Tag</a></li>
                  <li><a href="javascript:void(0)">News</a></li>
                  <li><a href="javascript:void(0)">Lifestyle</a></li>
                  <li><a href="javascript:void(0)">Music</a></li>
                  <li><a href="javascript:void(0)">Science</a></li>
                  <li><a href="javascript:void(0)">Health</a></li>
                  <li><a href="javascript:void(0)">Economy</a></li>
                  <li><a href="javascript:void(0)">Recruitement</a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>