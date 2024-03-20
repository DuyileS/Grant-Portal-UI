import { lazy, Suspense } from 'react';
import { Outlet, Navigate, useRoutes } from 'react-router-dom';

import DashboardLayout from 'src/layouts/dashboard';

export const IndexPage = lazy(() => import('src/pages/app'));
export const BlogPage = lazy(() => import('src/pages/blog'));
export const AwardeesPage = lazy(() => import('src/pages/awardees'));
export const GrantPage = lazy(() => import('src/pages/grant'));
export const ApplicantPage = lazy(() => import('src/pages/applicant'));
export const UserPage = lazy(() => import('src/pages/user'));
export const LoginPage = lazy(() => import('src/pages/login'));
export const ProfilePage = lazy(() => import('src/pages/profile'));
export const ProductsPage = lazy(() => import('src/pages/products'));
export const SignupPage = lazy(() => import('src/pages/signup'));
export const CreateApplicantPage = lazy(() => import('src/pages/create-applicant'));
export const CreateAwardeePage = lazy(() => import('src/pages/create-awardee'));
export const CreateGrantPage = lazy(() => import('src/pages/create-grant'));
export const CreateUserPage = lazy(() => import('src/pages/create-user'));
export const EditApplicantPage = lazy(() => import('src/pages/edit-applicant'));
export const EditAwardeePage = lazy(() => import('src/pages/edit-awardee'));
export const EditGrantPage = lazy(() => import('src/pages/edit-grant'));
export const Page404 = lazy(() => import('src/pages/page-not-found'));

// ----------------------------------------------------------------------

export default function Router() {
  const routes = useRoutes([
    {
      element: (
        <DashboardLayout>
          <Suspense>
            <Outlet />
          </Suspense>
        </DashboardLayout>
      ),
      children: [
        { element: <IndexPage />, index: true },
        { path: 'user', element: <UserPage /> },
        { path: 'awardees', element: <AwardeesPage /> },
        { path: 'applicant', element: <ApplicantPage /> },
        { path: 'grant', element: <GrantPage /> },
        { path: 'products', element: <ProductsPage /> },
        { path: 'blog', element: <BlogPage /> },
      ],
    },
    {
      path: 'login',
      element: <LoginPage />,
    },
    {
      path: 'register',
      element: <SignupPage />,
    },
    {
      path: 'profile',
      element: <ProfilePage />,
    },
    {
      path: 'createApplicant',
      element: <CreateApplicantPage />,
    },
    {
      path: 'createAwardee',
      element: <CreateAwardeePage />,
    },
    {
      path: 'createGrant',
      element: <CreateGrantPage />,
    },
    {
      path: 'createUser',
      element: <CreateUserPage />,
    },
    {
      path: 'editApplicant',
      element: <EditApplicantPage />,
    },
    {
      path: 'editAwardee',
      element: <EditAwardeePage />,
    },
    {
      path: 'editGrant',
      element: <EditGrantPage />,
    },
    {
      path: '404',
      element: <Page404 />,
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
