import ChatbotDemo from 'views/Pages/ChatbotDemo.jsx';
import LoginPage from 'views/Pages/LoginPage.jsx';
import RegisterPage from 'views/Pages/RegisterPage.jsx';
import LockScreenPage from 'views/Pages/LockScreenPage.jsx';
import UserPage from 'views/Pages/UserPage.jsx';
import EmployeesPage from 'views/Pages/EmployeesPage.jsx';

var pagesRoutes = [
	// { path: "/pages/user-page", name: "User Page", mini: "UP", component: UserPage },
	// { path: "/pages/employees-page", name: "Employees Page", mini: "UP", component: EmployeesPage },
    { path: "/auth/chatbot-demo", name: "Chatbot Demo Page", mini: "LP", component: ChatbotDemo },
    { path: "/auth/login-page", name: "Login Page", mini: "LP", component: LoginPage },
    // { path: "/auth/register-page", name: "Register", mini: "RP", component: RegisterPage },
    // { path: "/auth/lock-screen-page", name: "Lock Screen Page", mini: "LSP", component: LockScreenPage }
];

export default pagesRoutes;
