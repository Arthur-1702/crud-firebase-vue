<template>
  <div class="list row">
    <div class="col-md-6">
      <h4>Meus Clientes</h4>
      <ul class="list-group">
        <li
          class="list-group-item"
          :class="{ active: index == currentIndex }"
          v-for="(cliente, index) in clientes"
          :key="index"
          @click="setActiveCliente(cliente, index)"
        >
          {{ cliente.nome }}
        </li>
      </ul>

      <button class="m-3 btn btn-sm btn-danger" @click="removeAllClientes">
        Remover Todos
      </button>
    </div>
    <div class="col-md-6">
      <div v-if="currentCliente">
        <cliente
          :cliente="currentCliente"
          @refreshList="refreshList"
        />
      </div>
      <div v-else>
        <br />
        <p>Por favor, clique em um Cliente...</p>
      </div>
    </div>
  </div>
</template>

<script>
import ClientesService from "../services/ClientesService";
import Cliente from "./Cliente";

export default {
  name: "lista-clientes",
  components: { Cliente },
  data() {
    return {
      clientes: [],
      currentCliente: null,
      currentIndex: -1
    };
  },
  methods: {
    
    onDataChange(items) {
      let _clientes = [];
      
      items.forEach((item) => {
        let key = item.key;
        let data = item.val();
        _clientes.push({
          key: key,
          nome: data.nome,
          sexo: data.sexo,
          cpf: data.cpf,
          telefone: data.telefone,
          cep: data.cep,
          estado: data.estado,
          cidade: data.cidade,
          bairro: data.bairro,
          logradouro: data.logradouro,
          numero: data.numero
        });
      });
      
      this.clientes = _clientes;
      console.log(this.clientes);

    },

    refreshList() {
      this.currentCliente = null;
      this.currentIndex = -1;
    },

    setActiveCliente(client, index) {
      this.currentCliente = client;
      this.currentIndex = index;
    },

    removeAllClientes() {
      ClientesService.deleteAll()
        .then(() => {
          this.refreshList();
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
  mounted() {
    ClientesService.getAll().on("value", this.onDataChange);

  },
  beforeUnmount() {
    ClientesService.getAll().off("value", this.onDataChange);
  }
};
</script>

<style>
.list {
  text-align: left;
  max-width: 750px;
  margin: auto;
}
</style>
