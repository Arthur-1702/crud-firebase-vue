<template>
  <div v-if="currentCliente" class="edit-form">
    <h4>Cliente</h4>
    <form>
    <div class="form-group">
      <label for="nome">Nome:</label>
      <input
        type="text"
        class="form-control"
        id="nome"
        v-model="currentCliente.nome"
      />
    </div>

    <div class="form-group">
      <label for="sexo">Sexo:</label>
      <input
        type="text"
        class="form-control"
        id="sexo"
        v-model="currentCliente.sexo"
      />
    </div>

    <div class="form-group">
      <label for="cpf">CPF:</label>
      <input
        type="text"
        class="form-control"
        id="cpf"
        v-model="currentCliente.cpf"
      />
    </div>

    <div class="form-group">
      <label for="telefone">Telefone:</label>
      <input
        type="text"
        class="form-control"
        id="telefone"
        v-model="currentCliente.telefone"
      />
    </div>

    <div class="form-group">
      <label for="cep">CEP:</label>
      <input
        type="text"
        class="form-control"
        id="cep"
        v-model="currentCliente.cep"
      />
    </div>

    <div class="form-group">
      <label for="estado">Estado:</label>
      <input
        type="text"
        class="form-control"
        id="estado"
        v-model="currentCliente.estado"
      />
    </div>

    <div class="form-group">
      <label for="cidade">Cidade:</label>
      <input
        type="text"
        class="form-control"
        id="cidade"
        v-model="currentCliente.cidade"
      />
    </div>

    <div class="form-group">
      <label for="bairro">Bairro:</label>
      <input
        type="text"
        class="form-control"
        id="bairro"
        v-model="currentCliente.bairro"
      />
    </div>

    <div class="form-group">
      <label for="logradouro">Logradouro:</label>
      <input
        type="text"
        class="form-control"
        id="logradouro"
        v-model="currentCliente.logradouro"
      />
    </div>

    <div class="form-group">
      <label for="numero">Número:</label>
      <input
        type="text"
        class="form-control"
        id="numero"
        v-model="currentCliente.numero"
      />
    </div>
  </form>

    <button class="badge badge-danger mr-2" @click="deleteCliente">
      Deletar
    </button>

    <button type="submit" class="badge badge-success" @click="updateCliente">
      Atualizar
    </button>
    <p>{{ message }}</p>
  </div>

  <div v-else>
    <br />
    <p>Por favor, clique em um Cliente...</p>
  </div>
</template>

<script>
import ClientesService from "../services/ClientesService";

export default {
  name: "cliente",
  props: ["cliente"],
  data() {
    return {
      currentCliente: null,
      message: "",
    };
  },
  watch: {
    cliente: function(cliente) {
      this.currentCliente = { ...cliente };
      this.message = "";
    },
  },
  methods: {
    updateCliente() {
      const data = {
      nome: this.currentCliente.nome,
      sexo: this.currentCliente.sexo,
      cpf: this.currentCliente.cpf,
      telefone: this.currentCliente.telefone,
      cep: this.currentCliente.cep,
      estado: this.currentCliente.estado,
      cidade: this.currentCliente.cidade,
      bairro: this.currentCliente.bairro,
      logradouro: this.currentCliente.logradouro,
      numero: this.currentCliente.numero,
    };

      ClientesService.update(this.currentCliente.key, data)
        .then(() => {
          this.message = "O cliente foi atualizado com sucesso!";
        })
        .catch((e) => {
          console.log(e);
        });
    },

    deleteCliente() {
      ClientesService.delete(this.currentCliente.key)
        .then(() => {
          this.$emit("refreshList");
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
  mounted() {
    this.message = "";
    this.currentCliente = { ...this.cliente };
  },
};
</script>

<style>
.edit-form {
  max-width: 300px;
  margin: auto;
}
</style>
