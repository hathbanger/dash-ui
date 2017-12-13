import Dashboard from 'views/Dashboard/Dashboard.jsx';
import Buttons from 'views/Components/Buttons.jsx';
import GridSystem from 'views/Components/GridSystem.jsx';
import Panels from 'views/Components/Panels.jsx';
import SweetAlert from 'views/Components/SweetAlertPage.jsx';
import Notifications from 'views/Components/Notifications.jsx';
import Icons from 'views/Components/Icons.jsx';
import Typography from 'views/Components/Typography.jsx';
import RegularForms from 'views/Forms/RegularForms.jsx';
import ExtendedForms from 'views/Forms/ExtendedForms.jsx';
import ValidationForms from 'views/Forms/ValidationForms.jsx';
import Wizard from 'views/Forms/Wizard/Wizard.jsx';
import RegularTables from 'views/Tables/RegularTables.jsx';
import ExtendedTables from 'views/Tables/ExtendedTables.jsx';
import DataTables from 'views/Tables/DataTables.jsx';
import GoogleMaps from 'views/Maps/GoogleMaps.jsx';
import FullScreenMap from 'views/Maps/FullScreenMap.jsx';
import VectorMap from 'views/Maps/VectorMap.jsx';
import Charts from 'views/Charts/Charts.jsx';
import Calendar from 'views/Calendar/Calendar.jsx';
import UserPage from 'views/Pages/UserPage.jsx';
import EmployeesPage from 'views/Pages/EmployeesPage.jsx';
import OrganizationPage from 'views/Pages/OrganizationPage.jsx';



// var pages = [{ path: "/pages/user-page", name: "User Page", mini: "UP", component: UserPage }];

var dashRoutes = [
    { path: "/dashboard", name: "Dashboard", icon: "pe-7s-graph", component: Dashboard, render: true },
    // { collapse: true, path: "/components", name: "Components", state: "openComponents", icon: "pe-7s-plugin", views:[
    //     { path: "/components/buttons", name: "Buttons", mini: "B", component: Buttons },
    //     { path: "/components/grid-system", name: "Grid System", mini: "GS", component: GridSystem },
    //     { path: "/components/panels", name: "Panels", mini: "P", component: Panels },
    //     { path: "/components/sweet-alert", name: "Sweet Alert", mini: "SA", component: SweetAlert },
    //     { path: "/components/notifications", name: "Notifications", mini: "N", component: Notifications },
    //     { path: "/components/icons", name: "Icons", mini: "I", component: Icons },
    //     { path: "/components/typography", name: "Typography", mini: "T", component: Typography }]
    // },

    // { collapse: true, path: "/forms", name: "Forms", state: "openForms", render: true, icon: "pe-7s-note2", views:
    //     [{ path: "/forms/regular-forms", name: "Regular Forms", mini: "RF", component: RegularForms, render: true },
    //     { path: "/forms/extended-forms", name: "Extended Forms", mini: "EF", component: ExtendedForms, render: true },
    //     { path: "/forms/validation-forms", name: "Validation Forms", mini: "VF", component: ValidationForms, render: true },
    //     { path: "/forms/wizard", name: "Wizard", mini: "W", component: Wizard, render: true }]
    // },    
    { path: "/pages/organization-page", name: "Organization", icon: "pe-7s-culture", mini: "US", component: OrganizationPage, render: true },
    { path: "/pages/employees-page", name: "Employees", icon: "pe-7s-users", mini: "US", component: EmployeesPage, render: true },
    { path: "/pages/user-page", name: "User", icon: "pe-7s-user", mini: "US", component: UserPage, render: true }
    // { collapse: true, path: "/tables", name: "Tables", state: "openTables", icon: "pe-7s-news-paper", views:
    //     [{ path: "/tables/regular-tables", name: "Regular Tables", mini: "RT", component: RegularTables },
    //     { path: "/tables/extended-tables", name: "Extended Tables", mini: "ET", component: ExtendedTables },
    //     { path: "/tables/data-tables", name: "Data Tables", mini: "DT", component: DataTables }]
    // },
    // { collapse: true, path: "/maps", name: "Maps", state: "openMaps", icon: "pe-7s-map-marker", views:
    //     [{ path: "/maps/google-maps", name: "Google Maps", mini: "GM", component: GoogleMaps },
    //     { path: "/maps/full-screen-maps", name: "Full Screen Map", mini: "FSM", component: FullScreenMap },
    //     { path: "/maps/vector-maps", name: "Vector Map", mini: "VM", component: VectorMap }]
    // },
    // { path: "/charts", name: "Charts", icon: "pe-7s-graph1", component: Charts },
    // { path: "/calendar", name: "Calendar", icon: "pe-7s-date", component: Calendar },
    // { redirect: true, path: "/", pathTo: "/dashboard", name: "Dashboard" }
];
export default dashRoutes;
