<script lang="ts">
    import { page } from '$app/stores';
  
    let crumbs: Array<{ label: string; href: string }> = [];
  
    $: {
      // Remove zero-length tokens.
      const tokens = $page.url.pathname.split('/').filter((t) => t !== '');
  
      // Create { label, href } pairs for each token.
      let tokenPath = '';
      crumbs = tokens.map((t) => {
        tokenPath += '/' + t;
        t = t.charAt(0).toUpperCase() + t.slice(1);
        return { label: t, href: tokenPath };
      });
  
      // Add a way to get home too.
      crumbs.unshift({ label: 'Home', href: '/' });
    }
  </script>
  
  <div class="banner-wrapper">
    <div class="inner-banner">
      <div class="container">
        <div class="inner-banner-design">
          <div class="inner-banner-heading">
            <h3>{crumbs.at(-1)?.label ?? ''}</h3>
          </div>
          <div class="inner-breadcrumb hidden sm:flex sm:flex-row">
            <span class="flex-auto" />
            <ul>
              {#each crumbs as crumb}
                <li><a href={crumb.href}>{crumb.label}</a></li>
              {/each}
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
  