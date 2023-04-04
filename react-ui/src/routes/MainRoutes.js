import React, { lazy } from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';

// project imports
import MainLayout from './../layout/MainLayout';
import Loadable from '../ui-component/Loadable';
import AuthGuard from './../utils/route-guard/AuthGuard';

// dashboard routing
const DashboardDefault = Loadable(lazy(() => import('../views/dashboard/Default')));

// utilities routing
const UtilsKHACHHANG = Loadable(lazy(() => import('../views/utilities/KHACHHANG')));
const UtilsDIENKE = Loadable(lazy(() => import('../views/utilities/DIENKE')));
const UtilsHOADON = Loadable(lazy(() => import('../views/utilities/HOADON')));
const UtilsBANGGIAHANHCHINH = Loadable(lazy(() => import('../views/utilities/BANGGIAHANHCHINH')));
const UtilsBANGGIASANXUAT = Loadable(lazy(() => import('../views/utilities/BANGGIASANXUAT')));
const UtilsBANGGIAKINHDOANH = Loadable(lazy(() => import('../views/utilities/BANGGIAKINHDOANH')));
const UtilsBANGGIASINHHOAT = Loadable(lazy(() => import('../views/utilities/BANGGIASINHHOAT')));
const UtilsTAIKHOAN = Loadable(lazy(() => import('../views/utilities/TAIKHOAN')));
const UtilsTiendien = Loadable(lazy(() => import('../views/utilities/Tiendien')));


// sample page routing
const SamplePage = Loadable(lazy(() => import('../views/sample-page')));

//-----------------------|| MAIN ROUTING ||-----------------------//

const MainRoutes = () => {
    const location = useLocation();

    return (
        <Route
            path={[
                '/dashboard/default',

                '/utils/util-qlkh',
                '/utils/util-qldk',
                '/utils/util-qlhd',
                '/utils/util-qltk',
                '/icons/banggiasanxuat',
                '/icons/banggiahanhchinh',
                '/icons/banggiakinhdoanh',
                '/icons/banggiasinhhoat',
                '/utils/util-tiendien',

                '/sample-page'
            ]}
        >
            <MainLayout>
                <Switch location={location} key={location.pathname}>
                    <AuthGuard>
                        <Route path="/dashboard/default" component={DashboardDefault} />
                        <Route path="/utils/util-qlkh" component={UtilsKHACHHANG} />
                        <Route path="/utils/util-qldk" component={UtilsDIENKE} />
                        <Route path="/utils/util-qlhd" component={UtilsHOADON} />
                        <Route path="/icons/banggiasanxuat" component={UtilsBANGGIASANXUAT} />
                        <Route path="/icons/banggiahanhchinh" component={UtilsBANGGIAHANHCHINH} />
                        <Route path="/icons/banggiakinhdoanh" component={UtilsBANGGIAKINHDOANH} />
                        <Route path="/icons/banggiasinhhoat" component={UtilsBANGGIASINHHOAT} />
                        <Route path="/utils/util-qltk" component={UtilsTAIKHOAN} />
                        <Route path="/utils/util-tiendien" component={UtilsTiendien} />

                        <Route path="/sample-page" component={SamplePage} />
                    </AuthGuard>
                </Switch>
            </MainLayout>
        </Route>
    );
};

export default MainRoutes;
