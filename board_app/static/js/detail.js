$(document).ready(function() {
    loadBoardDetail()
})

var urlParams = new URLSearchParams(window.location.search);
var boardId = urlParams.get('id');

function loadBoardDetail() {
    $.ajax({
        url: "/board/detail/load",
        data: {
            boardId: boardId
        },
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        type: "GET",
        success: function (result) {
            $('input[name=boardTitle]').val(result.board_title)
            $('textarea[name=boardContents]').val(result.board_contents)
            $('#boardWriter').html(result.writer)
            $('#createDate').html(result.create_date)
        },
        error: function (result) {
            alert('실패')
        },
    });
}

function modifyFormOn() {
    $('.modifyButton').show();
    $('.modifyButtonOff').hide();
    $('input[name=boardTitle]').attr('readonly', false);
    $('textarea[name=boardContents]').attr('readonly', false);
}

function modifyFormOff() {
    $('.modifyButtonOff').show();
    $('.modifyButton').hide();
    $('input[name=boardTitle]').attr('readonly', true);
    $('textarea[name=boardContents]').attr('readonly', true);
    loadBoardDetail();
}

function modifyBoard() {
    $.ajax({
        url: "/board/modify",
        data: JSON.stringify({
            board_id: boardId,
            board_title: $('input[name=boardTitle]').val(),
            board_contents: $('textarea[name=boardContents]').val(),
        }),
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        type: "POST",
        success: function () {
            alert('수정되었습니다.')
            modifyFormOff();
        },
        error: function () {
            alert('실패')
        },
    });
}

function removeBoard() {
    if (!confirm('삭제하시겠습니까?')) {
        return;
    }

    $.ajax({
        url: "/board/remove",
        data: JSON.stringify({
            board_id: boardId
        }),
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        type: "POST",
        success: function () {
            alert('삭제되었습니다.')
            location.href = '/'
        },
        error: function () {
            alert('실패')
        },
    });
}