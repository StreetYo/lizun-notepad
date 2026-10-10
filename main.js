import { language, ready, settings, storage } from '/__sdk/index.js';

/** Lizun keeps one stored value under 64 KB of JSON; this leaves room for escaped characters. */
const MAX_LENGTH = 20000;

/** How long typing has to pause before the note is saved. */
const SAVE_DELAY = 400;

/** The widget's own texts by language; the manifest translates its name and settings. */
const TEXTS = {
  en: {
    title: 'Notes',
    placeholder: 'Write something…',
    full: `At most ${MAX_LENGTH} characters`,
    notSaved: 'Not saved',
  },
  ru: {
    title: 'Заметки',
    placeholder: 'Напишите что-нибудь…',
    full: `Не больше ${MAX_LENGTH} символов`,
    notSaved: 'Не сохранено',
  },
};

/** Texts in Lizun's language, or in English for a language the widget does not know. */
let text = TEXTS.en;

const title = document.getElementById('title');
const status = document.getElementById('status');
const note = document.getElementById('note');

let options;
let saveTimer;
/** Whether the last save failed; shown until a save succeeds. */
let failed = false;

function save() {
  clearTimeout(saveTimer);
  saveTimer = undefined;
  storage
    .set('text', note.value)
    .then(() => {
      failed = false;
      render();
    })
    .catch((error) => {
      console.warn('could not save the note', error);
      failed = true;
      render();
    });
}

function render() {
  title.textContent = text.title;
  note.placeholder = text.placeholder;
  status.textContent = failed ? text.notSaved : note.value.length >= MAX_LENGTH ? text.full : '';
  status.classList.toggle('error', failed);

  note.style.fontSize = `${options.fontSize}px`;
  note.classList.toggle('mono', options.monospace);
  note.spellcheck = options.spellcheck;
}

note.addEventListener('input', () => {
  clearTimeout(saveTimer);
  saveTimer = setTimeout(save, SAVE_DELAY);
  render();
});

// Save at once when the field is left, so closing the island right after typing loses nothing.
note.addEventListener('blur', () => {
  if (saveTimer !== undefined) save();
});

const context = await ready();
text = TEXTS[context.language] ?? TEXTS.en;
language.subscribe((next) => {
  text = TEXTS[next] ?? TEXTS.en;
  render();
});
options = context.settings;
settings.subscribe((next) => {
  options = next;
  render();
});
const stored = await storage.get('text');
note.value = typeof stored === 'string' ? stored : '';
note.disabled = false;
render();
