<template>
  <q-page class="q-pa-lg">
    <q-card class="bg-transparent no-shadow no-border">
      <q-card-section class="q-pa-none">
        <div class="row q-col-gutter-md">
          <div v-for="(item, index) in items" :key="index" class="col-md-3 col-sm-12 col-xs-12">
            <q-item @click="viewDocument(item)" :style="`background-color: ${item.color1}`" class="q-pa-none" v-ripple clickable>
              <q-item-section side :style="`background-color: ${item.color2}`" class=" q-pa-lg q-mr-none text-white">
                <q-icon :name="item.icon" color="white" size="24px"></q-icon>
              </q-item-section>
              <q-item-section class=" q-pa-md q-ml-none  text-white">
                <q-item-label class="text-white text-h6 text-weight-bolder" v-if="index === 0">{{totalSales}}</q-item-label>
                <q-item-label class="text-white text-h6 text-weight-bolder" v-if="index === 1">{{monthlySales}}</q-item-label>
                <q-item-label class="text-white text-h6 text-weight-bolder" v-if="index === 2">{{dailySales}}</q-item-label>
                <q-item-label>{{ item.title }}</q-item-label>
              </q-item-section>
            </q-item>
          </div>
        </div>
      </q-card-section>
    </q-card>
    <q-btn label="Generate PDF Report" @click="generateReport()" icon="picture_as_pdf" class="q-mt-md" color="red" unelevated />
  </q-page>
</template>

<script>
import { date } from 'quasar'
var moment = require('moment'); // require
moment().format(); 

var pdfMake = require('pdfmake/build/pdfmake.js');
var pdfFonts = require('pdfmake/build/vfs_fonts.js');
pdfMake.vfs = pdfFonts.pdfMake.vfs;

export default {
  mounted () {
    this.$bind('orders', this.$db.collection('orders')).then(orders => {
      this.orders = orders
    })
  },
  methods: {
    generateReport() {
      let docDefinition = {
        content: [
		      {text: '\n JMR AUTOPARTS Generate Reports \n \n \n', fontSize: 16, alignment: 'center', bold: true},
          {
            table: {
				      widths: ['*', '*', '*'],
              body: [
                ['Total Sales', 'Daily Sales', 'Monthly Sales'],
                [
                  {text: [
                      {text: this.totalSales, fontSize: 10}]
                  },
                  {text: [
                      {text: this.dailySales, fontSize: 10}]
                  },
                  {text: [
                      {text: this.monthlySales, fontSize: 10}]
                  }
                ]
              ]
            }
          }
        ]
      }
      pdfMake.createPdf(docDefinition).open()
    }
  },
  computed: {
    totalSales () {
      return this.orders.reduce(function (acc, obj) { return acc + parseInt(obj.totalPrice) }, 0)
    },
    dailySales () {
      return this.orders.filter(order => {
        if (date.isBetweenDates(order.createdAt.toDate(), new moment().startOf('day'), new moment().endOf('day'))) {
          return order
        }
      }).reduce(function (acc, obj) { return acc + parseInt(obj.totalPrice) }, 0)
    },
    monthlySales () {
      return this.orders.filter(order => {
        if (date.isBetweenDates(order.createdAt.toDate(), new moment().startOf('month'), new moment().endOf('month'))) {
          return order
        }
      }).reduce(function (acc, obj) { return acc + parseInt(obj.totalPrice) }, 0)
    }
  },
  data () {
    return {
      orders: [],
      items: [
        {
          title: "Total Sales",
          icon: "groups",
          value: 0,
          color1: "#5064b5",
          color2: "#3e51b5"
        },
        {
          title: "Monthly Sales",
          icon: "article",
          value: "500",
          color1: "#f37169",
          color2: "#f34636"
        },
        {
          title: "Daily Sales",
          icon: "assignment",
          value: "50",
          color1: "#ea6a7f",
          color2: "#ea4b64"
        }
      ]
    }
  }
}
</script>

<style>

</style>