function CreateDataTable(element, options) {
    var oSorting = options.oSorting;
    var oPaginate = options.oPaginate;
    var oServerSide = options.oServerSide;
    var aoColumnDefs = options.aoColumnDefs;
    var oScorllX = options.oScorllX;
    var isSearchDialog = options.isSearchDialog;
    var scrollY = options.scrollY;

    var param = {};

    param.oLanguage = {
        "sUrl": "/dataTables_lang.txt"
    };
    param.bLengthChange = true;
    param.bInfo = true;
    if (oScorllX != null && oScorllX.bScorllX) {
        param.scrollX = oScorllX.bScorllX;
    }
    param.scrollCollapse = true;
    if (scrollY) {
        param.scrollY = "400px";
    }
    //param.sDom = (typeof (isSearchDialog) != 'undefined' || isSearchDialog) ? 't<"dialog-bottom"ipl>' : '<"tableHead"ipl>t';
    param.sDom = 'Rlfrtip';
    //param.dom = 'Rlfrtip';    
    param.aLengthMenu = [5, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
    param.bStateSave = oPaginate.bStateSave;
    param.stateDuration = -1;

    param.bProcessing = false;
    param.bFilter = false;

    if (oSorting != null) {
        param.bSort = oSorting.bSort;
        if (oSorting.bSort && oSorting.aaSorting != null) {
            param.aaSorting = oSorting.aaSorting;
        }
    }

    if (oPaginate != null && oPaginate.bPaginate != null) {
        param.bPaginate = oPaginate.bPaginate;
        if (oPaginate.bPaginate) {
            param.sPaginationType = "full_numbers";
            if (oPaginate.iDisplayLength) {
                param.iDisplayLength = oPaginate.iDisplayLength;
            }
            if (oPaginate.iDisplayStart) {
                param.iDisplayStart = oPaginate.iDisplayStart;
            }
        }
    }


    if (oServerSide != null && oServerSide.bServerSide != null) {
        param.bServerSide = oServerSide.bServerSide;
        if (oServerSide.bServerSide) {
            param.sAjaxSource = oServerSide.sAjaxSource;

            if (oServerSide.fnRowCallback != null) {
                param.fnRowCallback = oServerSide.fnRowCallback;
            }
            if (oServerSide.fnServerParams != null) {
                param.fnServerParams = oServerSide.fnServerParams;
            }

            param.fnServerData = function (sSource, aoData, fnCallback) {
                if (typeof (sort_colum) != 'undefined' && typeof (sort_type) != 'undefined') {
                    for (var i = 0; i < aoData.length; i++) {
                        if (aoData[i].name == 'iSortCol_0') {
                            aoData[i].value = sort_colum;
                            aoData[i + 1].value = sort_type;
                            break;
                        }
                    }
                }

                var ajaxParam = {};
                ajaxParam.dataType = 'json';
                ajaxParam.type = "POST";
                ajaxParam.async = true;
                ajaxParam.url = sSource;
                ajaxParam.data = aoData;

                if (oServerSide.fnBeforeSend) {
                    ajaxParam.beforeSend = oServerSide.fnBeforeSend;
                }

                if (oServerSide.fnDrawCallback) {
                    ajaxParam.complete = oServerSide.fnDrawCallback;
                }

                ajaxParam.success = function (data, status, xhr) {
                    if (data.ErrorMessages == null) {
                        if (oServerSide.fnInitComplete) {
                            oServerSide.fnInitComplete(data);
                        }
                        fnCallback(data, status, xhr);
                    } else {
                        alert(data.ErrorMessages);
                    }
                }
                ajaxParam.error = function (err) {
                    window.location.href = '/Common/Common/Error/';
                }
                $.ajax(ajaxParam);
            }
        }
    }

    if (aoColumnDefs != null) {
        param.aoColumnDefs = aoColumnDefs;
    }

    if (options.aoColumns != null) {
        param.aoColumns = options.aoColumns;
    }

    var dataTable = $(element).dataTable(param);
    return dataTable;
}
