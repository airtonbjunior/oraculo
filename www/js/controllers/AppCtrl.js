app.controller('AppCtrl', function ($scope, $ionicModal, $ionicPopover, $timeout, $http, $window, $ionicLoading) { //add $window to use $window.localStorage    // Form data for the login modal
    $scope.loginData = {};

    $scope.visibility = "none";

    $scope.totalItems = 0;
    $scope.totalItems = $window.localStorage.length; // get the size to control the indices
    //$scope.answer = $window.localStorage;

    var obj;
    for (item in $window.localStorage) {
        obj = JSON.parse($window.localStorage[item]); // Here, I get all the data that were saved in the localStorage. All the user data is here!
    }


    $scope.loading = function() {

        $ionicLoading.show({
            template: '<div class="loader"><svg class="circular"><circle class="path" cx="50" cy="50" r="20" fill="none" stroke-width="2" stroke-miterlimit="10"/></svg></div>'
        });

        // For example's sake, hide the sheet after two seconds
        /*
        $timeout(function() {
            $ionicLoading.hide();

        }, 2000);
        */
    };


    // I'm using localStorage now!
    $http.get('js/data.json').success (function (data) {   // Get the external data (json) - publish on my url

        $scope.alldata = data;
        $scope.questions = data.savedQuestions;

    });


    var navIcons = document.getElementsByClassName('ion-navicon');
    for (var i = 0; i < navIcons.length; i++) {
        navIcons.addEventListener('click', function () {
            this.classList.toggle('active');
        });
    }

    /*
    var fab = document.getElementById('fab');
    fab.addEventListener('click', function () {
        //location.href = 'https://twitter.com/airtonbjunior';
        window.open('https://twitter.com/airtonbjunior', '_blank');
    });
*/

    // .fromTemplate() method
    var template = '<ion-popover-view>' +
                    '   <ion-header-bar>' +
                    '       <h1 class="title">Sobre o App</h1>' +
                    '   </ion-header-bar>' +
                    '   <ion-content class="padding">' +
                    '       Oráculo! Faça sua pergunta e saiba a resposta do Oráculo.' +
                    '   </ion-content>' +
                    '</ion-popover-view>';

    $scope.popover = $ionicPopover.fromTemplate(template, {
        scope: $scope
    });
    $scope.closePopover = function () {
        $scope.popover.hide();
    };
    //Cleanup the popover when we're done with it!
    $scope.$on('$destroy', function () {
        $scope.popover.remove();
    });


    // Put the answers on a external file
    var answers = ["Sim", "Não", "Talvez", "Não posso responder", "Só Deus sabe", "Você já sabe a resposta", "Não quero falar sobre isso", "Com certeza!", "Com certeza não!", "Infelizmente não"]; //Pensar em mais


    /*
     * Function that process the question and return the answer for the user
     * Verify if the user already make this question before - if it's true, return the same answer
     */
    $scope.ask = function (question) {

        if (!question || question.length === 0) { $scope.answer = "Não posso responder uma pergunta vazia como essa!"; return; }

        // Verify if the user already did the question - if positive, return the same answer


        for (item in $window.localStorage) {
            
            obj = JSON.parse($window.localStorage[item]);

            if (obj['question'] == question) {
                $scope.answer = obj['answer'];
                $scope.question = question; // In addition, we show the original question to the user
                $scope.visibility = "";

                return;
            }
        }

        $scope.loading();
        

        $timeout(function() {

            $ionicLoading.hide();


            // If the code runs here, the user doesn't make this question before
            $scope.answer = answers[Math.floor(((Math.random() * 9) + 1))];  // Choose the answer randomly
            $scope.question = question; // In addition, we show the original question to the user
            newObject = { question: question, answer: $scope.answer }; // Create the object
            $scope.alldata.savedQuestions.push(newObject);  // Save the data on json file
            
            
            /* Save the data on the localstorage! */
            $window.localStorage.setItem(($scope.totalItems), JSON.stringify( {'question': question, 'answer': $scope.answer} ) );
            $scope.totalItems = $window.localStorage.length; // refresh the totalItems

            document.getElementById("textQuestion").value = "";  // See how I can do that in a better way
            $scope.visibility = ""; // show the div that contains the question/answer - default is hidden      

        }, 2000);

    };
});