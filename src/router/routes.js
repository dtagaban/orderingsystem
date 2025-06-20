const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    meta: { requiresAuth: true },
    children: [
      {
        name: "JMR Auto-Parts Ordering System",
        path: "",
        component: () => import("pages/Index.vue")
      },
      {
        name: "Basket",
        path: "basket",
        component: () => import("pages/Basket.vue")
      },
      {
        name: "Order History",
        path: "order_history",
        component: () => import("pages/OrderHistory.vue")
      },
      {
        name: "Dashboard",
        path: "dashboard",
        component: () => import("pages/Dashboard.vue")
      },
      {
        name: "Chat",
        path: "chat",
        component: () => import("pages/Chat.vue")
      },
      {
        name: "Account",
        path: "account",
        component: () => import("pages/Account.vue")
      }
    ]
  },
  { path: "/landing", component: () => import("pages/Landing.vue") },
  { path: "/login", component: () => import("pages/Login.vue") },
  { path: "/signup", component: () => import("pages/Signup.vue") },
  {
    path: "/forgot_password",
    component: () => import("pages/ForgotPassword.vue")
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: "*",
    component: () => import("pages/Error404.vue")
  }
];

export default routes;
