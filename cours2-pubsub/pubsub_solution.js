class PubSub {

  constructor() {
    // Pas d'arguments
    this.topics = {};
  }

  publish(topic, msg) {
    var subs = this.topics[topic];
    if (subs) {
      subs.forEach(function(sub) {
        sub(topic, msg);
      });
    }
  }

  subscribe(topic, f) {
    if (!this.topics[topic]) {
      this.topics[topic] = []; // Liste de subscribers
    }

    var subs = this.topics[topic];

    // Attention: includes requiert une VM compatible ES7!
    // Une alternative consiste à utiliser indexOf
    if ( !(subs.includes(f)) )  {
      subs.push(f);
    }
  }

  unsubscribe(topic, f) {
    var subs = this.topics[topic];

    if ( subs && subs.includes(f) )  {
      subs.splice( subs.indexOf(f), 1 );
    }
  }

}

// Cas de test
let pubsub = new PubSub();

// Implémentez quelques cas de tests:
// Souscriptions et désouscriptions
// Publications

function handler1(topic, msg) {
  console.log("[h1] Topic: " + topic + " | msg: " + msg);
}

function handler2(topic, msg) {
  console.log("[h2] Topic: " + topic + " | msg: " + msg);
}

pubsub.subscribe("montreal", handler1);

pubsub.publish("montreal", 4);

pubsub.subscribe("montreal", handler2);

pubsub.publish("montreal", 5);

pubsub.unsubscribe("montreal", handler1);

pubsub.publish("montreal", 6);

pubsub.subscribe("toronto", handler1);

pubsub.subscribe("toronto", handler2);

pubsub.subscribe("toronto", handler2);

pubsub.publish("montreal", 7);

pubsub.publish("toronto", 10);

pubsub.unsubscribe("toronto", handler1);

pubsub.unsubscribe("toronto", handler1);

pubsub.publish("toronto", 11);

pubsub.publish("quebec", 2);
