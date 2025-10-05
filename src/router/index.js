import { createWebHistory, createRouter } from "vue-router";
import ContactBook from "@/views/ContactBook.vue";
import ContactList from "@/components/ContactList.vue";

const routes = [
{
path: "/",
name: "contactbook",
component: ContactBook,
},
{
    path: "/contacts",
    name: "contactlist",
    component: ContactList,
},
{
path: "/contacts/:id",
name: "contact.edit",
component: () => import("@/views/ContactEdit.vue"),
props: true // Truyền các biến trong $route.params vào làm props
},
{
    path: "/:pathMatch(.*)*",
    name: "notfound",
    component: () => import("@/views/NotFound.vue"),
},

];
const router = createRouter({
history: createWebHistory(import.meta.env.BASE_URL),
routes,
});
export default router;