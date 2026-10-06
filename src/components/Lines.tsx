/* Renders designed line breaks: ['From a little Bandi', 'to your home.']
   -> "From a little Bandi<br/>to your home."

   Copy keeps one entry per line instead of embedding <br/> in
   translations, so translators never touch markup and each
   language can break its lines where it reads naturally. */

import { Fragment } from 'react';

export function Lines({ lines }: { lines: readonly string[] }) {
  return (
    <>
      {lines.map((line, i) => (
        <Fragment key={i}>
          {i > 0 && <br />}
          {line}
        </Fragment>
      ))}
    </>
  );
}
