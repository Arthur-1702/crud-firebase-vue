<template>
  <div id="app">
    <nav class="navbar navbar-expand navbar-dark bg-dark">
      <router-link to="/" class="navbar-brand">Pagina Princial</router-link>
      <div class="navbar-nav mr-auto">
        <li class="nav-item">
          <router-link to="/clientes" class="nav-link">Clientes</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/cadastro" class="nav-link">Cadastro</router-link>
        </li>
      </div>
    </nav>

    <div class="container mt-3">
      <h2>Meus clientes</h2>
      <router-view />
    </div>
  </div>
</template>

<script>
export default {
  name: "app"
};
</script>

<style scoped>
.container h2 {
  text-align: center;
  margin: 25px auto;
}
</style>