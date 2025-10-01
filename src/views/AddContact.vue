<template>
  <div>
    <h2>Thêm mới Contact</h2>
    <form @submit.prevent="saveContact">
      <div>
        <label>Tên:</label>
        <input v-model="contact.name" placeholder="Tên" required />
      </div>
      <div>
        <label>Email:</label>
        <input v-model="contact.email" placeholder="Email" required />
      </div>
      <button type="submit">Lưu</button>
    </form>
  </div>
</template>

<script>
import ContactService from "@/services/contact.service";


export default {
  name: "AddContact",
  data() {
    return {
      contact: {
        name: "",
        email: "",
      },
    };
  },
  methods: {
    async saveContact() {
      try {
        await ContactService.create(this.contact);
        alert("Thêm mới thành công!");
        this.$router.push({ name: "contact.book" }); 
      } catch (error) {
        console.error("Lỗi khi thêm contact:", error);
        alert("Không thể thêm contact!");
      }
    },
  },
};
</script>
