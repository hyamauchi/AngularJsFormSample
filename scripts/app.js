(function() {
    var myApp = angular.module("myApp", ["ui.bootstrap"])
    .config(["datepickerConfig", "datepickerPopupConfig", "timepickerConfig",
               function (datepickerConfig, datepickerPopupConfig, timepickerConfig) {
                   datepickerConfig.showWeeks = false; // 週番号（日本では馴染みが薄い）を非表示にする
                   datepickerConfig.dayTitleFormat = "yyyy年 MMMM";
                   datepickerPopupConfig.currentText = "本日";
                   datepickerPopupConfig.clearText = "消去";
                   datepickerPopupConfig.toggleWeeksText = "週番号";
                   datepickerPopupConfig.closeText = "閉じる";
                   timepickerConfig.showMeridian = false; // 時刻を24時間表示にする（デフォルトでは12時間表示）
               }]);
    myApp.directive("myTable", function() {
        return {
            restrict: "E, A, C",
            link: function(scope, element, attrs, controller) {
                var dataTable;
                //var dataTable = element.dataTable(scope.options);
                if (typeof (dataTable) == "undefined") {
                    dataTable = CreateDataTable(element, scope.options);
                } else {
                    dataTable.fnPageChange("first");
                }
                scope.$watch("options.aaData", handleModelUpdates, true);

                function handleModelUpdates(newData) {
                    var data = newData || null;
                    if (data) {
                        dataTable.fnClearTable();
                        dataTable.fnAddData(data);
                    }
                }
            },
            scope: {
                options: "="
            }
        };
    });
    myApp.controller("Main.Controller", function () {
            this.options = {
                oSorting: {
                    "bSort": false
                },
                oScorllX: {
                    "bScorllX": false
                },
                oPaginate: {
                    "bPaginate": true,
                    "iDisplayLength": 10,
                    "bStateSave": false
                },
                oServerSide: null,
                aoColumns: [
                    {
                        "sTitle": "ID"
                    }, {
                        "sTitle": "会議室名"
                    }
                ],
                aoColumnDefs: [
                    {
                        "bSortable": false,
                        "aTargets": [0, 1]
                    }
                ],
                bJQueryUI: true,
                bDestroy: true,
                aaData: [
                    ["1", "101会議室"]
                ]
            };
            this.options.aaData.push(["2", "102会議室"]);
            this.options.aaData.push(["3", "103会議室"]);

            this.addData = function() {
                this.counter = this.counter + 1;
                this.options.aaData.push([this.counter, this.counter * 2]);
            };

            this.counter = 0;

            this.delivery_date = new Date();
            this.datePickerOpen = false;
            this.toggleDatePicker = function ($event) {
                $event.stopPropagation();

                this.datePickerOpen = !this.datePickerOpen;
            };

            this.input_date_string = (new Date()).toLocaleDateString();
            this.hour1 = "当日中";
            this.hour1List = ["00", "01", "02", "03", "04", "当日中"];
            this.minutes1 = "00";
            this.minutes1List = ["00", "05", "10", "15", "20", "25", "30", "35", "40", "45", "50", "55"];

            this.category = { value: "2", name: "消耗品" };
            this.categoryList = [{ value: "1", name: "日用品" }, { value: "2", name: "消耗品" }];

        }
    );
})();
