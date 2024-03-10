import { Helmet } from 'react-helmet-async';

import { CreateGrantView } from 'src/sections/grant/create-grant';

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