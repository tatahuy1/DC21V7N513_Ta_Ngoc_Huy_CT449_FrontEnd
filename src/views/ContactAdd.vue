<template>
  <div class="page">
    <h4>Thêm Liên hệ</h4>
    <ContactForm @submit:contact="createContact" />
    <p>{{ message }}</p>
  </div>
</template>

<script>
import ContactForm from "@/components/ContactForm.vue";
import ContactService from "@/services/contact.service";

export default {
  components: {
    ContactForm,
  },
  data() {
    return {
      message: "",
    };
  },
  methods: {
    async createContact(data) {
      try {
        await ContactService.create(data);
        alert("Liên hệ được thêm thành công.");
        this.$router.push({ name: "contactbook" });
      } catch (error) {
        console.log(error);
        this.message = "Không thể thêm liên hệ. Vui lòng thử lại.";
      }
    },
  },
  created() {
    this.message = "";
  },
};
</script>

<style scoped>
.page {
  max-width: 500px;
  margin: 0 auto;
  padding: 20px;
}
h4 {
  text-align: center;
  margin-bottom: 20px;
}
</style>
