app.Collections.Contacts = hoodie.backbone.Collection.extend({
  model: app.Models.Contact,
  comparator: 'name',

  favorites: function () {
    return this.filter(function(contact) {
      return contact.isFavorite();
    })
  }
});
