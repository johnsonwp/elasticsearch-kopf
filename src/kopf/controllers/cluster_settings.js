function ClusterSettingsController($scope, $location, $timeout, AlertService) {

    $scope.$on('loadClusterSettingsEvent', function() {
		$('#cluster_settings_option a').tab('show');
		$('#cluster_settings_tabs a:first').tab('show');
		$(".setting-info").popover();
		$scope.settings = new ClusterSettings($scope.cluster.settings);
    });

	$scope.save=function() {
			var new_settings = {};
			new_settings.transient = $scope.settings;
			var response = $scope.client.updateClusterSettings(JSON.stringify(new_settings, undefined, ""),
				function(response) {
					$scope.updateModel(function() {
						AlertService.success("Cluster settings were successfully updated",response);
					});
					$scope.refreshClusterState();
				}, 
				function(error) {
					$scope.updateModel(function() {
						AlertService.error("Error while updating cluster settings",error);
					});
				}
		);
	};
}