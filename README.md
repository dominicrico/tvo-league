# :question: Wie funktioniert das nun :question:

- Du lädst dir das Zip runter (oben auf dem grünen Code Button, ganz unten Download ZIP)
- Packst die league.js und league.css auf den Server
- Nimmst die html/php file in der das angezeigt werden soll
- Fügst an die passende stelle das unten stehende html ein
- Fügst die league.js und league.css in den \<head\> der datei

Das in den \<head\>
```html
<link rel="stylesheet" href="/league.css">
<script src="/league.js" charset="utf-8"></script>
```

Das an die stelle wo es hin soll
```html
<div class="league-wrapper">
  <div class="team-select">
    <span data-select="0" class="button-team is-active">TVO</span>
    <span data-select="1" class="button-team">HSG</span>
  </div>
  <div id="league" class="is-loading"></div>
</div>
```
# FERTIG :rocket: :rocket: :rocket: :rocket: :rocket:
