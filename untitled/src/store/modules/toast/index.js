export default {
    namespaced: true,
    state: {
        toasts: [],
        showToast: false,
        toastMessage: "",
        toastAlertType: ""
    },
    mutations: {
        // UPDATE_TOAST_MESSAGE(state, payload) {
        //     state.toastMessage = payload;
        // },
        // UPDATE_ALERT_TYPE(state, payload) {
        //     state.toastAlertType = payload;
        // },
        // UPDATE_TOAST_STATUS(state, payload) {
        //     state.showToast = payload;
        // },
        ADD_TOAST (state, payload) {
            state.toasts.push(payload)
        },
        REMOVE_TOAST (state) {
            state.toasts.shift();
        }
    },
    actions: {
        triggerToast({commit}, payload) {
            // commit("UPDATE_TOAST_MESSAGE", message);
            // commit("UPDATE_ALERT_TYPE", type);
            // commit("UPDATE_TOAST_STATUS", true);
            console.log(payload);
            commit("ADD_TOAST", {
                id:Date.now(),
                message: payload.message,
                type: payload.type
            })

            setTimeout(() => {
                commit("REMOVE_TOAST");
            }, 10000)
        }
    },
    getters: {
        toastMessageWithSmile (state) {
            return state.toastMessage + "^ _ ^";
        }
    },
}