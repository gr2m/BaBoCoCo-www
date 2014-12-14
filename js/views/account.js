app.Views.Account = Backbone.View.extend({
  template: _.template($('#tpl-account').html()),

  events: {
    'submit .login-form': 'onFormSubmit',
    'click [data-action=useApp]': 'onClickUseApp'
  },

  initialize: function() {
    _.bindAll(this, 'handleSuccess', 'handleError');
  },

  render: function() {
    this.$el.html(this.template(hoodie.account));
    this.show();
    return this;
  },

  show: function() {
    $('.login-container').addClass('show');
  },

  hide: function() {
    $('.login-container').removeClass('show');
  },

  onFormSubmit: function(event) {
    var username = this.$('[name=username]').val();
    var password = this.$('[name=password]').val();
    var action = /signup/.test(event.target.action) ? 'signUp' : 'signIn';

    event.preventDefault();
    this.$('.alert').hide();

    hoodie.account[action](username, password)
    .then(this.handleSuccess, this.handleError);
  },

  handleSuccess: function(response) {
    this.hide();
    response = JSON.parse(response);
    this.trigger('login:success', response.name);
  },


  handleError: function(error) {
    this.$('.alert').text(error.message).show();
  },

  onClickUseApp: function(event) {
    event.preventDefault();
    this.hide();
    app.router.navigate('contacts/search', true);
  }
});
