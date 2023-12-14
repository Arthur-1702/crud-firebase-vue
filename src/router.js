import { createWebHistory, createRouter } from "vue-router";

const routes =  [
  {
    path: "/",
    alias: "/clientes",
    name: "clientes",
    component: () => import("./components/ListaClientes")
  },
  {
    path: "/cadastro",
    name: "cadastro",
    component: () => import("./components/Cadastro")
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;