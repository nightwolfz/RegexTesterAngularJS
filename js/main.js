// How about some jQuery
$(function(){

    var incomeTax = 0.21;
    var socialSecurity = 0.189;
    var generalTax = 0.0254;
    var labourTax = 0.02775;
    var ruling30percent = 0.30;

    function NetIncomeCalculator(income){
        // Private vars
        var socialSecurityOn = false;
        var ruling30percentOn = false;

        // Static vars
        sIncome = income;
        sNetIncome = income;
        s30PercentIncome = income * ruling30percent;

        function formatNumber(elemId, int){
            var formatedInt = parseInt(int).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&.').slice(0, -3);

            $("#" + elemId).html(formatedInt);
        }

        var subRuling30Percent = function(){
            formatNumber("iPercent30Ruling", s30PercentIncome);
            sNetIncome -= s30PercentIncome;
        };

        var subIncomeTax = function(){
            formatNumber("iIncomeTax", -sIncome * incomeTax);
            sNetIncome -= sIncome * incomeTax;
        };

        var subSocialSecurity = function(){
            formatNumber("iSocialSecurity", -sIncome * socialSecurity);
            sNetIncome -= sIncome * socialSecurity;
        };

        var subGeneralTax = function(){
            formatNumber("iGeneralTax", sIncome * generalTax);
            sNetIncome += sIncome * generalTax;
        };

        var subLabourTax = function(){
            formatNumber("iLabourTax", sIncome * labourTax);
            sNetIncome += sIncome * labourTax;
        };

        // Public methods
        return {
            calculateNetIncome: function(){
                formatNumber("iTaxableIncome", sIncome);

                if($("#flip-ruling").val()=="yes"){
                    subRuling30Percent();
                }

                subIncomeTax();

                if($("#flip-social").val()=="yes"){
                    subSocialSecurity();
                }

                subGeneralTax();
                subLabourTax();

                if($("#flip-ruling").val()=="yes") sNetIncome += s30PercentIncome;

                formatNumber("iNetIncome", sNetIncome);
            }
        };
    }

    function launchCalculator(){
        $("#div_results").fadeOut(function(){
            new NetIncomeCalculator($("#grossIncome").val()).calculateNetIncome();
            $("#div_results").fadeIn();
        });

    }

    $("#grossIncome").on("change", launchCalculator);
    $("#calculateNet").on("click", launchCalculator);


    $("#flip-ruling").on("change", function(){
        if($(this).val()=="yes"){
            $("#div_ruling").fadeIn();
        } else {
            $("#div_ruling").fadeOut();
        }
    });
    $("#flip-social").on("change", function(){
        if($(this).val()=="yes"){
            $("#div_social").fadeIn();
        } else {
            $("#div_social").fadeOut();
        }
    });

});