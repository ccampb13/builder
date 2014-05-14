/* jshint unused:false */

(function(){
  'use strict';

  $(document).ready(init);

  function init(){
    $('#login').click(login);
    $('#seed').click(seed);
    $('#getforest').click(getForest);
    $('#forest').on('click', '.tree.alive', grow);//only trees with class 'alive' can be clicked
  }

  function grow(){
    var tree = $(this);//allows us to retrieve 'this' at this particular moment
    var treeId = $(this).data('id');

    $.ajax({
      url: `/tree/${treeId}/grow`,
      type: 'PUT',
      dataType: 'html',
      success: t => {
        tree.replaceWith(t);//replacing pre-existing tree with the newly saved and returned tree.
      }
    });
  }

  function getForest(){
    var userId = $('#username').attr('data-id');//used this instead of .data so that the browser doesn't cache the value

    $.ajax({
      url: `/forest/${userId}`,//want the id in params, not query which is default
      type: 'GET',
      dataType: 'html',//tells what data we are expecting back from node
      success: html => {//html that is being created by jade and then sent by node to this js
        $('#forest').empty().append(html);
      }
    });
  }

  function seed(){//every time Plant Seed is clicked
    var userId = $('#username').data('id');//extracting data id attribute we created

    $.ajax({
      url: '/seed',
      type: 'POST',
      dataType: 'html',
      data: {userId:userId},
      success: tree => {//same as getForest above. The tree is html
        $('#forest').append(tree);
      }
    });
  }

  function login(e){// e brings in click event. We need to prevent the form from automatically submitting
    var data = $(this).closest('form').serialize();

    $.ajax({
      url: '/login',
      type: 'POST',
      data: data,
      success: r => {
        $('#login').prev().val('');
        $('#username').attr('data-id', r._id);//inserting _id of username object as attribute
        $('#username').text(r.username);
        console.log(r);
      }
    });

    e.preventDefault();
  }

})();
