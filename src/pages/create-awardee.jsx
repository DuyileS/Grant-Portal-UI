import { Helmet } from 'react-helmet-async';

import { CreateAwardeeView } from 'src/sections/awardees/create-awardee';

// ----------------------------------------------------------------------

export default function CreateAwardeePage() {
  return (
    <>
      <Helmet>
        <title> Awardees | RIIC </title>
      </Helmet>

      <CreateAwardeeView />
    </>
  );
}