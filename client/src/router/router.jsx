import { createBrowserRouter,
 } from "react-router"
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/Home/Home";
import Register from "../pages/Register";
import SignIn from "../pages/SignIn/SignIn";
import JobDetails from "../pages/JobDetails/JobDetails";
import PrivateRoute from "../routes/PrivateRoute";
import JobApply from "../pages/JobApply/JobApply";
import MyApplications from "../pages/myApplications/MyApplications";
import AddJob from "../pages/AddJob/AddJob";
import NotFound from "../pages/NotFound";
import MyPostedJobs from "../pages/MyPostedJobs/MyPostedJobs";
import ViewApplications from "../pages/ViewApplications/ViewApplications";
import { auth } from '../firebase/firebase.init';
import Messages from "../pages/Messages/Messages";

const router = createBrowserRouter([
    {
        path: "/",
        Component: RootLayout,
        errorElement: <NotFound></NotFound>,
        children: [
            {
            index: true,
            Component: Home
            },
            {
                path: "/register",
                Component: Register
            },
            {
                path:'/jobs/:id',
                Component: JobDetails,
                loader: ({params}) => fetch(`${import.meta.env.VITE_API_URL}/jobs/${params.id}`).then(res => res.json())
            },
            {
              path: '/myPostedJobs',
              element:  <PrivateRoute><MyPostedJobs></MyPostedJobs></PrivateRoute>
            },
            {
                path: 'applications/:job_id',
                element: <PrivateRoute><ViewApplications></ViewApplications></PrivateRoute>,
                loader: async ({params}) => {
        const token = await auth.currentUser.getIdToken();
        const res = await fetch(`${import.meta.env.VITE_API_URL}/applications/job/${params.job_id}`, {
            headers: { authorization: `Bearer ${token}` }
        });
        return res.json();
    }
            },
            {
                path: 'myApplications',
                element: <PrivateRoute><MyApplications></MyApplications></PrivateRoute>
            },
            {
                path: 'addJob',
                element: <PrivateRoute><AddJob></AddJob></PrivateRoute>
            },
            {
                path: '/jobApply/:id',
                element:<PrivateRoute><JobApply></JobApply></PrivateRoute>
            },
            {
                path: "/signIn",
                Component: SignIn
            },

{
    path: 'messages',
    element: <PrivateRoute><Messages></Messages></PrivateRoute>
}
                ]
    },
]);

export default router;