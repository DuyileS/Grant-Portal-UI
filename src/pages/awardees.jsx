import { Helmet } from 'react-helmet-async';

import { AwardeeView } from 'src/sections/awardees/View';

// ----------------------------------------------------------------------

export default function AwardeePage() {
  return (
    <>
      <Helmet>
        <title> Awardees | RIIC </title>
      </Helmet>

      <AwardeeView/>
    </>
  );
}