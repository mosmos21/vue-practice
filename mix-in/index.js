var Shareble = {
  data: function () {
    return {
      isProcessing: false
    }
  },
  methods: {
    share: function () {
      if (this.isProcessing) {
        return;
      }
      if (!window.confirm('share ?')) {
        return;
      }
      this.isProcessing = true;
      setTimeout(function () {
        window.alert('shered!');
        this.isProcessing = false;
      }, 300);
    }
  }
}

var IconShareButton = {
  template: '#icon-share-button',
  mixins: [Shareble]
}

var TextShareButton = {
  template: '#text-share-button',
  mixins: [Shareble],
  data: function () {
    return {
      buttonLabel: 'Share'
    }
  }
}

var vm = new Vue({
  el: '#app',
  components: {
    IconShareButton,
    TextShareButton
  }
});