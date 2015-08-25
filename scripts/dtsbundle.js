require('dts-generator').generate({
  name: 'phosphor-nodewrapper',
  main: 'phosphor-nodewrapper/index',
  baseDir: 'lib',
  files: ['index.d.ts'],
  out: 'lib/phosphor-nodewrapper.d.ts',
});
