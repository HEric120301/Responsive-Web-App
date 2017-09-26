//left to be done: legi detail; favorite; UI优化

//favorite: button clicked->find the id of like bio_id-> this tag also has ng-model, which points to a $scope variable->js use this variable to find the person and store into an array.


//table change color onmouseiver!!!
//mynvgat!!!

//*bill and legi directly turn to fav
//com fav

$(document).ready(function (){
    $("#overall").click(function(){
        var x = $("#myTognav");
        var y = $("#block_border");
        if (x.css("display") === 'none') {
            x.css("display", "block");
            y.css("width", "83.33%");
        } else {
            x.css("display", "none");
            y.css("width", "100%");
        }
    });
    //controll the height of drop down box and main box to be the same
    $("#myTognav").css("height", $("#block_border").css("height"));
    //$("#block_border").css("height", $("#contain").css("height"));
    //$("#billinfor").css("height", $("#contain").css("height"));
    //$("#commitinfor").css("height", $("#contain").css("height"));

    //exchange between legi, bill and comm
    $("#l").click(function(){
        $("#bills").css("display", "none");
        $("#committees").css("display", "none");
        $("#favorite").css("display", "none");
        $("#legislators").css("display", "block");$("#myTognav").css("height", $("#block_border").css("height"));
    });
    $("#b").click(function(){
        $("#legislators").css("display", "none");
        $("#committees").css("display", "none");
        $("#favorite").css("display", "none");
        $("#bills").css("display", "block");$("#myTognav").css("height", $("#block_border").css("height"));
    });
    $("#c").click(function(){
        $("#legislators").css("display", "none");
        $("#bills").css("display", "none");
        $("#favorite").css("display", "none");
        $("#committees").css("display", "block");$("#myTognav").css("height", $("#block_border").css("height"));
    });
    $("#f").click(function(){
        $("#legislators").css("display", "none");
        $("#bills").css("display", "none");
        $("#committees").css("display", "none");
        $("#favorite").css("display", "block");$("#block_border").css("height", $("#myTognav").css("height"));
    });

    //switch among each sub-tab by controlling "display" attribute
     //legi
    $("#bystate").click(function(){
        $("#byHouse").css("display", "none");
        $("#bySenate").css("display", "none");
        $("#byState").css("display", "block");

    });
    $("#byhouse").click(function(){
        $("#byState").css("display", "none");
        $("#bySenate").css("display", "none");
        $("#byHouse").css("display", "block");

    });
    $("#bysenate").click(function(){
        $("#byState").css("display", "none");
        $("#byHouse").css("display", "none");
        $("#bySenate").css("display", "block");

    });


      //bill
    $("#activeB").click(function(){
      $("#activeBills").css("display", "block");
      $("#newBills").css("display", "none");
    });

    $("#newB").click(function(){
      $("#activeBills").css("display", "none");
      $("#newBills").css("display", "block");
    });

      //comm
    $("#houseCom").click(function(){
      $("#houseCommittees").css("display", "block");
      $("#senateCommittees").css("display", "none");
      $("#jointCommittees").css("display", "none");
    });
    $("#senateCom").click(function(){
      $("#houseCommittees").css("display", "none");
      $("#senateCommittees").css("display", "block");
      $("#jointCommittees").css("display", "none");
    });
    $("#jointCom").click(function(){
      $("#houseCommittees").css("display", "none");
      $("#senateCommittees").css("display", "none");
      $("#jointCommittees").css("display", "block");
    });

    //favorite
    $("#legiOn").click(function(){
      $("#favC").css("display", "none");
      $("#favB").css("display", "none");
      $("#favL").css("display", "block");
    });
    $("#billOn").click(function(){
      $("#favL").css("display", "none");
      $("#favC").css("display", "none");
      $("#favB").css("display", "block");
    });
    $("#commOn").click(function(){
      $("#favL").css("display", "none");
      $("#favB").css("display", "none");
      $("#favC").css("display", "block");
    });
});


//there can only be one app in one js, but multiple controllers.
var myApp = angular.module('myApp', ['angularUtils.directives.dirPagination']);
myApp.controller('MyController', MyController);

function MyController($scope){
    $scope.currentPage = 1;
    $scope.pageSize = 10;
    $scope.states = statefull;
    $scope.defaultSelectedVAT = $scope.states[0].name;//for "All States"

    //controll the left arrow to be display or not
    $scope.setleftcontrol = function(){$("#leftcontrol").css("display","none");}//carousel arrow disable
    $scope.setbillleftcontrol = function(){$("#billleftcontrol").css("display","none");}//carousel arrow disable
    
    //fetch data by calling api with php script
    $.ajax({type: 'GET',
        url:'http://hqf-env1.us-west-2.elasticbeanstalk.com/', 
        data: {action: JSON.stringify('legislators')},
        dataType: 'JSON',
        success: 
        function(result){
            alert("OK, AJAX IS WORKING");
            var obj = JSON.parse(result);
            var dataToStore = JSON.stringify(obj);
            localStorage.setItem('legislators', dataToStore);
       }
    });
    $.ajax({type: 'GET',
        url:'http://hqf-env1.us-west-2.elasticbeanstalk.com/', 
        data: {bction: JSON.stringify('bills')},
        dataType: 'JSON',
        success: 
        function(result){
            var obj = JSON.parse(result);
            var dataToStore = JSON.stringify(obj);
            localStorage.setItem('bills', dataToStore);
       }
    });
    $.ajax({type: 'GET',
        url:'http://hqf-env1.us-west-2.elasticbeanstalk.com/', 
        data: {b1ction: JSON.stringify('newbills')},
        dataType: 'JSON',
        success: 
        function(result){
            var obj = JSON.parse(result);
            var dataToStore = JSON.stringify(obj);
            localStorage.setItem('newbills', dataToStore);
       }
    });
    $.ajax({type: 'GET',
        url:'http://hqf-env1.us-west-2.elasticbeanstalk.com/', 
        data: {cction: JSON.stringify('committees')},
        dataType: 'JSON',
        success: 
        function(result){
            var obj = JSON.parse(result);
            var dataToStore = JSON.stringify(obj);
            localStorage.setItem('committees', dataToStore);
       }
    });
    //localStorage.removeItem('legislators');localStorage.removeItem('bills');localStorage.removeItem('committees');

//Manage data of legi, bill and Comm
//Legislators        
    var legi = localStorage.getItem('legislators');
    legis = JSON.parse(legi);
    $scope.lgtors = JSON.parse(JSON.stringify(legis).substring(11, JSON.stringify(legi.length)-62));
    
    for(var i=0; i<$scope.lgtors.length; i++){
        $scope.lgtors[i].in_office = false;
        $scope.lgtors[i].state = statehash[$scope.lgtors[i].state];
        var sterm = $scope.lgtors[i].term_start;
        $scope.lgtors[i].term_start = monthAbbrev[ sterm.substring(5,7)]+" "+(sterm.substring(8,9)=="0"?sterm.substring(9,10):sterm.substring(8,10))+", "+sterm.substring(0,4);
        var eterm = $scope.lgtors[i].term_end;
        $scope.lgtors[i].term_end = monthAbbrev[eterm.substring(5,7)]+" "+(eterm.substring(8,9)=="0"?eterm.substring(9,10):eterm.substring(8,10))+", "+eterm.substring(0,4);
        var stSec = Date.parse(sterm.substring(5,7)+" "+sterm.substring(8,10)+" "+sterm.substring(0,4));
        var enSec = Date.parse(eterm.substring(5,7)+" "+eterm.substring(8,10)+" "+eterm.substring(0,4));
        var nowSec = new Date().getTime();
        $scope.lgtors[i].term = (parseInt((100*(nowSec-stSec))/(enSec-stSec))+"%");
        var bday = $scope.lgtors[i].birthday;
        $scope.lgtors[i].birthday = monthAbbrev[bday.substring(5,7)]+" "+(bday.substring(8,9)=="0"?bday.substring(9,10):bday.substring(8,10))+", "+bday.substring(0,4);
    }
    //do the view detail thing: bioguide_id in legi-> sponsor_id in bills -> committee_id in committee



    $scope.details = function(bio_id){
        $("#leftcontrol").css("display","block");
        $("#next").click();

        $scope.legiDetail = [];
        for(var i=0; i<$scope.lgtors.length; i++){
          if($scope.lgtors[i].bioguide_id == bio_id){
            
            //change star color
            if($scope.lgtors[i].in_office==true){
                $("#starOfL").css("color", "#FFFC65");//change color of star
                $("#starOfL").css("-webkit-text-stroke-width", "0.5px");
                $("#starOfL").css("-webkit-text-stroke-color", "gray");
            }
            else{
                $("#starOfL").css("color", "white");
                $("#starOfL").css("-webkit-text-stroke-color", "gray");
            }

            //copy to legiDetail
            $scope.legiDetail = $scope.lgtors[i];
          }
        }
        //bill infor in Legi's view detail
        $scope.legiBillDetail = [];
        $.ajax({type: 'GET',
        url:'http://hqf-env1.us-west-2.elasticbeanstalk.com/', 
        data: {legiBill: bio_id},
        dataType: 'JSON',
        success: 
        function(result){
            //alert("OK, AJAX IS WORKING");
            var obj = JSON.parse(result);
            var dataToStore = JSON.stringify(obj);
            localStorage.setItem('legiBillDetail', dataToStore);
            //var dataToStore = JSON.stringify(obj);
            //localStorage.setItem('legiBill', dataToStore);
           }
        });
        var lbd = localStorage.getItem('legiBillDetail');
        lbd = JSON.parse(lbd);
        for(var i=0; i<5; i++){
            $scope.legiBillDetail.push(lbd.results[i]);
        }


        var countComIDs = [];
        for(var j=0; j<5; j++){
            countComIDs.push($scope.legiBillDetail[j].committee_ids[0]);
        }
        //alert(countComIDs);
        $scope.legiComDetail = [];
        $.ajax({type: 'GET',
            url:'http://hqf-env1.us-west-2.elasticbeanstalk.com/', 
            data: {legiComm: countComIDs[0]},
            dataType: 'JSON',
            success: 
            function(result){
                //alert("OK, AJAX IS WORKING");
                var obj = JSON.parse(result);
                var dataToStore = JSON.stringify(obj);
                localStorage.setItem('legiCommDetail0', dataToStore);
                //var dataToStore = JSON.stringify(obj);
                //localStorage.setItem('legiBill', dataToStore);
               }
        });
        $.ajax({type: 'GET',
            url:'http://hqf-env1.us-west-2.elasticbeanstalk.com/', 
            data: {legiComm: countComIDs[1]},
            dataType: 'JSON',
            success: 
            function(result){
                var obj = JSON.parse(result);
                var dataToStore = JSON.stringify(obj);
                localStorage.setItem('legiCommDetail1', dataToStore);
                //var dataToStore = JSON.stringify(obj);
                //localStorage.setItem('legiBill', dataToStore);
               }
        });        
        $.ajax({type: 'GET',
            url:'http://hqf-env1.us-west-2.elasticbeanstalk.com/', 
            data: {legiComm: countComIDs[2]},
            dataType: 'JSON',
            success: 
            function(result){
                var obj = JSON.parse(result);
                var dataToStore = JSON.stringify(obj);
                localStorage.setItem('legiCommDetail2', dataToStore);
                //var dataToStore = JSON.stringify(obj);
                //localStorage.setItem('legiBill', dataToStore);
               }
        });        
        $.ajax({type: 'GET',
            url:'http://hqf-env1.us-west-2.elasticbeanstalk.com/', 
            data: {legiComm: countComIDs[3]},
            dataType: 'JSON',
            success: 
            function(result){
                var obj = JSON.parse(result);
                var dataToStore = JSON.stringify(obj);
                localStorage.setItem('legiCommDetail3', dataToStore);
                //var dataToStore = JSON.stringify(obj);
                //localStorage.setItem('legiBill', dataToStore);
               }
        });
        $.ajax({type: 'GET',
            url:'http://hqf-env1.us-west-2.elasticbeanstalk.com/', 
            data: {legiComm: countComIDs[4]},
            dataType: 'JSON',
            success: 
            function(result){
                var obj = JSON.parse(result);
                var dataToStore = JSON.stringify(obj);
                localStorage.setItem('legiCommDetail4', dataToStore);
                //var dataToStore = JSON.stringify(obj);
                //localStorage.setItem('legiBill', dataToStore);
               }
        });
        var lcd = localStorage.getItem('legiCommDetail0');
        lcd = JSON.parse(lcd);
        $scope.legiComDetail.push(lcd.results[0]);

        var lcd = localStorage.getItem('legiCommDetail1');
        lcd1 = JSON.parse(lcd);
        $scope.legiComDetail.push(lcd1.results[0]);

        var lcd = localStorage.getItem('legiCommDetail2');
        lcd2 = JSON.parse(lcd);
        $scope.legiComDetail.push(lcd2.results[0]);

        var lcd = localStorage.getItem('legiCommDetail3');
        lcd3 = JSON.parse(lcd);
        $scope.legiComDetail.push(lcd3.results[0]);

        var lcd = localStorage.getItem('legiCommDetail4');
        lcd4 = JSON.parse(lcd);
        $scope.legiComDetail.push(lcd4.results[0]);
        //alert($scope.legiComDetail[4].committee_id);

    };

//Bills
    var billdata = localStorage.getItem('bills');
    var billdatas = JSON.parse(billdata); 
    $scope.blls = JSON.parse(JSON.stringify(billdatas).substring(11, JSON.stringify(billdata.length)-58));

    var newbilldata = localStorage.getItem('newbills');
    var newbilldatas = JSON.parse(newbilldata); 
    $scope.newblls = JSON.parse(JSON.stringify(newbilldatas).substring(11, JSON.stringify(newbilldata.length)-58));

    $scope.byA = {"active":true};
    $scope.byN = {"active":false};

    for(var i=0; i<$scope.blls.length; i++){
        $scope.blls[i].hasStar = false;
        var sterm = $scope.blls[i].introduced_on;
        $scope.blls[i].introduced_on = monthAbbrev[sterm.substring(5,7)]+" "+(sterm.substring(8,9)=="0"?sterm.substring(9,10):sterm.substring(8,10))+", "+sterm.substring(0,4);

    }    

    //view detail for bill
    $scope.billDetails = function(billid){
        $("#billleftcontrol").css("display","block");
        $("#billnext").click();
        $scope.billDetail = [];
        for(var i=0; i<$scope.blls.length; i++){
          if($scope.blls[i].bill_id == billid){
            $scope.billDetail = $scope.blls[i];

            //manage star(fav)
            if($scope.blls[i].hasStar==true){
                $("#starOfB").css("color", "#FFFC65");//change color of star
                $("#starOfB").css("-webkit-text-stroke-width", "0.5px");
                $("#starOfB").css("-webkit-text-stroke-color", "gray");
            }
            else{
                $("#starOfB").css("color", "white");
                $("#starOfB").css("-webkit-text-stroke-color", "gray");
            }
          }
        }
        for(var i=0; i<$scope.newblls.length; i++){
          if($scope.newblls[i].bill_id == billid){
            $scope.billDetail = $scope.newblls[i];
          }
        }

    };
    //bill filter variables
    var bysenate = {"chamber":"senate"};
    var byhouse = {"chamber":"house"};
    $scope.byS = bysenate;
    $scope.byH = byhouse;

//Committees
    var comm = localStorage.getItem('committees');
    var comms = JSON.parse(comm); 
    $scope.commit = JSON.parse(JSON.stringify(comms).substring(11, JSON.stringify(comm.length)-62));
    for(var i=0; i<$scope.commit.length; i++){$scope.commit[i].hasStar = false;}
    var byhouseCom = {"chamber":"house"};
    var bysenateCom = {"chamber":"senate"};
    var byjointCom = {"chamber":"joint"};
    //comm fiter variables
    $scope.bySCom = bysenateCom;
    $scope.byHCom = byhouseCom;
    $scope.byJCom = byjointCom;




//Favorite
    $scope.favLegi = [];//store the bioguide_id of favorite legi
    $scope.favBill = [];//store the bioguide_id of favorite bill
    $scope.favComm = [];//store the bioguide_id of favorite comm
    
    $(document).ready(function(){
        //legi
        $("#bt").click(function(){

            var temp = $("#bid").text();
            for(var i=0; i<$scope.favLegi.length; i++){
                if($scope.favLegi[i].bioguide_id == temp){
                    $scope.favLegi.splice(i,i+1);
                    $("#starOfL").css("color", "white");
                    $("#starOfL").css("-webkit-text-stroke-color", "gray");
                    for(var j=0; j<$scope.lgtors.length; j++){
                        if($scope.lgtors[j].bioguide_id==temp)$scope.lgtors[j].in_office=false;
                    }
                    return;
                }
            }
            $("#starOfL").css("color", "#FFFC65");//change color of star
            $("#starOfL").css("-webkit-text-stroke-width", "0.5px");
            $("#starOfL").css("-webkit-text-stroke-color", "gray");

            for(var i=0; i<$scope.lgtors.length; i++){
                if($scope.lgtors[i].bioguide_id==temp){$scope.lgtors[i].in_office=true;$scope.favLegi.push($scope.lgtors[i]);}
            }
        });
        $scope.turnToLegiDetail = function(){
            $("#favorite").css("display", "none");
            $("#legislators").css("display", "block");
        }
        $scope.trashL = function(bioid){
            for(var i=0; i<$scope.favLegi.length; i++){
                if($scope.favLegi[i].bioguide_id == bioid){
                    $scope.favLegi.splice(i,i+1);
                    for(var j=0; j<$scope.lgtors.length; j++){
                        if($scope.lgtors[j].bioguide_id==bioid){$scope.lgtors[j].in_office=false;}
                    }
                    return;
                }
            }
        }    
    

        //Bill
        $("#btbill").click(function(){
            var temp = $("#bllid").text();
            for(var i=0; i<$scope.favBill.length; i++){
                if($scope.favBill[i].bill_id == temp){
                    $scope.favBill.splice(i,i+1);
                    $("#starOfB").css("color", "white");
                    $("#starOfB").css("-webkit-text-stroke-color", "gray");
                    for(var j=0; j<$scope.blls.length; j++){
                        if($scope.blls[j].bill_id==temp){$scope.blls[j].hasStar=false;}
                    }
                    return;
                }
            }
            $("#starOfB").css("color", "#FFFC65");//change color of star
            $("#starOfB").css("-webkit-text-stroke-width", "0.5px");
            $("#starOfB").css("-webkit-text-stroke-color", "gray");

            for(var i=0; i<$scope.blls.length; i++){
                if($scope.blls[i].bill_id==temp){$scope.blls[i].hasStar=true;$scope.favBill.push($scope.blls[i]);}
            }
        });
        $scope.trashB = function(bllid){
            for(var i=0; i<$scope.favBill.length; i++){
                if($scope.favBill[i].bill_id == bllid){
                    $scope.favBill.splice(i,i+1);
                    for(var j=0; j<$scope.blls.length; j++){
                        if($scope.blls[j].bill_id==bllid){$scope.blls[j].hasStar=false;}
                    }
                    return;
                }
            }
        }    
        $scope.turnToBillDetail = function(){
            $("#favorite").css("display", "none");
            $("#bills").css("display", "block");
        }
    });

    //Comm:
        $scope.btComm = function(comid){
            for(var i=0; i<$scope.favComm.length; i++){
                if($scope.favComm[i].committee_id == comid){
                    $scope.favComm.splice(i,i+1);
                    for(var j=0; j<$scope.commit.length; j++){
                        if($scope.commit[j].committee_id==comid){$scope.commit[j].hasStar=false;}
                    }
                    return;
                }
            }    
            for(var i=0; i<$scope.commit.length; i++){
                if($scope.commit[i].committee_id==comid){$scope.commit[i].hasStar=true;$scope.favComm.push($scope.commit[i]);}
            }       
        }      
        $scope.trashC = function(comid){
            for(var i=0; i<$scope.favComm.length; i++){
                if($scope.favComm[i].committee_id == comid){
                    $scope.favComm.splice(i,i+1);
                    for(var j=0; j<$scope.commit.length; j++){
                        if($scope.commit[j].committee_id==comid){$scope.commit[j].hasStar=false;}
                    }
                    return;
                }
            }
        }    


}

//for pagination
function OtherController($scope) {
  $scope.pageChangeHandler = function(num) {
    console.log('going to page ' + num);
  };
}



var statehash = {
    "AL": "Alabama",
    "AK": "Alaska",
    "AS": "American Samoa",
    "AZ": "Arizona",
    "AR": "Arkansas",
    "CA": "California",
    "CO": "Colorado",
    "CT": "Connecticut",
    "DE": "Delaware",
    "DC": "District Of Columbia",
    "FM": "Federated States Of Micronesia",
    "FL": "Florida",
    "GA": "Georgia",
    "GU": "Guam",
    "HI": "Hawaii",
    "ID": "Idaho",
    "IL": "Illinois",
    "IN": "Indiana",
    "IA": "Iowa",
    "KS": "Kansas",
    "KY": "Kentucky",
    "LA": "Louisiana",
    "ME": "Maine",
    "MH": "Marshall Islands",
    "MD": "Maryland",
    "MA": "Massachusetts",
    "MI": "Michigan",
    "MN": "Minnesota",
    "MS": "Mississippi",
    "MO": "Missouri",
    "MT": "Montana",
    "NE": "Nebraska",
    "NV": "Nevada",
    "NH": "New Hampshire",
    "NJ": "New Jersey",
    "NM": "New Mexico",
    "NY": "New York",
    "NC": "North Carolina",
    "ND": "North Dakota",
    "MP": "Northern Mariana Islands",
    "OH": "Ohio",
    "OK": "Oklahoma",
    "OR": "Oregon",
    "PW": "Palau",
    "PA": "Pennsylvania",
    "PR": "Puerto Rico",
    "RI": "Rhode Island",
    "SC": "South Carolina",
    "SD": "South Dakota",
    "TN": "Tennessee",
    "TX": "Texas",
    "UT": "Utah",
    "VT": "Vermont",
    "VI": "Virgin Islands",
    "VA": "Virginia",
    "WA": "Washington",
    "WV": "West Virginia",
    "WI": "Wisconsin",
    "WY": "Wyoming"
};
var statefull = [
     
    {
        "name": "All States",
        "abbreviation": ""
    },
    {
        "name": "Alabama",
        "abbreviation": "AL"
    },
    {
        "name": "Alaska",
        "abbreviation": "AK"
    },
    {
        "name": "American Samoa",
        "abbreviation": "AS"
    },
    {
        "name": "Arizona",
        "abbreviation": "AZ"
    },
    {
        "name": "Arkansas",
        "abbreviation": "AR"
    },
    {
        "name": "California",
        "abbreviation": "CA"
    },
    {
        "name": "Colorado",
        "abbreviation": "CO"
    },
    {
        "name": "Connecticut",
        "abbreviation": "CT"
    },
    {
        "name": "Delaware",
        "abbreviation": "DE"
    },
    {
        "name": "District Of Columbia",
        "abbreviation": "DC"
    },
    {
        "name": "Federated States Of Micronesia",
        "abbreviation": "FM"
    },
    {
        "name": "Florida",
        "abbreviation": "FL"
    },
    {
        "name": "Georgia",
        "abbreviation": "GA"
    },
    {
        "name": "Guam",
        "abbreviation": "GU"
    },
    {
        "name": "Hawaii",
        "abbreviation": "HI"
    },
    {
        "name": "Idaho",
        "abbreviation": "ID"
    },
    {
        "name": "Illinois",
        "abbreviation": "IL"
    },
    {
        "name": "Indiana",
        "abbreviation": "IN"
    },
    {
        "name": "Iowa",
        "abbreviation": "IA"
    },
    {
        "name": "Kansas",
        "abbreviation": "KS"
    },
    {
        "name": "Kentucky",
        "abbreviation": "KY"
    },
    {
        "name": "Louisiana",
        "abbreviation": "LA"
    },
    {
        "name": "Maine",
        "abbreviation": "ME"
    },
    {
        "name": "Marshall Islands",
        "abbreviation": "MH"
    },
    {
        "name": "Maryland",
        "abbreviation": "MD"
    },
    {
        "name": "Massachusetts",
        "abbreviation": "MA"
    },
    {
        "name": "Michigan",
        "abbreviation": "MI"
    },
    {
        "name": "Minnesota",
        "abbreviation": "MN"
    },
    {
        "name": "Mississippi",
        "abbreviation": "MS"
    },
    {
        "name": "Missouri",
        "abbreviation": "MO"
    },
    {
        "name": "Montana",
        "abbreviation": "MT"
    },
    {
        "name": "Nebraska",
        "abbreviation": "NE"
    },
    {
        "name": "Nevada",
        "abbreviation": "NV"
    },
    {
        "name": "New Hampshire",
        "abbreviation": "NH"
    },
    {
        "name": "New Jersey",
        "abbreviation": "NJ"
    },
    {
        "name": "New Mexico",
        "abbreviation": "NM"
    },
    {
        "name": "New York",
        "abbreviation": "NY"
    },
    {
        "name": "North Carolina",
        "abbreviation": "NC"
    },
    {
        "name": "North Dakota",
        "abbreviation": "ND"
    },
    {
        "name": "Northern Mariana Islands",
        "abbreviation": "MP"
    },
    {
        "name": "Ohio",
        "abbreviation": "OH"
    },
    {
        "name": "Oklahoma",
        "abbreviation": "OK"
    },
    {
        "name": "Oregon",
        "abbreviation": "OR"
    },
    {
        "name": "Palau",
        "abbreviation": "PW"
    },
    {
        "name": "Pennsylvania",
        "abbreviation": "PA"
    },
    {
        "name": "Puerto Rico",
        "abbreviation": "PR"
    },
    {
        "name": "Rhode Island",
        "abbreviation": "RI"
    },
    {
        "name": "South Carolina",
        "abbreviation": "SC"
    },
    {
        "name": "South Dakota",
        "abbreviation": "SD"
    },
    {
        "name": "Tennessee",
        "abbreviation": "TN"
    },
    {
        "name": "Texas",
        "abbreviation": "TX"
    },
    {
        "name": "Utah",
        "abbreviation": "UT"
    },
    {
        "name": "Vermont",
        "abbreviation": "VT"
    },
    {
        "name": "Virgin Islands",
        "abbreviation": "VI"
    },
    {
        "name": "Virginia",
        "abbreviation": "VA"
    },
    {
        "name": "Washington",
        "abbreviation": "WA"
    },
    {
        "name": "West Virginia",
        "abbreviation": "WV"
    },
    {
        "name": "Wisconsin",
        "abbreviation": "WI"
    },
    {
        "name": "Wyoming",
        "abbreviation": "WY"
    }
];
var monthAbbrev = {
    "01": "Jan",
    "02": "Feb",
    "03": "Mar",
    "04": "Apr",
    "05": "May",
    "06": "Jun",
    "07": "Jul",
    "08": "Aug",
    "09": "Sep",
    "10": "Oct",
    "11": "Nov",
    "12": "Dec",
}