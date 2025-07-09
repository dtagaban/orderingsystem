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
            <div class="text-h5">Register</div>
          </q-card-section>
          <q-input
            class="full-width q-mb-sm"
            color="red"
            v-model="name"
            label="Name"
            type="text"
          />
          <q-input
            class="full-width q-mb-sm"
            color="red"
            v-model="phoneNumber"
            label="Phone Number"
            type="text"
          />
          <q-input
            class="full-width q-mb-sm"
            color="red"
            v-model="address"
            label="Address"
            type="text"
          />
          <q-input
            class="full-width q-mb-sm"
            color="red"
            v-model="email"
            label="Email"
            type="email"
          />
          <q-input
            :type="isPwd ? 'password' : 'text'"
            class="full-width q-mb-md"
            color="red"
            v-model="password"
            label="Password"
          >
            <template v-slot:append>
              <q-icon
                :name="isPwd ? 'visibility_off' : 'visibility'"
                class="cursor-pointer"
                @click="isPwd = !isPwd"
              />
            </template>
          </q-input>
          <q-input
            :type="isPwd ? 'password' : 'text'"
            class="full-width q-mb-lg"
            color="red"
            v-model="confirmPassword"
            label="Confirm Password"
          >
            <template v-slot:append>
              <q-icon
                :name="isPwd ? 'visibility_off' : 'visibility'"
                class="cursor-pointer"
                @click="isPwd = !isPwd"
              />
            </template>
          </q-input>
          <q-btn
            :loading="loading"
            :disable="email === '' || password === ''"
            @click="createAccount()"
            class="full-width"
            no-caps
            size="18px"
            color="red"
            unelevated
            rounded
            icon="save"
            label="Sign up"
          />
          <q-btn
            :disable="email === '' || password === ''"
            :loading="accountLoading"
            class="q-mt-sm"
            color="red"
            to="login"
            label="Back to login"
            flat
          />
        </q-card>

        <q-page-sticky
          position="top-left"
          :offset="[18, 18]"
        >
          <q-btn
            to="landing"
            color="red"
            label="Back to home"
            no-caps
            flat
            icon="home"
          />
        </q-page-sticky>
        <!-- <div class="full-width">
          <q-btn @click="logInWithGoogle()"  icon="ion-logo-google" class="full-width q-mt-md" no-caps size="18px" color="red" outline rounded label="Log in with Google" />
          <q-btn @click="logInWithFacebook()" icon="ion-logo-facebook" class="full-width q-mt-md" no-caps size="18px" color="blue" outline rounded label="Log in with Facebook" />
        </div> -->
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: "PageIndex",
  data() {
    return {
      accountLoading: false,
      loading: false,
      isPwd: true,
      email: "",
      password: "",
      confirmPassword: "",
      name: "",
      phoneNumber: "",
      address: ""
    };
  },
  methods: {
    createAccount() {
      this.$q.localStorage.set("action", "signup");
      this.$q.localStorage.set("info", {
        name: this.name,
        phoneNumber: this.phoneNumber,
        address: this.address
      });
      if (this.password === this.confirmPassword) {
      this.accountLoading = true;
        this.$firebase
          .auth()
          .createUserWithEmailAndPassword(this.email, this.password)
          .then(userCredential => {
            // Signed in
            var user = userCredential.user;
            this.accountLoading = false;
            this.$router.push("/landing").catch(() => {});
            user.sendEmailVerification()
            .then(() => {
              this.$q.notify({
                position: "top-right",
                icon: "check",
                timeout: 1500,
                message: 'Verification email sent.',
                color: "positive"
              });
              console.log("Verification email sent.");
              // You can show a message like "Check your inbox"
            })
            .catch((error) => {
              console.error("Error sending verification email:", error);
            });

            // ...
          })
          .catch(error => {
            this.accountLoading = false;
            var errorCode = error.code;
            var errorMessage = error.message;
            this.$q.notify({
              position: "top-right",
              icon: "close",
              timeout: 1500,
              message: error.message,
              color: "negative"
            });
            // ..
          });
      } else {
          this.$q.notify({
            position: "top-right",
            icon: "close",
            timeout: 1500,
            message: 'Passwords do not match.',
            color: "negative"
          });
      }
    },
    logInWithFacebook() {
      var provider = new this.$firebase.auth.FacebookAuthProvider();

      this.$firebase
        .auth()
        .signInWithRedirect(provider)
        .then(result => {
          var credential = result.credential;

          // The signed-in user info.
          var user = result.user;
          // this.$user = user
          this.$q.localStorage.set("user", user);
          // this.$router.push('/')

          // This gives you a Facebook Access Token. You can use it to access the Facebook API.
          var accessToken = credential.accessToken;

          // ...
        })
        .catch(error => {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          // The email of the user's account used.
          var email = error.email;
          // The firebase.auth.AuthCredential type that was used.
          var credential = error.credential;

          // ...
        });
    },
    logInWithGoogle() {
      var provider = new this.$firebase.auth.GoogleAuthProvider();

      this.$firebase
        .auth()
        .signInWithRedirect(provider)
        .then(result => {
          var credential = result.credential;

          // The signed-in user info.
          var user = result.user;
          this.$q.localStorage.set("user", user);
          // this.$router.push('/')

          // This gives you a Facebook Access Token. You can use it to access the Facebook API.
          var accessToken = credential.accessToken;

          // ...
        })
        .catch(error => {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          // The email of the user's account used.
          var email = error.email;
          // The firebase.auth.AuthCredential type that was used.
          var credential = error.credential;

          // ...
        });
    },
    logInWithEmailAndPassword() {
      this.$q.localStorage.set("action", "login");
      this.loading = true;
      this.$firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then(userCredential => {
          // Signed in
          console.log('userCredential12', userCredential)
          var user = userCredential.user;
          this.$q.localStorage.set("user", user);
          // this.$router.push('/')
          this.loading = false;
          // ...
        })
        .catch(error => {
          this.loading = false;
          console.log(error);
          this.$q.notify({
            position: "top-right",
            icon: "close",
            timeout: 1500,
            message: error.message,
            color: "negative"
          });
          var errorCode = error.code;
          var errorMessage = error.message;
        });
    }
  }
};
</script>
