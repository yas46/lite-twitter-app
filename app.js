var Twitter = require('twitter');
var $ = require("jquery");
var Twitter = require('twitter');
var config = require('./config');

var client = new Twitter(config);
var params = {
        screen_name: 'DevYas46',
        count: 10,
        exclude_replies: true
        }

$( document ).ready(function() {

    var getTweets = function() {
        //fetches JSON data of specified Screen Name
        client.get('statuses/user_timeline', params, function(error, tweets, response) {
            if(error) throw error;
            $(".tweets").empty();
            //iterarate through the tweets and lists them out to the DOM
            tweets.map(function (tweet, index) {
                $(".tweets").append('<li class="tweet"><img class="avatar" src="' + tweet.user.profile_image_url + '" alt="avatar"/><div class="tweet-copies"><div class="names-container"><span class="name-text">' + tweet.user.name + '</span> <span class="screen-name-text">@' + tweet.user.screen_name + '</span></div><span class="tweet-text">' + tweet.text + '</span></div></li><hr class="tweet-line" />')
            })
        });
    };

    //posts a tweet when enter key is pressed in the input field
    $('#tweet-text').keydown(function(event) {
        var input = document.getElementById('tweet-text').value;
        if (event.keyCode == 13 && input.length > 0) {
            //this posts a tweet
            client.post('statuses/update', {status: input}, function(error, tweet, response) {
              if (!error) {
                //clears the input field
                params.screen_name = 'DevYas46';
                getTweets();
                $('#tweet-text').val("");
                $('#tweet-text').attr("placeholder", "Compose new Tweet...")
              }
          });
        }
    });

    getTweets();

    //switches the user when menu item is clicked
    $(".nav-items").click(function() {
        params.screen_name = $(this).attr("name");
        getTweets();
        $("li[class=nav-items] > a").removeClass("active");
        $(this).child('a').addClass("active");
    });

})
