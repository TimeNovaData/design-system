import { defineStore } from 'pinia';
import { api } from 'src/boot/axios';


export const useUsersStore = defineStore({
  id: 'users',
  state: () => ({
    users: {}
  }),
  actions: {
    async getAll() {
      try {
        this.users = { loading: true };
        const users = await api.get('users/')
        this.users = users
      }
      catch (error) {
        this.users = { error }
      }
    }
  }
});
