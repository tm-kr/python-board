$(document).ready(function() {
    loadBoard()
})

function loadBoard() {
    $.ajax({
        url: "/board/load",
        data: {},
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        type: "GET",
        success: function (result) {
            var tb = $("#table_tbody");
            var html = "";
            total = result.length
            for (var i = 0 ; i < total; i++) {
                item = result[i]
                html += `
                    <tr>
                        <td>${total - i}</td>
                        <td>${item.writer}</td>
                        <td><a href="/detail?id=${item.board_id}">${item.board_title}</a></td>
                        <td>${item.create_date}</td>
                        <td>${item.views}</td>
                    </tr>
                `;
            }

            if (total > 0) {
                tb.html(html)
            }
            
        },
        error: function (result) {
            alert('실패')
        },
    });
}

function addBoard() {
    $.ajax({
        url: "/board/add",
        data: JSON.stringify({
            board_title: $('input[name=boardTitle]').val(),
            board_contents: $('textarea[name=boardContents]').val(),
            writer: '관리자',
            views: 0
        }),
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        type: "POST",
        success: function (result) {
            location.reload();
        },
        error: function (result) {
        
        },
    });
}