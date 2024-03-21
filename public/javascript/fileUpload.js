FilePond.registerPlugin(FilePondPluginFileEncode, FilePondPluginImagePreview, FilePondPluginImageResize);

FilePond.setOptions({
  StylePanelAspectRatio: 300 / 300,
  allowImageResize: true,
  imageResizeTargetWidth: 300,
  imageResizeTargetHeight: 300,
  imageResizeMode: 'contain',
});

FilePond.parse(document.body);
