import http from './fetch'
function to(promise) {
    return promise
      .then(data => {
        return [null, data];
      })
      .catch(err => [err]);
  }

const api={
    async login(params) {
		const self = this;

		const url = '/userManage/searchUser';
		const [err, res] = await to(http.get(url,params));
		if (err) {
			console.log('ERROR: Location: login, Reason:' + err.errMsg);
			return Object.assign(err, {
				status: "406",
				description: err.errMsg
			}, true);
		}
		if (res.status == "-99") {
			// self.cleanStorage();
			self.goBackToLogin();
			return ;
		}
		return res;
	},
};
export default api;