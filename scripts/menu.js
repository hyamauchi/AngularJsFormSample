$(function () {
    // ===============================
    // ハンバーガーアイコン動作関係
    // ===============================

    // ナビアイコンをクリックしたら
    $('.navIcon').click(function () {
        $('.overlay').toggle(); // オーバーレイ表示切替
        $('.menu').toggleClass('menuOn'); // サイドメニュー表示切替
        $('#wrap').toggleClass('fixed'); // コンテンツ固定

        if ($('.iconLayer').hasClass('arrow')) { // アイコンが矢印なら
            $('.iconLayer').removeClass('arrow').addClass('hamburger'); // ハンバーガーメニューに
        } else { // それ以外なら
            $('.iconLayer').removeClass('hamburger').addClass("arrow"); // 矢印
        }
        return false;
    });

    // オーバーレイ作成
    $('#contents').prepend('<div class="overlay"></div>');

    // オーバーレイをクリックしたら
    $('.overlay').click(function () {
        $(this).fadeOut(300); // オーバーレイ非表示
        $('.menu').removeClass('menuOn'); // メニュー非表示
        $('#wrap').removeClass('fixed'); // 固定解除
        $('.iconLayer').removeClass('arrow').addClass('hamburger'); // ハンバーガーメニューに
    });

    // ===============================
    // メニュー動作関係
    // ===============================

    // サイドナビゲーション高さ指定
    function winHeight() {
        var winH = $(window).height();
        var headerH = $('header').height();
        var winH = winH - headerH; // ヘッダーの高さを引く
        $('.menu').css({
            'height': winH + 'px',
            'top': headerH + 'px'
        });
        $('#contents').css('marginTop', headerH + 30 + 'px');
    }
    winHeight();

    // リサイズしたら再度実行
    $(window).resize(function () {
        winHeight();
    });

    // サイドメニュー説明文
    $('.menuHeader figcaption').click(function () {
        $('.menu .txt').slideToggle();
    });

});

function getCalendarOption() {
    var option = {
        closeText: '閉じる',
        prevText: '&#x3c;前',
        nextText: '次&#x3e;',
        currentText: '今日',
        monthNames: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
        monthNamesShort: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
        dayNames: ['日曜日', '月曜日', '火曜日', '水曜日', '木曜日', '金曜日', '土曜日'],
        dayNamesShort: ['日', '月', '火', '水', '木', '金', '土'],
        dayNamesMin: ['日', '月', '火', '水', '木', '金', '土'],
        weekHeader: '週',
        dateFormat: 'yy/mm/dd',
        firstDay: 0,
        isRTL: false,
        showButtonPanel: true,
        showOtherMonths: true,
        showMonthAfterYear: true,
        yearSuffix: '年',
        showOn: "button",
        buttonImageOnly: false
    };

    return option;
};

function getInitialCalendar() {
    var option = {
        closeText: '閉じる',
        prevText: '&#x3c;前',
        nextText: '次&#x3e;',
        currentText: '今日',
        monthNames: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
        monthNamesShort: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
        dayNames: ['日曜日', '月曜日', '火曜日', '水曜日', '木曜日', '金曜日', '土曜日'],
        dayNamesShort: ['日', '月', '火', '水', '木', '金', '土'],
        dayNamesMin: ['日', '月', '火', '水', '木', '金', '土'],
        weekHeader: '週',
        dateFormat: 'yy/mm/dd',
        firstDay: 0,
        isRTL: false,
        showButtonPanel: true,
        showOtherMonths: true,
        showMonthAfterYear: true,
        yearSuffix: '年',
        showOn: "button",
        buttonImageOnly: false,
        defaultDate: '1980/01/01'
    };

    return option;
};

function getCalendarOnlyMonthYearOption() {
    var option = {
        closeText: '閉じる',
        prevText: '&#x3c;前',
        nextText: '次&#x3e;',
        currentText: '今日',
        monthNames: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
        monthNamesShort: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
        dateFormat: 'yy/mm',
        isRTL: false,
        firstDay: 0,
        showButtonPanel: true,
        showOn: "button",
        buttonImageOnly: false,
        changeMonth: true,
        changeYear: true,
        onChangeMonthYear: function (year, month, inst) {
            $(this).val($.datepicker.formatDate('yy/mm', new Date(year, month - 1, 1)));
        },
        beforeShow: function (input, inst) {
            var defaultDate = new Date();

            if ($(input).val().length > 0) {
                var check = iseiQ.utility.validDate($(input).val(), 'yyyy/mm', '');
                if (iseiQ.utility.validDate($(input).val(), 'yyyy/mm', '') == null) {
                    defaultDate = $(input).val() + '/01';
                }
            }

            $(this).datepicker('option', 'defaultDate', new Date(defaultDate));
            $(this).val($.datepicker.formatDate('yy/mm', new Date(defaultDate)));
        }
    };

    return option;
};

$(function () {
    $(".datefield").datepicker(getCalendarOption());
    $(".datefield-only-month-year").datepicker(getCalendarOnlyMonthYearOption());

    $(".initialDate").datepicker(getInitialCalendar());
    $(".date.datepicker-days").datepicker({
        autoclose: true,
        language: 'ja'
    });
});
