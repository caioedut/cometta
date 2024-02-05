'use client';

import { ReactNode } from 'react';
import { normalize } from '../../../src';

normalize();

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Cometta - NextJS</title>
      </head>
      <body>{children}</body>
    </html>
  );
}
