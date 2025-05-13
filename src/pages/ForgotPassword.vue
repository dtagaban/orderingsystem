<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container>
      <q-page class="flex flex-center q-pa-lg">
        <q-card style="width: 500px" class="text-center q-pa-md">
          <q-card-section>
            <q-img
              class="q-mb-xl q-mt-xl"
              style="width: 290px;"
              src="~assets/logo.jpg"
            />
            <div class="text-h5">Forgot Password</div>
          </q-card-section>
          <q-input
            class="full-width q-mb-sm"
            color="red"
            v-model="email"
            label="Email"
            type="email"
          />
          <q-btn
            :loading="loading"
            @click="forgotPassword()"
            class="full-width q-mt-lg q-mb-sm"
            no-caps
            size="18px"
            color="red"
            unelevated
            rounded
            icon="save"
            label="Forgot Password"
          />
          <q-btn
            class="q-mt-sm"
            color="red"
            to="login"
            label="Back to login"
            flat
          />
        </q-card>

      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import firebase from "firebase/app";
import "firebase/auth"; // Make sure you import the auth module

export default {
  name: "PageIndex",
  data() {
    return {
      accountLoading: false,
      loading: false,
      email: "",
    };
  },
  methods: {
  async forgotPassword() {
      this.loading = true;
      firebase
        .auth()
        .sendPasswordResetEmail(this.email)
        .then(() => {
          this.loading = false;
          this.$q.notify({
            position: "top-left",
            icon: "check",
            timeout: 1500,
            message: "Password reset email sent!",
            color: "positive"
          });
          // Optionally, you can redirect the user or show a message
        })
        .catch((error) => {
          this.loading = false;
          console.error("Error sending password reset email:", error);
          let errorMessage = "An error occurred. Please try again later.";
          if (error.code === 'auth/invalid-email') {
            errorMessage = "Invalid email address.";
          } else if (error.code === 'auth/user-not-found') {
            errorMessage = "There is no user record corresponding to this email.";
          }
          this.$q.notify({
            position: "top-left",
            icon: "close",
            timeout: 2000,
            message: errorMessage,
            color: "negative"
          });
        });
    }
  }
};
</script>
