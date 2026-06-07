import React, { Children } from 'react'
import { RouterProvider,createBrowserRouter } from 'react-router-dom'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import  './index.css'
import Home from './components/Home/Home'
import Login from './components/Login/Login'
import About from './components/About/About'
import Donate from './components/Donate/Donate'
import Signup from './components/Signup/SignUp'
import Events from './components/Events/Events.jsx'
import Blog from './components/Blog/Blog.jsx'
import Volunteering from './components/Volunteering/Volunteering.jsx'
import VolunteeringRequests from './components/Volunteering/VolunteeringRequests.jsx'
import Quiz from './components/Quiz/Quiz.jsx'
import Admin from './components/Admin/Admin.jsx'
import MembershipPage from './components/Membership/membership_temp.jsx'
import MembershipLayout from './components/Membership/MembershipLayout.jsx'
import MembershipTier from './components/Membership/epsilon_program_membership.jsx'
import { AuthProvider } from './creatContext.jsx'
import StoryPage from './components/stories/storyPage.jsx'
import Profile from './components/Profile/Profile.jsx'
import EpsilonMap from './components/epsilonMap/EpsilonMap.jsx'
import Try1 from './components/Membership/try1.jsx'
import AllUsers from './components/Admin/Alluser.jsx'
import InquiryForm from './components/InquiryForm/Inquiryform.jsx'
import AdminInquiries from './components/Admin/AdminInquiries.jsx'
import AdminNewsForm from './components/Admin/News_Add.jsx'
import UserNews from './components/InquiryForm/News_See.jsx'

const router=createBrowserRouter([
  {
    path:'/',
    element:<App />,
    children:[
      {
        path:"",
        element:<Home />
      },
      {
        path:"Signup",
        element:<Signup />
      },
      {
        path:"Login",
        element:<Login />
      },
      {
        path:"About",
        element:<About/>
      },
      {
        path:"Membership",
        element:<MembershipPage/>
      },
      {
        path:"Donate",
        element:<Donate/>
      },
      {
        path:"Quiz",
        element:<Quiz/>
      },
      {
        path:"Admin",
        element:<Admin/>
      },
      {
        path:"Events",
        element:<Events/>
      },
      {
        path:"Blog",
        element:<Blog/>
      },
      {
        path:"Volunteering",
        element:<Volunteering/>
      },
      {
        path:"VolunteeringRequests",
        element:<VolunteeringRequests/>
      },
      {
        path:"MembershipLayout/:membership_id",
        element:<MembershipLayout/>
      },
      {
        path:"/epsilon_program_membership/:membership_id",
        element:<MembershipTier/>
      },
      {
        path:"storyPage",
        element:<StoryPage/>
      },
      {
        path:"Profile",
        element:<Profile/>
      },
      {
        path:"epsilonMap",
        element:<EpsilonMap/>
      },
      {
        path:"allusers",
        element:<AllUsers/>
      },
      {
        path:"inquiryForm",
        element:<InquiryForm/>
      },
      {
        path:"allinquires",
        element:<AdminInquiries/>
      },{
        path:"AddNews",
        element:<AdminNewsForm/>
      },
      {
        path:"News",
        element:<UserNews/>
      },    
  
    ]
  }
])


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
    <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>,
)
