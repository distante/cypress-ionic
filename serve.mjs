import liveServer from '@compodoc/live-server';

liveServer.start({
  file: 'index.html',
  root: './html',
  host: 'localhost',
  port: '3999',
  ignore: 'src,cypress',
  mount: [
    ['/node_modules', './node_modules'],
    ['/test-helpers', './test-helpers'],
  ],
});
