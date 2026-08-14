# Swapping in your own photos

`storefront.jpg` is a real photo of Arasta's actual entrance/signage, pulled
from the cafe's Google Maps listing — it's used as the Story section image.
Everything else still hotlinks free stock photos directly from Unsplash so the
repo stays small and there was nothing to approve/download up front. Every
`<img>` (and the hero's CSS background) in `index.html` has a comment right
above/below it naming the local file it expects, e.g.:

```html
<img src="https://images.unsplash.com/photo-..." alt="..." />
<!-- Replace with images/menu-coffee.jpg -->
```

To go live with real photography:

1. Drop your photo into this `images/` folder using the exact filename named
   in the comment (e.g. `hero-cafe.jpg`, `story-cafe.jpg`, `menu-coffee.jpg`,
   `menu-coldbrew.jpg`, `menu-breakfast.jpg`, `menu-beans.jpg`,
   `gallery-1.jpg` … `gallery-4.jpg`).
2. In `index.html` (and the `.hero` rule in `css/style.css` for the hero
   image), change the `src` / `url(...)` from the Unsplash link to
   `images/<filename>`.
3. Keep roughly these dimensions for a good balance of quality and load speed:
   - Hero background: ~1800×1200px
   - Story image: ~900×600px
   - Menu cards: ~500×360px
   - Gallery grid: ~700×500px
4. Compress photos before committing (e.g. with Squoosh or ImageOptim) so the
   site keeps loading fast.
