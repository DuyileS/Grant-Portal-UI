import { Helmet } from 'react-helmet-async';

import { CreateApplicantView } from 'src/sections/applicant/create-applicant';

// ----------------------------------------------------------------------

export default function CreateApplicantPage() {
  return (
    <>
      <Helmet>
        <title> Applicants | RIIC </title>
      </Helmet>

      <CreateApplicantView />
    </>
  );
}