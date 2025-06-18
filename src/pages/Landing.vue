<template>
  <q-layout view="hHh lpR fFf">
    <q-page-container>
      <q-page class="row justify-center items-center full-height bg-image">
        <div class="column items-center">
          <div class="text-center text-white q-mb-xl">
            <div class="text-h3 q-mb-sm">Your Trusted Source for Quality Auto Parts</div>
            <div class="text-subtitle1 q-mb-md">Find the perfect parts for your vehicle with ease.</div>
            <!-- <div class="row justify-center q-gutter-md">
              <q-btn label="Browse Parts" color="primary" size="lg" rounded to="/products" />
              <q-btn label="Request a Quote" color="secondary" size="lg" rounded to="/quote" />
            </div> -->
          </div>

          <q-card class="q-pa-md rounded-borders shadow-4" style="max-width: 800px; width: 100%; margin-bottom: 40px;">
            <q-card-section>
              <div class="text-h5 text-primary q-mb-md text-center">Why Choose Us?</div>
              <div class="row q-gutter-md justify-around">
                <div class="column items-center">
                  <q-icon name="fas fa-check-circle" size="lg" color="positive" class="q-mb-sm" />
                  <div class="text-center">
                    <div class="text-subtitle1 text-weight-bold">Wide Selection</div>
                    <div class="text-caption text-grey">Extensive catalog of parts for various makes and models.</div>
                  </div>
                </div>

                <div class="column items-center">
                  <q-icon name="fas fa-shipping-fast" size="lg" color="primary" class="q-mb-sm" />
                  <div class="text-center">
                    <div class="text-subtitle1 text-weight-bold">Fast Shipping</div>
                    <div class="text-caption text-grey">Efficient order processing and delivery.</div>
                  </div>
                </div>

                <div class="column items-center">
                  <q-icon name="fas fa-shield-alt" size="lg" color="accent" class="q-mb-sm" />
                  <div class="text-center">
                    <div class="text-subtitle1 text-weight-bold">Quality Assurance</div>
                    <div class="text-caption text-grey">Reliable and durable parts you can trust.</div>
                  </div>
                </div>

                <div class="column items-center">
                  <q-icon name="fas fa-comments" size="lg" color="info" class="q-mb-sm" />
                  <div class="text-center">
                    <div class="text-subtitle1 text-weight-bold">Expert Support</div>
                    <div class="text-caption text-grey">Knowledgeable team ready to assist you.</div>
                  </div>
                </div>
              </div>
            </q-card-section>
          </q-card>

          <q-card class="q-pa-md rounded-borders shadow-4" style="max-width: 400px; width: 100%;">
            <q-card-section class="row justify-center q-gutter-md">
              <q-btn
                label="Login"
                color="primary"
                :to="{ path: '/login' }"
                size="lg"
                rounded
                style="width: 140px;"
              />
              <q-btn
                label="Sign Up"
                color="secondary"
                :to="{ path: '/signup' }"
                size="lg"
                rounded
                style="width: 140px;"
              />
            </q-card-section>
          </q-card>
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: "MainLayout",
  data() {
    return {};
  },
  mounted() {},
  methods: {},
};
</script>

<style scoped>
.bg-image {
  background-image: url('../assets/333.jpg'); /* Replace with your image path */
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}
</style>