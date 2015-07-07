var prevPosTop = 0;
var prevPosLeft = 0;
var score = 0;

// play audio show text
function playShowText(textArray) {
    for (var i = 0; i < textArray.length; i++) {
        $("#imgConv").append(" <b class = 'textConversation'" +
            " style = 'top:" + textArray[i]["top"]
            + ";left:" + textArray[i]["left"]
            + "'>"
            + textArray[i]["content"]
            + "</b>.");
    }
}

function playaudio(idtag) {
    var aud = document.getElementById(idtag);
    aud.play();
}

function startAu() {
    $('#start').addClass('disabled');
    $('#tryagain').removeClass('disabled');
    var aud = document.getElementById("audio");
    aud.play();
    playShowText(sentences1);
    aud.addEventListener("ended", function () {
        var aud2 = document.getElementById("audio2");
        aud2.play();
        playShowText(sentences2);
    });
}

function start() {
    $('#start').addClass('disabled');
    $('#tryagain').removeClass('disabled');
    $('#check').removeClass('disabled');
    $('#score').removeClass('disabled');
}

function startAudCheck() {
    var aud = document.getElementById("passage-audio");
    aud.play();
    $('#start').addClass('disabled');
    $('#tryagain').removeClass('disabled');
    $('#check').removeClass('disabled');
    $('#score').removeClass('disabled');
}

function startAud() {
    var aud = document.getElementById("passage-audio");
    aud.play();
    $('#start').addClass('disabled');
}

function check() {
    $('.correct').css('background-color', '#01DF3A');
    $('.incorrect').css('background-color', 'red');
    $('#check').addClass('disabled');
    $('.thenls').removeClass('hidden');
}

function showscore(max) {
    $('#score').addClass('disabled');
    if (10 * score / max < 7) {
        $("#x").text("Bạn được " + Math.floor(10 * score / max) + " điểm. Cần cố gắng thêm!!!");
    } else if (10 * score / max < 10) {
        $("#x").text("Bạn được " + Math.floor(10 * score / max) + " điểm. Cố gắng phát huy nhé!!!");
    } else {
        $("#x").text("Bạn được " + Math.floor(10 * score / max) + " điểm. Thật tuyệt vời!!!");
    }
}

function initConversation(letter, words, prPile, prSlot, container) {
    correctCards = 0;
    $(prPile).html('');
    $(prSlot).html('');

    letter.sort(function () {
        return Math.random() - .5
    });

    for (var i = 0; i < letter.length; i++) {
        $('<div style ="z-index: 1000;margin-bottom: 10px;height: ' + 28 * Math.ceil(letter[i]["content"].length / 17) + 'px">' + letter[i]["content"] + '<a onclick = "playaudio(' + "\'" + prPile.substring(1) + i + '\')" class = "h4 thenls hidden"style = "color:#F5A9F2"> <span class="glyphicon glyphicon-play-circle"></span></a>' + '</div>').data('number', letter[i]["key"]).appendTo(prPile).draggable({
            containment: container,
            stack: prPile + ' div',
            cursor: 'move',
            revert: true,
            drag: dragThemSeft,
            start: startThemseft,
        }).droppable({
            accept: prPile + ' div',
            hoverClass: 'hovered',
            drop: dropThemseft,
        });
        var audiotemp = prPile.substring(1) + i
        $('<audio id = "' + audiotemp + '""><source src="../audio/unit12/' + letter[i]["sound"] + '" type="audio/mpeg"></audio>').appendTo(prPile);

    }


    for (var i = 0; i < words.length; i++) {
        var prDiv = prSlot.substring(1) + i;
        var prDivt = prSlot + i;

        $('<div id = ' + prDiv + ' class ="textConversation" style ="top:' + words[i]["top"] + ';left:' + words[i]["left"] + '">').appendTo(prSlot);
        var beforediv = '<p>' + words[i]["before"] + '</p>';
        $(beforediv).appendTo(prDivt);
        $('<div> ' + '???' + '</div>').data('number', words[i]["key"]).appendTo(prDivt).droppable({
            accept: prPile + ' div',
            hoverClass: 'hovered',
            drop: handleCardDrop
        });
        var afterdiv = '<p>' + words[i]["after"] + '</p>';
        $(afterdiv).appendTo(prDivt);
    }
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
        var thenlsid = prPile + "thenlsid" + i;
        $('<div>' + letter[i]["content"] + '<a onclick = "playaudio(\'' + thenlsid + '\')" class = "h4 thenls hidden"style = "color:#F5A9F2"> <span class="glyphicon glyphicon-play-circle"></span></a>' + '</div>').data('number', letter[i]["key"]).appendTo(prPile).draggable({
            containment: container,
            stack: prPile + ' div',
            cursor: 'move',
            revert: true,
            drag: dragThemSeft,
            start: startThemseft,
        }).droppable({
            accept: prPile + ' div',
            hoverClass: 'hovered',
            drop: dropThemseft,
        });
        var audtempid = prPile + "thenlsid" + i;
        $('<audio id = "' + audtempid + '"><source src="' + letter[i]["sound"] + '" type="audio/mpeg"></audio>').appendTo(prPile);
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
        var thenlsid = prSlot + "thenlsid" + i;
        var afterdiv = '<p>' + words[i]["after"] + '<a onclick = "playaudio(\'' + thenlsid + '\')" class = "h4 thenls hidden"style = "color:#F5A9F2"> <span class="glyphicon glyphicon-play-circle"></span></a>' + '</p>';
        $(afterdiv).appendTo(prDivt);

        var idTemp = prSlot + "thenlsid" + i;
        $('<audio id = "' + idTemp + '"><source src="' + words[i]["sound"] + '" type="audio/mpeg"></audio>').appendTo(prDivt);
    }
}

function dragThemSeft(event, ui) {
    var offsetXPos = parseInt(ui.offset.left);
    var offsetYPos = parseInt(ui.offset.top);
}

function startThemseft(event, ui) {
    prevPosTop = ui.offset.top;
    prevPosLeft = ui.offset.left;
}

function dropThemseft(event, ui) {
    $(this).draggable('option', 'revert', true);
    $(this).offset({top: prevPosTop, left: prevPosLeft});
    ui.draggable.draggable('option', 'revert', true)
    $(this).removeClass('correct');
    $(this).removeClass('incorrect');
}

function handleCardDrop(event, ui) {
    var slotNumber = $(this).data('number');
    var cardNumber = ui.draggable.data('number');

    // if ( slotNumber == cardNumber ) {
    //
    // ui.draggable.draggable( 'disable' );
    // $(this).droppable('disable');
    ui.draggable.position({of: $(this), my: 'left top', at: 'left top'});
    ui.draggable.draggable('option', 'revert', false);
    // correctCards++;
    // }

    if (slotNumber == cardNumber) {
        ui.draggable.addClass('correct');
        score++;
        // $('.correct').css('background-color', '#01DF3A');
    } else {
        ui.draggable.addClass('incorrect');
        // $('.incorrect').css('background-color', 'red');
    }
}

function playaudiotemp() {
    var xxx = document.getElementById("audtemp");
    xxx.play();
}


// only Phonics word
function initPW2(letter, words, prPile, prSlot, container) {
    // Reset the game
    correctCards = 0;
    $(prPile).html('');
    $(prSlot).html('');

    for (var i = 0; i < letter.length; i++) {
        $('<div style= "top:' + 50 * (((i + 1) / letter.length > 0.5) ? 1 : 0) + 'px">' + letter[i]["content"] + '</div>').data('number', letter[i]["key"]).appendTo(prPile).draggable({
            containment: container,
            stack: prPile + ' div',
            cursor: 'move',
            revert: true,
            drag: dragThemSeft,
            start: startThemseft,
        }).droppable({
            accept: prPile + ' div',
            hoverClass: 'hovered',
            drop: dropThemseft,
        });

    }

    words.sort(function () {
        return Math.random() - .5
    });

    for (var i = 0; i < words.length; i++) {
        var prDiv = prSlot.substring(1) + i;
        var prDivt = prSlot + i;
        $('<div id = ' + prDiv + '>').appendTo(prSlot);
        var beforediv = '<p> ' + words[i]["before"] + '</p>';
        $(beforediv).appendTo(prDivt);
        var thenlsid = "thenlsid" + i;
        $('<div>' + ' ' + '</div>').data('number', words[i]["key"]).appendTo(prDivt).droppable({
            accept: prPile + ' div',
            hoverClass: 'hovered',
            drop: handleCardDrop
        });
        var afterdiv = '<p>' + words[i]["after"] + '<a onclick = "playaudio(\'' + thenlsid + '\')" class = "h4 thenls hidden"style = "color:#F5A9F2"> <span class="glyphicon glyphicon-play-circle"></span></a>' + '</p>';
        $(afterdiv).appendTo(prDivt);
        var idTemp = "thenlsid" + i;
        $('<audio id = "' + idTemp + '"><source src="' + words[i]["sound"] + '" type="audio/mpeg"></audio>').appendTo(prDivt);
    }
}

function reload() {
    location.reload();
}