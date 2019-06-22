<template>
  <footer>
    <div class="row">
      <div class="col-5 form-inline">
        <span>Cost / m²:</span>
        <input
          :value="costPerSqMt"
          @change="costInputChanged"
          @keypress="isNumber($event)"
          class="form-control form-control-sm cost-input ml-2"
        >
      </div>
      <div class="col-2 text-info text-right">
        <span>60: {{ calculateCostOf60.toFixed(2) }} €</span>
      </div>
      <div class="col-2 text-danger text-right">
        <span>90: {{ calculateCostOf90.toFixed(2) }} €</span>
      </div>
      <div class="col-3 text-neutral text-right">
        <span>Total: {{ (calculateCostOf60 + calculateCostOf90).toFixed(2) }} €</span>
      </div>
    </div>
  </footer>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
import fileMixin from "./mixins/fileMixin";

export default {
  name: "Footer",
  mixins: [fileMixin],
  computed: {
    ...mapState({
      costPerSqMt: state => state.cost.costPerSqMt
    }),

    ...mapGetters(["getFilesWithClass60", "getFilesWithClass90"]),

    calculateCostOf60: function() {
      return this.getFilesWithClass60.reduce(
        (sum, item) =>
          sum + this.calculatePrice(item.width, item.height, item.copies, this.costPerSqMt),
        0
      );
    },

    calculateCostOf90: function() {
      return this.getFilesWithClass90.reduce(
        (sum, item) =>
          sum + this.calculatePrice(item.width, item.height, item.copies, this.costPerSqMt),
        0
      );
    }
  },
  methods: {
    ...mapMutations(["CHANGE_COST_PER_SQ_MT"]),

    ...mapActions(["changeCostPerSqMt"]),

    costInputChanged: function(event) {
      event.target.value = parseFloat(event.target.value).toFixed(2);
      this.changeCostPerSqMt(event.target.value);
    },

    isNumber: function(evt) {
      evt = evt ? evt : window.event;
      var charCode = evt.which ? evt.which : evt.keyCode;
      if (
        charCode > 31 &&
        (charCode < 48 || charCode > 57) &&
        charCode !== 46
      ) {
        evt.preventDefault();
      } else {
        return true;
      }
    }
  }
};
</script>

<style scoped>
footer {
  background: #1c1d22;
  border-top: 10px solid #2a2b30;
  position: fixed;
  width: calc(100% - 250px);
  padding: 10px;
  bottom: 0;
  right: 0;
  font-weight: 600;
}
</style>


