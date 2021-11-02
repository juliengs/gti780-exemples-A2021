function arrayIncludesArray(arr, elem) {
  arr.forEach(function(e) {
    if (arraysEqual(e, elem)) {
      return true;
    }
  });
  return false; // Pas trouvé
}

// Fonction empruntée de: https://stackoverflow.com/a/16436975
function arraysEqual(a, b) {
  if (a === b) return true;
  if (a == null || b == null) return false;
  if (a.length != b.length) return false;

  // If you don't care about the order of the elements inside
  // the array, you should sort both arrays here.
  // Please note that calling sort on an array will modify that array.
  // you might want to clone your array first.

  for (var i = 0; i < a.length; ++i) {
    if (a[i] !== b[i]) return false;
  }
  return true;
}

class ContentBased {

  constructor() {
    // Pas d'arguments
    this.subs = [];
  }

  publish(msg) {
    this.subs.forEach( function(sub) {
      let expr = sub[0];
      let f = sub[1];

      // Vérifier si la fonction d'évaluation "expr" --
      // si la fonction d'évaluation associée à la souscription
      // retourne vrai, on délivre la souscription.
      let ret = expr(msg);
      if (ret) {
        f(msg);
      }
    } );
  }

  subscribe(expr, f) {
    if ( !arrayIncludesArray(this.subs, [expr, f])) {
      this.subs.push([expr, f]);
    }
  }

  unsubscribe(expr, f) {
    if ( arrayIncludesArray(this.subs, [expr, f])) {
      for (let i=0; i<this.subs.length; i++) {
          if (arraysEqual( this.subs[i], [expr, f] )) {
            this.subs.splice(i, 1);
            break;
          }
      }
    }
  }



}

// Cas de test
let cb = new ContentBased();

// Implémentez quelques cas de tests:
// Souscriptions et désouscriptions
// Publications

function temperatureAbove10(msg) {
  return (msg.temperature && msg.temperature >= 10 );
}

function altitudeAbove200(msg) {
  return (msg.altitude && msg.altitude >= 200 );
}

function handler1(msg) {
  console.log("[h1] msg: " + "{temperature:" + msg.temperature + ", altitude:" + msg.altitude + "}");
}

function handler2(msg) {
  console.log("[h2] msg: " + "{temperature:" + msg.temperature + ", altitude:" + msg.altitude + "}");
}

function handler3(msg) {
  console.log("[h3] msg: " + "{temperature:" + msg.temperature + ", altitude:" + msg.altitude + "}");
}

cb.subscribe(temperatureAbove10, handler1);

cb.subscribe(altitudeAbove200, handler2);

cb.publish({temperature: 20, altitude: 400});

cb.publish({temperature: 5, altitude: 400});

cb.publish({temperature: 5, altitude: 4});

cb.unsubscribe(temperatureAbove10, handler1);

cb.publish({temperature: 20, altitude: 400});

cb.subscribe(function(msg) { return altitudeAbove200(msg) && temperatureAbove10(msg) }, handler3);

cb.publish({temperature: 20, altitude: 400});
