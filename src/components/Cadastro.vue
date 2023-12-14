<template>
      <h1>Cadastro de Cliente</h1>
  <div class="submit-form">
      <div v-if="!submitted">
      <form @submit.prevent="cadastrar">
        <label for="nome">Nome:</label>
        <input v-model="formulario.nome" type="text" id="nome" name="nome" class="form-control" required ><br>
  
        <label for="sexo">Sexo:</label>
        <select v-model="formulario.sexo" class="form-control">
          <option value="" disabled selected>Selecione o Sexo</option>
          <option value="Masculino">Masculino</option>
          <option value="Feminino">Feminino</option>
          <option value="Outro">Outro</option>
        </select><br>
  
        <label for="cpf">CPF:</label>
        <input v-model="formulario.cpf" type="text" id="cpf" name="cpf" class="form-control"><br>
  
        <label for="telefone">Telefone:</label>
        <input v-model="formulario.telefone" type="text" id="telefone" name="telefone" class="form-control"><br>
  
        <label for="cep">CEP:</label>
        <input v-model="formulario.cep" type="text" id="cep" name="cep" @blur="buscarEndereco" class="form-control"><br>
  
        <label for="estado">Estado:</label>
      <select v-model="formulario.estado" class="form-control" >
        <option value="" disabled selected>Selecione um Estado</option>
        <option v-for="estado in estados" :key="estado.sigla" :value="estado.sigla">{{ estado.nome }}</option>
      </select><br>

      <label for="cidade">Cidade:</label>
      <select v-model="formulario.cidade" class="form-control">
        <option value="" disabled selected>Selecione uma Cidade</option>
        <option v-for="cidade in cidades" :key="cidade.nome" :value="cidade.nome">{{ cidade.nome }}</option>
      </select><br>
  
        <label for="bairro">Bairro:</label>
        <input v-model="formulario.bairro" type="text" id="bairro" name="bairro" class="form-control"><br>
  
        <label for="logradouro">Logradouro:</label>
        <input v-model="formulario.logradouro" type="text" id="logradouro" name="logradouro" class="form-control"><br>
  
        <label for="numero">Número:</label>
        <input v-model="formulario.numero" type="text" id="numero" name="numero" class="form-control"><br>
  
        <input type="submit" class="btn btn-success" value="Cadastrar">
      </form>
    </div>

    <div v-else>
      <h4>You submitted successfully!</h4>
      <button class="btn btn-success" @click="novoCadastro">Cadastrar outro</button>
    </div>
</div>
  </template>
  
  <script>
  import ClientesService from "../services/ClientesService";

  export default {
    data() {
      return {
        formulario: {
          nome: '',
          sexo: '',
          cpf: '',
          telefone: '',
          cep: '',
          estado: '',
          cidade: '',
          bairro: '',
          logradouro: '',
          numero: ''
        },
        estados: [],
        cidades: [],
        submitted: false,
      };
    },
    mounted() {
      this.carregarEstados();
    },
    watch:{
        'formulario.estado': function() {
            this.carregarCidades();
        }
    },
    methods: {
      async carregarEstados() {
        try {
          const response = await fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados");
          const data = await response.json();
          this.estados = data;
        } catch (error) {
          console.error("Erro ao carregar estados:", error);
        }
      },

      async carregarCidades() {
      const estadoSigla = this.formulario.estado;
      if (estadoSigla) {
        try {
          const response = await fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${estadoSigla}/municipios`);
          const data = await response.json();
          this.cidades = data;
        } catch (error) {
          console.error("Erro ao carregar cidades:", error);
        }
      } else {
        this.cidades = [];
      }
    },

      async buscarEndereco() {
        const cep = this.formulario.cep.replace(/\D/g, '');
        if (cep.length === 8) {
          try {
            const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
            const data = await response.json();
  
            if (!data.erro) {
              this.formulario.logradouro = data.logradouro;
              this.formulario.bairro = data.bairro;
              this.formulario.cidade = data.localidade;
              this.formulario.estado = data.uf;
            }
          } catch (error) {
            console.error("Erro ao buscar endereço:", error);
          }
        }
      },

      cadastrar() {
        ClientesService.create(this.formulario)
            .then(() => {
            console.log("Created new item successfully!");
            this.submitted = true;
            })
            .catch(e => {
            console.log(e);
            });
        },

        novoCadastro() {
            this.submitted = false;
            this.formulario = {};
        },


    }
  };
  </script>
  
  <style scoped>
  /* Adicione estilos específicos para o componente, se necessário */
  </style>
  