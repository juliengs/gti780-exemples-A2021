function setupObservers() {
  /*var txts = document.getElementsByTagName("input");
  for (var i=0; i<txts.length; i++) {
    var txt = txts[i];
    txt.update = function(context) { this.value = context; }
  }
  */

  extend(HTMLInputElement.prototype, new Observer());
  HTMLInputElement.prototype.update = function(context) {
    this.value = context;
  }

}

function setupClickHandlers() {
  var btn = document.getElementById("mybutton");
  var txts = document.getElementsByTagName("input");
  for (var i=0; i<txts.length; i++) {
    var txt = txts[i];
    txt.onclick = function() {

      if (btn.observers.indexOf(this, 0) == -1) {
        btn.addObserver(this);
        this.style = "background-color: yellow;";
      } else {
        btn.removeObserver(this);
        this.style = "";
      }

    }
  }
};


window.onload = function() {

  var lyrics = ["...give you up", "...let you down", "...run around and desert you", "...make you cry", "...say goodbye", "...tell a lie and hurt"]
  var index = 0;

  var btn = document.getElementById("mybutton");
  extend(btn, new Subject());
  // Notifier lorsque clic
  btn.onclick = function() {
    btn.notify(lyrics[index]);
    index++;
    if (index == lyrics.length) index = 0;
  }

  setupObservers();
  setupClickHandlers();


  setupObservers();

}
