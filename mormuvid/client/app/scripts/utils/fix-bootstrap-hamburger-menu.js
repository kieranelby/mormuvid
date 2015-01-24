Ember.Application.initializer({
  name: "fixBoostrapHamburgerMenu",
  initialize: function(container, application) {
    $(document).on('click','.navbar-collapse.in',function(e) {
        if( $(e.target).is('a') && ( $(e.target).attr('class') != 'dropdown-toggle' ) ) {
            $(this).collapse('hide');
        }
    });
  }
});
