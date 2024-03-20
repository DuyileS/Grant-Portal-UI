import { Helmet } from 'react-helmet-async';

import { EditAwardeeView } from 'src/sections/awardees/edit-awardee';

// ----------------------------------------------------------------------

export default function EditAwardeePage() {
  return (
    <>
      <Helmet>
        <title> Awardees | RIIC </title>
      </Helmet>

      <EditAwardeeView />
    </>
  );
}
