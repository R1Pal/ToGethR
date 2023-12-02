import { Controller } from "@hotwired/stimulus";
import { createConsumer } from "@rails/actioncable";

export default class extends Controller {
  static values = { coupleId: Number };
  static targets = ["messages"];

  connect() {
    this.channel = createConsumer().subscriptions.create(
      { channel: "CoupleChannel", id: this.coupleIdValue },
      { received: data => this._insertMessageAndScrollDown(data)}
    );
    console.log(`Subscribed to the chatroom with the id ${this.coupleIdValue}.`);
  }

  _insertMessageAndScrollDown(data) {
    this.messagesTarget.insertAdjacentHTML("beforeend", data);
    this.messagesTarget.scrollTo(0, this.messagesTarget.scrollHeight);
  }

  resetForm(event) {
    event.target.reset()
  }

  disconnect() {
    console.log("Unsubscribed from the chatroom")
    this.channel.unsubscribe()
  }
}