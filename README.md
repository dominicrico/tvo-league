#Wie funktioniert das nun?

- Du lädst dir das Zip runter
- Packst die league.js und league.css auf den Server
- Nimmst die html/php file in der das angezeigt werden soll
- Fügst an die passende stelle das unten stehende html ein
- Fügst die league.js und league.css in den <head> der datei

```html
<link rel="stylesheet" href="/league.css">
<script src="/league.js" charset="utf-8"></script>
```

```html
<div class="league-wrapper">
  <div class="select">
    <select name="game-week-select" id="game-week-select" style="display: none;"></select>
  </div>
  <div id="league" class="is-loading"></div>
</div>
```
