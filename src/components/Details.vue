<template>
  <div class="content">
    <div class="container-fluid">
      <div class="row">
        <div v-for="(file, index) in getFiles" :key="index" class="col-12">
          <div class="file-details" :class="(file.class=='60')?'c-60':'c-90'">
            <div class="row">
              <div class="col-8 text-truncate">
                <span class="file-name">{{ file.name }}</span>
              </div>
              <div class="col-4 text-right">
                <small class="text-muted">Copies:</small>
                <input
                  class="form-control form-control-sm copies-input d-inline-block"
                  :value="file.copies"
                  type="number"
                  min="1"
                  @change="copiesChanged($event, file)"
                >
              </div>
              <div class="col-8">
                <span class="file-dimensions">{{ file.width }} x {{ file.height }} mm</span>
              </div>
              <div class="col-4 text-right">
                <span
                  class="file-price"
                >{{ calculatePrice(file.width, file.height, file.copies, costPerSqMt).toFixed(2) }} €</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
import fileMixin from "./mixins/fileMixin";

export default {
  name: "Details",
  mixins: [fileMixin],
  computed: {
    ...mapState({
      costPerSqMt: state => state.cost.costPerSqMt
    }),
    ...mapGetters(["getFiles"])
  },
  methods: {
    ...mapMutations(["CHANGE_FILE_COPIES"]),
    ...mapActions(["changeFileCopies"]),
    copiesChanged: function(event, file) {
      if (event.target.value == '') event.target.value = 1
      this.changeFileCopies({ file, "newCopies": event.target.value })
    },
  }
};
</script>

<style lang="scss" scoped>
.content {
  margin-bottom: 20px;
  padding-bottom: 51px;
}

.file-details {
  width: 100%;
  margin: 10px;
  border-radius: 5px;
  border-top-left-radius: 0px;
  border-bottom-left-radius: 0px;
  padding: 10px 12px;
  background: #1c1d22;
  transition: margin-left 0.1s ease-in-out;
}

.file-details:hover {
  margin-left: 0px;
  transition: margin-left 0.1s ease-in-out;
}

.file-name {
  color: #adb5bd;
}

.copies-input {
  width: 40px;
  margin-left: 5px;
  height: 18px;
  border-radius: 3px;
  padding-right: 1px;
}

.file-dimensions {
  color: #e3e3e3;
  font-weight: 600;
}

.file-price {
  color: #e3e3e3;
  font-weight: 700;
}

.c-60 {
  border-left: 4px solid #1d8cf8;
}

.c-90 {
  border-left: 4px solid #e14eca;
}
</style>


