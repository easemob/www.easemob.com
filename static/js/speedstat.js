try{
	(function(){

		var report_url = "http://s.easemob.com/s/net";

		var tasks = {
			1 : ["aliyun-beijing","http://ebs-ali-beijing-web1.easemob.com/favicon.ico"],
			2 : ["qingcloud","http://www.qingcloud.com/static/images/favicon.ico?v=1"]
		};
		var _count = 2; // length of tasks[]
		var _submited = false;

		var _count_success = 0;
		var _count_fail = 0;

		var _status = new Array(); // 1: success, 0: fail
		var _timeCost = new Array();

		var log = function(message) {
			var img = new Image();
			img.src = report_url + "?" + message;
		}

		var submit_result = function() {
			if (!_submited) {
				var t = "submit&data=";
				for (_idx in _status) {
					t += _idx + "," + _status[_idx] + "," + _timeCost[_idx] + ";";
				}
				log(t);
				_submited = true;
			}
		}

		var update_status = function() {
			if (_count_success + _count_fail >= _count) {
				submit_result();
			}
		}

		var loadimg = function(url_idx) {
			var tag = tasks[url_idx][0];
			var url = tasks[url_idx][1];
			var img = new Image();
			var time = (new Date()).getTime();
			img.onload = function() {
				time = (new Date()).getTime() - time;
				_status[tag] = 1;
				_timeCost[tag] = time;
				_count_success += 1;

				update_status();
			}
			img.onerror = img.onabort = function() {
				time = (new Date()).getTime() - time;
				_status[tag] = 0;
				_timeCost[tag] = time;
				_count_fail += 1;

				update_status();
			}
			img.src = url + "?" + new Date().getTime();
			img.alt = tag;
			img.title = url;
		}

		var runStat = function(timeoutFunc) {
			for (var url_idx in tasks) {
				loadimg(url_idx);
			}
		}

		runStat(submit_result);
		// TODO: submit after 25s
	})();
} catch(e) {}
