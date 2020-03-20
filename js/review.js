$(document).ready(function() {
  "use strict";
  var window_width = $(window).width(),
  window_height = window.outerHeight,
  header_height = $("#header").height() + 10,
  fitscreen = window_height - header_height;

  $(".fullscreen").css("height", window_height / 2 + header_height);

  if (document.getElementById("default-select")) {
    $("select").niceSelect();
  }

  // Initiate superfish on nav menu
  $(".nav-menu").superfish({
    animation: {
      opacity: "show"
    },
    speed: 400
  });

  // Mobile Navigation
  if ($("#nav-menu-container").length) {
    var $mobile_nav = $("#nav-menu-container")
      .clone()
      .prop({
        id: "mobile-nav"
      });
    $mobile_nav.find("> ul").attr({
      class: "",
      id: ""
    });
    $("body").append($mobile_nav);
    $("body").prepend(
      '<button type="button" id="mobile-nav-toggle"><i class="lnr lnr-menu"></i></button>'
    );
    $("body").append('<div id="mobile-body-overly"></div>');
    $("#mobile-nav")
      .find(".menu-has-children")
      .prepend('<i class="lnr lnr-chevron-down"></i>');

    $(document).on("click", ".menu-has-children i", function(e) {
      $(this)
        .next()
        .toggleClass("menu-item-active");
      $(this)
        .nextAll("ul")
        .eq(0)
        .slideToggle();
      $(this).toggleClass("lnr-chevron-up lnr-chevron-down");
    });

    $(document).on("click", "#mobile-nav-toggle", function(e) {
      $("body").toggleClass("mobile-nav-active");
      $("#mobile-nav-toggle i").toggleClass("lnr-cross lnr-menu");
      $("#mobile-body-overly").toggle();
    });

    $(document).click(function(e) {
      var container = $("#mobile-nav, #mobile-nav-toggle");
      if (!container.is(e.target) && container.has(e.target).length === 0) {
        if ($("body").hasClass("mobile-nav-active")) {
          $("body").removeClass("mobile-nav-active");
          $("#mobile-nav-toggle i").toggleClass("lnr-cross lnr-menu");
          $("#mobile-body-overly").fadeOut();
        }
      }
    });
  } else if ($("#mobile-nav, #mobile-nav-toggle").length) {
    $("#mobile-nav, #mobile-nav-toggle").hide();
  }

  // Smooth scroll for the menu and links with .scrollto classes
  $(".nav-menu a, #mobile-nav a, .scrollto").on("click", function() {
    if (
      location.pathname.replace(/^\//, "") ==
        this.pathname.replace(/^\//, "") &&
      location.hostname == this.hostname
    ) {
      var target = $(this.hash);
      if (target.length) {
        var top_space = 0;

        if ($("#header").length) {
          top_space = $("#header").outerHeight();

          if (!$("#header").hasClass("header-fixed")) {
            top_space = top_space;
          }
        }

        $("html, body").animate(
          {
            scrollTop: target.offset().top - top_space
          },
          1500,
          "easeInOutExpo"
        );

        if ($(this).parents(".nav-menu").length) {
          $(".nav-menu .menu-active").removeClass("menu-active");
          $(this)
            .closest("li")
            .addClass("menu-active");
        }

        if ($("body").hasClass("mobile-nav-active")) {
          $("body").removeClass("mobile-nav-active");
          $("#mobile-nav-toggle i").toggleClass("lnr-times lnr-bars");
          $("#mobile-body-overly").fadeOut();
        }
        return false;
      }
    }
  });

  $(document).ready(function() {
    $("html, body").hide();
    if (window.location.hash) {
      setTimeout(function() {
        $("html, body")
          .scrollTop(0)
          .show();
        $("html, body").animate(
          {
            scrollTop: $(window.location.hash).offset().top - 108
          },
          1000
        );
      }, 0);
    } else {
      $("html, body").show();
    }
  });

  // Header scroll class
  $(window).scroll(function() {
    if ($(this).scrollTop() > 100) {
      $("#header").addClass("header-scrolled");
    } else {
      $("#header").removeClass("header-scrolled");
    }
  });

  
  

  var form = $("#review-form");
  form.validate({
      errorPlacement: function errorPlacement(error, element) {
           // element.before(error); 
         var input = $('.incident-regarding .input200');
         console.log(input.length);
         for(var i=0; i<input.length; i++) {
           if(validate(input[i]) == false){
             // console.log('validate false');
             showValidate(input[i]);
           } else if(validate(input[i]) == true){
             console.log('validate true');
             hideValidate(input[i]);
           }
         }
      },
      rules: {
          feeling : {
              required: true,
          },
          feedback_regarding : {
              required: true,
          },
          feedback_categories : {
              required: true,
          },
          bus_no : {
              required: true,
          },
          incident_date : {
              required: true,
          },
          incident_time : {
              required: true,
          },
          route_no : {
              required: true,
          },
          route_name : {
              required: true,
          },
          bus_operator : {
              required: true,
          },
      },
      onfocusout: function(element) {
          $(element).valid();
      },
      highlight : function(element, errorClass, validClass) {
          // $(element.form).find('.actions').addClass('form-error');
          // $(element).removeClass('valid');
          // $(element).addClass('error');
      },
      unhighlight: function(element, errorClass, validClass) {
          // $(element.form).find('.actions').removeClass('form-error');
          // $(element).removeClass('error');
          // $(element).addClass('valid');
      }
  });
  form.steps({
      headerTag: "h4",
      bodyTag: "section",
      transitionEffect: "fade",
      enablePagination: true,
      labels: {
          previous : '«',
          next : 'Next',
          finish : 'Submit',
          current : ''
      },
      titleTemplate : '<span class="title">#title#</span>',
      onStepChanging: function (event, currentIndex, newIndex)
      {
          form.validate().settings.ignore = ":disabled,:hidden";
          return form.valid();
      },
      onFinishing: function (event, currentIndex)
      {
          form.validate().settings.ignore = ":disabled";
          return form.valid();
      },
      onFinished: function (event, currentIndex)
      {
          alert('Sumited');
      },
      // onInit : function (event, currentIndex) {
      //     event.append('demo');
      // }
  });

  $('.input200').each(function(){
      $(this).on('blur', function(){
          if($(this).val().trim() != "") {
              $(this).addClass('has-val');
          }
          else {
              $(this).removeClass('has-val');
          }
      })    
  })

  function validate (input) {
    if($(input).val().trim() == ''){
        console.log('empty');
        return false;
    } else {
      console.log('not empty');
        return true;
    }
  }

  function showValidate(input) {
    var thisAlert = $(input).parent();

    $(thisAlert).addClass('alert-validate-2');
  }

  function hideValidate(input) {
      var thisAlert = $(input).parent();

      $(thisAlert).removeClass('alert-validate-2');
  }

  $('.incident-regarding .input200').each(function(){
    $(this).focus(function(){
       hideValidate(this);
    });
  });

  jQuery.extend(jQuery.validator.messages, {
      required: "",
      remote: "",
      email: "",
      url: "",
      date: "",
      dateISO: "",
      number: "",
      digits: "",
      creditcard: "",
      equalTo: "",
      bus_no: "",
      incident_date: "",
      incident_time: "",
      route_no: "",
      route_name: "",
      bus_operator: "",
  });

  $(document).ready(function(){
      $('.custom-control-input').click(function() {
          $('.custom-control-input').not(this).prop('checked', false);
          $(this).prop('checked',true);
      });
  });

  const labels = document.querySelectorAll('.label');
   labels.forEach(label => {
       const chars = label.textContent.split('');
       label.innerHTML = '';
       chars.forEach(char => {
           label.innerHTML += `<span>${char === ' ' ? '&nbsp' : char}</span>`;
       });
   })

  function initMap() {
    var mapProp= {
      center:new google.maps.LatLng(51.508742,-0.120850),
      zoom:5,
    };
    var map = new google.maps.Map(document.getElementById("googleMap"),mapProp);
  }
});



