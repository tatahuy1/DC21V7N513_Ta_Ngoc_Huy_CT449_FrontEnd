<template>
<Form @submit="submitContact" :validation-schema="contactFormSchema">
<div class="form-group">
<label for="name">Tên</label>

<Field name="name" type="text" class="form-control" v-model="contactLocal.name" />

<ErrorMessage name="name" class="error-feedback" />
</div>
<div class="form-group">
<label for="email">E-mail</label>

<Field name="email" type="email" class="form-control" v-model="contactLocal.email" />

<ErrorMessage name="email" class="error-feedback" />
</div>
<div class="form-group">
<label for="address">Địa chỉ</label>

<Field name="address" type="text" class="form-control" v-model="contactLocal.address" />

<ErrorMessage name="address" class="error-feedback" />
</div>
<div class="form-group">
<label for="phone">Điện thoại</label>

<Field name="phone" type="tel" class="form-control" v-model="contactLocal.phone" />

<ErrorMessage name="phone" class="error-feedback" />
</div>

<!--PTL-->
<div class="sex">
  <label>Giới tính</label>
  <div class="form-check">
    <Field
      name="sex"
      type="radio"
      value="Nam"
      v-model="contactLocal.sex"
      class="form-check-input"
      id="sex-male"
    />
    <label for="sex-male" class="form-check-label">Nam</label>
  </div>

  <div class="form-check">
    <Field
      name="sex"
      type="radio"
      value="Nữ"
      v-model="contactLocal.sex"
      class="form-check-input"
      id="sex-female"
    />
    <label for="sex-female" class="form-check-label">Nữ</label>
  </div>

  <ErrorMessage name="sex" class="error-feedback" />
</div>
<!--PTL-->

<!--PTL-->
<div class="nation">
  <label for="nation">Quốc gia</label>
  <Field
    as="select"
    name="nation"
    id="nation"
    class="form-select"
    v-model="contactLocal.nation"
  >
    <option value="">-- Chọn quốc gia --</option>
    <option value="Việt Nam">Việt Nam</option>
    <option value="Hoa Kỳ">Hoa Kỳ</option>
    <option value="Nhật Bản">Nhật Bản</option>
    <option value="Hàn Quốc">Hàn Quốc</option>
    <option value="Trung Quốc">Trung Quốc</option>
    <option value="Pháp">Pháp</option>
    <option value="Đức">Đức</option>
    <option value="Anh">Anh</option>
    <option value="Úc">Úc</option>
    <option value="Canada">Canada</option>
  </Field>

  <ErrorMessage name="nation" class="error-feedback" />
</div>
<!--PTL-->


<div class="form-group form-check">

<input name="favorite" type="checkbox" class="form-check-input" v-model="contactLocal.favorite" />

<label for="favorite" class="form-check-label">
<strong>Liên hệ yêu thích</strong>
</label>
</div>

<div class="form-group">
<button class="btn btn-primary">Lưu</button>
<button v-if="contactLocal._id" type="button" class="ml-2 btn btn-danger"

@click="deleteContact">
Xóa
</button>
<button type="button" class="ml-2 btn btn-danger" @click="Cancel">
Thoát
</button>
</div>
</Form>
</template>

<script>
import * as yup from "yup";
import { Form, Field, ErrorMessage } from "vee-validate";
export default {
components: {
Form,
Field,
ErrorMessage,
},
emits: ["submit:contact", "delete:contact"],
props: {
  contact: {
    type: Object,
    required: false,
    default: () => ({
      name: '',
      email: '',
      address: '',
      phone: '',
      //PTL
      sex: '',
      //PTL

      //PTL
      nation: '',
      //PTL
      favorite: false,
    }),
  },
},

data() {
const contactFormSchema = yup.object().shape({
name: yup
.string()
.required("Tên phải có giá trị.")
.min(2, "Tên phải ít nhất 2 ký tự.")
.max(50, "Tên có nhiều nhất 50 ký tự."),
email: yup
.string()
.email("E-mail không đúng.")
.max(50, "E-mail tối đa 50 ký tự."),
address: yup.string().max(100, "Địa chỉ tối đa 100 ký tự."),
phone: yup
.string()
.matches(
/((09|03|07|08|05)+([0-9]{8})\b)/g,
"Số điện thoại không hợp lệ."),
//PTL
sex: yup.string().required("Vui lòng chọn giới tính."),
//PTL
});
return {
// Chúng ta sẽ không muốn hiệu chỉnh props, nên tạo biến cục bộ
// contactLocal để liên kết với các input trên form
contactLocal: this.contact,
contactFormSchema,
};
},
//PTL
mounted() {
    if (this.contactLocal.sex) {
      const sexVal = this.contactLocal.sex.toString().toLowerCase();
      if (["1", "nam", "male"].includes(sexVal)) {
        this.contactLocal.sex = "Nam";
      } else if (["0", "nữ", "nu", "female"].includes(sexVal)) {
        this.contactLocal.sex = "Nữ";
      }
    }
  },
//PTL
methods: {
submitContact() {
this.$emit("submit:contact", this.contactLocal);
},
deleteContact() {
this.$emit("delete:contact", this.contactLocal.id);
},
Cancel(){
const reply = window.confirm('You have unsaved changes! Do you want to leave?')

if (!reply) {
// stay on the page if
// user clicks 'Cancel'
return false
}
else this.$router.push({ name: "contactbook" });
}
},
};
</script>
<style scoped>
@import "@/assets/form.css";
</style>