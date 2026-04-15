# Konbit Agro AI - Aperçu Interface

<div class="admonition note">
  <p class="admonition-title">Preview Interactif</p>
  <p>Paj sa a pèmèt ou wè modèl interface Konbit Agro AI a. Klike sou bouton anba a pou louvri l.</p>
</div>

<div style="text-align: center; margin: 30px 0;">
  <a href="javascript:openTemplateUI()" class="md-button md-button--primary" style="background-color: #10B981; color: white;">
    Louvri Interface la
  </a>
</div>

<iframe id="template-preview" src="" style="width: 100%; height: 600px; border: 1px solid #eee; border-radius: 5px; display: none;"></iframe>

<script>
function openTemplateUI() {
  const baseUrl = window.location.origin + window.location.pathname.split('/').slice(0, -2).join('/');
  const templateUrl = baseUrl + '/assets/template-ui/';

  document.getElementById('template-preview').style.height = '700px';
  document.getElementById('template-preview').src = templateUrl;
  document.getElementById('template-preview').style.display = 'block';
}
</script>

## Konsènan Interface la

Konbit Agro AI bay yon interface ki senp epi ki pwòp, ki respekte prensip konsepsyon nou yo:

- **Koulè Idantite**: Nou itilize vèt emerald (#10B981) ak vèt fonse (#064E3B) ki raple lanati.
- **Design Minimaliste**: Yon interface ki klè ki mete aksan sou done agrikòl yo.
- **Adaptabilite (Responsive)**: Li mache byen sou telefòn, tablèt, ak òdinatè (Chromebook).

### Kijan pou w sèvi avè l

Pou itilize modèl sa a nan pwojè w la:

1. Clone repository a sou GitHub
2. Antre nan dosye `frontend` la
3. Enstale depandans yo ak `npm install`
4. Lanse sèvè devlopman an ak `npm run dev`

Pou plis detay, gade dokimantasyon [Frontend Development](frontend-development.md).