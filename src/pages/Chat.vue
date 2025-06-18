<template>
  <q-page padding>
    <div class="row q-col-gutter-md">
      <div class="col-4" v-if="isRoleAdmin">
          <q-card>
            <q-list separator>
              <q-item :class="m.isSeen ? 'bg-grey-5' : 'bg-white'" @click="onChat(m)" v-for="(m, index) in uniqueSenderMessages" :key="index" clickable v-ripple>
                <q-item-section avatar>
                  <q-avatar color="primary" text-color="white">
                    {{m.sender.charAt(0)}}
                  </q-avatar>
                  <!-- <q-avatar>
                    <img src="https://cdn.quasar.dev/img/boy-avatar.png">
                  </q-avatar> -->
                </q-item-section>
                <q-item-section>{{m.sender}}</q-item-section>
                <q-item-section side>
                  <q-badge color="negative" label="new message" />
                </q-item-section>
              </q-item>
              </q-list>
          </q-card>
      </div>
      <div :class="isRoleAdmin ? 'col-8' : 'col-12'">
        <div class="q-chat-container">
          <q-chat-message
            v-for="(message, index) in processedMessages"
            :key="index"
            :name="message.displayName || message.sender || 'User'"
            :text="[message.content]"
            :sent="message.isSentByMe"
            :received="!message.isSentByMe"
          />
        </div>
        <div class="q-mt-md row items-center q-gutter-sm">
          <q-input
            v-model="newMessage"
            outlined
            rounded
            label="Message"
            class="col"
            @keyup.enter="sendMessage"
          />
          <q-btn
            icon="send"
            color="primary"
            round
            dense
            flat
            @click="sendMessage"
            :disable="!newMessage"
          />
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import { ref } from 'vue'; // For Vue 3, in Vue 2 just use data

export default {
  name: 'SimpleChat',
  data() {
    return {
      // chats: [],
      chatSelect: {},
      messages1: [],
      messages: [
        // { id: 1, sender: 'User 1', content: 'Hello!', isSent: true },
        // { id: 2, sender: 'Admin', content: 'Hi there, how can I help?', isSent: false },
        // { id: 3, sender: 'User 1', content: 'I have a question about my order.', isSent: true },
      ],
      newMessage: '',
      nextMessageId: 4,
    };
  },
  mounted() {
    if (this.$q.localStorage.getItem("user").isAdmin) {
      this.$db.collection("chats")
        .orderBy('createdAt')
        .onSnapshot((snapshot) => {
          this.messages1 = snapshot.docs.map(doc => ({
            asdid: doc.id,
            ...doc.data(),
          }));
          this.$nextTick(() => {
            this.scrollToBottom();
          });
          console.log('Real-time chat updates:', this.messages);
        }, (error) => {
          console.error("Error getting chat messages:", error);
          // Handle error (e.g., show a notification)
        });
    } else {
      this.$db.collection("chats")
        .where("room", "==", this.$q.localStorage.getItem("user").uid)
        .orderBy('createdAt')
        .onSnapshot((snapshot) => {
          this.messages = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
          }));
          this.$nextTick(() => {
            this.scrollToBottom();
          });
          console.log('Real-time chat updates:', this.messages);
        }, (error) => {
          console.error("Error getting chat messages:", error);
          // Handle error (e.g., show a notification)
        });
    }
    this.scrollToBottom(); // Call once initially (might not have data yet)
  },
  computed: {
    isRoleAdmin() {
      return this.$q.localStorage.getItem("user").isAdmin
    },
    uniqueSenderMessages() {
   const latestMessages = {};

    // Iterate through the messages and keep track of the latest one for each sender
    for (const message of this.messages1.filter(m => !m.isAdmin)) {
      latestMessages[message.email] = message;
    }

    // Convert the object of latest messages into an array
    return Object.values(latestMessages);
    },
    loggedInUserId() {
      return this.$q.localStorage.getItem("user") ? this.$q.localStorage.getItem("user").uid : null;
    },
    processedMessages() {
      return this.messages.map(message => ({
        ...message,
        isSentByMe: this.loggedInUserId === message.id,
      }));
    },
  },
  methods: {
    onChat(m) {
     this.$db
      .collection("chats")
      .doc(m.asdid)
      .set(
        {
          isSeen: false,
        },
        { merge: true }
      )
      .then(data => {
      })
      .catch(() => {
      });


      this.chatSelect = m
      console.log('dadad', m)
      this.$db.collection("chats")
        .where("room", "==", m.room)
        .orderBy('createdAt')
        .onSnapshot((snapshot) => {
          this.messages = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
          }));
          this.$nextTick(() => {
            this.scrollToBottom();
          });
          console.log('Real-time chat updates:', this.messages);
        }, (error) => {
          console.error("Error getting chat messages:", error);
          // Handle error (e.g., show a notification)
        });
        
    },
    sendMessage() {
      
      if (this.newMessage.trim() !== '') {
        if (this.$q.localStorage.getItem("user").isAdmin && this.chatSelect) {

        this.$db
        .collection("chats")
        .add({
          id: this.$q.localStorage.getItem("user").uid,
          room: this.chatSelect.room,
          sender: this.$q.localStorage.getItem("user").displayName,
          email: this.$q.localStorage.getItem("user").email,
          isSeen: false,
          content: this.newMessage,
          isSent: true,
          isAdmin: this.$q.localStorage.getItem("user").isAdmin,
          createdAt: this.$firebase.firestore.FieldValue.serverTimestamp()
        })
        .then(() => {
        });
        } else {
          
          this.$db
          .collection("chats")
          .add({
            id: this.$q.localStorage.getItem("user").uid,
            room: this.$q.localStorage.getItem("user").uid,
            sender: this.$q.localStorage.getItem("user").displayName,
            email: this.$q.localStorage.getItem("user").email,
            content: this.newMessage,
            isSent: true,
            isSeen: true,
            isAdmin: this.$q.localStorage.getItem("user").isAdmin,
            createdAt: this.$firebase.firestore.FieldValue.serverTimestamp()
          })
          .then(() => {
          });
        }
        // this.messages.push({
        //   id: this.nextMessageId++,
        //   sender: 'You', // Assuming the current user is "You"
        //   content: this.newMessage,
        //   isSent: true,
        // });
        this.newMessage = '';
        this.$nextTick(() => {
          this.scrollToBottom(); // Scroll after a new message is added
        });
      }
    },
    scrollToBottom() {
      const container = this.$el.querySelector('.q-chat-container');
      if (container) {
        container.scrollTop = container.scrollHeight;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.q-chat-container {
  height: 70vh; /* Adjust as needed */
  overflow-y: auto;
  border: 1px solid #ddd;
  padding: 8px;
}

.q-input {
  flex-grow: 1; /* Make the input take up available space */
}
</style>