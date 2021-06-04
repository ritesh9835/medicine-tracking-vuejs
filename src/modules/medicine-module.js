import axios from 'axios'

const state = () => ({
    medicines: [],
    medicine: null,
    isLoading: false,
    isCreating: false,
    response: {}
})

const getters = {
    medicineList: state => state.medicines,
    medicineById: state => state.medicine,
    isLoading: state => state.isLoading,
    isCreating: state => state.isCreating,
    getResponse: state => state.response
};

const actions = {
    async fetchMedicines({ commit }) {
        commit('setIsLoading', true);
        const response = await axios.get("https://localhost:44307/api/Medicine/list");
        commit("setMedicines", response.data);
        commit('setIsLoading', false);
    },
    async manageMedicines({ commit }, data) {
        commit('setIsCreating', true);
        await axios.post("https://localhost:44307/api/Medicine/manage", data).then((res)=>{
            commit("manageMedicines", res.data);
            commit('setIsCreating', false);
        }).catch((error)=>{
            var err = {
                item1: false,
                item2: error && error.title ? error.title : 'Failed to save data'
            }

            commit("manageMedicines", err);
            commit('setIsCreating', false);
        });
        
    },
    async medicineDetails({ commit }, id) {
        commit('setIsLoading', true);
        const response = await axios.get(`https://localhost:44307/api/Medicine/details?id=${id}`);
        commit("medicineDetails", response.data);
        commit('setIsLoading', false);
    }
};

const mutations = {
    setMedicines: (state, list) => (
        state.medicines = list
    ),
    manageMedicines: (state, data) => (state.response = data ),
    medicineDetails: (state, data) => (state.medicine = data),
    setIsLoading: (state, data) => (state.isLoading = data),
    setIsCreating: (state, data) => (state.isCreating = data)
};

export default {
    state,
    getters,
    actions,
    mutations
}