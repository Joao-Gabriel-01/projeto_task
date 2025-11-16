import 'zone.js/node';
import express from 'express';
import bootstrap from './main.server';
import { renderApplication } from '@angular/platform-server';

export function app() {
  const server = express();

  // Sem wildcard, usando use()
  server.use(async (req, res) => {
    try {
      const html = await renderApplication(bootstrap, {
        url: req.originalUrl
      });
      res.status(200).send(html);
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  });

  return server;
}

function run() {
  const port = process.env['PORT'] || 4000;
  const server = app();
  server.listen(port, () => {
    console.log(`SSR server listening at http://localhost:${port}`);
  });
}

run();
