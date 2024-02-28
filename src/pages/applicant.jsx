import { Helmet } from 'react-helmet-async';

import { ApplicantView } from 'src/sections/applicant/View';

// ----------------------------------------------------------------------

export default function ApplicantPage() {
  return (
    <>
      <Helmet>
        <title> Applicants | RIIC </title>
      </Helmet>

      <ApplicantView />
    </>
  );
}