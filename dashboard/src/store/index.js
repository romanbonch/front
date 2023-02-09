import {createStore} from 'vuex'
import Auth from "@/api/Auth";
import Company from "@/api/Company";
import Stat from "@/api/Stat";
import {Metric} from "@/api/Metric";
import router from '@/router'
import CompanyName from "@/api/CompanyName";

export default createStore({
    state:{
        token: localStorage.getItem('token') || null,
        groups: [],
        selectedGroup: {},
        screen: 'main',
        metricLabels: {},
        companyName: null,
        companyLogo: null,
    },
    getters: {
        groups(state) {
            return state.groups;
        },
        selectedGroup(state) {
            return state.selectedGroup;
        },
        selectedGroupMetrics(state) {
            return state.selectedGroup.metricsToWeek;
        },
        companyName(state){
            return state.companyName
        },
        companyLogo(state){
            return state.companyLogo
        }
    },
    actions: {
        async companyName({commit}){
            const companyname = new CompanyName();
            return await companyname.getCompanyName().then(res => {
                commit('setCompanyName', res.name);
                return res;
            });
        },
        async companyLogo({commit}){
            const companylogo = new CompanyName();
            return await companylogo.getCompanyName().then(res => {
                commit('setCompanyLogo', res.logo);
                return res;
            })
        },
        async exit({commit}){
            router.push('/')
            localStorage.clear()
            commit('clearToken')

        },
        async auth({ commit, state, dispatch }, { email, password }) {
            const api = new Auth();
            if (state.token) {
                console.log(state.token,'complete token')
                await dispatch('getGroups')
                return true;
            }
            return await api.auth(email, password).then(async token => {
                commit('setToken', token);
                await dispatch('getGroups')
            }).catch(err => {
               throw err;
            });
        },
        async getGroups({ commit }) {
            const company = new Company();
            return await company.getGroups().then(res => {
                commit('setGroups', res);
                return res;
            });
        },
        async selectGroup({ state, commit }, groupIndex) {
            const groupId = state.groups[groupIndex].id;

            const stat = new Stat();
            const groupStat = await stat.getGroupStat(groupId).then(async res => {
                return res;
            });

            const metric = new Metric();
            const metrics = await metric.getAll();

            const metricsLabels = {};
            metrics.forEach(el => {
                metricsLabels[el.id] = el.name;
            });

            groupStat.metricsToWeek = Object.keys(groupStat.metricsToWeek).map(el => {
                return {
                    label: metricsLabels[el],
                    values: [...groupStat.metricsToWeek[el]]
                }
            });

            commit('setMetricLabels', metricsLabels);
            commit('setSelectedGroup', groupStat);

            return groupStat;
        },
    },
    mutations: {
        setToken(state, token) {
            localStorage.setItem('token', token);
            state.token = token;
        },
        setGroups(state, groups) {
            state.groups = groups;
        },
        setSelectedGroup(state, group) {
            state.selectedGroup = group;
        },
        setMetricLabels(state, metrics) {
            state.metricLabels = metrics;
        },
        clearToken(state){
            state.token = null
        },
        setCompanyName(state, name){
            state.companyName = name;
        },
        setCompanyLogo(state,logo){
            state.companyLogo = logo;

        }

    }

})
