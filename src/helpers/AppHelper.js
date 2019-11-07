export default {
  getCardType: number => {
    // visa
    var re = new RegExp("^4");
    if (number.match(re) != null) return "visa";

    // Mastercard
    // Updated for Mastercard 2017 BINs expansion
    if (
      /^(5[1-5][0-9]{14}|2(22[1-9][0-9]{12}|2[3-9][0-9]{13}|[3-6][0-9]{14}|7[0-1][0-9]{13}|720[0-9]{12}))$/.test(
        number
      )
    )
      return "mastercard";

    // AMEX
    re = new RegExp("^3[47]");
    if (number.match(re) != null) return "amex";

    if (number.match(re) != null) return "discover";

    // Diners
    re = new RegExp("^36");
    if (number.match(re) != null) return "diners";

    // Discover
    re = new RegExp(
      "^(6011|622(12[6-9]|1[3-9][0-9]|[2-8][0-9]{2}|9[0-1][0-9]|92[0-5]|64[4-9])|65)"
    );
    if (number.match(re) != null) return "discover";
    // Diners - Carte Blanche
    re = new RegExp("^30[0-5]");
    if (number.match(re) != null) return "dinersc";

    // JCB
    re = new RegExp("^35(2[89]|[3-8][0-9])");
    if (number.match(re) != null) return "jcb";

    // Visa Electron
    re = new RegExp("^(4026|417500|4508|4844|491(3|7))");
    if (number.match(re) != null) return "visae";
    return false;
  },
  getCardBrand: cardType => {
    switch (cardType) {
      case "mastercard":
        return "Mastercard";
      case "amex":
        return "American Express";
      case "diners":
        return "Diners Club";
      case "discover":
        return "Discover";
      case "dinersc":
        return "Diners - Carte Blanche";
      case "jcb":
        return "JCB";
      case "visa":
        return "Visa";
      case "visae":
        return "Visa Electron";
      default:
        return "";
    }
  },
  pad(num, size) {
    var s = "000000000" + num;
    return s.substr(s.length - size);
  }
};
