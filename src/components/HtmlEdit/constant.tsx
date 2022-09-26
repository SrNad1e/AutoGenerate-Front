export const toolbarModules = {
  listsAndIndents: [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
  characterFormats: ['bold', 'italic'],
  listTypeOfImages: ['link', 'image'],
};

export const formatsSettings = {
  listsAndIndents: ['list', 'bullet', 'indent'],
  characterFormats: ['bold', 'italic', 'underline', 'strike', 'blockquote', 'align'],
};

export const formats = [...formatsSettings.characterFormats, ...formatsSettings.listsAndIndents];

export const modules = {
  toolbar: [toolbarModules.characterFormats, toolbarModules.listsAndIndents],
  clipboard: { matchVisual: false },
  history: {
    delay: 2000,
    maxStack: 100,
    userOnly: true,
  },
};
