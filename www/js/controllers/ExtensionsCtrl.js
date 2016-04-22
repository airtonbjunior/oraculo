app.controller('ExtensionsCtrl', function ($scope, $stateParams, $ionicActionSheet, $timeout, $ionicLoading, $ionicModal, $ionicPopup, ionicMaterialInk, $window, $cordovaSocialSharing) {

    /* First of all, get all questions of the user */
    $scope.totalItems = $window.localStorage.length; // get the size to control the indices

    $scope.visibilityMessage = "none";
    $scope.savedQuestion = [];

    var obj;
    var i = 0;
    for (item in $window.localStorage) {
        obj = JSON.parse($window.localStorage[item]); // Here, I get all the data that were saved in the localStorage. All the user data is here!
        $scope.savedQuestion[i] = obj;
        i++;
    }

/*
    // Triggered on a button click, or some other target
    $scope.actionSheet = function() {

        // Show the action sheet
        var hideSheet = $ionicActionSheet.show({
            buttons: [{
                text: '<b>Share</b> This'
            }, {
                text: 'Move'
            }],
            destructiveText: 'Delete',
            titleText: 'Modify your album',
            cancelText: 'Cancel',
            cancel: function() {
                // add cancel code..
            },
            buttonClicked: function(index) {
                return true;
            }
        });

        // For example's sake, hide the sheet after two seconds
        $timeout(function() {
            hideSheet();
        }, 2000);

    };
*/
    $scope.loading = function() {

        $ionicLoading.show({
            template: '<div class="loader"><svg class="circular"><circle class="path" cx="50" cy="50" r="20" fill="none" stroke-width="2" stroke-miterlimit="10"/></svg></div>'
        });

        // For example's sake, hide the sheet after two seconds
        $timeout(function() {
            $ionicLoading.hide();
        }, 500);
    };

/*
    $ionicModal.fromTemplateUrl('my-modal.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function(modal) {
        $scope.modal = modal;
    });

    $scope.openModal = function() {
        $scope.modal.show();
        $timeout(function () {
            $scope.modal.hide();
        }, 2000);
    };
    // Cleanup the modal when we're done with it
    $scope.$on('$destroy', function() {
        $scope.modal.remove();
    });

    // Popover
    $scope.popover = function() {
        $scope.$parent.popover.show();
        $timeout(function () {
            $scope.$parent.popover.hide();
        }, 2000);
    };

    // Confirm
    $scope.showPopup = function() {
        var alertPopup = $ionicPopup.alert({
            title: 'You are now my subscribed to Cat Facts',
            template: 'You will meow receive fun daily facts about CATS!'
        });

        $timeout(function() {
            //ionic.material.ink.displayEffect();
            ionicMaterialInk.displayEffect();
        }, 0);
    };

    // Toggle Code Wrapper
    var code = document.getElementsByClassName('code-wrapper');
    for (var i = 0; i < code.length; i++) {
        code[i].addEventListener('click', function() {
            this.classList.toggle('active');
        });
    };
*/

    /* Form validation */
    $scope.sendMessage = function () { 
        
        if ($scope.message.name == "" || $scope.message.name == null) {
            alert("Escreva seu nome");
            return;
        }

        var re = /\S+@\S+\.\S+/;
        if (!re.test($scope.message.email)) { 
            alert("Email inválido");
            return;
        }
        
        if ($scope.message.comment == "" || $scope.message.comment == null) {
            alert("Escreva seu comentário");
            return;
        }

        // I didn't understood how this works, but works fine!
        $timeout(function() {

           $scope.visibilityMessage = "none";  // show the div that contains the question/answer - default is hidden      

        }, 1000);
        $scope.visibilityMessage = "block"; 
    };



    $scope.doRefresh = function () {

        $scope.totalItems = $window.localStorage.length; // get the size to control the indices

        $scope.savedQuestion = [];

        var obj;
        var i = 0;
        for (item in $window.localStorage) {
            obj = JSON.parse($window.localStorage[item]); // Here, I get all the data that were saved in the localStorage. All the user data is here!
            $scope.savedQuestion[i] = obj;
            i++;
        }
        $scope.$broadcast('scroll.refreshComplete');

        document.getElementById('resposta').style.display = "none";
    };


    $scope.shareAnywhere = function (question, answer) {
    /* The method signature: .share(msg, subject, file, link)*/                           

        $cordovaSocialSharing.share("Eu usei o Oráculo, use você também!", "Subject", "https://placeholdit.imgix.net/~text?txtsize=33&txt=350%C3%97150&w=350&h=150", "http://airtonbjunior.com.br/apps/oraculo");
        //$cordovaSocialSharing.shareViaFacebook('hahahaha', null, null);
    }

    $scope.loading();

});