import React, { Component } from 'react';

import { Crisp } from 'crisp-sdk-web';

class CrispChat extends Component {
	componentDidMount() {
		Crisp.configure('c0124f1a-8869-4dad-badc-e7d58d8780eb');
	}

	render() {
		return null;
	}
}
export default CrispChat;
