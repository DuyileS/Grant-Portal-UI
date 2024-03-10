import { Helmet } from 'react-helmet-async';

import { CreateUserView } from 'src/sections/user/create-user';

// ----------------------------------------------------------------------

export default function CreateUserPage() {
  return (
    <>
      <Helmet>
        <title> Users | RIIC </title>
      </Helmet>

      <CreateUserView />
    </>
  );
}