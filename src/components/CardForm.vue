<template>
  <b-container class="mb-5">
    <b-card no-body class="shadow">
      <template v-slot:header>
        <h4 class="mb-0" v-b-toggle.collapse-a>+ Add New Card</h4>
      </template>
      <b-collapse id="collapse-a" class="mt-2">
        <b-card-body>
          <b-form @submit.stop.prevent="onSubmit">
            <b-row>
              <b-col
                md="3"
                class="dark-green d-flex flex-row justify-content-center justify-content-md-start"
              >
                <img
                  src="../images/ok-green-ico.svg"
                  width="45px"
                  class="mr-2 img-fluid inline-block"
                />
                We Accept All Major
                <br />
                Debit / Credit Cards
              </b-col>
              <b-col
                md="9"
                class="d-flex flex-row justify-content-center justify-content-md-start"
              >
                <img src="../images/Payment-methods.jpg" class="img-fluid" />
              </b-col>
            </b-row>
            <b-row class="mb-3">
              <b-col md="3">
                <label>Name on Card</label>
                <b-form-input
                  v-model="$v.cardName.$model"
                  :state="$v.cardName.$dirty ? !$v.cardName.$error : null"
                  aria-describedby="cardNameFeedback"
                ></b-form-input>
                <b-form-invalid-feedback id="cardNameFeedback"
                  >This field is required and must be between 3 and 10
                  length</b-form-invalid-feedback
                >
              </b-col>
              <b-col md="3">
                <label>Credit / Debit Card Number</label>
                <b-form-input
                  v-model="$v.cardNumber.$model"
                  :state="$v.cardNumber.$dirty ? !$v.cardNumber.$error : null"
                  aria-describedby="cardNumberFeedback"
                ></b-form-input>
                <b-form-invalid-feedback id="cardNumberFeedback"
                  >Please enter a valid credid card</b-form-invalid-feedback
                >
              </b-col>
              <b-col md="2">
                <label>Exp. Month</label>
                <b-form-select
                  v-model="$v.selectedMonth.$model"
                  :state="
                    $v.selectedMonth.$dirty ? !$v.selectedMonth.$error : null
                  "
                  :options="expMonths"
                  aria-describedby="selectedMonthFeedback"
                ></b-form-select>
                <b-form-invalid-feedback id="selectedMonthFeedback"
                  >This field is required</b-form-invalid-feedback
                >
              </b-col>
              <b-col md="2">
                <label>Exp. Year</label>
                <b-form-select
                  v-model="$v.selectedYear.$model"
                  :state="
                    $v.selectedYear.$dirty ? !$v.selectedYear.$error : null
                  "
                  aria-describedby="selectedYearFeedback"
                  :options="expYears"
                ></b-form-select>
                <b-form-invalid-feedback id="selectedYearFeedback"
                  >This field is required</b-form-invalid-feedback
                >
              </b-col>
              <b-col md="2">
                <label>Security Code</label>
                <b-form-input
                  v-model="$v.securityCode.$model"
                  :state="
                    $v.securityCode.$dirty ? !$v.securityCode.$error : null
                  "
                  aria-describedby="securityCodeFeedback"
                ></b-form-input>
                <b-form-invalid-feedback id="securityCodeFeedback"
                  >This field is required and it have to be 3
                  digits.</b-form-invalid-feedback
                >
              </b-col>
            </b-row>
            <b-row>
              <b-col
                md="2"
                class="d-flex flex-row justify-content-center justify-content-md-start"
              >
                <img
                  id="secutity-logo"
                  src="../images/Sectigo-trust-logo.png"
                  class="img-fluid mb-3"
                />
              </b-col>
              <b-col md="10">
                <b-button
                  type="submit"
                  block
                  variant="success"
                  :disabled="$v.$invalid"
                  >Add Card</b-button
                >
              </b-col>
            </b-row>
          </b-form>
        </b-card-body>
      </b-collapse>
    </b-card>
  </b-container>
</template>

<script>
import { EventBus } from "../main";
import { validationMixin } from "vuelidate";
import {
  required,
  minLength,
  maxLength,
  numeric,
  integer,
  helpers
} from "vuelidate/lib/validators";
import AppHelper from "../helpers/AppHelper";

const isCreditCard = value =>
  !helpers.req(value) || AppHelper.getCardType(value) != false;

export default {
  name: "CardForm",
  mixins: [validationMixin],
  validations: {
    cardName: { required, minLength: minLength(3), maxLength: maxLength(10) },
    cardNumber: { required, isCreditCard, numeric },
    selectedYear: { required },
    selectedMonth: { required },
    securityCode: {
      required,
      integer,
      minLength: minLength(3),
      maxLength: maxLength(3)
    }
  },
  data() {
    return {
      selectedYear: null,
      selectedMonth: null,
      expYears: { value: null },
      expMonths: { value: null },
      card: null,
      cardName: null,
      cardNumber: null,
      securityCode: null
    };
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      this.getExpMonths();
      this.getExpYears();
    },
    getExpMonths() {
      let expMonths = Array.from(Array(12), (_, x) => x);
      let expObjMonths = expMonths.map(function(x) {
        return {
          value: AppHelper.pad(x + 1, 2),
          text: AppHelper.pad(x + 1, 2)
        };
      });

      this.expMonths = expObjMonths;
    },
    getExpYears() {
      let currentYear = new Date().getFullYear() - 1;
      let expYears = Array.from(Array(currentYear + 10), (_, x) => x).filter(
        year => year >= currentYear
      );
      let expObjYears = expYears.map(function(x) {
        return { value: x + 1, text: x + 1 };
      });

      this.expYears = expObjYears;
    },
    onSubmit() {
      this.$v.$touch();
      if (this.$v.$anyError) {
        return;
      }
      let cardType = AppHelper.getCardType(this.cardNumber);
      this.card = {
        cardName: this.cardName,
        lastFour: this.cardNumber.slice(this.cardNumber.length - 4),
        cardNumber: this.cardNumber,
        imgSrc: this.getImageUrl(cardType),
        cardBrand: AppHelper.getCardBrand(cardType),
        expDate: this.selectedMonth + "/" + this.selectedYear
      };

      EventBus.$emit("card-added", this.card);

      this.selectedYear = null;
      this.selectedMonth = null;
      this.card = null;
      this.cardName = null;
      this.cardNumber = null;
      this.securityCode = null;
      this.$nextTick(() => {
        this.$v.$reset();
      });
    },
    getImageUrl(cardType) {
      let type = "defaultcard";
      switch (cardType) {
        case "mastercard":
        case "amex":
        case "visa":
          type = cardType;
      }
      return require(`../images/${type}-logo.svg`);
    }
  }
};
</script>
