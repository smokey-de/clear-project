import { Outlet } from 'react-router-dom';

import { Layout } from '@/widgets/layout';

import { TOKEN } from '@/shared/lib/constants';

export const PrivateRoute = () => {

  // useLayoutEffect(() => {
  //   (async function () {
  //     const authToken = Cookies.get(TOKEN.AUTH_TOKEN);
  //     if (!authToken) {
  //       logoutUser();
  //     } else {
  //       await getViewerData();
  //     }
  //   })();
  // }, [logoutUser, getViewerData]);

  return (
    <Layout>
      <Outlet />
    </Layout>
  );
};
