<template>
  <b-container fluid class="mt-5">
    <b-tabs content-class="mt-3" align="center">
      <b-tab>
        <template v-slot:title>
          <span class="icon-My-applications-ico"></span>
          <span class="d-none d-md-inline"> MY APPLICATIONS</span>
        </template>
        <b-container>
          <p>I'm the first tab</p>
        </b-container>
      </b-tab>
      <b-tab>
        <template v-slot:title>
          <span class="icon-My-travelers-ico"></span>
          <span class="d-none d-md-inline"> MY TRAVELERS</span>
        </template>
        <b-container>
          <p>I'm the second tab</p>
        </b-container>
      </b-tab>
      <b-tab active>
        <template v-slot:title>
          <span class="icon-My-cards-ico"></span>
          <span class="d-none d-md-inline"> MY CARDS</span>
        </template>
        <CardList></CardList>
        <CardForm></CardForm>
      </b-tab>
      <b-tab>
        <template v-slot:title>
          <span class="icon-My-Account-ico"></span>
          <span class="d-none d-md-inline"> MY ACCOUNT</span>
        </template>
        <b-container>
          <p>I'm the third tab</p>
        </b-container>
      </b-tab>
    </b-tabs>
  </b-container>
</template>

<script>
import CardList from "./CardList.vue";
import CardForm from "./CardForm";
export default {
  name: "Home",
  components: {
    CardList,
    CardForm
  }
};
</script>
