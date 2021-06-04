<template>
  <div class="container">
    <div class="card">
      <div class="card-header">
        <h6>{{ id ? "Edit" : "Add" }} Medicine</h6>
      </div>
      <div class="card-body">
        <Form @submit="onSubmit" :validation-schema="schema">
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
                  v-on:change="warningExpiryDate"
                />
                <ErrorMessage name="expiryDate" class="text-danger" />
                <span v-if="showDateWarning" class="bg-warning">
                  Expiry date is less than 30 days</span
                >
                <span v-if="showDateError" class="bg-danger"
                  >Expiry date is less than 15 days</span
                >
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

            <div class="form-group">
              <div class="p-1">
                <input
                  type="submit"
                  class="btn btn-primary"
                  value="Save"
                  v-if="!isCreating"
                />
                <button
                  class="btn btn-primary"
                  type="button"
                  disabled
                  v-if="isCreating"
                >
                  <span
                    class="spinner-border spinner-border-sm"
                    role="status"
                    aria-hidden="true"
                  ></span>
                  Saving...
                </button>
                <router-link to="/" class="btn btn-secondary m-2"
                  >Cancel</router-link
                >
              </div>
            </div>
          </div>
        </Form>
      </div>
    </div>
  </div>
</template>


<script>
import { mapActions, mapGetters } from "vuex";
import { Field, Form, ErrorMessage } from "vee-validate";
import * as yup from "yup";

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
      showDateWarning: false,
      showDateError: false,
      isDateValid: true,
    };
  },
  components: {
    Field,
    Form,
    ErrorMessage,
  },
  created: function () {
    this.id = this.$route.params.id;
  },
  mounted: function () {
    if (this.id) {
      this.medicineDetails(this.id);
    }
  },

  computed: {
    ...mapGetters(["isCreating", "medicineById", "isLoading", "getResponse"]),
  },

  watch: {
    medicineById: function (newValue, oldValue) {
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
    getResponse: function (n, o) {
      if (n != o) {
        this.$swal.fire({
          text: n.item2,
          icon: n.item1 ? "success" : "error",
          position: "top-center",
          timer: 2000,
          showCancelButton: false,
          showConfirmButton: false,
        });
        if (!this.id && n.item1) this.$router.push({ name: "medicine" });
      }
    },
  },

  methods: {
    ...mapActions(["manageMedicines", "medicineDetails"]),
    onSubmit(values) {
      if (this.isDateValid) {
        this.manageMedicines({
          fullName: values.fullName,
          brand: values.brand,
          price: parseFloat(values.price),
          quantity: parseInt(values.quantity),
          notes: values.notes,
          expiryDate: new Date(values.expiryDate),
          id: this.id ? this.id : "00000000-0000-0000-0000-000000000000",
        });
      }
    },
    warningExpiryDate(e) {
      this.showDateWarning = false;
      this.showDateError = false;
      if (e && e.target && e.target.value) {
        var expDate = new Date(e.target.value).getTime();
        var redDate = new Date().getTime() + 15 * 24 * 60 * 60 * 1000;
        var reqDate = new Date().getTime() + 30 * 24 * 60 * 60 * 1000;
        if (expDate < reqDate && expDate > redDate) {
          this.showDateWarning = true;
          this.isDateValid = true;
        }
        if (expDate < redDate) {
          this.showDateError = true;
          this.isDateValid = false;
        }
      }
    },
  },

  setup() {
    // Define a validation schema
    const schema = yup.object({
      quantity: yup.number().min(1).required(),
      price: yup.string().required().matches(/^\d+(.\d{1,2})?$/, "Invalid Price ex. 10.20"),
      fullName: yup.string().required(),
      brand: yup.string().required(),
      expiryDate: yup.string().required(),
    });

    return {
      schema,
    };
  },
};
</script>