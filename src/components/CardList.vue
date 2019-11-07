<template>
  <div>
    <b-container class="mb-5">
      <b-card header="My Cards" class="shadow">
        <b-card-body>
          <b-row
            v-for="(card, index) in cards"
            :key="index"
            class="bg-gray p-2 p-md-4 mb-3 d-flex"
          >
            <b-col md="3" cols="7" class="order-1">
              <img
                v-if="cardIndexDefault == index"
                src="../images/ok-green-ico.svg"
                width="20px"
                class="mr-2 img-fluid inline-block"
              />
              <img
                v-if="cardIndexDefault != index"
                src="../images/ok-gray-ico.svg"
                width="20px"
                class="mr-2 img-fluid inline-block"
              />
              <b-img
                :src="card.imgSrc"
                class="inline-block img-fluid card-img"
              ></b-img>
            </b-col>
            <b-col md="5" cols="12" class="dark-gray order-3 order-md-2 pl-5">
              {{ card.cardBrand }} **** **** {{ card.lastFour }}
              <br />
              Exp.Date: {{ card.expDate }}
              <div class="d-block d-md-none"></div>
              <b-link
                v-if="cardIndexDefault == index"
                class="second-blue text-small"
              >
                <u>Default Card</u>
              </b-link>
              <b-link
                class="second-blue text-small d-block d-md-none"
                v-b-modal.modal-set-default
                v-if="cardIndexDefault != index"
                @click="setCardIndexSelected(index)"
              >
                <u>Set as default</u>
              </b-link>
            </b-col>
            <b-col md="4" cols="5" class="order-2 order-md-3 text-right">
              <b-link
                class="second-blue text-small d-none d-md-block float-left"
                v-b-modal.modal-set-default
                v-if="cardIndexDefault != index"
                @click="setCardIndexSelected(index)"
              >
                <u>Set as default</u>
              </b-link>
              <b-button
                variant="outline-dark"
                class="btn-sm ml-md-4"
                v-b-modal.modal-remove
                @click="setCardIndexSelected(index)"
                >Remove</b-button
              >
            </b-col>
          </b-row>
        </b-card-body>
      </b-card>
    </b-container>
    <b-modal
      id="modal-set-default"
      centered
      v-bind:hide-header="true"
      size="sm"
      footerClass="justify-content-center border-top-0"
    >
      <template v-slot:default="{ hide }">
        <button
          type="button"
          aria-label="Close"
          class="close float-left mb-2"
          @click="hide()"
        >
          ×
        </button>
        <div class="clearfix"></div>
        <img src="../images/defaultcard-logo.svg" width="64" class="mb-3" />
        <h5 class="second-blue">Change default card</h5>
        <p class="dark-gray h6">
          This card will appear as primary option for your payment. Are you sure
          you want to set this card as default?
        </p>
      </template>
      <template v-slot:modal-footer="{ cancel }">
        <b-button
          size="sm"
          variant="success"
          @click="setCardIndexDefault"
          class="rigid-size-btn"
          >Yes</b-button
        >
        <b-button
          size="sm"
          variant="outline-dark"
          @click="cancel()"
          class="rigid-size-btn"
          >Cancel</b-button
        >
      </template>
    </b-modal>

    <b-modal
      id="modal-remove"
      centered
      v-bind:hide-header="true"
      size="sm"
      footerClass="justify-content-center border-top-0"
    >
      <template v-slot:default="{ hide }">
        <button
          type="button"
          aria-label="Close"
          class="close float-left mb-2"
          @click="hide()"
        >
          ×
        </button>
        <div class="clearfix"></div>
        <img src="../images/Remove-payment-ico.svg" width="64" class="mb-3" />
        <h5 class="second-blue">Remove card</h5>
        <p class="dark-gray h6">Are you sure want to remove from wallet?</p>
      </template>
      <template v-slot:modal-footer="{ cancel }">
        <b-button
          size="sm"
          variant="success"
          @click="removeCard()"
          class="rigid-size-btn"
          >Yes</b-button
        >
        <b-button
          size="sm"
          variant="outline-dark"
          @click="cancel()"
          class="rigid-size-btn"
          >Cancel</b-button
        >
      </template>
    </b-modal>
  </div>
</template>

<script>
import { EventBus } from "../main";
export default {
  name: "CardList",
  data() {
    return {
      cards: [],
      cardIndexSelected: null,
      cardIndexDefault: null
    };
  },
  created() {
    EventBus.$on("card-added", data => {
      let found = this.cards.find(
        element => element.cardNumber == data.cardNumber
      );
      if (!found) {
        this.cards.push(data);
      } else {
        alert(
          "Error. The card **** **** " + data.lastFour + " was added already!"
        );
      }
    });
  },
  methods: {
    setCardIndexSelected(index) {
      this.cardIndexSelected = index;
    },
    setCardIndexDefault() {
      this.cardIndexDefault = this.cardIndexSelected;
      this.$bvModal.hide("modal-set-default");
    },
    removeCard() {
      if (this.cardIndexSelected == this.cardIndexDefault) {
        this.cardIndexDefault = null;
      }
      this.cards.splice(this.cardIndexSelected, 1);
      this.$bvModal.hide("modal-remove");
    }
  }
};
</script>
