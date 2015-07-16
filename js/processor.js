var prevPosTop = 0;
var prevPosLeft = 0;
var score = 0;

$(document).ready(function () {
    $(".nav-tabs a").click(function () {
        $(this).tab('show');
    });
});

function playAudio(idtag) {
    var aud = document.getElementById(idtag);
    aud.play();
}

function startAudCheck() {
    var aud = document.getElementById("passage-audio");
    aud.play();
    $('#start').addClass('disabled');
    $('#tryagain').removeClass('disabled');
    $('#check').removeClass('disabled');

}

function startAud() {
    $('#start').hide();
    $('#tryagain').show();
    var aud = document.getElementById("passage-audio");
    aud.play();
}


function toolboxCheck() {
    $('.correct').css('background-color', '#9CCF31');
    $('.incorrect').css('background-color', '#CE0000');
    $('#check').hide();
    $('.then-listen').removeClass('hidden');

    var score = $('.correct').length;
    var total = $('.ui-droppable').length/2;

    $('#score').append("You scored " + score + "/" + total + ".");


    if (10 * score / total < 7) {
        $('#score').append(" Not very good!");
        $('#tryagain').removeClass("hidden");
    } else if (10 * score / total < 10) {
        $('#score').append(" Good Job!");
    } else {
        $('#score').append(" Well Done!!!");
    }
}

function toolboxScore(max) {

    if (10 * score / max < 7) {
        $("#x").text("Bạn đúng " + score + " trong " + max + " câu. Cần cố gắng thêm!!!");
    } else if (10 * score / max < 10) {
        $("#x").text("Bạn đúng " + score + " trong " + max + " câu. Cố gắng phát huy nhé!!!");
    } else {
        $("#x").text("Bạn đúng " + score + " trong " + max + " câu. Thật tuyệt vời!!!");
    }
}

function reload() {
    location.reload();
}

function initConversation(letter, words, cardsContainer, slotsContainer, storyContainer) {
    correctCards = 0;
    $(cardsContainer).html('');
    $(slotsContainer).html('');

    letter.sort(function () {
        return Math.random() - .5
    });

    for (var i in letter) {
        var cardId = cardsContainer.substring(1) + "card" + i;
        var card = '<div id = "' + cardId + '" style ="z-index: 1000;">'
            + letter[i]["content"]
            + '<a onclick = "playAudio(' + "\'" + cardsContainer.substring(1) + i
            + '\')" class = "then-listen hidden"><span class="glyphicon glyphicon-volume-down"></span></a>'
            + '</div>';

        $(card)
            .addClass("card")
            .data('key', letter[i]["key"]).appendTo(cardsContainer).draggable({
                containment: storyContainer,
                stack: cardsContainer + ' div',
                cursor: 'move',
                revert: true,
                start: startThis,
            }).droppable({
                accept: cardsContainer + ' div',
                hoverClass: 'hovered',
                drop: dropThis,
            });

        var audioTemp = cardsContainer.substring(1) + i;
        $('<audio id = "' + audioTemp + '""><source src="../audio/unit12/' + letter[i]["sound"] + '" type="audio/mpeg"></audio>').appendTo(cardsContainer);


        var cardIdtemp = "#" + cardId;
        $(cardIdtemp).attr("data-drag", '0');
    }


    for (var i in words) {
        var prDiv = slotsContainer.substring(1) + i;
        var prDivt = slotsContainer + i;

        $('<div id = ' + prDiv + ' class ="textConvxersation" style ="top:' + words[i]["top"] + ';left:' + words[i]["left"] + '">').appendTo(slotsContainer);
        var index = parseInt(i) + 1;
        $('<div data-key="' + words[i]["key"] + '"> <span class="number">' + index + '</span></div>').appendTo(prDivt).droppable({
            accept: cardsContainer + ' div',
            hoverClass: 'hovered',
            drop: handleCardDrop
        });
    }

    sameHeightOfLagest(cardsContainer + ' .card');
}

function initVocabulary(words) {
    $('#card-container').html('');
    $('#slot-container').html('');

    words.sort(function () {
        return Math.random() - .5
    });

    for (var i in words) {
        //setup slots
        var imgPath = "../images/unit12/" + words[i].replace(/\s+/g, '') + ".png";
        var soundPath = "https://ssl.gstatic.com/dictionary/static/sounds/de/0/" + words[i].replace(/\s+/g, '_') + ".mp3";

        $('<div class="col-md-15"><img style="height:100px;" src="' + imgPath + '"><div class="slot" data-key = "' + words[i] + '"></div></div>').appendTo('#slot-container');

        var cardId = "card" + i;

        var card = "<div class='col-md-15'><div class='card' id ='" + cardId + "'>" + words[i] + "<audio id='"
            + words[i].replace(/\s+/g, '') + "'><source src='" + soundPath
            + "' type='audio/mpeg'></audio><a onclick = playAudio('" + words[i].replace(/\s+/g, '')
            + "') class = 'then-listen hidden'><span class='glyphicon glyphicon-volume-down'></span></a></div></div>"

        if (Math.random() > 0.5) {
            $('#card-container').append(card);
        } else {
            $('#card-container').prepend(card);
        }

        var cardIdtemp = "#" + cardId;
        $(cardIdtemp).data('key', words[i]);
        $(cardIdtemp).attr("data-drag", '0');
    }

    $('.card').draggable({
        containment: '#dragdrop-container',
        stack: '.card',
        cursor: 'move',
        revert: true,
        start: startThis
    }).droppable({
        accept: '.card',
        hoverClass: 'hovered',
        drop: dropThis
    });


    $('.slot').droppable({
        accept: '.card',
        hoverClass: 'hovered',
        drop: handleCardDrop
    });

    sameWidthOfGreatest('.card,.slot');
    $('.card,.slot').addClass('text-center');
}

function initSentencePatterns(words, sentences) {
    correctCards = 0;
    $('#cardPileSP').html('');
    $('#cardSlotsSP').html('');

    words.sort(function () {
        return Math.random() - .5
    });

    for (var i = 0; i < 5; i++) {
        var cardId = "card" + i;
        var soundid = "sound" + i;
        var card = '<div id="' + cardId + '">' + words[i]["content"]
            + '<a onclick = "playAudio(\'' + soundid
            + '\')" class = "then-listen hidden"><span class="glyphicon glyphicon-volume-down"></span></a>'
            + '</div>';
        $(card).addClass("card")
            .data('key', words[i]["key"]).appendTo('#cardPileSP').draggable({
            containment: '#page-content',
            stack: '#cardPileSP div',
            cursor: 'move',
            revert: true,
            start: startThis
        }).droppable({
            accept: '#cardPileSP div',
            hoverClass: 'hovered',
            drop: dropThis
        });

        var cardIdtemp = "#" + cardId;
        $(cardIdtemp).attr("data-drag", '0');

        $('<audio id = "' + soundid + '"><source src="https://ssl.gstatic.com/dictionary/static/sounds/de/0/' + words[i]["content"] + '.mp3" type="audio/mpeg"></audio>').appendTo('#cardPileSP');

    }

    sentences.sort(function () {
        return Math.random() - .5
    });

    for (var i in sentences) {
        var prDiv = "cardSlotsSP" + i;
        var prDivt = "#cardSlotsSP" + i;
        var index = parseInt(i) + parseInt(1);
        $('<div id = ' + prDiv + '>').appendTo('#cardSlotsSP');
        var beforediv = '<div> ' + index + '. ' + sentences[i]["before"] + '</div>';
        $(beforediv)
            .addClass('text-with-slot')
            .appendTo(prDivt);
        $('<div data-key="' + sentences[i]["key"] + '"> ' + ' ' + '</div>')
            .addClass('slot')
            .appendTo(prDivt).droppable({
            accept: '#cardPileSP div',
            hoverClass: 'hovered',
            drop: handleCardDrop
        });
        var afterdiv = '<div> ' + sentences[i]["after"] + '</div>';
        $(afterdiv)
            .addClass('text-with-slot')
            .appendTo(prDivt);
    }

    sameWidthOfGreatest('.card,.slot');
    $('.card,.slot').addClass('text-center');
}

function init6Competences(questions, answers) {
    $('#cardPileCP').html('');
    $('#cardSlotsCP').html('');

    answers.sort(function () {
        return Math.random() - .5
    });

    for (var i in answers) {
        var soundid = "sound" + i;
        var cardId = "card" + i;
        var card = '<div id="' + cardId + '">' + answers[i]["content"]
            + '<a onclick = "playAudio(\''
            + soundid
            + '\')" class = "then-listen hidden"><span class="glyphicon glyphicon-volume-down"></span></a>'
            + '</div>';

        $(card).addClass("card").data('key', answers[i]["key"]).appendTo('#cardPileCP').draggable({
            containment: '#page-content',
            stack: '#cardPileCP div',
            cursor: 'move',
            revert: true,
            start: startThis
        }).droppable({
            accept: '#cardPileCP div',
            hoverClass: 'hovered',
            drop: dropThis
        });

        $('<audio id = "' + soundid + '"><source src="http://translate.google.com/translate_tts?tl=en&q=' + answers[i]["content"].replace(/\s/g, "%20") + '" type="audio/mpeg"></audio>').appendTo('#cardPileCP');
        var cardIdtemp = "#" + cardId;
        $(cardIdtemp).attr("data-drag", '0');
    }

    questions.sort(function () {
        return Math.random() - .5
    });

    for (var i = 0; i < 5; i++) {
        var prDiv = "cardSlotsCP" + i;
        var prDivt = "#cardSlotsCP" + i;
        var index = parseInt(i) + parseInt(1);
        $('<div id = ' + prDiv + '>').appendTo('#cardSlotsCP');
        var beforediv = '<div class="text-with-slot"> ' + index + '. ' + questions[i]["question"] + '</div>';
        $(beforediv).appendTo(prDivt);
        $('<div data-key="' + questions[i]["key"] + '"> ' + ' ' + '</div>')
            .addClass("slot")
            .appendTo(prDivt)
            .droppable({
                accept: '#cardPileCP div',
                hoverClass: 'hovered',
                drop: handleCardDrop
            });
    }

    sameWidthOfGreatest('.card,.slot');

}

function initPW(letter, words, prPile, prSlot, container) {
    // Reset the game
    correctCards = 0;
    $(prPile).html('');
    $(prSlot).html('');

    letter.sort(function () {
        return Math.random() - .5
    });

    for (var i = 0; i < letter.length; i++) {
        var soundID = prPile + "audio" + i;
        $('<div>' + letter[i]["content"] + '<a onclick = "playAudio(\'' + soundID + '\')" class = "then-listen hidden"> <span class="glyphicon glyphicon-volume-down"></span></a>' + '</div>').data('number', letter[i]["key"]).appendTo(prPile).draggable({
            containment: container,
            stack: prPile + ' div',
            cursor: 'move',
            revert: true,
            drag: dragThis,
            start: startThis,
        }).droppable({
            accept: prPile + ' div',
            hoverClass: 'hovered',
            drop: dropThis,
        });
        $('<audio id = "' + soundID + '"><source src="' + letter[i]["sound"] + '" type="audio/mpeg"></audio>').appendTo(prPile);
    }

    words.sort(function () {
        return Math.random() - .5
    });

    for (var i = 0; i < words.length; i++) {
        var prDiv = prSlot.substring(1) + i;
        var prDivt = prSlot + i;
        $('<div id = ' + prDiv + '>').appendTo(prSlot);
        var beforediv = '<p>' + words[i]["before"] + '</p>';
        $(beforediv).appendTo(prDivt);
        $('<div> ' + '' + '</div>').data('number', words[i]["key"]).appendTo(prDivt).droppable({
            accept: prPile + ' div',
            hoverClass: 'hovered',
            drop: handleCardDrop
        });
        var soundid = prSlot + "sound" + i;
        var afterdiv = '<p>' + words[i]["after"] + '<a onclick = "playAudio(\'' + soundid + '\')" class = "then-listen hidden"><span class="glyphicon glyphicon-volume-down"></span></a>' + '</p>';
        $(afterdiv).appendTo(prDivt);

        $('<audio id = "' + soundid + '"><source src="' + words[i]["sound"] + '" type="audio/mpeg"></audio>').appendTo(prDivt);
    }
}

function dragThis(event, ui) {
    var offsetXPos = parseInt(ui.offset.left);
    var offsetYPos = parseInt(ui.offset.top);
}


function startThis(event, ui) {
    $(this).draggable('option', 'revert', true);
    if (this.getAttribute('data-drag') == '0') {
        this.setAttribute('data-positionTop', $(this).offset().top);
        this.setAttribute('data-positionLeft', $(this).offset().left);
        this.setAttribute('data-drag', '1');
    }
}

function dropThis(event, ui) {
    $(this).draggable('option', 'revert', true);
    $(this).offset({top: this.getAttribute("data-positionTop"), left: this.getAttribute("data-positionLeft")});
    console.log(this.getAttribute("data-positionTop"))
    $(this).removeClass('correct');
    $(this).removeClass('incorrect');
    ui.draggable.draggable('option', 'revert', true)
}

function handleCardDrop(event, ui) {
    var slotKey = this.getAttribute("data-key");
    var cardKey = ui.draggable.data('key');
    console.log(slotKey);
    console.log(cardKey)
    ui.draggable.position({of: $(this), my: 'left top', at: 'left top'});
    ui.draggable.draggable('option', 'revert', false);

    if (slotKey == cardKey) {
        ui.draggable.addClass('correct');
        ui.draggable.removeClass('incorrect');
    } else {
        ui.draggable.addClass('incorrect');
        ui.draggable.removeClass('correct');
    }
}

function initPhonics(letter, words, cardsContainer, slotsContainer, container) {
    correctCards = 0;
    $(cardsContainer).html('');
    $(slotsContainer).html('');

    for (j in letter) {

        for (var i in words) {
            var cardId = "card" + j + i;
            $('<span id="' + cardId + '" style= "position:absolute;top:' + 50 * j + 'px" class="card">' + letter[j] + '</span>').data('key', letter[j]).appendTo(cardsContainer);
        }
        var cardIdtemp = "#" + cardId;
        $(cardIdtemp).attr("data-drag", '0');
    }

    words.sort(function () {
        return Math.random() - .5
    });


    for (var i in words) {
        var w = words[i];
        var firstPart, secondPart, key;
        for (var j = 0; j < letter.length; j++) {
            key = letter[j];
            var pos = w.indexOf(key);
            if (pos == 0) {
                firstPart = "";
                secondPart = w.substring(key.length);
                break;
            } else if (pos > 0) {
                firstPart = w.substring(0, pos);
                secondPart = w.substring(pos + key.length, w.length);
                break;
            }
        }

        var soundid = "sound" + i;
        var element = ('<div class="col-sm-4 col-md-4"<p>'
        + firstPart
        + '<span class="slot" data-key="' + key + '"></span>'
        + secondPart
        + '<a onclick = "playAudio(\'' + soundid
        + '\')" class = "then-listen hidden"><span class="glyphicon glyphicon-volume-down"></span></a>'
        + '<audio id = "' + soundid + '"><source src="https://ssl.gstatic.com/dictionary/static/sounds/de/0/' + words[i] + '.mp3" type="audio/mpeg"></audio>'
        + '</p></div>');
        $(element).appendTo(slotsContainer);
    }

    $('.card').draggable({
        containment: container,
        stack: '.card',
        cursor: 'move',
        revert: true,
        drag: dragThis,
        start: startThis,
        // helper: 'clone'
    }).droppable({
        accept: '.card',
        hoverClass: 'hovered',
        drop: dropThis,
    });

    $('.slot').droppable({
        accept: '.card',
        hoverClass: 'hovered',
        drop: handleCardDrop
    });

    sameWidthOfGreatest('.card,.slot');
    $('.card,.slot').addClass('text-center');
}

function sameWidthOfGreatest(selector) {
    var greatestWidth = 0;

    $(selector).each(function() {
        var theWidth = $(this).width();
        if( theWidth > greatestWidth) {
            greatestWidth = theWidth;
        }
    });

    $(selector).width(greatestWidth + 3);
}

function sameHeightOfLagest(selector) {
    // making cards same size
    var greatestHeight = 0;   // Stores the greatest Height

    $(selector).each(function() {    // Select the elements you're comparing
        var theHeight = $(this).height();   // Grab the current Height
        if( theHeight > greatestHeight) {   // If theHeight > the greatestHeight so far,
            greatestHeight = theHeight;     //    set greatestHeight to theHeight
        }
    });
    $(selector).height(greatestHeight);     // Update the elements you were comparing
}