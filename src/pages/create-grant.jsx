import { Helmet } from 'react-helmet-async';

import { CreateGrantView } from 'src/sections/grant/grant';

// ----------------------------------------------------------------------

export default function CreateGrantPage() {
  return (
    <>
      <Helmet>
        <title> Grants | RIIC </title>
      </Helmet>

      <CreateGrantView />
    </>
  );
}