import { Helmet } from 'react-helmet-async';

import { EditGrantView } from 'src/sections/grant/edit-grant';

// ----------------------------------------------------------------------

export default function EditGrantPage() {
  return (
    <>
      <Helmet>
        <title> Grants | RIIC </title>
      </Helmet>

      <EditGrantView />
    </>
  );
}
