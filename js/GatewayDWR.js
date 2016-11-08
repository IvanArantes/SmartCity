if (typeof dwr == 'undefined' || dwr.engine == undefined) throw new Error('You must include DWR engine before including this file');

(function() {
  if (dwr.engine._getObject("GatewayDWR") == undefined) {
    var p;
    
    p = {};
    p._path = '/sib/dwr';

    /**
     * @param {class java.lang.String} p0 a param
     * @param {function|Object} callback callback function or options object
     */
    p.process = function(p0, callback) {
      return dwr.engine._execute(p._path, 'GatewayDWR', 'process', arguments);
    };

    /**
     * @param {class com.indra.sofia2.ssap.ssap.SSAPMessage} p0 a param
     * @param {class com.indra.sofia2.support.util.sib.plugins.internal.dto.ClientGatewayData} p1 a param
     * @param {function|Object} callback callback function or options object
     */
    p.process = function(p0, p1, callback) {
      return dwr.engine._execute(p._path, 'GatewayDWR', 'process', arguments);
    };
    
    dwr.engine._setObject("GatewayDWR", p);
  }
})();
