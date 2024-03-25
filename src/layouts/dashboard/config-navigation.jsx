import SvgColor from 'src/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const navConfig = [
  {
    title: 'dashboard',
    path: '/',
    icon: icon('ic_analytics'),
  },
  {
    title: 'user management',
    path: '/user',
    icon: icon('ic_user'),
  },
  {
    title: 'awardees',
    path: '/awardees',
    icon: icon('ic_awardee'),
  },
  {
    title: 'applicants',
    path: '/applicant',
    icon: icon('ic_user'),
  },
  {
    title: 'grants',
    path: '/grant',
    icon: icon('ic_grant'),
  },
];

export default navConfig;
