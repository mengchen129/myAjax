(function(global) {
    "use strict";

    /**
     * 将对象参数序列化为URL参数字符串形式
     * @param obj
     * @returns {*}
     */
    function serializeParam(obj) {
        if (!obj) {return null;}
        var str = '';
        for (var key in obj) {
            if (obj.hasOwnProperty(key)) {
                var value = encodeURIComponent(obj[key]);
                str += (key + '=' + value + '&');
            }
        }
        str = str.substring(0, str.length - 1);
        return str;
    }

    /**
     * 生成随机唯一的callback名称
     * @returns {string}
     */
    function generateCallbackFunName() {
        var timestamp = new Date().getTime();
        var rand = parseInt(Math.random() * 1000);
        return 'mc_callback_' + timestamp + '_' + rand;
    }

    var MC = {};

    MC.ajax = function(params) {
        params = params || {};
        var url = params.url;
        var data = params.data;
        var type = String(params.type || 'GET').toUpperCase();
        var dataType = String(params.dataType || '').toUpperCase();
        var success = params.success;
        var error = params.error;
        var withCredentials = !!params.withCredentials;
        var crossDomain = !!params.crossDomain;

        if (!url) return;

        if (dataType === "JSONP") {

            var callbackFuncName = generateCallbackFunName();
            global[callbackFuncName] = success;

            url = url.replace(/callback=\?/, function() {
                return 'callback=' + callbackFuncName;
            });

            var script = document.createElement('script');
            script.async = true;
            script.onload = function() {
                document.head.removeChild(script);
            };
            script.src = url;
            document.head.appendChild(script);

        } else if (type === 'GET' || type === 'POST') {
            var xhr = new XMLHttpRequest();
            xhr.withCredentials = withCredentials;

            var queryString = serializeParam(data);
            if (type === 'GET' && queryString) {
                if (url.indexOf('?') == -1) {
                    url = url + '?' + queryString;
                } else {
                    url = url + '&' + queryString;
                }
            }

            xhr.open(type, url, true);

            if (!crossDomain) {     // 同域请求设置此头部, 跨域时不设置此头部
                xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
            }

            if (type == "POST") {       // POST请求设置内容类型为form
                xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
            }

            if (typeof success === 'function') {
                xhr.onload = function () {
                    var respText = xhr.responseText;
                    success(dataType == 'JSON' ? JSON.parse(respText) : respText);
                };
            }

            if (typeof error === 'function') {
                xhr.onerror = function () {
                    error();
                };
            }

            xhr.send((type === 'POST') ? queryString : null);
        }
    };

    window.MC = MC;
})(window);