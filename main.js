$(document).ready(function () {
  page.init();
});

var page = {
  deleteArticle: function (idx) {

    todoData.splice(idx,1);
    $('.all').html('');
    page.loadItems(todoData);
  },
    init: function () {
      page.initStyling();
      page.initEvents();
    },
    initStyling: function () {
      page.loadItems(todoData);
    },
    initEvents: function () {
      $('.container').on('click', '.checkbox', function (event) {
        event.preventDefault();
          if($(this).closest('article').css("text-decoration") === "line-through") {
              $(this).closest('article').css({"text-decoration": "none"});
              // $(this).closest('article').removeClass('hide');
              //todoData.pop
            } else {
              $(this).closest('article').css({"text-decoration": "line-through"});
              // $(this).closest('article').addClass('hide');
              //todoData.push
        }
        // page.deleteArticle(articleId);
        // console.log(articleId);
      });
      $('form').on('submit', function (event) {
        event.preventDefault();
        var newListItem = {
          content: $('textarea').val()
        };
        todoData.push(newListItem);
        var todoId = todoData.indexOf(newListItem);
        newListItem.id = todoId;
        page.loadTemplate($('.all'), newListItem, $('#listTmpl').html());
        $('aside textarea').val('');

      });
      $('nav').on('click', 'a', function (event) {
        event.preventDefault();
        var sectionClass = '.' + $(this).attr('rel');
        console.log(sectionClass);
        var $pageSection = $(sectionClass);

        if(sectionClass === ".clearCompleted") {
          var articleId = $(this).closest('article').data('id');
          page.deleteArticle(articleId);
        }

        //****** What needs to happen here is I need to add a default status
        //to the array of items!  Then I can change that status on click which
        //I can then sort/filter for the Actice & Completed list.  Also this
        //can be used for the remove function
        //************

        //******Here is an exapmle for the click to edit******
        //$(this).attr('contenteditable', 'true');
        //$(this).keydown(function(event) {
        //var keyCode = (event.keyCode ? event.keyCode : event.which);
        //if (keyCode === 13)
        //})
        //****end of click to edit with keyCode******

        // else if(sectionClass === ".count") {
        //   var totalCount = todoData.length;
        //   $('#count').html(totalCount + " Items Remain");
        // }

        // if(sectionClass === ".active" && $(this).closest('article').css("text-decoration") === "line-through") {
        //   $(this).closest('article').addClass('hide');
        //
        // } else {
    //       else if(sectionClass === ".completed")
    //       else if(sectionClass === ".clearCompleted")
    //        && $(this).closest('article').css("text-decoration") === "line-through") {
    //       // $(this).closest('article').css({"text-decoration": "none"});
    //       $(this).closest('article').addClass('hide');
    // }

        $pageSection.addClass('active-section');
        $pageSection.siblings('section').removeClass('active-section');
      // }

      });
      $('#count').on('mouseover', 'a', function (event) {
        event.preventDefault();
        var sectionClass = '.' + $(this).attr('rel');
        if(sectionClass === ".count") {
        var totalCount = todoData.length;

        $('#count').html(totalCount + " Items Remain");
      }
      });



      // $('aside').on('click', 'li', function (event) {
      //   console.log('event.target', event.target);
      //   console.log('this', this);
      //   $(this).toggleClass('makeGreen');
      //   page.alertMe();
      // });
      //
      // $('article').on('mouseover', function (event) {
      //   page.logMe(event.target);
      // });

    },
    loadTemplate: function ($el, data, tmpl) {
      var template = _.template(tmpl);
      var html = template(data);
      $el.append(html);
    },
    loadItems: function (arr) {
      _.each(arr, function (currEl, idx, arr) {
        currEl.id = idx;
        page.loadTemplate($('.all'), currEl, $('#listTmpl').html());
      });
    },
    alertMe: function (msg) {
      alert(msg);
      page.logMe(msg);
    },
    logMe: function (msg) {
      console.log(msg);
    }

};
