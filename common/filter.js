import Vue from "vue"
import moment from './moment.min.js'

Vue.filter('numFloat', function(msg) {
	return parseFloat(msg).toFixed(2)
})

Vue.filter("dateFilter", function(date, formatPattern) {
	return moment(date).format(formatPattern || "YYYY-MM-DD");
});
