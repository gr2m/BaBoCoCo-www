app.Views.Account = Backbone.View.extend({
  template: _.template($('#tpl-account').html()),

  events: {
    'submit .login-form': 'onFormSubmit',
    'click [data-action=useApp]': 'onClickUseApp',
    'click [data-action=signout]': 'onClickSignOut'
  },

  initialize: function() {
    _.bindAll(this, 'handleSuccess', 'handleError');
  },

  render: function() {
    this.$el.html(this.template(hoodie.account));
    return this;
  },

  onFormSubmit: function(event) {
    var username = this.$('[name=username]').val();
    var password = this.$('[name=password]').val();
    var action = /signup/.test(event.target.action) ? 'signUp' : 'signIn';

    event.preventDefault();
    this.$('.alert').hide();

    hoodie.account[action](username, password, {moveData: true})
    .then(this.handleSuccess, this.handleError);
  },

  handleSuccess: function(username) {
    this.trigger('login:success', username);
  },


  handleError: function(error) {
    this.$('.alert').text(error.message).show();
  },

  onClickUseApp: function(event) {
    event.preventDefault();
    app.router.navigate('contacts/search', true);
  },

  onClickSignOut: function(event) {
    var view = this;
    hoodie.account.signOut()
    .then(function() {
      view.trigger('signout:success')
    });
  }
});
