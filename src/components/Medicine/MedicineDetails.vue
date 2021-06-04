<template>
  <div class="container">
    <div class="card">
      <div class="card-header">
        <h6>{{fullName}} - Details</h6>
      </div>
      <div class="card-body">
        <div v-if="isLoading">
          <div class="text-center">
            <div class="spinner-border text-primary" role="status">
              <span class="sr-only">Loading...</span>
            </div>
            <br />
            Loading Medicine Data
          </div>
        </div>
        <div v-if="!isLoading">
          <div class="form-group row">
            <div class="col-6">
              <label>Medicine Name:</label>
              <Field
                id="fullName"
                name="fullName"
                type="text"
                class="form-control"
                :value="fullName"
                :v-model="fullName"
              />
              <ErrorMessage name="fullName" class="text-danger" />
            </div>
            <div class="col-6">
              <label>Brand Name:</label>
              <Field
                name="brand"
                type="brand"
                class="form-control"
                :value="brand"
                :v-model="brand"
              />
              <ErrorMessage name="brand" class="text-danger" />
            </div>

            <div class="col-6">
              <label>Price:</label>
              <Field
                name="price"
                type="number"
                class="form-control"
                :value="price"
                v-model="price"
              />
              <ErrorMessage name="price" class="text-danger" />
            </div>

            <div class="col-6">
              <label>Quantity:</label>
              <Field
                name="quantity"
                type="number"
                class="form-control"
                :value="quantity"
                v-model="quantity"
              />
              <ErrorMessage name="quantity" class="text-danger" />
            </div>

            <div class="col-6">
              <label>Expiry Date:</label>
              <Field
                name="expiryDate"
                type="date"
                class="form-control"
                :value="expiryDate"
                :v-model="expiryDate"
              />
              <ErrorMessage name="expiryDate" class="text-danger" />
            </div>
          </div>
          <div class="form-group row">
            <div class="col-12">
              <label>Notes:</label>
              <Field
                name="notes"
                as="textarea"
                class="form-control"
                :value="notes"
                :v-model="notes"
              />
              <ErrorMessage name="notes" class="text-danger" />
            </div>
          </div>
          <br/>
          <div class="form-group">
            <router-link to="/" class="btn btn-secondary mr-2"
              >Back to List</router-link
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import { mapActions, mapGetters } from "vuex";
import { Field } from "vee-validate";

export default {
  name: "ManageMedicine",
  data() {
    return {
      id: null,
      fullName: "",
      brand: "",
      price: 0,
      quantity: 0,
      expiryDate: "",
      notes: "",
    };
  },
  components: {
    Field
  },
  created: function () {
    this.id = this.$route.params.id;
    /* eslint-disable no-debugger */
    //debugger;
  },
  mounted: function () {
    if (this.id) {
      this.medicineDetails(this.id);
    }
  },

  computed: { ...mapGetters(["medicineById", "isLoading"]) },

  watch: {
    medicineById: function (newValue, oldValue) {
      /* eslint-disable no-debugger */
      //debugger;
      if (newValue != oldValue) {
        this.fullName = newValue && newValue.fullName;
        this.brand = newValue && newValue.brand;
        this.quantity = newValue && newValue.quantity;
        this.expiryDate =
          newValue && new Date(newValue.expiryDate).toISOString().substr(0, 10);
        this.notes = newValue.notes;
        this.price = newValue && newValue.price;
      }
    },
  },

  methods: {
    ...mapActions(["medicineDetails"]),
  
  },

};
</script>