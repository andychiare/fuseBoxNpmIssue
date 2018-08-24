
export function getBrowserAppName() {
	var canUseDOM = !!(typeof window !== 'undefined' && window.document && window.document.createElement);
	
    return canUseDOM?window.navigator.appName:null;
}