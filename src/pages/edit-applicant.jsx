import { Helmet } from 'react-helmet-async';

import { EditApplicantView } from 'src/sections/applicant/edit-applicant';

// ----------------------------------------------------------------------

export default function EditApplicantPage() {
  return (
    <>
      <Helmet>
        <title> Applicants | RIIC </title>
      </Helmet>

      <EditApplicantView />
    </>
  );
}
