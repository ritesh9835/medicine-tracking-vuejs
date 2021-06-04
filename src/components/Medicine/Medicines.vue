<template>
  <div>
    <div class="row">
      <div class="col-4">
        <input
          type="text"
          class="form-control"
          placeholder="Search Medicine..."
          @input="filterMedicine"
          v-model="searchParm"
        />
      </div>
      <div class="col-6"></div>
      <router-link
        to="/medicine-manage"
        class="btn btn-primary pull-right col-2"
      >
        <i class="fa fa-plus-circle"></i> Add
      </router-link>
    </div>

    <table class="table table-striped">
      <thead>
        <tr>
          <th>Name</th>
          <th>Brand</th>
          <th>Price</th>
          <th>Quantity</th>
          <th>Expiry Date</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody v-if="medicineData && medicineData.length > 0">
        <tr v-for="item in medicineData" :key="item.id">
          <td>{{ item.fullName }}</td>
          <td>{{ item.brand }}</td>
          <td>{{ item.price }}</td>
          <td :class="{ 'bg-warning': item.quantity < 10}">
            {{ item.quantity }}
          </td>
          <td :class="{ 'bg-danger': new Date(item.expiryDate) < timestamp }">
            {{
              item.expiryDate && new Date(item.expiryDate).toLocaleDateString()
            }}
          </td>
          <td>
            <router-link
              :to="{ name: 'medicine-details', params: { id: item.id } }"
            >
              <span class="badge bg-warning text-dark"
                ><i class="fa fa-info"></i
              ></span>
            </router-link>
            <router-link :to="{ name: 'manage', params: { id: item.id } }">
              <span class="badge bg-success text-white m-1"
                ><i class="fa fa-pencil ml-1"></i
              ></span>
            </router-link>
          </td>
        </tr>
      </tbody>
      <tbody v-else>
        <tr>
          <td class="text-center" colspan="6">No Data Found</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "Medicines",
  data() {
    return {
      timestamp: new Date().getTime() + 30 * 24 * 60 * 60 * 1000,
      searchParm: "",
      medicineData: [],
    };
  },
  methods: {
    ...mapActions(["fetchMedicines"]),
    filterMedicine() {
      this.medicineData = [...this.medicineList];
      if (this.searchParm) {
          var text = this.searchParm;
        /* eslint-disable no-debugger */
        //debugger;
        var tempFilter = this.medicineData.filter(function (c) {
         return c.fullName?.toLowerCase().includes(text.toLowerCase())
        });
        this.medicineData = tempFilter;
      }
    },
  },
  computed: { ...mapGetters(["medicineList", "medicineById"]) },

  watch: {
    medicineList: function (n, o) {
      if (n != o) {
        this.medicineData = [...n];
      }
    },
  },

  created() {
    this.fetchMedicines();
  },
};
</script>

<style>
.delete {
  font-size: 18px;
  cursor: pointer;
}
.td-yellow {
  background-color: yellow;
}
</style>