import { Helmet } from 'react-helmet-async';

import { GrantView } from 'src/sections/grant/View';

// ----------------------------------------------------------------------

export default function GrantPage() {
  return (
    <>
      <Helmet>
        <title> Grants | RIIC </title>
      </Helmet>

      <GrantView />
    </>
  );
}